export default function () {
  function showToast(title: string, description: string, type: ToastType = 'info') {
    if (import.meta.server) return;
    useNuxtApp().$toast().showToast(title, description, type);
  }

  const showSuccess = (description: string, title = 'Success') => showToast(title, description, 'success');
  const showInfo = (description: string, title = 'Info') => showToast(title, description, 'info');
  const showWarning = (description: string, title = 'Warning') => showToast(title, description, 'warning');

  function showError(error: unknown, title = 'Error') {
    let description;
    if (typeof error == 'string') {
      description = error;
    }
    else if (error instanceof Error) {
      title = error.name ?? title;
      description = error.message;
    }
    else {
      description = `${error}`;
    }
    showToast(title, description, 'danger');
  }

  return {
    showToast,
    showSuccess,
    showInfo,
    showWarning,
    showError,
  };
}
