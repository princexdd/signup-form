import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('Please add your Mongo URI to .env.local');

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Reuse global connection in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {});
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create fresh client in production
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
}

export { clientPromise };
