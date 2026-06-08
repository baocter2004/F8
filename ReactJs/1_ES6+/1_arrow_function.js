// // function expression
// // const logger = function(log) {
// //     console.log(log);
// // };

// // arrow function is a shorter syntax for function expression
// // arrow function là một cú pháp ngắn gọn hơn cho function expression
// const logger = (log) => {
//     console.log(log);
// };
// logger("Hello world");

// // arrow function with implicit return
// // arrow function với giá trị trả về ngầm định
// const sum = (a, b) => a + b;
// console.log(sum(1, 2));

// // if you want to return an object, you need to wrap it in parentheses
// // nếu bạn muốn trả về một object, bạn cần bọc nó trong dấu ngoặc
// const returnObject = (a, b) => ({ a, b });

// const course = {
//     name: "John",
//     // Regular function có this riêng.
//     // Giá trị của this phụ thuộc vào cách hàm được gọi.

//     // Arrow function không có this riêng.
//     // Nó lấy (lexically inherits) this từ scope bên ngoài nơi nó được khai báo.
//     getName: function () {
//         return this; // context of this is the course object // ngữ cảnh của this là đối tượng course
//     },
//     getNameArrow: () => {
//         return this;
//     },
// };

// console.log(course.getName()); // { name: 'John', getName: [Function: getName] }
// console.log(course.getNameArrow()); 
// // window object (in browser) or global object (in Node.js)
// // đối tượng window (trong trình duyệt) hoặc đối tượng global (trong Node.js)
// // arrow function does not have its own this, it inherits this from the parent scope
// // arrow function không có this riêng, nó kế thừa this từ phạm vi cha

// // dont use arrow funtions as object constructors
// const Person = (name) => {
//     this.name = name; // this will not work as expected
// };

// const person = new Person("John"); // TypeError: Person is not a constructor



// ============================ Home Work ============================

// Phần Đề Bài
// Bài 1: "Ép cân" cho hàm truyền thống
// Cho hàm JavaScript dưới đây. Hãy viết lại nó bằng Arrow Function 
// kết hợp với Template Literals (chuỗi dùng dấu backtick `) sao cho code ngắn gọn nhất có thể.

// function getGreeting(name) {
//     return "Xin chào, " + name + "!";
// }

// Bài Làm :

const getGreeting = name => `xin chào, ${name}!`;

console.log(getGreeting("John")); // Output: "Xin chào, John!"


// Bài 2: Arrow Function kết hợp Array Methods
// Cho một mảng các số nguyên:

// JavaScript
// const numbers = [1, 2, 3, 4, 5, 6];
// Hãy sử dụng phương thức .filter() kết hợp với Arrow Function để tạo ra một mảng mới tên là evenNumbers, 
// mảng này chỉ chứa các số chẵn từ mảng ban đầu.

const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers); // Output: [2, 4, 6]