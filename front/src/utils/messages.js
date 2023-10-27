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

/**
 * confirmMessage is a function that displays a confirmation dialog using Swal (SweetAlert).
 * This dialog prompts the user to confirm an action, such as deleting an item.
 * It returns a promise that resolves with the user's choice.
 *
 * @returns {Promise} A promise that resolves with the user's choice in the confirmation dialog.
 */
export const confirmMessage = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Yes, delete it!'
    })
}