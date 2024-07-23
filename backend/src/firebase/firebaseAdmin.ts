import { initializeApp, applicationDefault, cert, ServiceAccount } from 'firebase-admin/app';
import { getApps } from 'firebase-admin/app';
import serviceAccount from './serviceAccountKey.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

export { initializeApp };
