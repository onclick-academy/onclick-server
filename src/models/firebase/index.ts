import * as admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
 origin

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin
