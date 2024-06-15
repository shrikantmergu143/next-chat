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
      res.status(200).json({ ...user?.user, access_token: token });
    }else{
      return res.status(400).json(user);
    }
  //   if (!user) {
  //     return res.status(401).json({ error: 'Invalid email or password' });
  //   }
  //   if (password !== user.password) {
  //     return res.status(401).json({ error: 'Invalid email or password' });
  //   }
  //   const token = Utils.generateAuthToken({ ...user, user_id: user._id, email: user.email });
  //   const userDetails = userPayload(user);
  //   res.status(200).json({ ...userDetails, access_token: token });
  // } catch (error) {
  //   console.error('Login error:', error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
}
