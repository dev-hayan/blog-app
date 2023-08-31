import { toast } from "react-toastify";

const toastError = message => toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
})

export default toastError