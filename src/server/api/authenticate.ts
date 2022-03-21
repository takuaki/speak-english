//import * as firebase from "firebase/app"
import { auth } from ".";
import { unref } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged as stateChanged,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import type { AuthError, User, NextFn } from "firebase/auth";
import { Success, Failure, failure, success } from "@/utils/result";
import type { Result } from "@/utils/result";
import { FirebaseError } from "firebase/app";

const signIn: (
  email: MaybeRef<string>,
  password: MaybeRef<string>
) => Promise<Result<{ uid: string }, { error: string }>> = async (
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
    if (operationType === "signIn") return new Success({ uid: user.uid });
    else if (operationType === "reauthenticate") {
      return new Failure({ error: "has-account" });
    } else return new Failure({ error: "auth/unknown" });
  } catch (err) {
    if (err instanceof FirebaseError) {
      //if user is already added, auth/email-already-in-use
      return failure({ eror: err.code });
    } else {
      return failure({ error: "unknown" });
    }
  }
};

const signUp: (
  email: MaybeRef<string>,
  password: MaybeRef<string>
  //userName: MaybeRef<string>
) => Promise<Result<{ uid: string }, { error: string }>> = async (
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
      return success({ uid: user.uid });
    } else {
      return failure({ error: "auth/unknown" });
    }
  } catch (err) {
    if (err instanceof FirebaseError) {
      //if user is already added, auth/email-already-in-use
      return failure({ eror: err.code });
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

const onAuthStateChanged = (callback: NextFn<User | null>) => {
  stateChanged(auth, callback);
};

export { signIn, signUp, onAuthStateChanged, setUserName };
export default auth;
