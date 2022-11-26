import { Component, createSignal, Show, Signal } from "solid-js";
import { Popup } from "../atoms/Popup";
import { Color } from "../atoms/Color";

import styles from "./ColorPopup.module.css";
import { TColor } from "../../types/TColor";
import { FormButton } from "./FormButton/FormButton";

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
      <FormButton handleClick={openPopup} text="Color" />
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={handleSave}>
          <h3 class={styles.h3}>Icon color</h3>
          <div class={styles.grid}>
            <Color color="blue" colorSignal={colorSignal}></Color>
            <Color color="brown" colorSignal={colorSignal}></Color>
            <Color color="darkblue" colorSignal={colorSignal}></Color>
            <Color color="green" colorSignal={colorSignal}></Color>
            <Color color="orange" colorSignal={colorSignal}></Color>
            <Color color="pink" colorSignal={colorSignal}></Color>
            <Color color="red" colorSignal={colorSignal}></Color>
            <Color color="violet" colorSignal={colorSignal}></Color>
            <Color color="yellow" colorSignal={colorSignal}></Color>
          </div>
        </Popup>
      </Show>
    </>
  );
};

export { ColorPopup };
