// import index from "./index";

// async function runMethods() {
//   try {
//     const user = await index.getUser(1);
//     const repositories = await index.getRepositories(user);
//     await index.displayRepos(repositories);
//   } catch (err) {
//     console.log("somthing went wrong..");
//   }
// }

// runMethods();

import exercise from "./exercise";

async function runMethods() {
  try {
    const customer = await exercise.getCustomer(1);

    if (customer.isGold) {
      const movies = await exercise.getTopMovies();
      console.log("Top movies: ", movies);

      await exercise.sendEmail(customer.email, movies);
    }
  } catch (err) {
    console.log("somthing went wrong..");
  }
}

runMethods();

export class Customer {
  id!: number;
  isGold!: boolean;
  email!: string;
}
