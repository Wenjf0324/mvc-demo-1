import "./app1.css";
import $ from "jQuery";

const eventBus = $(window);

//数据相关都放到 m
const m = {
  data: {
    n: parseInt(localStorage.getItem("n")),
  },
  //数据的增删改查
  create() {},
  delete() {},
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated");
    localStorage.setItem("n", m.data.n);
  },
  get() {},
};
//视图相关都放到 v
const v = {
  el: null,
  html: `
  <div>
    <div class="output">
      <span id="number">{{n}}</span>
    </div>
    <div class="actions">
      <button id="add1">+1</button>
      <button id="minus1">-1</button>
      <button id="mul2">×2</button>
      <button id="divide2">÷2</button>
    </div>
    </div>
  `,
  init(container) {
    v.el = $(container);
  },
  render(n) {
    if (v.el.children.length !== 0) v.el.empty();
    $(v.html.replace("{{n}}", n)).appendTo(v.el);
  },
};
//其他都放到 c
const c = {
  init(container) {
    v.init(container);
    v.render(m.data.n);
    c.autoBindEvents();
    eventBus.on("m:updated", () => {
      v.render(m.data.n);
    });
  },
  events: {
    "click #app1": "add",
    "click #minus1": "minus",
    "click #mul2": "mul",
    "click #divide2": "div",
  },
  add() {
    m.update({ n: m.data.n + 1 });
  },
  minus() {
    m.update({ n: m.data.n - 1 });
  },
  mul() {
    m.update({ n: m.data.n * 2 });
  },
  div() {
    m.update({ n: m.data.n / 2 });
  },
  autoBindEvents() {
    for (let key in c.events) {
      const value = c[c.events[key]];
      const spaceIndex = key.indexOf(" ");
      const part1 = key.slice(0, spaceIndex);
      const part2 = key.slice(spaceIndex + 1);
      v.el.on(part1, part2, value);
    }
  },
};
export default c;

//-------- 改写成 mvc 之前 --------
//初始化html
// const html = `
//   <section id="app1">
//   <div class="output">
//     <span id="number">100</span>
//   </div>
//   <div class="actions">
//     <button id="add1">+1</button>
//     <button id="minus1">-1</button>
//     <button id="mul2">×2</button>
//     <button id="divide2">÷2</button>
//   </div>
//   </section>
// `;
// const $element = $(html).prependTo($("body > .page"));

// 寻找重要元素
// const $number = $("#number");
// const $button1 = $("#add1");
// const $button2 = $("#minus1");
// const $button3 = $("#mul2");
// const $button4 = $("#divide2");
// 初始化数据
// const n = localStorage.getItem("n");

// 将数据渲染到页面
// $number.text(n || 100);

// 绑定鼠标事件
// $button1.on("click", () => {
//   let n = parseInt($number.text());
//   n += 1;
//   localStorage.setItem("n", n);
//   $number.text(n);
// });
// $button2.on("click", () => {
//   let n = parseInt($number.text());
//   n -= 1;
//   localStorage.setItem("n", n);
//   $number.text(n);
// });
// $button3.on("click", () => {
//   let n = parseInt($number.text());
//   n *= 2;
//   localStorage.setItem("n", n);
//   $number.text(n);
// });
// $button4.on("click", () => {
//   let n = parseInt($number.text());
//   n /= 2;
//   localStorage.setItem("n", n);
//   $number.text(n);
// });
