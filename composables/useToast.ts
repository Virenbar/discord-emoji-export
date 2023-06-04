export default function () {
  function showToast(title: string, description: string, type: ToastType = "info") {
    if (process.server) { return; }
    useNuxtApp().$toast().showToast(title, description, type);
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

  return {
    showToast,
    showSuccess,
    showInfo,
    showWarning,
    showError,
    handleError
  };
}
