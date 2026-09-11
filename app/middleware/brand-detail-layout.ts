export default defineNuxtRouteMiddleware((_to) => {
  setPageLayout("default", {
    wrapperTag: "div",
  })
})
