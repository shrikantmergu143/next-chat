import friendRequest from "../models/friendRequest"
import utils from '../components/utils';
import friendPayload from '../payloadData/friendPayload';

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
