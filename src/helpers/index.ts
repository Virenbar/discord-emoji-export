import Toast from "./toast";

export * from "./document";

export function HandleError(error: unknown) {
    console.error(error);
    if (error instanceof Error) {
        Toast.showError(error.message, error.name);
    } else {
        Toast.showError(`${error}`);
    }
}
