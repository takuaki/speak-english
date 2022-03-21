import { httpsCallable } from "firebase/functions";
import { functions } from "./";

const seachUser: (username: string) => Promise<boolean> = async (username) => {
  const { data } = await httpsCallable<{ name: string }, { unique: boolean }>(
    functions,
    "searchUser"
  )({ name: username });
  return data.unique;
};

export { seachUser };
