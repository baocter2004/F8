// destructuring

// array
// rest

// const array = ["javascript", "php", "ruby"];
// var [a, ...rest] = array;

// console.log(a);
// console.log(rest);

// object

const course = {
    name: "Javascript",
    price: 1000,
    image: "image-address",
};

var { name, description = "Default description" } = course;
console.log(name);
console.log(description);

// Rest params
function logger(...params) {
    return params;
};

console.log(logger(1,2,3,4,5,6,7,8));