import admin from "firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // @ts-expect-error
      project_id: "digital-garden-ffb02",
      private_key: process.env.FIREBASE_PRIVATE_KEY,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://digital-garden-ffb02.firebaseio.com",
  })
}

export const firebaseDb = admin.database()
