export const publics = history => {
  if (sessionStorage.getItem("blog")) {
    history.push("/");
  }
};

export const privates = history => {
  if (!sessionStorage.getItem("blog")) {
    history.push("/login");
  }
};
