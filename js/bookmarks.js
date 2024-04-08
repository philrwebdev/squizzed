const preCardsElement = document.querySelector("[data-js=pre_cards]");

// window.onload = function() {
//   // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
//   if(typeof window.sessionStorage !== "undefined" && !sessionStorage.getItem('visited')) {
//        sessionStorage.setItem('visited', true);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  const nBookmarked = cardsElement.querySelectorAll(".bookmarked").length;
  if (nBookmarked < 1) {
    preCardsElement.innerHTML =
      '<section class="card bookmarked default" data-js="card default"><p class="question__text">Nothing currently bookmarked!</p></section>';
  }
});

function callback(mutations) {
  for (let mutation of mutations) {
    if (mutation.attributeName == "class") {
      const nBookmarked = cardsElement.querySelectorAll(".bookmarked").length;
      if (nBookmarked < 1) {
        preCardsElement.innerHTML =
          '<section class="card bookmarked default" data-js="card default"><p class="question__text">Nothing currently bookmarked!</p></section>';
      }
    }
  }
}

const observer = new MutationObserver(callback);

observer.observe(cardsElement, {
  subtree: true,
  attributes: true,
});
