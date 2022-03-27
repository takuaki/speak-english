//import * as firebase from "firebase/app"
import { auth } from ".";
import { unref } from "vue";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged as stateChanged,
	signOut,
	updateProfile,
	sendPasswordResetEmail,
} from "firebase/auth";
import type { AuthError, User, NextFn } from "firebase/auth";
import { Success, Failure, failure, success } from "@/utils/result";
import type { Result } from "@/utils/result";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

const SignUpErrorMap: { [key: string]: SignUpError } = {
	"auth/email-already-in-use": "email-already-in-use",
};
const SignInErrorMap: { [key: string]: SignInError } = {
	"auth/user-not-found": "user-not-found",
};

export type SignUpError = "email-already-in-use" | "unknown";
export type SignInError = "user-not-found" | "unknown";

const signIn: (
	email: MaybeRef<string>,
	password: MaybeRef<string>
) => Promise<Result<string, { error: SignInError }>> = async (
	_email: MaybeRef<string>,
	_password: MaybeRef<string>
) => {
	try {
		const email = unref<string>(_email);
		const password = unref<string>(_password);

		const { user, operationType } = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		if (operationType === "signIn") return new Success(user.uid);
		else return new Failure({ error: "unknown" });
	} catch (err) {
		if (err instanceof FirebaseError) {
			if (err.code in SignInErrorMap) {
				return failure({ error: SignInErrorMap[err.code] });
			} else {
				return failure({ error: "unknown" });
			}
		} else {
			return failure({ error: "unknown" });
		}
	}
};

const signUp: (
	email: MaybeRef<string>,
	password: MaybeRef<string>
) => Promise<Result<string, { error: SignUpError }>> = async (
	email,
	password
	//userName
) => {
	try {
		const { user, operationType } = await createUserWithEmailAndPassword(
			auth,
			unref(email),
			unref(password)
		);
		if (operationType === "signIn") {
			//await updateProfile(user, { displayName: unref(userName) });
			return success(user.uid);
		} else {
			return failure({ error: "unknown" });
		}
	} catch (err) {
		if (err instanceof FirebaseError && err.code in SignUpErrorMap) {
			return failure({ error: SignUpErrorMap[err.code] });
		} else {
			return failure({ error: "unknown" });
		}
	}
};

const setUserName: (
	user: User,
	username: MaybeRef<string>
) => Promise<void> = async (user, username) => {
	try {
		await updateProfile(user, { displayName: username });
	} catch (err) {
		console.error(err);
	}
};

/**
 * TODO
 */
const sendResetPassword: (email: string) => Promise<void> = async (email) => {
	const redirectURL = window.location.origin + "/login";
	return await sendPasswordResetEmail(auth, email, {
		handleCodeInApp: false,
		url: redirectURL,
	});
};

const logout: () => Promise<void> = async () => {
	return await signOut(auth);
};

const onAuthStateChanged = (callback: NextFn<User | null>) => {
	stateChanged(auth, callback);
};

export {
	signIn,
	signUp,
	onAuthStateChanged,
	setUserName,
	logout as signOut,
	sendResetPassword,
};
export default auth;
