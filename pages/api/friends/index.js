// pages/api/channels/index.js
import Authenticate from '../checkAuth';
import { setFriendRequest } from '../../../controllers/friendController';

export default async function handler(req, res) {
    await Authenticate(req, res, async ()=>{
        if (req.method === 'GET') {
        }else if (req.method === 'POST') {
            const payload = {
                email_to: req?.body?.email_to
            }
            const response = await setFriendRequest(payload, req);
            res.status(response?.status).json(response);
        }
    })
}