import { Spinner } from "@material-tailwind/react"

const LoadingSpinner = () => {
    return (
        <div className=" mx-auto h-80">
            <Spinner color="blue" className="mx-auto w-10 h-10" />
        </div>
    )
}

export default LoadingSpinner