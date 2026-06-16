# 2.1 DOM Deep Dive

## Mục tiêu
Sau bài này, bạn cần hiểu:
- DOM Tree là gì
- Node là gì
- Element Node, Text Node, Comment Node, Document Node
- `append()` và `appendChild()`
- `innerText`, `textContent`, `innerHTML`
- `createTextNode()`
- `children`, `childNodes`
- `parentNode`, `parentElement`
- `firstChild`, `firstElementChild`
- `lastChild`, `lastElementChild`
- `nodeType`
- `cloneNode()`
- `insertBefore()`, `replaceChild()`, `removeChild()`
- Vì sao React ra đời từ DOM

---

# Chương 1 : DOM Tree

## Ví dụ

HTML:

```html
<div>
    <h1>Hello</h1>
    <p>ReactJS</p>
</div>
```

Browser sẽ phân tích HTML và tạo thành một cây DOM (DOM Tree):

```text
div
│
├── h1
│   └── Hello
│
└── p
    └── ReactJS
```

Mỗi phần tử HTML trở thành một Node trong cây DOM.
DOM Tree biểu diễn mối quan hệ cha - con giữa các phần tử.

Trong ví dụ trên:

- div là cha (parent).
- h1 và p là con (children).
- `"Hello"` và `"ReactJS"` là Text Node.

## Ý nghĩa
Khi làm việc với DOM, bạn không chỉ nhìn HTML như một chuỗi ký tự nữa, mà phải nhìn nó như một **cây**. Từ đó bạn mới hiểu được:
- phần tử nào là cha
- phần tử nào là con
- phần tử nào là anh em
- phần tử nào đang được nối vào đâu

---

# Chương 2 : Node

Mọi thứ trong DOM đều là Node.

Cấu trúc tổng quát:

```text
Node
│
├── Element Node
├── Text Node
├── Comment Node
└── Document Node
```

## Element Node

Ví dụ:

```html
<h1>Hello</h1>
```

Element Node:

```text
h1
```

Các thẻ HTML đều là Element Node:

- div
- h1
- p
- ul
- li
- button

## Text Node

Ví dụ:

```html
<h1>Hello</h1>
```

Browser tạo:

```text
h1 (Element Node)
└── Hello (Text Node)
```

`"Hello"` không phải Element Node.

Nó là Text Node.

## Comment Node

Ví dụ:

```html
<!-- Đây là comment -->
```

Browser tạo:

```text
Comment Node
└── Đây là comment
```

## Document Node

Toàn bộ tài liệu HTML được đại diện bởi: `document`

Ví dụ:

```js
console.log(document);
```

Document Node là node gốc cao nhất.

Có thể hình dung:

```text
document
│
└── html
    │
    ├── head
    └── body
```

---

# Chương 3 : append vs appendChild

## appendChild()

Chỉ thêm được một Node.

Ví dụ:

```js
const div = document.createElement("div");
const h1 = document.createElement("h1");
const p = document.createElement("p");

div.appendChild(h1);
div.appendChild(p);
```

Sau khi chạy:

```text
div
│
├── h1
└── p
```

## append()

Có thể thêm nhiều Node cùng lúc.

Ví dụ:

```js
div.append(h1, p);
```

Tương đương:

```js
div.appendChild(h1);
div.appendChild(p);
```

## append() còn có thể thêm String

Ví dụ:

```js
div.append("Hello");
```

Browser sẽ tạo:

```text
div
│
└── "Hello"
```

`appendChild()` không làm được điều này.

Ví dụ:

```js
div.appendChild("Hello");
```

sẽ báo lỗi.

## So sánh

| append() | appendChild() |
|---|---|
| Thêm nhiều Node | Chỉ một Node |
| Thêm String được | Không |
| Hiện đại hơn | Cũ hơn |
| Thường dùng hiện nay | Phổ biến trước đây |

---

# Chương 4 : innerText vs textContent vs innerHTML

Đây là phần rất quan trọng.

## innerText

Ví dụ:

```js
h1.innerText = "Hello World";
```

Kết quả:

```html
<h1>Hello World</h1>
```

`innerText` chỉ làm việc với phần text hiển thị.

## textContent

Ví dụ:

```js
h1.textContent = "Hello React";
```

Kết quả:

```html
<h1>Hello React</h1>
```

`textContent` thao tác với toàn bộ nội dung text.

Nó thường nhanh hơn `innerText`.

## innerHTML

Ví dụ:

```js
h1.innerHTML = "<span>Hello</span>";
```

Kết quả:

```html
<h1>
    <span>Hello</span>
</h1>
```

`innerHTML` có thể tạo HTML mới.

## So sánh

### innerText

```js
h1.innerText = "Hello";
```

Kết quả:

```html
<h1>Hello</h1>
```

### textContent

```js
h1.textContent = "Hello";
```

Kết quả:

```html
<h1>Hello</h1>
```

### innerHTML

```js
h1.innerHTML = "<span>Hello</span>";
```

Kết quả:

```html
<h1>
    <span>Hello</span>
</h1>
```

