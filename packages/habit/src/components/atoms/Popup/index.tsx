import { children, ParentComponent } from "solid-js";

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
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export { Popup };
