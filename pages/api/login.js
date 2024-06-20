// pages/api/login.js
import Utils from '../../components/utils';
import { loginUser } from '../../controllers/userController';
import userPayload from '../../payloadData/userPayload';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  // try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    if(user?.status){
      const userDetails = user?.user
      const token = Utils.generateAuthToken({ ...userDetails, user_id: userDetails._id, email: userDetails.email });
       // Assuming authentication is successful, set cookie
      res.setHeader('Set-Cookie', `access_token=${token}; Path=/; HttpOnly`);

      res.status(200).json({ ...user?.user, access_token: token });
    }else{
      return res.status(400).json(user);
    }
}
