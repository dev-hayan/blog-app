import { toast } from "react-toastify";

const toastSuccess = message => toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
})

export default toastSuccess