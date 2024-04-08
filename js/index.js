const bodyElement = document.querySelector("[data-js=body]");
const mainElement = document.querySelector("[data-js=main]");

window.onload = function () {
  // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
  if (
    typeof window.sessionStorage !== "undefined" &&
    !sessionStorage.getItem("visited")
  ) {
    sessionStorage.setItem("visited", true);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const cardsIndexIn = JSON.parse(sessionStorage.getItem("cardsOutHTML"));

  if (cardsIndexIn !== null) {
    mainElement.innerHTML = "";
    mainElement.innerHTML += cardsIndexIn;
  }

  console.log(window.location.pathname);

});

window.onbeforeunload = () => {
  const cardsIndexOut = mainElement.querySelectorAll(
    ".card:not(.default)"
  );

  let cardsIndexOutHTML = "";

  for (i = 0; i < cardsIndexOut.length; i++) {
    cardsIndexOutHTML += cardsIndexOut[i].outerHTML;
  }

  sessionStorage.removeItem("cardsOutHTML");
  sessionStorage.setItem("cardsOutHTML", JSON.stringify(cardsIndexOutHTML));
};

mainElement.addEventListener("click", (event) => {
  const eventTargetAttr = event.target.getAttribute("data-js");
  if (eventTargetAttr == "toggle_answer_button") {
    const targetAnswer = event.target.parentNode.querySelector(
      "[data-js = solution]"
    );
    targetAnswer.classList.toggle("visible");

    if (targetAnswer.classList.contains("visible")) {
      event.target.textContent = "Hide Answer";
    } else {
      event.target.textContent = "Show Answer";
    }
  } else if (eventTargetAttr == "bookmark_path") {
    const targetCard = event.target.closest("[data-js = card]");

    targetCard.classList.toggle("bookmarked");
  }
});
