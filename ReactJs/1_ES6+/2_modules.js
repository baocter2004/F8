// Modules : Import and Export
// import module : import ... from file';
// import { logger2 } from './logger/index.js';
// // import { TYPE_LOG, TYPE_WARN, TYPE_ERROR } from './constants.js';
// import * as constants from './constants.js';

// logger2('Hello World', constants.TYPE_ERROR);



// ============================ Home Work ============================
// Bài 1: Cú pháp Module cơ bản (Named Export)
// Bạn đang làm việc với hai file: mathUtils.js và index.js.
// Trong file mathUtils.js, hãy tạo một Arrow Function nhận vào hai tham số a và b, 
// trả về tổng của chúng. Hãy export hàm này ra dưới dạng Named Export.
// Trong file index.js, hãy viết cú pháp import hàm đó vào và gọi thử.

// Bài Làm : 
import { mathUtils } from './homework/index.js';

console.log(mathUtils(2, 3)); // Output: 5

// Bài 2: Làm việc với Default Export
// Bạn có file greeting.js.
// Hãy tạo một Arrow Function nhận vào một tham số message và in nó ra console.
// Hãy export hàm này dưới dạng Default Export.
// Sau đó, viết cú pháp để import nó vào file 2_modules.js (gợi ý: với default export, bạn có thể đặt tên bất kỳ khi import).

// Bài Làm :

import greeting from './homework/greeting.js';

greeting('Hello, World!'); // Output: Hello, World!