import { Component, createSignal, Show } from "solid-js";
import { Popup } from "../../atoms/Popup";
import { IconButton } from "../IconButton";

import styles from "./index.module.css";

const IconPopup: Component = () => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

  return (
    <>
      <IconButton handleClick={openPopup} />
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={closePopup}>
          <h3 class={styles.h3}>Icon</h3>
        </Popup>
      </Show>
    </>
  );
};

export { IconPopup };
