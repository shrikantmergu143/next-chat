import connectToDatabase from "../../lib/configData";
import { authenticateToken } from "../../validators/userValidator";

export default async function Authenticate (req, res, next){
    const authResult = authenticateToken(req.headers.authorization, req);
    if (!authResult.status) {
        return res.status(401).json({ error: authResult.message });
    }
    await connectToDatabase();
    next();
}