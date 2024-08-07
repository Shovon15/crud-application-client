import TaskTable from "../components/tasks/taskTable"
import HeaderText from "../components/headerText"

const HomePage = () => {
    return (
        <div className="p-5 md:p-10">
            <HeaderText>Welcome to daily task manager</HeaderText>
            <TaskTable />
        </div>
    )
}

export default HomePage