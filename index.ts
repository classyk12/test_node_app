//ASYNC OPERATIONS

//callbacks: is another method that excecutes after a method has completed.
//promises
//async/await


//1.  USING CALLBACKS -----------------------------------------------
console.log('Before');
getUser(3,  getRepos);

console.log('After'); 

function displayRepos (repos: []) {
    console.log(repos);
 }

 function getRepos(user: any){
   getRepositories(user.username, displayRepos);
 }



function  getUser(id:number, callback: Function) {
  setTimeout(() => {
   console.log('I am an async function');
   //after result is ready 
   callback ({id: id, username: 'classyk'})
  }, 2000);
}

function  getRepositories (username: string, callback: Function){
   setTimeout(() => {
   console.log('I am another async function');

   callback( ['repo1', 'repo2', 'repo3']);
      
   }, 2000);
}
