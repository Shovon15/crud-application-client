import { toast } from "react-toastify";

export function showErrorToast(message) {
	toast.error(message, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		// theme: "light",
		theme: "colored",
	});
}

export function showSuccessToast(message) {
	toast.success(message, {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		// theme: "light",
		theme: "colored",
	});
}
