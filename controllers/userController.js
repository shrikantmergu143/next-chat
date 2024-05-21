// controllers/userController.js
import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';
import userPayload from '../payloadData/userPayload';

export async function getUsers(user_id = null) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  if (user_id) {
    const user = await db.collection('users').findOne({'_id': new ObjectId(user_id)} );

    return user ? userPayload(user) : null;
  } else {
    const users = await db.collection('users').find({}).toArray();
    const usersList = users?.map((user) => userPayload(user));
    return usersList;
  }
}


export async function createUser(user) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  // Check if the email already exists
  const existingUser = await db.collection('users').findOne({ email: user.email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const result = await db.collection('users').insertOne(user);
  return result;
}


export async function loginUser(credentials) {
  const { email, password } = credentials;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  // Find the user by email
  const user = await db.collection('users').findOne({ email });

  // If user is not found, return null
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare passwords
  // const passwordMatch = await comparePasswords(password, user.password);

  // If passwords don't match, return null
  if (password !== user.password) {
    throw new Error('Invalid email or password');
  }

  // Return the authenticated user
  return user;
}
