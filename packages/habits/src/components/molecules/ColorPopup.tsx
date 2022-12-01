import { Component, createSignal, Show, Signal } from "solid-js";
import { Popup } from "../atoms/Popup";
import { PickColor } from "../atoms/PickColor";

import styles from "./ColorPopup.module.css";
import { TColor } from "../../types/TColor";
import { ColorButton } from "./ColorButton";

interface IColorPopupProps {
  colorSignal: Signal<TColor>;
}

const ColorPopup: Component<IColorPopupProps> = ({ colorSignal }) => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);
  const [color, setColor] = colorSignal;

  const handleSave = () => {
    setColor(color());
    closePopup();
  };

  return (
    <>
      <ColorButton handleClick={openPopup} colorSignal={colorSignal} />
      <Show when={isPopupVisible()}>
        <Popup
          handleCancel={closePopup}
          handleSave={handleSave}
          width={250}
          height={325}
        >
          <h3 class={styles.h3}>Icon color</h3>
          <div class={styles.grid}>
            <PickColor type="blue" signal={colorSignal} />
            <PickColor type="brown" signal={colorSignal} />
            <PickColor type="darkblue" signal={colorSignal} />
            <PickColor type="green" signal={colorSignal} />
            <PickColor type="orange" signal={colorSignal} />
            <PickColor type="pink" signal={colorSignal} />
            <PickColor type="red" signal={colorSignal} />
            <PickColor type="violet" signal={colorSignal} />
            <PickColor type="yellow" signal={colorSignal} />
          </div>
        </Popup>
      </Show>
    </>
  );
};

export { ColorPopup };
