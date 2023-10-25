import Swal from "sweetalert2";

export const errorMessage = (message) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
}

export const successMessage = (message, title) => {
    title = title ? title : "Success";
    Swal.fire({
        icon: "success",
        title: title,
        text: message,
    });
}