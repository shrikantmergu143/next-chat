import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFriendRequest extends Document {
  friend_id: any;
  email_to: any;
  email_from: any;
  accepted_to: any;
  accepted_from: any;
  created_at: Date;
  updated_at: Date;
  status: any;
  active: boolean;
  is_deleted: boolean;
  last_message?: Record<any, any> | null;
}

const friendSchema: Schema<IFriendRequest> = new mongoose.Schema({
  friend_id: { type: String, required: true },
  email_to: { type: String, required: true },
  email_from: { type: String, required: true },
  accepted_to: { type: String, required: true, default: false },
  accepted_from: { type: String, required: true, default: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true, default: false },
  active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  last_message: { type: Object, required: false, default: null },
});

const FriendRequestModel: Model<IFriendRequest> =
  mongoose.models.friends || mongoose.model<IFriendRequest>('friends', friendSchema);

export default FriendRequestModel;
