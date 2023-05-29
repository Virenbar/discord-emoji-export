import Toast from "./toast";

export function getElementById<T extends HTMLElement>(id: string) {
    return document.getElementById(id) as T;
}

export function querySelector<T extends HTMLElement>(selector: string) {
    return document.querySelector(selector) as T;
}

export function HandleError(error: unknown) {
    console.error(error);
    if (error instanceof Error) {
        Toast.showError(error.message, error.name);
    } else {
        Toast.showError(`${error}`);
    }
}
