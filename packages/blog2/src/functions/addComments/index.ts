import { COMMENTS_ID } from "../../constants/COMMENTS_ID";
import { getInitialDarkMode } from "../../hooks/useDarkMode";

const addComments = () => {
  const commentsContainer = document.getElementById(COMMENTS_ID);
  const darkModeEnabled = getInitialDarkMode();

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "Beraliv/beraliv.dev");
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("id", "utterances");
  script.setAttribute(
    "theme",
    darkModeEnabled ? "github-dark" : "github-light"
  );
  script.setAttribute("crossorigin", "anonymous");

  // To prevent 2 blocks of comments which may be caused by React multiple calls on load
  if (commentsContainer && !commentsContainer.firstChild) {
    commentsContainer.appendChild(script);
  } else {
    console.error("Error adding utterances comments");
  }
};

export { addComments };
