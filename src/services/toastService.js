import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const notify = (type, content, position) => {
    switch(type) {
      case 'error':
        toast.error(content, {position: position})
        break;
      case 'success':
        toast.success(content, {position: position})
        break;
    }
  }