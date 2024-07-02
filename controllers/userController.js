// controllers/userController.js
import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';
import userPayload from '../payloadData/userPayload';
const bcrypt = require("bcryptjs");

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
  const encryptPassword = await bcrypt.hash(user?.password, 10);
  const result = await db.collection('users').insertOne({
    ...user,
    password: encryptPassword
  });
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
    return {error: 'Invalid email or password', status: false};
  }

  // Compare passwords
  // const passwordMatch = await comparePasswords(password, user.password);

  // If passwords don't match, return null
  if (password !== user.password) {
    return {error: 'Invalid email or password', status: false};
  }

  // Return the authenticated user
  return {user: user, status :true};
}
