import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp()

export const searchUser = functions.https.onCall(async ({name},context)=>{
	const {users} = await admin.auth().listUsers()
	const unique = users.findIndex(user=>user.displayName===name) === -1
	return {unique:unique}
})

/**
 * TODO
 * functionsで諸々のdatabaseとかのデータを消しておく
 */
export const deleteUser = functions.https.onCall(async (uid,context)=>{
	try{
		await admin.auth().deleteUser(uid);
		return {success:true,message:null}
	}catch(err){
		return {success:false,message:err.code}
	}
})

