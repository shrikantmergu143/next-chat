// pages/api/users.js
import Utils from '../../components/utils';
import { getUsers, createUser } from '../../controllers/userController';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const authResult = authenticateToken(req.headers.authorization, req);
        if (!authResult.status) {
          return res.status(401).json({ error: authResult.message });
        }

        const users = await getUsers(authResult?.payload?._id);
          res.status(200).json({...users});
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function authenticateToken(authorizationHeader, req) {
  // Check if Authorization header is provided
  if (!authorizationHeader) {
    return { message: "Authorization header missing", status: false };
  }

  // Extract the token from the Authorization header
  const token = authorizationHeader//.split(' ')[1];

  // Validate the JWT token
  const userDetails = Utils.validateJWT(token);
  if(userDetails?.status){
    req.user = userDetails?.payload;
  }
  return userDetails;
}

// Other functions...
