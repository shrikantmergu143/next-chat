import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChannel extends Document {
  channel_id: string;
  channel_name: string;
  logo?: string;
  mode: 'public' | 'private';
  members: string[];
  settings: Record<string, any>;
  created_by: string;
  channel_status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}

const ChannelSchema: Schema<IChannel> = new mongoose.Schema<IChannel>(
  {
    channel_id: { type: String, required: true },
    channel_name: { type: String, required: true, unique: true },
    logo: { type: String },
    mode: { type: String, enum: ['public', 'private'], default: 'public' },
    members: { type: [String], default: [] },
    settings: { type: Schema.Types.Mixed, default: {} },
    created_by: { type: String, required: true },
    channel_status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Exporting as a proper singleton to avoid model overwrite issues in dev/hot reload
const ChannelModel: Model<IChannel> =
  mongoose.models.Channels || mongoose.model<IChannel>('Channels', ChannelSchema);

export default ChannelModel;
