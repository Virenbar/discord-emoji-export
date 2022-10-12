import { Toast } from "bootstrap";
import { getElementById, querySelector } from "./document";

const Info: TToast = {
    toast: getElementById("toastInfo"),
    header: querySelector("#toastInfo .toast-header strong"),
    body: querySelector("#toastInfo .toast-body")
};

const Error: TToast = {
    toast: getElementById("toastError"),
    header: querySelector("#toastError .toast-header strong"),
    body: querySelector("#toastError .toast-body")
};

function showError(message: string, header = "Error") {
    Error.header.innerHTML = header;
    Error.body.innerHTML = message;
    const toast = new Toast(Error.toast);
    toast.show();
}
function showInfo(message: string, header = "Info") {
    Info.header.innerHTML = header;
    Info.body.innerHTML = message;
    const toast = new Toast(Info.toast);
    toast.show();
}

export default {
    showInfo,
    showError
};

interface TToast {
    toast: HTMLElement
    header: HTMLElement
    body: HTMLElement
}
