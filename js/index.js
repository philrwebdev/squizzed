const bodyElement = document.querySelector("[data-js=body]");
const mainElement = document.querySelector("[data-js=main]");

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
  }
});
