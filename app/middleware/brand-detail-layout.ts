export default defineNuxtRouteMiddleware((to) => {
  setPageLayout("default", {
    wrapperTag: "div",
  });
});
