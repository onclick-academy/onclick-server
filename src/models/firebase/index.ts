import * as admin from 'firebase-admin'

const serviceAccount = require('/home/omar/Desktop/projects/backend/onclick-server/admins.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin
