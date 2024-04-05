import * as admin from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin
