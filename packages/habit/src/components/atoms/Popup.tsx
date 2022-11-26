import { children, ParentComponent } from "solid-js";
import { cx } from "../../utils/cx";

import styles from "./Popup.module.css";

interface IPopupProps {
  handleCancel: () => void;
  handleSave: () => void;
}

const Popup: ParentComponent<IPopupProps> = ({
  children: _children,
  handleCancel,
  handleSave,
}) => {
  const body = children(() => _children);

  return (
    <div class={styles.container}>
      <div class={cx(styles.body, "gray")}>
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
