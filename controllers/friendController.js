import friends from "../models/friendRequest"
import utils from '../components/utils';
import friendPayload from '../payloadData/friendPayload';
const getFriendRequest = async (req, res) => {
    const { page = 1, limit = 20, status } = req;
    try {
      const userEmail = req?.user?.email;
      const query = {
        $or: [{ email_to: userEmail }, { email_from: userEmail }]
      };
      if (status) {
        query.status = status;
      }
      const total_records = await friends.countDocuments(query);
      const friendRequests = await friends.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      if (!friendRequests || friendRequests.length === 0) {
        return { message: 'No friend requests found', status:400 };
      }
      const pagination = {
        total_records,
        limit: parseInt(limit),
        page: parseInt(page),
        total_pages: Math.ceil(total_records / limit),
      };
      // return res.status(200).json({ data: friendRequests, pagination });
      return { status: 200, data: { data: friendRequests, pagination } };
  
    } catch (error) {
      console.error('Error fetching friend requests:', error);
      return { error: 'Error fetching friend requests', status:400, user: req?.user };
    }
};
export const getFriendsRequestList = async (req, res) => {
    const formData = req.body || req.query;
    const payload = {
      user: req?.user
    }
    if(formData?.status){
      payload.status = formData?.status;
    }
    if(formData?.page){
      payload.page = formData?.page;
    }
    if(formData?.limit){
      payload.limit = formData?.limit;
    }
    const response = await getFriendRequest(payload, res);
    // res.status(response?.status).json(response);
    return response;
};
export const setFriendRequest = async (payload1, req,) => {
    try {
        const user = req?.user;
        const email_to = payload1?.email_to;
        const payload = {
            email_to: email_to,
            email_from: user?.email,
            accepted_to: true,
            accepted_from: false,
            status: "pending",
            active: true,
            is_deleted: false,
            friend_id: utils.uuidv4(),
        };
    
        const response = await friendRequest.findOne({
            $or: [
                { email_to: email_to, email_from: user?.email },
                { email_from: email_to, email_to: user?.email },
            ],
        });
    
        if (response) {
            return  { error: "A friend request exists between the two users.", status: 400 };
        }
    
        const createdFriendRequest = await friendRequest.create(payload);
    
        if (!createdFriendRequest) {
            return { error: 'Friend request inserted unsuccessfully', status: 400 }
        }
        const data = friendPayload(createdFriendRequest)
        return { msg: 'Friend request inserted successfully', data: data, status: 200 }
    } catch (err) {
        console.error(err);
        return { error: "Error occurred, Please try again", status: 500 }
    }
};
