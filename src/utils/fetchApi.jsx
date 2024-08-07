import axios from "axios";

export const baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(
	(config) => {
		// let token = JSON.parse(localStorage.getItem("user"))?.token;

		// if (token) {
		// 	config.headers.Authorization = "Bearer " + token;
		// }
		config.baseURL = baseURL;
		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// if (error.response.status == 401) {
		// 	// localStorage.removeItem("user");
		// 	// window.location.href = "/login";
		// }
		return Promise.reject(error);
	}
);

export function post(url, data, contentType = "application/json") {
	return axios({
		method: "POST",
		url: url,
		data: data,
		headers: {
			"Content-Type": contentType,
		},
	});
}
export function put(url, data, contentType = "application/json") {
	return axios({
		method: "PUT",
		url: url,
		data: data,
		headers: {
			"Content-Type": contentType,
		},
	});
}
export function get(url) {
	return axios({
		method: "GET",
		url: url,
	});
}
export function getWithParams(url, params) {
	return axios({
		method: "GET",
		url: url,
		params: params,
	});
}
export function del(url) {
	return axios({
		method: "DELETE",
		url: url,
	});
}
