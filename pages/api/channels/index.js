// pages/api/channels/index.js
import { uuidv4 } from '../../../components/utils';
import connectToDatabase from '../../../lib/configData';
import Channels from '../../../models/Channels';
import { authenticateToken, channelsValidator } from '../../../validators/userValidator';

export default async function handler(req, res) {
  const authResult = authenticateToken(req.headers.authorization, req);
  if (!authResult.status) {
    return res.status(401).json({ error: authResult.message });
  }
  await connectToDatabase();
  if (req.method === 'GET') {
    try {
        const { page = 1, limit = 20 } = req.query;
        const userId = req?.user?.user_id;

        const channels = await Channels.find({ created_by: userId })
            .sort({ updated_at: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total_records = await Channels.countDocuments({ created_by: userId });

        if (!channels || channels.length === 0) {
            return res.status(400).json({ message: 'No channels found' });
        }

        const pagination = {
            total_records,
            limit: parseInt(limit),
            page: parseInt(page),
            total_pages: Math.ceil(total_records / limit),
        };
        res.status(200).json({ success: true, data: channels, pagination });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch channels.' });
    }
  } else if (req.method === 'POST') {
    try {
        const body = {
            ...req.body,
            created_by: req?.user?.user_id,
            channel_id: uuidv4()
        };
         // Validate the user data
         const validationErrors = channelsValidator(body);
         if (validationErrors) {
           return res.status(400).json({ errors: validationErrors });
         }
        const channel = new Channels(body);
        await channel.save();
        res.status(200).json({ success: true, channel });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Failed to create channel.', error: error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed.' });
  }
}
