import { WarningIcon } from "./WarningIcon";

interface WarningProps {
  text: string;
}

export const Warning = ({ text }: WarningProps) => {
  return (
    <div className="WarningContainer">
      <div className="WarningHeader">
        <WarningIcon />
        <span>Warning</span>
      </div>
      <p className="WarningBody">{text}</p>
    </div>
  );
};
