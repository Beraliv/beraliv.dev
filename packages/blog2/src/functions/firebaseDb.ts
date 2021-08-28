import admin from "firebase-admin";

const privateKey = process.env.FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

if (!privateKey) {
  throw new Error(`Cannot find private key in env parameters`);
}

if (!clientEmail) {
  throw new Error(`Cannot find client email in env parameters`);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "digital-garden-ffb02-default-rtdb",
      privateKey,
      clientEmail,
    }),
    databaseURL:
      "https://digital-garden-ffb02-default-rtdb.europe-west1.firebasedatabase.app/",
  });
}

export const firebaseDb = admin.database();
