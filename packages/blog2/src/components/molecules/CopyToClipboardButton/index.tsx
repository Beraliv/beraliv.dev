import { FC, useCallback, useState } from "react";
import { copyToClipboard } from "../../../functions/copyToClipboard";
import { validateNever } from "../../../validators/validateNever";
import { CopyToClipboardIcon } from "../../atoms/CopyToClipboardIcon";
import { TickIcon } from "../../atoms/TickIcon";

type CopyStageType = "copy" | "copied";

interface CopyToClipboardButtonPropsType {
  whatToCopy: string;
}

export const CopyToClipboardButton: FC<CopyToClipboardButtonPropsType> = ({
  whatToCopy,
}) => {
  const [stage, setStage] = useState<CopyStageType>("copy");

  const handleClick = useCallback(() => {
    if (stage === "copied") {
      return;
    }

    setStage("copied");
    copyToClipboard(whatToCopy);

    setTimeout(() => {
      setStage("copy");
    }, 3_000);
  }, [stage, whatToCopy]);

  if (stage === "copy") {
    return (
      <div onClick={handleClick}>
        <CopyToClipboardIcon />
      </div>
    );
  }

  if (stage === "copied") {
    return <TickIcon />;
  }

  validateNever(stage);
  return null;
};
