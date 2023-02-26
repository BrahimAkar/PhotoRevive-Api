import * as admin from 'firebase-admin';

import serviceAccount from '../assets/firebase.json';

export default async (): Promise<admin.app.App> => {
  // initialize firebase app
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  return app;
};
