export default function (path?: string) {
  return path?.startsWith('/') ? `${useRuntimeConfig().app.baseURL}${path.slice(1)}` : path;
}
