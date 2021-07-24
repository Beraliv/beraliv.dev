import { FIREBASE_VIEWS_REF } from "../constants/FIREBASE_VIEWS_REF";
import { ViewsApi } from "../types/ViewsApi";
import { firebaseDb } from "./firebaseDb";

interface GetViewsPropsType {
  slug: string;
}

export const getViews = async ({
  slug,
}: GetViewsPropsType): Promise<ViewsApi> => {
  // you cannot use destructuring here
  const snapshot = await firebaseDb
    .ref(FIREBASE_VIEWS_REF)
    .child(slug)
    .once("value");

  const views = snapshot.val() as number;

  return { views };
};