## Ví dụ quan trọng

```js
const div = document.createElement("div");

div.innerHTML = `
    <h1>Hello</h1>
    <p>ReactJS</p>
`;
```

Browser sẽ tự tạo:

```text
div
│
├── h1
│   └── Hello
│
└── p
    └── ReactJS
```

## Lưu ý bảo mật
`innerHTML` có thể tạo HTML, nhưng nếu dữ liệu đầu vào không an toàn thì có thể gây ra lỗi bảo mật kiểu XSS. Khi dữ liệu đến từ người dùng, phải cẩn thận.

---

# Chương 5 : createTextNode()

Ngoài `innerText` và `textContent`, ta còn có thể tạo Text Node thủ công.

Ví dụ:

```js
const textNode = document.createTextNode("Hello");
```

Lúc này bạn đã tạo ra một Text Node riêng.

## Gắn vào h1

```js
const h1 = document.createElement("h1");
const textNode = document.createTextNode("Hello");

h1.appendChild(textNode);
document.body.appendChild(h1);
```

Kết quả:

```html
<h1>Hello</h1>
```

DOM Tree:

```text
body
│
└── h1
    │
    └── Hello
```

## Khi nào cần nhớ?
Khi bạn muốn hiểu thật rõ:
- thẻ HTML là gì
- text bên trong nó là gì
- DOM được cấu tạo từ đâu

---

# Chương 6 : children vs childNodes

Giả sử HTML:

```html
<div id="box">
    <h1>Hello</h1>
    <p>ReactJS</p>
</div>
```

## children

```js
const box = document.getElementById("box");
console.log(box.children);
```

`children` chỉ lấy **Element Node**.

Kết quả thường là:

```text
HTMLCollection(2)
0: h1
1: p
```

## childNodes

```js
console.log(box.childNodes);
```

`childNodes` lấy cả:
- Element Node
- Text Node
- Comment Node

Nếu trong HTML có xuống dòng và khoảng trắng, `childNodes` có thể chứa thêm Text Node.

## Khác nhau

- `children` : chỉ phần tử HTML
- `childNodes` : mọi node con

---

# Chương 7 : parentNode vs parentElement

Giả sử:

```html
<div>
    <h1>Hello</h1>
</div>
```

## parentNode

```js
const h1 = document.querySelector("h1");
console.log(h1.parentNode);
```

Kết quả là `div`.

## parentElement

```js
console.log(h1.parentElement);
```

Cũng trả về `div`.

## Khác nhau
- `parentNode` làm việc ở mức Node
- `parentElement` chỉ quan tâm Element

Trong thực tế, cả hai thường cho kết quả giống nhau khi node cha là HTML element.

---

# Chương 8 : firstChild vs firstElementChild

Giả sử:

```html
<div id="box">
    <h1>Hello</h1>
    <p>ReactJS</p>
</div>
```

## firstChild

```js
console.log(box.firstChild);
```

Có thể trả về Text Node nếu có khoảng trắng hoặc xuống dòng trước phần tử đầu tiên.

## firstElementChild

```js
console.log(box.firstElementChild);
```

Trả về phần tử đầu tiên là Element Node.

Trong ví dụ trên là:

```html
<h1>Hello</h1>
```

## Ý nghĩa
- `firstChild` : node đầu tiên, có thể là text
- `firstElementChild` : phần tử đầu tiên, chắc chắn là element

---

# Chương 9 : lastChild vs lastElementChild

## lastChild

```js
console.log(box.lastChild);
```

Có thể là Text Node nếu phía cuối có khoảng trắng hoặc xuống dòng.

## lastElementChild

```js
console.log(box.lastElementChild);
```

Trả về phần tử cuối cùng.

Ví dụ:

```html
<p>ReactJS</p>
```

---

# Chương 10 : nodeType

`nodeType` giúp nhận biết loại node.

Ví dụ:

```js
const h1 = document.createElement("h1");
console.log(h1.nodeType);
```

Kết quả:

```text
1
```

## Các giá trị hay gặp

- `1` = Element Node
- `3` = Text Node
- `8` = Comment Node
- `9` = Document Node

## Ví dụ Text Node

```js
const textNode = document.createTextNode("Hello");
console.log(textNode.nodeType);
```

Kết quả:

```text
3
```

## Ví dụ Document Node

```js
console.log(document.nodeType);
```

Kết quả:

```text
9
```

---

# Chương 11 : cloneNode()

`cloneNode()` dùng để sao chép một node.

Ví dụ:

```js
const div = document.createElement("div");
div.className = "card";

const divClone = div.cloneNode();
```

## cloneNode(false)
Chỉ sao chép chính node đó, không sao chép con.

## cloneNode(true)
Sao chép cả node và toàn bộ con bên trong.

Ví dụ:

```js
const card = document.createElement("div");
card.className = "card";

const h1 = document.createElement("h1");
h1.innerText = "Hello";

card.appendChild(h1);

const clonedCard = card.cloneNode(true);
document.body.appendChild(clonedCard);
```

