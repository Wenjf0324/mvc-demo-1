import "./app4.css";
import $ from "jQuery";

const $circle = $("#app4 .circle");

$circle
  .on("mouseenter", () => {
    $circle.addClass("active");
  })
  .on("mouseleave", () => {
    $circle.removeClass("active");
  });
