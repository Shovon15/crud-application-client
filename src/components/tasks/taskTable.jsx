import { useQuery } from "@tanstack/react-query";
import { del, get, put } from "../../utils/fetchApi";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";
import ConfirmationModal from "../modal/ConfirmationModal";
import { useState } from "react";
import LoadingSpinner from "../loadingSpinner";
import { showErrorToast, showSuccessToast } from "../../utils/ToastMessage";

const TaskTable = () => {

    // ----------Delete Modal------------
    const [loadingStates, setLoadingStates] = useState({});
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingTaskData, setDeletingTaskData] = useState(null);

    const {
        data: taskData = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["taskData"],
        queryFn: async () => {
            const res = await get(`/task`);
            return res.data.payload?.data;
        },
    });

    // const handlePageChange = async () => {
    //     const newPage = 2;
    //     await refetch({ page: newPage });
    // };

    // delete task--------------------
    const handleCloseDeleteModal = () => {
        setDeletingTaskData(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteTask = async ({ id, title }) => {
        try {
            const response = await del(`task/${id}`);
            refetch();
            showSuccessToast(response.data?.message);
        } catch (error) {
            console.error("Error deleting task:", error);
            showErrorToast(`Error deleting task with Title: ${title}`);
        } finally {
            handleCloseDeleteModal();
        }
    };
    // handle iscomplete----------------------
    const handleIsDone = async ({ id, is_done }) => {
        setLoadingStates(prev => ({ ...prev, [id]: true }));

        const newIsDone = !is_done;
        const formData = {
            is_done: newIsDone,
        };

        try {
            const response = await put(`/task/${id}`, formData);
            refetch();
            showSuccessToast(response.data?.message);
        } catch (error) {
            showErrorToast(error.response?.data?.message);
        } finally {
            setLoadingStates(prev => ({ ...prev, [id]: false }));
        }
    };



    const TABLE_HEAD = ["No.", "Title", "description", "Status", "Action"];

    if (isLoading) {
        return <div className="h-44 py-20">
            <LoadingSpinner />
        </div>;
    }

    return (
        <div className="min-h-screen">
            {taskData.length === 0 ? (
                <div className="text-center flex flex-col justify-center items-center py-8 px-5 lg:px-0 min-h-80">
                    <p className="text-lg text-color-primary py-3">
                        Please create task to get started!
                    </p>
                    <Link to='/create' >
                        <Button className="bg-color-button capitalize text-md flex justify-center items-center gap-2 px-3">
                            <LuPlus className="w-5 h-5" />
                            create Task</Button>
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="flex justify-end py-5 px-2">
                        <Link to='/create' >
                            <Button className="bg-color-button capitalize text-md flex justify-center items-center gap-2 px-3">
                                <LuPlus className="w-5 h-5" />
                                create Task</Button>
                        </Link>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="uppercase">
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b  border-color-border bg-color-secondary p-4">
                                            <p
                                                className="font-bold text-color-secondary text-center"
                                            >
                                                {head}
                                            </p>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-color-primary">
                                {!isLoading &&
                                    taskData.length !== 0 &&
                                    taskData.map(({ id, task_name, description, is_done }, index) => (
                                        <tr key={id} className="even:bg-gray-300 text-center">
                                            <td className="p-2">
                                                <p className="font-bold">{String(index + 1) + "."}</p>
                                            </td>
                                            <td className="p-2 max-w-[200px]">
                                                <p className="font-bold">{task_name}</p>
                                            </td>
                                            <td className="p-2 max-w-[400px]">
                                                <p className="font-bold">{description}</p>
                                            </td>
                                            <td className="p-2">
                                                <div className="flex gap-3 justify-center items-center">
                                                    <Button
                                                        onClick={() => handleIsDone({ id, is_done })}
                                                        className={`capitalize text-sm min-w-24  flex justify-center text-white py-1 px-2 ${is_done ? "bg-green-500" : "bg-red-300"}`}
                                                        disabled={loadingStates[id] || false}
                                                    >
                                                        {loadingStates[id] ? (<Spinner className="w-4 h-4" />) : (is_done ? "Completed" : "Incomplete")}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="flex gap-3 justify-center items-center">
                                                    <Link to={`/update/${id}`}>
                                                        <Button
                                                            variant="outlined"
                                                            size="sm"
                                                            className="focus:ring-0 border-none rounded-full p-3"
                                                        >
                                                            <BiSolidEdit className="w-5 h-5 text-color-primary dark:text-white" />
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        variant="text"
                                                        className="focus:ring-0  border-none rounded-full p-3"
                                                        onClick={() => {
                                                            setDeleteModalOpen(true);
                                                            setDeletingTaskData({ id, title: task_name });
                                                        }}
                                                    >
                                                        <FaTrashAlt className="w-5 h-5 text-red-500" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    {/* <Pagination
                        paginationData={pageData}
                        handlePageChange={handlePageChange}
                    /> */}

                    <ConfirmationModal
                        message={`Warning: Deleting this task is permanent and cannot be undone.`}
                        isOpen={isDeleteModalOpen}
                        onClose={handleCloseDeleteModal}
                        content={deletingTaskData}
                        successAction={handleDeleteTask}
                        setDeleteModalOpen={setDeleteModalOpen}
                    />
                </div>
            )}
        </div>
    )
}

export default TaskTable