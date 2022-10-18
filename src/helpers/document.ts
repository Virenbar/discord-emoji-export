export function getElementById<T extends HTMLElement>(id: string) {
    return document.getElementById(id) as T;
}
export function querySelector<T extends HTMLElement>(selector: string) {
    return document.querySelector(selector) as T;
}
