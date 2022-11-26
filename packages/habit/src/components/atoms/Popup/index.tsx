import { children, ParentComponent } from "solid-js";
import { cx } from "../../../utils/cx";

import styles from "./index.module.css";

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
      <div class={styles.body}>
        {body()}
        <div class={styles.buttons}>
          <input
            class={cx(styles.button, "lightgray")}
            onClick={handleCancel}
            type="button"
            value="Cancel"
          />
          <input
            class={cx(styles.button, "blue")}
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
