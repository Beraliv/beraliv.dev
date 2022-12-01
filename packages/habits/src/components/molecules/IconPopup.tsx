import { Component, createSignal, Show, Signal } from "solid-js";
import { TIconType } from "../../types/TIconType";
import { PickIcon } from "../atoms/PickIcon";
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
        <Popup
          handleCancel={closePopup}
          handleSave={closePopup}
          width={250}
          height={260}
        >
          <h3 class={styles.h3}>Icon</h3>
          <div class={styles.grid}>
            <PickIcon type="faceSmile" signal={iconSignal} />
            <PickIcon type="handsBubbles" signal={iconSignal} />
            <PickIcon type="heartPulse" signal={iconSignal} />
            <PickIcon type="language" signal={iconSignal} />
            <PickIcon type="paw" signal={iconSignal} />
            <PickIcon type="personRunning" signal={iconSignal} />
          </div>
        </Popup>
      </Show>
    </>
  );
};

export { IconPopup };
