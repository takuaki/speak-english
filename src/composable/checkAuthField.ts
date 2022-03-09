import {ref} from "vue"
import type {Ref} from "vue"

export function useCheckAuthInput(email:Ref<string>,password:Ref<string>){
	const checkEmail = ref<boolean>(null)
	const checkPassword = ref<boolean>(null)
	checkEmail.value = RegExp("/^[^\s@]+@[^\s@]+\.[^\s@]+$/").test(email.value)
	checkPassword.value = RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$").test(password.value)
	
	return {
		checkEmail,checkPassword
	}
}