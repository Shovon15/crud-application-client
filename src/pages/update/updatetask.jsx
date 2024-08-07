import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, put } from "../../utils/fetchApi";
import { Button, Input, Spinner, Switch, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../../utils/ToastMessage";
import HeaderText from "../../components/headerText";
import GoBackButton from "../../components/GoBackButton";
import LoadingSpinner from "../../components/loadingSpinner";

const Updatetask = () => {
    const [isDataLoading, setDataIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [data, setData] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm();

    useEffect(() => {
        const fetchTask = async () => {
            setDataIsLoading(true);
            try {
                const response = await get(`/task/${id}`);
                setData(response.data.payload?.data);
                setIsDone(response.data.payload?.data.is_done);
            } catch (error) {
                console.error('Error fetching task:', error);
                showErrorToast(error.response?.data?.message);
                navigate("/");
            } finally {
                setDataIsLoading(false);
            }
        };
        fetchTask();
    }, [id, navigate]);


    useEffect(() => {
        if (Object.keys(data).length > 0) {
            reset({
                task_name: data.task_name,
                description: data.description,
            });
        }
    }, [data, reset]);

    const handleForm = async (data) => {
        const formData = {
            task_name: data.task_name,
            description: data.description,
            is_done: isDone,
        };

        try {
            setIsLoading(true);
            const response = await put(`/task/${id}`, formData);
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
            <HeaderText className="py-5">Update Task</HeaderText>
            <GoBackButton />
            {
                isDataLoading ? (<LoadingSpinner />) :
                    (
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
                                        defaultValue={data.task_name}
                                        {...register("task_name", {
                                            required: "Title Required *",
                                        })}
                                        error={!!errors.task_name}
                                        className="text-color-primary"
                                    />
                                    {errors.task_name && <p className="text-red-500 text-sm ">{errors.task_name.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1 w-full  ">
                                    <p className="font-bold text-color-primary  py-2">
                                        Description <span className="text-red-500">*</span>
                                    </p>
                                    <Textarea
                                        color="teal"
                                        label="Description"
                                        defaultValue={data.description}
                                        {...register("description", {
                                            required: "Description Required *",
                                        })}
                                        error={!!errors.description}
                                        className="text-color-primary"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm ">{errors.description.message}</p>}
                                </div>
                                <div className="">
                                    <p className="font-bold text-color-primary  py-2">
                                        Is Complete
                                    </p>
                                    <div className="flex gap-2">
                                        <Switch
                                            color="blue"
                                            defaultChecked={data.is_done}
                                            // checked={isDone}
                                            onChange={(e) => setIsDone(e.target.checked)}
                                        />
                                        <p className="text-md px-3">{isDone ? "Completed" : "Incomplete"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex justify-center items-center my-10 ">
                                <Button type="submit" disabled={isLoading} className="px-16 capitalize bg-color-button text-md">
                                    {isLoading ? <Spinner color="blue" className="mx-auto te" /> : "Submit"}
                                </Button>
                            </div>
                        </form>
                    )
            }
        </div>
    )
}

export default Updatetask