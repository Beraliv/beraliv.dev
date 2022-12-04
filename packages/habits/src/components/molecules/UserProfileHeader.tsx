import { useUnit } from "effector-solid";
import { Component, Show } from "solid-js";
import { $googleSso, signIn, signOut } from "../../state/google-sso";

const UserProfileHeader: Component = () => {
  const googleSso = useUnit($googleSso);

  return (
    <div>
      <Show when={googleSso().type === "SIGNED_OUT"}>
        <input onClick={() => signIn()} value="Sign in" />
      </Show>
      <Show when={googleSso().type === "LOGGED_IN"}>
        <input onClick={() => signOut()} value="Sign out" />
      </Show>
    </div>
  );
};

export { UserProfileHeader };
