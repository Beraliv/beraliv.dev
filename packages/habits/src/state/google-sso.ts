import { createApi, createStore } from "effector";
import { GOOGLE_CLIENT_ID } from "../const/GOOGLE_CLIENT_ID";
import { parseJwt } from "../utils/parseJwt";
import { z } from "zod";
import { TPrimitive } from "../types/TPrimitive";

type TGoogleSsoState =
  | { type: "SIGNED_OUT" }
  | { type: "SIGNING" }
  | ({
      type: "LOGGED_IN";
    } & z.infer<typeof SignedInData>);

const SignedInData = z.object({
  email: z.string(),
  avatarUrl: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

const $googleSso = createStore<TGoogleSsoState>({
  type: "SIGNED_OUT",
});

const { handleCredentialResponse, signIn, signOut } = createApi($googleSso, {
  signIn: () => {
    console.log("🔄 Initialising Google Accounts...");

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      context: "signin",
      ux_mode: "popup",
      auto_select: true,
      callback: handleCredentialResponse,
    });

    console.log("✅ Initialised Google Accounts");

    console.log("Signing in...");

    google.accounts.id.prompt();

    return { type: "SIGNING" };
  },
  signOut: () => {
    console.log("🔄 Signing out...");

    console.log("✅ Signed out");

    return { type: "SIGNED_OUT" };
  },
  handleCredentialResponse: (
    state,
    response: google.accounts.id.CredentialResponse
  ) => {
    let rawData: Record<string, TPrimitive>;

    try {
      console.log("🔄 Parsing JWT token...");

      rawData = parseJwt(response.credential);

      console.log("✅ Successfully parsed JWT token");
    } catch (error) {
      console.error("❌ Failed parsing JWT token", error);

      return state;
    }

    try {
      console.log("🔄 Parsing signed in data...");

      const validatedData = SignedInData.parse({
        email: rawData.email,
        firstName: rawData.given_name,
        lastName: rawData.family_name,
        avatarUrl: rawData.picture,
      });

      console.log("✅ Successfully parsed signed in data");
      console.log("✅ Signed in");

      return {
        type: "LOGGED_IN",
        ...validatedData,
      };
    } catch (error) {
      console.error("❌ Failed parsing signed in data", error);

      return state;
    }
  },
});

export { $googleSso, handleCredentialResponse, signIn, signOut };
