const bodyElement = document.querySelector("[data-js=body]");
const mainElement = document.querySelector("[data-js=main]");
const cardsElement = document.querySelector("[data-js=cards]");

function lettersToSpans(element) {
  const split = element.innerHTML.split("");
  console.log(element);
  console.log(split);

  let letterSpans = "";
  for (i = 0; i < split.length; i++) {
    letterSpans +=
      '<span class="letterSpan" position=' + i + ">" + split[i] + "</span>";
  }

  console.log(split);

  return letterSpans;
}

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
    cardsElement.innerHTML = "";
    cardsElement.innerHTML += cardsIndexIn;
  }
});

window.onload = (event) => {
  for (let i = 0; i < cardsElement.childElementCount; i++) {
    let currentSolution = cardsElement.children[i].querySelector(
      "[data-js = solution]"
    );
    if (!currentSolution.classList.contains("spanified")) {
      let spanifiedSolution = lettersToSpans(currentSolution);
      currentSolution.innerHTML = spanifiedSolution;
      currentSolution.classList.toggle("spanified");
    }
  }
};

window.onbeforeunload = () => {
  const cardsIndexOut = cardsElement.querySelectorAll("[data-js=card]");

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

    const nLetters = targetAnswer.childElementCount;
    let targetAnswerLetters = targetAnswer.querySelectorAll(".letterSpan");

    for (i = 0; i < nLetters; i++) {
      targetAnswerLetters[i].classList.toggle("visible");
      if (targetAnswerLetters[i].classList.contains("visible")) {
      targetAnswerLetters[i].style.transitionDelay = 50 * i + "ms";
    } else {
      targetAnswerLetters[i].style.transitionDelay = -50 * i + "ms";
    }
    }

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



