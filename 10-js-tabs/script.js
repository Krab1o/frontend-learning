"use strict";

const rowElements = document.getElementsByClassName("row__tab");
let currentActive = rowElements[0];
let toChange = document.getElementsByClassName("content__changed")[0];
[...rowElements].map(el => {
  el.addEventListener("click", () => {
    toChange.textContent = "Content " + el.textContent;
    currentActive.className = "row__tab";
    el.className  = "row__tab row__tab--active"
    currentActive = el;
  })
})

currentActive.click();
