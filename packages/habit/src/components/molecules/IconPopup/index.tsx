import { Component, createSignal, Show } from "solid-js";
import { Popup } from "../../atoms/Popup";
import { FormButton } from "../FormButton";

const IconPopup: Component = () => {
  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const openPopup = () => setPopupVisibility(true);
  const closePopup = () => setPopupVisibility(false);

  return (
    <>
      <FormButton handleClick={openPopup} text="Icon" />
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={closePopup}>
          <p>Icon Popup</p>
        </Popup>
      </Show>
    </>
  );
};

export { IconPopup };
