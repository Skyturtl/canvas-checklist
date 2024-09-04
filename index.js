const ON_COLOR = "#c4ffc4";
const OFF_COLOR = "#ffc4c4";

function toggleOn(element) {
  localStorage["ccb_" + element.querySelector(".description_title").innerHTML] = "checked";
  element.style.background = ON_COLOR;
}

function toggleOff(element) {
  localStorage.removeItem("ccb_" + element.querySelector(".description_title").innerHTML);
  element.style.background = OFF_COLOR;
}

function isChecked(element) {
  return localStorage["ccb_" + element.querySelector(".description_title").innerHTML] === "checked";
}

function initIsChecked(element) {
  return typeof localStorage[
    "ccb_" + element.querySelector(".description_title").innerHTML
  ] === "undefined"
    ? false
    : true;
}

function colorChangerEvent() {
  isChecked(this) ? toggleOff(this) : toggleOn(this);
}

function initCheckboxes(baseElement = document) {
  [...baseElement.querySelectorAll(".rubric_table")]
    .filter((element) => element.querySelector(".rubric_table") == null)
    .forEach((tr) => {
      tr.querySelectorAll(".criterion").forEach((div) => {
        let title = div.querySelector(".description_content");
        if (!title) {
          return "failed";
        }
        let checked =
          localStorage["ccb_" + div.querySelector(".description_title").innerHTML] ===
          "checked"
            ? "checked"
            : "";
        initIsChecked(div)
          ? (div.style.background = ON_COLOR)
          : (div.style.background = OFF_COLOR);
        div.addEventListener("click", colorChangerEvent, false);
      });
    });
}


const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        initCheckboxes(node);
      }
    });
  });
});

observer.observe(document.querySelector("#content"), {
  childList: true,
  subtree: true,
});

if (document.readyState === "complete") {
  initCheckboxes();
} else if (document.readyState === "interactive") {
  // DOM ready! Images, frames, and other subresources are still downloading.
  initCheckboxes();
} else {
  // Loading still in progress.
  // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.

  window.addEventListener("DOMContentLoaded", () => {
    // DOM ready! Images, frames, and other subresources are still downloading.
    initCheckboxes();
  });
}
