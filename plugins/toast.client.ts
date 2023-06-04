import { Toast as BToast } from "bootstrap";

export default defineNuxtPlugin(() => {
  const Container = getOrCreateContainer();

  function getOrCreateContainer() {
    let container = document.querySelector<HTMLDivElement>("body .toast-container");

    if (!container) {
      container = document.createElement("div");
      container.setAttribute("class", "toast-container position-fixed p-3");
      document.body.append(container);
    }

    return container;
  }

  function createToast(title: string, description: string, type: ToastType = "info") {
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

  function showToast(title: string, description: string, type: ToastType = "info") {
    const toast = createToast(title, description, type);
    Container.appendChild(toast);

    toast.addEventListener("hidden.bs.toast", () => toast.remove());
    const T = new BToast(toast);
    T.show();
  }

  const showSuccess = (description: string, title = "Success") => showToast(title, description, "success");
  const showInfo = (description: string, title = "Info") => showToast(title, description, "info");
  const showWarning = (description: string, title = "Warning") => showToast(title, description, "warning");
  const showError = (description: string, title = "Error") => showToast(title, description, "danger");

  function handleError(error: unknown) {
    console.error(error);
    if (error instanceof Error) { showError(error.message, error.name); }
    else { showError(`${error}`); }
  }

  function toast() {
    return {
      showToast,
      showSuccess,
      showInfo,
      showWarning,
      showError,
      handleError
    };
  }

  return {
    provide: {
      toast
    }
  };
});
