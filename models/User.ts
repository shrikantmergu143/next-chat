import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username?: string;
  password?: string;
  profile_url?: string;
  first_name?: string;
  last_name?: string;
  social_links?: any[]; // or string[] if they are links
  date_of_birth?: string;
  description?: string;
  address?: string;
  phone?: string;
  personal_link?: any[]; // or string[] if they are links
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  created_at: Date;
  updated_at: Date;
  resume?: string;
  user_type: string;
  is_admin: boolean;
  status: string;
  active: boolean;
  is_deleted: boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  email: { type: String, unique: true, required: true },
  username: { type: String },
  password: { type: String },
  profile_url: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  social_links: { type: [], default: [] },
  date_of_birth: { type: String },
  description: { type: String },
  address: { type: String },
  phone: { type: String },
  personal_link: { type: [], default: [] },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  resume: { type: String, default: "" },
  user_type: { type: String, required: true, default: "user" },
  is_admin: { type: Boolean, required: true, default: false },
  status: { type: String, required: true, default: "active" },
  active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
});

// Avoid redefining the model if it already exists (important in Next.js hot reloads)
const UserModel: Model<IUser> = mongoose.models.user || mongoose.model<IUser>('user', userSchema);

export default UserModel;
