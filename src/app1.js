import "./app1.css";
import $ from "jQuery";

//数据相关都放到 m
//视图相关都放到 v
//其他都放到 c

//初始化html
const html = `
  <section id="app1">
  <div class="output">
    <span id="number">100</span>
  </div>
  <div class="actions">
    <button id="add1">+1</button>
    <button id="minus1">-1</button>
    <button id="mul2">×2</button>
    <button id="divide2">÷2</button>
  </div>
  </section>
`;
const $element = $(html).prependTo($("body > .page"));

//寻找重要元素
const $number = $("#number");
const $button1 = $("#add1");
const $button2 = $("#minus1");
const $button3 = $("#mul2");
const $button4 = $("#divide2");
//初始化数据
const n = localStorage.getItem("n");

//将数据渲染到页面
$number.text(n || 100);

//绑定鼠标事件
$button1.on("click", () => {
  let n = parseInt($number.text());
  n += 1;
  localStorage.setItem("n", n);
  $number.text(n);
});
$button2.on("click", () => {
  let n = parseInt($number.text());
  n -= 1;
  localStorage.setItem("n", n);
  $number.text(n);
});
$button3.on("click", () => {
  let n = parseInt($number.text());
  n *= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
$button4.on("click", () => {
  let n = parseInt($number.text());
  n /= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
