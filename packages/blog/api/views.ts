import type { VercelRequest, VercelResponse } from "@vercel/node"
import { firebaseDb } from "../src/lib/firebaseDb"

interface DataSnapshot {
  val(): unknown
}

export default async (request: VercelRequest, response: VercelResponse) => {
  console.log(`>>> /api/views request`, request)
  console.log(`>>> /api/views response`, response)

  if (request.method === "POST") {
    const { slug } = request.query
    if (typeof slug !== "string") {
      return
    }

    const { transaction } = firebaseDb
      .ref("blog-beraliv-page-views")
      .child(slug)
    const { snapshot } = await transaction((views: unknown) => {
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
