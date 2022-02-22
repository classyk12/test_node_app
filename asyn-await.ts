import index from "./index";

async function runMethods() {
  try {
    const user = await index.getUser(1);
    const repositories = await index.getRepositories(user);
    await index.displayRepos(repositories);
  } catch (err) {
    console.log("somthing went wrong..");
  }
}

runMethods();
