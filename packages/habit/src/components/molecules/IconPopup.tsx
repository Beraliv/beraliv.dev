import { Component, createSignal, Show, Signal } from "solid-js";
import { TIconType } from "../../types/TIconType";
import { Popup } from "../atoms/Popup";
import { IconButton } from "./IconButton";

import styles from "./IconPopup.module.css";

interface IIconPopupProps {
  iconSignal: Signal<TIconType>;
}

const IconPopup: Component<IIconPopupProps> = ({ iconSignal }) => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

  return (
    <>
      <IconButton handleClick={openPopup} iconSignal={iconSignal} />
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={closePopup}>
          <h3 class={styles.h3}>Icon</h3>
        </Popup>
      </Show>
    </>
  );
};

export { IconPopup };
