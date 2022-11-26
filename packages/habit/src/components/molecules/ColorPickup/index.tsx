import { Component, createSignal, Show } from "solid-js";
import { Popup } from "../../atoms/Popup";
import { Color } from "../../atoms/Color";

import styles from "./index.module.css";
import { TColor } from "../../../types/TColor";

const ColorPopup: Component = () => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);
  const [color, setColor] = createSignal<TColor>("blue");

  const handleSave = () => {
    color();
    closePopup();
  };

  return (
    <>
      <button onClick={openPopup}>Color</button>
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={handleSave}>
          <div class={styles.grid}>
            <div class={styles.row}>
              <Color color="blue" handleClick={setColor}></Color>
              <Color color="brown" handleClick={setColor}></Color>
              <Color color="darkblue" handleClick={setColor}></Color>
            </div>
            <div class={styles.row}>
              <Color color="green" handleClick={setColor}></Color>
              <Color color="orange" handleClick={setColor}></Color>
              <Color color="pink" handleClick={setColor}></Color>
            </div>
            <div class={styles.row}>
              <Color color="red" handleClick={setColor}></Color>
              <Color color="violet" handleClick={setColor}></Color>
              <Color color="yellow" handleClick={setColor}></Color>
            </div>
          </div>
        </Popup>
      </Show>
    </>
  );
};

export { ColorPopup };
