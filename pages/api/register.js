// pages/api/users.js
import Utils from '../../components/utils';
import { getUsers, createUser } from '../../controllers/userController';
import userPayload from '../../payloadData/userPayload';
import { registerValidator } from '../../validators/userValidator';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const user = req.body;

        // Validate the user data
        const validationErrors = registerValidator(user);
        if (validationErrors) {
          return res.status(400).json({ errors: validationErrors, user:user });
        }

        // Check if email already exists
        try {
          const newUser = await createUser(user);
          const userDetails = userPayload(newUser)
          const token = Utils.generateAuthToken(user)
          res.status(200).json({
            ...newUser,
            access_token: token,
            userDetails: userDetails
          });
        } catch (error) {
          if (error.message === 'Email already exists') {
            res.status(400).json({ error: 'Email already exists' });
          } else {
            throw error; // Re-throw other errors to be caught by the outer catch block
          }
        }
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', error:error });
  }
}
