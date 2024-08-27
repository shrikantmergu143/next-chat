import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email:{type:String, unique:true},
    username:{type:String},
    password:{type:String},
    profile_url:{type:String},
    first_name:{type:String},
    last_name:{type:String},
    social_links:{type:Array},
    date_of_birth:{type:String},
    description:{type:String},
    address:{type:String},
    phone:{type:String},
    personal_link:{type:Array},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    pincode:{type:String},
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now },
    resume: { type: String, default:"" },
    user_type: { type: String, required: true, default:"user" },
    is_admin: { type: Boolean, required: true, default:false },
    status: { type: String, required: true, default:"active" },
    active: { type: Boolean, required: true, default:true },
    is_deleted: { type: Boolean, required: true, default:false },
});

export default mongoose.models.userSchema || mongoose.model('userSchema', userSchema);
// module.exports = mongoose.model("user", userSchema)