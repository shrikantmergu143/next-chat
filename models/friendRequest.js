import mongoose from 'mongoose';
const friends = new mongoose.Schema({
    friend_id: { type: String, required: true },
    email_to: { type: String, required: true },
    email_from: { type: String, required: true },
    accepted_to: { type: String, required: true, default:false },
    accepted_from: { type: String, required: true, default:true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true, default:false },
    active: { type: Boolean, required: true, default:true },
    is_deleted: { type: Boolean, required: true, default:false },
    last_message: { type: Object, required: false, default:null },
});

// module.exports = mongoose.model("friends", friends)
export default mongoose.models.friends || mongoose.model('friends', friends);
