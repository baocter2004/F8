// Spread operator in function parameters ( rest parameters )
function logger({ name, age, ...rest }) {
    console.log(name, age, rest);
}

logger({
    name: "John",
    age: 30,
    department: "IT",
    description: "Software Engineer",
});

// Spread operator in array literals
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // Output: [1, 2, 3, 4, 5, 6]

// Spread operator in object literals
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // Output: { a: 1, b: 2, c: 3, d: 4 }

var defaultConfig = {
    api: "https://api.example.com",
    apiVersion: "v1",
    //
    //
    //
};

var exerciseConfig = {
    ...defaultConfig,
    api: "https://api.exercise.com",
    timeout: 5000,
};

console.log(exerciseConfig);

var array = ['javascript', 'python', 'ruby'];

// Rest parameters
function logLanguages(...languages) {
    for (let i = 0; i < languages.length; i++) {
        console.log(languages[i]);
    }
}

// Spread operator
logLanguages(...array); // Output: javascript python ruby