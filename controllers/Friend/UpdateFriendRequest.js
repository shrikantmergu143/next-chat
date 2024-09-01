import friends from "../../models/friendRequest";
import friendPayload from "../../payloadData/friendPayload";

const updateFriends = async (payload) => {
  try {
    const { friend_id, status, user } = payload?.formData;
    const findFriend = await friends.findOne({
      friend_id: friend_id,
      email_to: user?.id,
    });
    if (!findFriend) {
      return {
        status: 400,
        message: "Failed to update friend status!",
      };
    }
    findFriend.status = status;
    await findFriend.save();
    return {
      status: 200,
      data: friendPayload(findFriend),
      friend_id,
    };
  } catch (error) {
    console.error("Error fetching accepted friend details:", error);
    return { status: 500, error: "Error fetching accepted friend details" };
  }
};

export const updateFriendRequest = async (req, res) => {
  const { status } = req.body;
  const { friend_id } = req.query;
  const payload = {
    user: req?.user,
    formData: {
      friend_id,
      status,
      user: req?.user,
    },
  };
  const response = await updateFriends(payload);
  res.status(response.status).json(response);
};
