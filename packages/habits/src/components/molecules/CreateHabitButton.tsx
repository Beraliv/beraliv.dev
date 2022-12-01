import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";
import { PlusIcon } from "../atoms/PlusIcon";

const CreateHabitButton: Component = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/create");
      }}
    >
      <PlusIcon />
    </div>
  );
};

export { CreateHabitButton };
