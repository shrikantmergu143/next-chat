// controllers/userController.js
import { ObjectId } from 'mongodb';
import clientPromise from '../lib/mongodb';
import userPayload from '../payloadData/userPayload';
import User from '../models/User';
const bcrypt = require("bcryptjs");

export async function getUsers(user_id = null) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  if (user_id) {
    
    const user = await User?.findOne({'_id': new ObjectId(user_id)} );

    return user ? userPayload(user) : null;
  } else {
    const users = await User?.find({});
    const usersList = users?.map((user) => userPayload(user));
    return usersList;
  }
}

export async function createUser(user) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  // Check if the email already exists
  const existingUser = await User?.findOne({ email: user.email });
  if (existingUser) {
    throw new Error('Email already exists');
  }
  const encryptPassword = await bcrypt.hash(user?.password, 10);
  const result = await User?.create({
    ...user,
    password: encryptPassword
  });
  return {
    ...result,
    password: encryptPassword
  };
}

export async function loginUser(credentials) {
  const { email, password } = credentials;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);

  // Find the user by email
  const user = await User?.findOne({ email });

  // If user is not found, return null
  if (!user) {
    return {error: 'Invalid email or password', status: false};
  }

  // Compare passwords
  // const passwordMatch = await comparePasswords(password, user.password);

  // If passwords don't match, return null;
  if (!await bcrypt.compare(password, user.password) ) {
    return {error: 'Invalid email or password', status: false};
  }

  // Return the authenticated user
  return {user: user, status :true};
}