Kết quả: một bản sao đầy đủ của `card`.

---

# Chương 12 : insertBefore()

Dùng để chèn một node vào trước một node khác.

Ví dụ:

```html
<ul>
    <li>HTML</li>
    <li>JavaScript</li>
</ul>
```

Muốn chèn `CSS` vào trước `JavaScript`:

```js
const ul = document.querySelector("ul");
const css = document.createElement("li");
css.innerText = "CSS";

const jsItem = ul.children[1];
ul.insertBefore(css, jsItem);
```

Kết quả:

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

---

# Chương 13 : replaceChild()

Dùng để thay thế một node bằng node khác.

Ví dụ:

```html
<div id="box">
    <h1>Hello</h1>
</div>
```

Muốn thay `h1` bằng `h2`:

```js
const box = document.getElementById("box");
const h1 = box.querySelector("h1");

const h2 = document.createElement("h2");
h2.innerText = "ReactJS";

box.replaceChild(h2, h1);
```

Kết quả:

```html
<div id="box">
    <h2>ReactJS</h2>
</div>
```

---

# Chương 14 : removeChild()

Dùng để xóa một node con khỏi node cha.

Ví dụ:

```html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

Muốn xóa `CSS`:

```js
const ul = document.querySelector("ul");
const css = ul.children[1];

ul.removeChild(css);
```

Kết quả:

```html
<ul>
    <li>HTML</li>
    <li>JavaScript</li>
</ul>
```

---

# Chương 15 : Browser Rendering Pipeline

Đây là bước cực quan trọng để hiểu vì sao DOM nhiều thì web chậm.

Quá trình hiển thị một trang thường đi qua:

```text
HTML
↓
DOM Tree
↓
CSSOM
↓
Render Tree
↓
Layout
↓
Paint
↓
Composite
↓
Màn hình
```

## Ý nghĩa

- **HTML**: mã gốc
- **DOM Tree**: cây phần tử HTML
- **CSSOM**: cây CSS
- **Render Tree**: kết hợp DOM + CSS
- **Layout**: tính toán vị trí, kích thước
- **Paint**: tô màu, vẽ
- **Composite**: ghép các lớp lại
- **Màn hình**: thứ người dùng nhìn thấy

---

# Chương 16 : Reflow và Repaint

## Reflow
Reflow xảy ra khi trình duyệt phải tính toán lại bố cục.

Ví dụ:
- thêm/xóa phần tử
- thay đổi kích thước
- thay đổi class làm ảnh hưởng layout

## Repaint
Repaint xảy ra khi chỉ cần vẽ lại giao diện, không thay đổi bố cục.

Ví dụ:
- đổi màu
- đổi background
- đổi border

## Vì sao quan trọng?
Nếu thao tác DOM quá nhiều lần liên tiếp, trình duyệt phải tính toán lại nhiều, gây chậm.

Đây là một trong những lý do React được thiết kế để tối ưu thao tác giao diện.

---

# Chương 17 : Vì sao React ra đời?

Khi làm giao diện bằng DOM thuần, ta phải viết kiểu:

```js
const div = document.createElement("div");
const h1 = document.createElement("h1");
const p = document.createElement("p");

h1.innerText = "Hello";
p.innerText = "ReactJS";

div.append(h1, p);
document.body.appendChild(div);
```

Khi giao diện lớn:
- code dài
- khó đọc
- khó bảo trì
- khó cập nhật từng phần
- dễ lỗi khi thay đổi nhiều

## React giải quyết gì?
React giúp ta:
- mô tả giao diện bằng cách dễ đọc hơn
- chia giao diện thành component
- cập nhật giao diện hiệu quả hơn
- làm việc với trạng thái và dữ liệu dễ hơn

## Tư duy kết nối
```text
DOM thuần
↓
tạo node thủ công
↓
khó quản lý

React
↓
tạo cây UI bằng component
↓
React xử lý cập nhật
```

---

# Tổng kết

```text
document
│
└── DOM Tree
    │
    ├── Element Node
    ├── Text Node
    ├── Comment Node
    └── Document Node
```

```text
append()
↓
Thêm nhiều Node hoặc String

appendChild()
↓
Chỉ thêm một Node
```

```text
innerText
↓
Text hiển thị

textContent
↓
Toàn bộ text

innerHTML
↓
HTML
```

```text
React.createElement()
↓
Virtual DOM
↓
Diffing
↓
Reconciliation
↓
Real DOM
```

# Ghi nhớ nhanh

- `createElement()` → tạo Element Node
- `createTextNode()` → tạo Text Node
- `append()` → thêm nhiều node hoặc string
- `appendChild()` → thêm một node
- `innerText` → text hiển thị
- `textContent` → toàn bộ text
- `innerHTML` → HTML bên trong
- `children` → chỉ element
- `childNodes` → mọi node con
- `nodeType` → loại node
- `cloneNode()` → sao chép node
- `insertBefore()` → chèn trước
- `replaceChild()` → thay thế
- `removeChild()` → xóa node con

---
