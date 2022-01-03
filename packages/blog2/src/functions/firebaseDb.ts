import admin from "firebase-admin";

export const firebaseDb = (() => {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    if (!privateKey) {
      // TODO: throw error in production
      console.error(`Cannot find private key in env parameters`);
    }

    if (!clientEmail) {
      // TODO: throw error in production
      console.error(`Cannot find client email in env parameters`);
    }

    return undefined;
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

  return admin.database();
})();
