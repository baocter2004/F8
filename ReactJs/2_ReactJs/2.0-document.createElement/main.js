// document.CreateElement
const divLearn = document.getElementById("learn");

const h1 = document.createElement("h1");
h1.innerText = "Hello World From Main.js";
divLearn.appendChild(h1);

const div = document.createElement("div");
div.className = "post-item";

const h2 = document.createElement("h2");
h2.innerText = "Học ReactJS";

const p = document.createElement("p");
p.innerText = "React rất thú vị";

const button = document.createElement("button");
button.innerText = "Xem thêm";
button.onclick = function () {
    alert("this");
};

div.append(h2, p, button);

divLearn.appendChild(div);

// ============================= Homework =============================
const homeworkDiv = document.getElementById("homework");
/**
 * Bài 1
 * Tạo một thẻ h1 có nội dung: Học Javascript
 */

const homeH1 = document.createElement("h1");
homeH1.innerText = "Học Javascript";

/**
 * Bài 2
 * Tạo một đoạn văn p có nội dung: React là thư viện UI
 */
const homeP = document.createElement("p");
homeP.innerText = "React là thư viện UI";

homeworkDiv.append(homeH1, homeP);

/**
 * Bài 3
 * Tạo một khối div có class là card, bên trong có:
 * <h2>Tiêu đề bài viết</h2>
 * <p>Nội dung bài viết</p>
 */
const homeCard = document.createElement("div");
homeCard.className = "card";
const homeCardH2 = document.createElement("h2");
homeCardH2.innerText = "Tiêu đề bài viết";
const homeCardP = document.createElement("p");
homeCardP.innerText = "Nội dung bài viết";

homeCard.append(homeCardH2, homeCardP);
homeworkDiv.appendChild(homeCard);

/**
 * Bài 4
 * Tạo một danh sách:
 * <ul>
 *  <li>HTML</li>
 *  <li>CSS</li>
 *  <li>JavaScript</li>
 * </ul>
 */
const homeUl = document.createElement("ul");
const homeLi1 = document.createElement("li");
const homeLi2 = document.createElement("li");
const homeLi3 = document.createElement("li");

homeLi1.innerText = "HTML";
homeLi2.innerText = "CSS";
homeLi3.innerText = "Javascript";

homeUl.append(homeLi1, homeLi2, homeLi3);
homeworkDiv.appendChild(homeUl);
