const admin = require('firebase-admin');
const fs = require('fs');

if (process.argv.length != 4) {
    let progName = process.argv[1]
    console.error("usage: " + progName + " <json-file> <collection-name>")
    process.exit(-1)
}

let jsonFile = process.argv[2]
let collectionName = process.argv[3]

let certPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

// Initialize Firebase Admin SDK
const serviceAccount = require(certPath)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

data.forEach(async (doc) => {
    try {
        await db.collection(collectionName).add(doc);
        console.log('Document added successfully!');
    } catch (error) {
        console.error('Error adding document:', error);
    }
});

