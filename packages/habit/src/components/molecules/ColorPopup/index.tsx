import { Component, createSignal, Show } from "solid-js";
import { Popup } from "../../atoms/Popup";
import { Color } from "../../atoms/Color";

import styles from "./index.module.css";
import { TColor } from "../../../types/TColor";
import { FormButton } from "../FormButton";

interface IColorPopupProps {
  handleColorUpdate: (color: TColor) => void;
}

const ColorPopup: Component<IColorPopupProps> = ({ handleColorUpdate }) => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);
  const colorSignal = createSignal<TColor>("blue");

  const handleSave = () => {
    const [color] = colorSignal;
    handleColorUpdate(color());
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
