import MainRoutes from './routes/MainRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className='bg-gray-200 min-h-screen'>
      <div className='mx-auto max-w-[1560px] '>
        <MainRoutes />
        <ToastContainer />
      </div>
    </div>
  )
}

export default App
