// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FIREBASE_VIEWS_REF } from "../../src/constants/FIREBASE_VIEWS_REF";
import { firebaseDb } from "../../src/functions/firebaseDb";
import { getViews } from "../../src/functions/getViews";
import { ViewsApi } from "../../src/types/ViewsApi";

interface DataSnapshot {
  val(): unknown;
}

const views = async (
  request: NextApiRequest,
  response: NextApiResponse<ViewsApi>
) => {
  const { slug } = request.query;
  if (typeof slug !== "string") {
    return response.status(400);
  }

  if (request.method === "POST") {
    // you cannot use destructuring here
    const ref = firebaseDb.ref(FIREBASE_VIEWS_REF).child(slug);

    const { snapshot } = await ref.transaction((views: unknown) => {
      if (typeof views !== "number") {
        return 1;
      }

      return views + 1;
    });
    // TODO: fix types
    const views = (snapshot as DataSnapshot).val() as number;

    const result: ViewsApi = { views };

    return response.status(200).json(result);
  }

  if (request.method === "GET") {
    const { views } = await getViews({ slug });

    return response.status(200).json({ views });
  }

  return response.status(404);
};

export default views;
