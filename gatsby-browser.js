exports.onRouteUpdate = ({ location, action }) => {
  window.localStorage.setItem('routeAction', action)
}
