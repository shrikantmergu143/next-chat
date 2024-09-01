// pages/api/channels/index.js
import { updateFriendRequest } from '../../../controllers/Friend/UpdateFriendRequest';
import friends from '../../../models/friendRequest';
import { registerValidator } from '../../../validators/userValidator';
import Authenticate from '../checkAuth';

export default async function handler(req, res) {
    await Authenticate(req, res, async ()=>{
        if (req.method === 'GET') {
            try {
                const { friend_id } = req.query;
                const channels = await friends.findOne({ friend_id: friend_id  });
                if (!channels || channels.length === 0) {
                    return res.status(400).json({ message: 'No channels found' });
                }
                res.status(200).json({ data: channels });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Failed to fetch channels.' });
            }
          }else if(req.method === "PUT"){
            const { status } = req.body;
            if(status!="accepted" && status!="rejected"){
              res.status(400).json({ success: false, message: 'Status is required valid only Accepted and Rejected' });
            }else{
              updateFriendRequest(req, res);
            }
          }else {
            res.status(405).json({ success: false, message: 'Method not allowed.' });
          }
    })
}
