import Swal from "sweetalert2";

/**
 * Display an error message using Swal (SweetAlert2).
 * 
 * @param {string} message - The error message to display.
 */
export const errorMessage = (message) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
    });
}

/**
 * Display a success message using Swal (SweetAlert2).
 * 
 * @param {string} message - The success message to display.
 * @param {string} title - (Optional) The title of the success message (default: "Success").
 */
export const successMessage = (message, title) => {
    title = title ? title : "Success";
    Swal.fire({
        icon: "success",
        title: title,
        text: message,
    });
}