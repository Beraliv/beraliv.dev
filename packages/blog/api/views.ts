import type { VercelRequest, VercelResponse } from "@vercel/node"
import { firebaseDb } from "../src/lib/firebaseDb"

interface DataSnapshot {
  val(): unknown
}

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "POST") {
    const { slug } = request.query
    if (typeof slug !== "string") {
      return response.status(400)
    }

    // you cannot use destructuring here
    const ref = firebaseDb.ref("beraliv-blog/views").child(slug)

    const { snapshot } = await ref.transaction((views: unknown) => {
      if (typeof views !== "number") {
        return 1
      }

      return views + 1
    })

    return response.status(200).json({
      // TODO: fix types
      views: (snapshot as DataSnapshot).val(),
    })
  }

  return
}
