/**
 * Registering the Service Worker (SW)
 */
//Check support for the SW
if ("serviceWorker" in navigator) {
  console.log("Service worker supported");
  //registered once  the page is loaded
  //so, we add the load event Listener
  window.addEventListener("load", () => {
    //Registering the service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then(registration => {
        //Registration was succesfully
        console.log(
          `Service Worker succesfully registered, scope ${registration.scope}`
        );
      })
      .catch(error => {
        //Registration failed
        console.log(`There was an error while registering: ${error}`);
      });
  });
}
