//ASYNC OPERATIONS

//callbacks: is another method that excecutes after a method has completed.
//promises: holds the eventual result of an asyncronous operation. can be RESOLVED/FUFILLED, ERROR/REJECTED or PENDING
//async/await


//1. REPLACING CALLBACKS WITH PROMISES xxxxx USING CALLBACKS -----------------------------------------------


function displayRepos (repos: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(console.log(repos));
    }, 2000);

    
  });
 }

function  getUser(id:number) {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
   console.log('I am an async function');
   //after result is ready 
   resolve ({id: id, username: 'classyk'})
  }, 2000);
  });
  
  
}

function getRepositories (username: any){
  return new Promise((resolve, reject) => {
  setTimeout(() => {
   console.log('I am another async function');
   resolve(['repo1', 'repo2', 'repo3']);
      
   }, 2000);
  })
 
}

//CONSUME THE PROMISE
getUser(1).then(user => getRepositories(user)).then(repos => displayRepos(repos)).catch(err => console.log('Error', err));


export default  {displayRepos, getUser, getRepositories}


//2. PROMISES -------------------------------------

//create the promse
// const p = new Promise((resolve,reject) => {
//   //kick off some async work
//    setTimeout(() => {
//     //   resolve(1); //successful  
//   reject(new Error('error keys')); //failed
//    }, 3000);

// }).then(result => console.log('result is: ', result)).catch(err => console.log('error is: ' , err.message));

//consume the promise
