import type { VercelRequest, VercelResponse } from "@vercel/node"
import { firebaseDb } from "../src/lib/firebaseDb"

interface DataSnapshot {
  val(): unknown
}

const viewsRef = "beraliv-blog/views"

export default async (request: VercelRequest, response: VercelResponse) => {
  const { slug } = request.query
  if (typeof slug !== "string") {
    return response.status(400)
  }

  if (request.method === "POST") {
    // you cannot use destructuring here
    const ref = firebaseDb.ref(viewsRef).child(slug)

    const { snapshot } = await ref.transaction((views: unknown) => {
      if (typeof views !== "number") {
        return 1
      }

      return views + 1
    })
    // TODO: fix types
    const views = (snapshot as DataSnapshot).val()

    return response.status(200).json({ views })
  }

  if (request.method === "GET") {
    // you cannot use destructuring here
    const snapshot = await firebaseDb.ref(viewsRef).child(slug).once("value")

    const views = snapshot.val()

    return response.status(200).json({ views })
  }
}
