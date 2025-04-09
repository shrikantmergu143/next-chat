
export default function handler(req, res) {

    res.setHeader('Set-Cookie', `access_token=; Path=/; HttpOnly`);

    res.status(200).json({ message: 'Logged out successfully' });
}