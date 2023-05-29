import { Toast as BToast } from "bootstrap";

const Container = getOrCreateContainer();

function showToast(title: string, description: string, type: ToastType = "info") {
    const toast = createToast(title, description, type);
    Container.appendChild(toast);

    toast.addEventListener("hidden.bs.toast", () => toast.remove());
    const T = new BToast(toast);
    T.show();
}

function getOrCreateContainer() {
    let container = document.querySelector<HTMLDivElement>("body .toast-container");

    if (!container) {
        container = document.createElement("div");
        container.setAttribute("class", "toast-container position-fixed p-3");
        document.body.append(container);
    }

    return container;
}
export function createToast(title: string, description: string, type: ToastType = "info") {
    const toast = document.createElement("div");
    toast.setAttribute("class", `toast text-bg-${type}`);
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");

    // Header
    const header = document.createElement("div");
    header.setAttribute("class", "toast-header");

    const strong = document.createElement("strong");
    strong.setAttribute("class", "me-auto");
    strong.textContent = title;

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn-close");
    button.setAttribute("data-bs-dismiss", "toast");
    button.setAttribute("data-label", "Close");

    header.append(strong);
    header.append(button);

    // Body
    const body = document.createElement("div");
    body.setAttribute("class", "toast-body");
    body.textContent = description;

    toast.append(header);
    toast.append(body);

    return toast;
}

const Toast = {
    showSuccess: (description: string, title = "Success") => showToast(title, description, "success"),
    showInfo: (description: string, title = "Info") => showToast(title, description, "info"),
    showWarning: (description: string, title = "Warning") => showToast(title, description, "warning"),
    showError: (description: string, title = "Error") => showToast(title, description, "danger")
};
export default Toast;

type ToastType = keyof typeof ToastTypes

enum ToastTypes {
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger"
}
