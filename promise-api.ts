//RUNNING PROMISES SIMUTENOUSLY 
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1....');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 2....');  
       // reject(new Error('somthing went wrong..'))
       resolve(2);
    }, 2000);
});

//consume promise simuetnously - this returns the result of the 2 promises
//when running simutenous promises, if any promise from the list of promises is rejected, the whole promise will be rejected
Promise.all([p1,p2]).then(value => console.log(value)).catch(err => console.log(err.message));

//use this when you want to resolve a promise as soon as any of the promises is fufilled (usually the first one)
Promise.race([p1,p2]).then(value => console.log(value)).catch(err => console.log(err.message));

