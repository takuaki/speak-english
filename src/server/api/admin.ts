import { httpsCallable } from "firebase/functions";
import { functions } from "./";

const uniqueUser: (username: string) => Promise<boolean> = async (username) => {
	const { data } = await httpsCallable<{ name: string }, { unique: boolean }>(
		functions,
		"searchUser"
	)({ name: username });
	return data.unique;
};

const deleteUser: (uid: string) => Promise<boolean> = async (uid) => {
	const { data } = await httpsCallable<
		string,
		{ success: boolean; message: string | null }
	>(
		functions,
		"deleteUser"
	)(uid);
	return data.success;
};

export { uniqueUser, deleteUser };
