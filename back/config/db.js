const { MongoClient } = require('mongodb');

// Connection URI
const uri = process.env.MONGO_URI; // Replace with your MongoDB URI
const dbName = 'zomatoDb'; // Replace with your database name

let client;
let db;

async function connectToDatabase() {
    if (db) return db; // Return the existing database connection if it exists

    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = { connectToDatabase, getDb };