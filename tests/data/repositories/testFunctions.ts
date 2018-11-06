export class TestFunctions{
    addTwoNumbers(x, y) {
        return new Promise((resolve, reject) => {
            if (x < 0) {
                reject('x should be greater then 0');
            } else {
                resolve(x + y);
            }
        })
    }
}