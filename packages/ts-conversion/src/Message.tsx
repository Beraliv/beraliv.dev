import { classNames } from "./classNames";
import { WarningIcon } from "./WarningIcon";

interface MessageProps {
  type: "warning" | "note";
  text: string;
}

export const Message = ({ text, type }: MessageProps) => {
  return (
    <div
      className={classNames("MessageContainer", {
        warning: type === "warning",
        note: type === "note",
      })}
    >
      <div className="MessageHeader">
        {type === "warning" && <WarningIcon />}
        <span>Warning</span>
      </div>
      <p className="MessageBody">{text}</p>
    </div>
  );
};
