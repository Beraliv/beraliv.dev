import { children, ParentComponent } from "solid-js";
import { cx } from "../../utils/cx";

import styles from "./Popup.module.css";

interface IPopupProps {
  handleCancel: () => void;
  handleSave: () => void;
  width: number;
  height: number;
}

const Popup: ParentComponent<IPopupProps> = ({
  children: _children,
  handleCancel,
  handleSave,
  width,
  height,
}) => {
  const body = children(() => _children);

  return (
    <div class={styles.container}>
      <div
        class={cx(styles.body, "gray")}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {body()}
        <div class={styles.buttons}>
          <input
            class={cx(styles.button, "lightgray")}
            onClick={handleCancel}
            type="button"
            value="Cancel"
          />
          <input
            class={cx(styles.button, "green")}
            onClick={handleSave}
            type="button"
            value="Save"
          />
        </div>
      </div>
    </div>
  );
};

export { Popup };
