import { useEffect } from "react";
import { COMMENTS_ID } from "../../../constants/COMMENTS_ID";
import { addComments } from "../../../functions/addComments";

const Comments = () => {
  useEffect(() => {
    addComments();
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      <div className={COMMENTS_ID} id={COMMENTS_ID}></div>
    </div>
  );
};

export { Comments };
