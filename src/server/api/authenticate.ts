//import * as firebase from "firebase/app"
import { firebaseApp } from ".";
import { unref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged as stateChanged,
  /*sendPasswordResetEmail,
  verifyPasswordResetCode,
  AuthErrorCodes,*/
  type User,
  type NextFn,
} from "firebase/auth";
import { Success, Failure } from "@/utils/result";
import type { Result } from "@/utils/result";

const auth = getAuth(firebaseApp);

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
    //TODO
    /*if (err.code === "auth/user-not-found")
      return failure({ error: "user-not-found" });
    else*/ return new Failure({ error: "auth/unknown" });
  }
};

const signUp: (
  email: MaybeRef<string>,
  password: MaybeRef<string>
) => Promise<Result<{ uid: string }, { error: string }>> = async (
  email,
  password
) => {
  try {
    const { user, operationType } = await createUserWithEmailAndPassword(
      auth,
      unref(email),
      unref(password)
    );
    if (operationType === "reauthenticate")
      return new Success({ uid: user.uid });
    else if (operationType === "signIn")
      return new Failure({ error: "auth/user-already-has-account" });
    else return new Failure({ error: "auth/unknown" });
  } catch (err) {
    console.error(err);
    return new Failure({ error: "auth/unknown" });
  }
};

const onAuthStateChanged = (callback: NextFn<User | null>) => {
  stateChanged(auth, callback);
};

export { signIn, signUp, onAuthStateChanged };
export default auth;
