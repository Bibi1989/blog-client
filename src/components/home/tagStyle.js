export const postStyle = {
  padding: "0em 0.5em 0.2em 0.5em",
  background: "orange",
  color: "white",
  borderRadius: "0.2em",
};
export const devStyle = {
  padding: "0em 0.5em 0.2em 0.5em",
  background: "lime",
  color: "white",
  borderRadius: "0.2em",
};
export const articleStyle = {
  padding: "0em 0.5em 0.2em 0.5em",
  background: "teal",
  color: "white",
  borderRadius: "0.2em",
};
export const questionStyle = {
  padding: "0em 0.5em 0.2em 0.5em",
  background: "orangered",
  color: "white",
  borderRadius: "0.2em",
};

export const styleFunc = (text) => {
  if (text === "Post") {
    return postStyle;
  } else if (text === "Dev") {
    return devStyle;
  } else if (text === "Article") {
    return articleStyle;
  } else {
    return questionStyle;
  }
};
