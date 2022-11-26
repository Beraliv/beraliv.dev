import { Component, createSignal, Show } from "solid-js";
import { Popup } from "../../atoms/Popup";
import { FormButton } from "../FormButton";

import styles from "./index.module.css";

const IconPopup: Component = () => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

  return (
    <>
      <FormButton handleClick={openPopup} text="Icon" />
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={closePopup}>
          <h3 class={styles.h3}>Icon</h3>
        </Popup>
      </Show>
    </>
  );
};

export { IconPopup };
