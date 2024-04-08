// window.onload = function() {
//   // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
//   if(typeof window.sessionStorage !== "undefined" && !sessionStorage.getItem('visited')) {
//        sessionStorage.setItem('visited', true);
//   }
// }

const nBookmarked = mainElement.querySelectorAll("[data-js=card]");
console.log("N bookmarked = " + JSON.stringify(nBookmarked));

if (nBookmarked < 1) {
  mainElement.innerHTML =
    '<section class="card bookmarked" data-js="card"><p class="question__text">Nothing bookmarked yet!</p><p class="solution" data-js = "solution">flex-direction</p></section>';
}
