const bodyElement = document.querySelector("[data-js=body]");
const mainElement = document.querySelector("[data-js=main]");
const cardsElement = document.querySelector("[data-js=cards]");

function lettersToSpans(element) {
  const split = element.innerHTML.split("");

  let letterSpans = "";

  for (i = 0; i < split.length; i++) {
    letterSpans +=
      '<span class="letterSpan" position=' + i + ">" + split[i] + "</span>";
  }

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
  const cardsIn = JSON.parse(sessionStorage.getItem("cardsOutHTML"));

  if (cardsIn !== null) {
    cardsElement.innerHTML = "";
    cardsElement.innerHTML += cardsIn;
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
  const cardsOut = cardsElement.querySelectorAll("[data-js=card]");

  let cardsOutHTML = "";

  for (i = 0; i < cardsOut.length; i++) {
    cardsOutHTML += cardsOut[i].outerHTML;
  }

  // sessionStorage.removeItem("cardsOutHTML");
  sessionStorage.setItem("cardsOutHTML", JSON.stringify(cardsOutHTML));
};

cardsElement.addEventListener("click", (event) => {
  const eventTargetAttr = event.target.getAttribute("data-js");

  if (eventTargetAttr == "toggle_answer_button") {
    const targetAnswer = event.target.parentNode.querySelector(
      "[data-js = solution]"
    );
    targetAnswer.classList.toggle("visible");

    const nLetters = targetAnswer.childElementCount;
    let targetAnswerLetters = targetAnswer.querySelectorAll(".letterSpan");
    const nRevealed =
      targetAnswer.querySelectorAll(".revealed").childElementCount;
    let containsRevealed = false;

    for (i = 0; i < nLetters; i++) {
      targetAnswerLetters[i].classList.toggle("visible");
      if (targetAnswerLetters[i].classList.contains("visible")) {
        targetAnswerLetters[i].style.transitionDelay = 50 * i + "ms";
      } else {
        if (targetAnswerLetters[i].classList.contains("revealed")) {
          targetAnswerLetters[i].classList.toggle("revealed");
          containsRevealed = true;
        }
        targetAnswerLetters[i].style.transitionDelay = -50 * i + "ms";
      }
    }

    let cardHintCloud = event.target.parentNode.querySelector(
      "[data-js = card__hint_cloud]"
    );

    if (targetAnswer.classList.contains("visible")) {
      event.target.textContent = "Hide Answer";
      cardHintCloud.style.paddingLeft = "1.3rem";
      cardHintCloud.style.paddingTop = "0.6rem";
      cardHintCloud.style.transform = "scale(0.75)";
    } else {
      event.target.textContent = "Show Answer";
      cardHintCloud.style.paddingLeft = "0";
      cardHintCloud.style.paddingTop = "0";
      cardHintCloud.style.transform = "scale(1.6)";
    }
  } else if (eventTargetAttr == "bookmark_button__svg_path") {
    const targetCard = event.target.closest("[data-js = card]");
    targetCard.classList.toggle("bookmarked");
  } else if (eventTargetAttr == "card__hint_cloud_path") {
    event.target.parentNode.parentNode.click();
  } else if (eventTargetAttr == "card__hint_cloud") {
    const targetAnswer = event.target.parentNode.querySelector(
      "[data-js = solution]"
    );

    let nLetters = targetAnswer.querySelectorAll(".letterSpan").length;
    let blurredLetters = targetAnswer.querySelectorAll(
      ".letterSpan:not(.revealed)"
    );

    blurredLetters[0].classList.add("revealed");

    let proportionRevealed = (nLetters - blurredLetters.length) / nLetters;

    event.target.classList.add("selected");

    event.target.style.paddingLeft = proportionRevealed * 1.3 + "rem";
    event.target.style.paddingTop = proportionRevealed * 0.6 + "rem";
    event.target.style.transform = `scale(${Math.max(
      0.75,
      1.5 * (1 - proportionRevealed)
    )})`;
  }
});
