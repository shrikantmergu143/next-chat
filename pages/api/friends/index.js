// pages/api/channels/index.js
import Authenticate from '../checkAuth';
import { getFriendAcceptDetails, getFriendsRequestList, setFriendRequest } from '../../../controllers/friendController';

export default async function handler(req, res) {
    await Authenticate(req, res, async ()=>{
        if (req.method === 'GET') {
            const {status} = req?.query;
            if(status === "accepted"){
                await getFriendAcceptDetails(req, res);
            }else{
                const response = await getFriendsRequestList(req, res);
                res.status(response?.status).json(response);
            }
        }else if (req.method === 'POST') {
            const payload = {
                email_to: req?.body?.email_to
            }
            const response = await setFriendRequest(payload, req);
            res.status(response?.status).json(response);
        }else if(req.method === "PUT"){
            
        }
    })
}