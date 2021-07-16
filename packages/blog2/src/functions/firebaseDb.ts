import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "digital-garden-ffb02-default-rtdb",
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL:
      "https://digital-garden-ffb02-default-rtdb.europe-west1.firebasedatabase.app/",
  });
}

export const firebaseDb = admin.database();
