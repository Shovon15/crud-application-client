import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@material-tailwind/react";

const GoBackButton = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<Button
			onClick={goBack}
			variant="text"
			className="flex gap-2 items-center capitalize text-md text-color-primary hover:text-color-header dark:text-white dark:bg-blue-300 px-2 py-2"
		>
			<IoIosArrowBack className="w-4 h-4" />
			Back
		</Button>
	);
};

export default GoBackButton;
