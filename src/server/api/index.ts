import axios, {AxiosInstance} from "axios"

const apiClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VUE_API_ENDPOINT as string,
	headers:{
		'Content-type':'application/json',
	}
})

export default apiClient