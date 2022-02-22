// getCustomer(1, (customer) => {
//   console.log("Customer: ", customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log("Top movies: ", movies);
//       sendEmail(customer.email, movies, () => {
//         console.log("Email sent...");
//       });
//     });
//   }
// });

import { Customer } from "./asyn-await";

function getCustomer(id: number): Promise<Customer> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customer = new Customer();
      customer.email = "Mosh Hamedani";
      (customer.isGold = true), (customer.email = "email");

      resolve(customer);
    }, 4000);
  });
}

function getTopMovies(): Promise<String[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email: string, movies: String[]) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("somthing went wrong....."));
      // console.log("email sent..");
    }, 4000);
  });
}

export default { getTopMovies, getCustomer, sendEmail };
