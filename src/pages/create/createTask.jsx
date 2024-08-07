import { Button, Input, Spinner, Switch, Textarea } from "@material-tailwind/react";
import HeaderText from "../../components/headerText";
import GoBackButton from "../../components/GoBackButton";
// import Spinner from "../../components/spinner";
import { useState } from "react";
import { post } from "../../utils/fetchApi";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../../utils/ToastMessage";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();

    const handleForm = async (data) => {
        const formData = {
            task_name: data.title,
            description: data.description,
            is_done: isDone,
        };

        try {
            setIsLoading(true);
            const response = await post("/task/create", formData);
            reset();
            showSuccessToast(response.data?.message);
            navigate("/");
        } catch (error) {
            showErrorToast(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="lg:pb-10 p-5 md:p-10">
            <HeaderText className="py-5">Create Task</HeaderText>
            <GoBackButton />
            <form onSubmit={handleSubmit(handleForm)}>
                <div className="w-full lg:w-1/2 mx-auto flex flex-col gap-2 pb-2">
                    <div className="flex flex-col gap-1 w-full">
                        <p className="font-bold text-color-primary  py-2">
                            Task Title <span className="text-red-500">*</span>
                        </p>
                        <Input
                            type="text"
                            color="teal"
                            label="Title"
                            {...register("title", {
                                required: "Title Required *",
                            })}
                            error={!!errors.title}
                            className="text-color-primary"
                        />
                        {errors.title && <p className="text-red-500 text-sm ">{errors.title.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-full  ">
                        <p className="font-bold text-color-primary  py-2">
                            Description <span className="text-red-500">*</span>
                        </p>
                        <Textarea
                            color="teal"
                            label="Description"
                            {...register("description", {
                                required: "Description Required *",
                            })}
                            error={!!errors.description}
                            className="text-color-primary"
                        />
                        {errors.description && <p className="text-red-500 text-sm ">{errors.description.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-full  ">
                        <p className="font-bold text-color-primary  py-2">
                            Is Complete
                        </p>
                        <div className="flex gap-3">
                            <Switch color="blue" checked={isDone}
                                onChange={(event) => setIsDone(event.target.checked)} defaultChecked />
                            <p className="text-md px-3">{isDone ? "Complete" : "Incomplete"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center my-10 ">
                    <Button type="submit" disabled={isLoading} className="px-16 capitalize bg-color-button text-md">
                        {isLoading ? <Spinner color="blue" className="mx-auto te" /> : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask