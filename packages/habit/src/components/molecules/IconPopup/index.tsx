import { Component, createSignal, Show } from "solid-js";
import { Popup } from "../../atoms/Popup";

const IconPopup: Component = () => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

  return (
    <>
      <button onClick={openPopup}>Icon</button>
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={closePopup}>
          <p>Icon Popup</p>
        </Popup>
      </Show>
    </>
  );
};

export { IconPopup };
