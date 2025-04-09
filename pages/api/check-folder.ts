export default async function handler(req, res) {
    const { emojiCode } = req.query;

    if (!emojiCode) {
        return res.status(400).json({ error: "Emoji code is required" });
    }

    // Dynamically get the base URL
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || process.env.VERCEL_URL; // Fallback for Vercel
    const baseURL = `${protocol}://${host}`;

    // Define possible file paths (from /public folder in Next.js)
    const basePath = `/assets/emoji/${emojiCode}`;
    const possibleFiles = [`${basePath}/512.webp`, `${basePath}/emoji.svg`];

    // Function to check if a file exists using `fetch`
    const checkFileExists = async (filePath) => {
        try {
            const response = await fetch(`${baseURL}${filePath}`, { method: "HEAD" });
            return response.ok ? `${baseURL}${filePath}` : null;
        } catch (error) {
            return null;
        }
    };

    // Check available files
    const existingFiles = (await Promise.all(possibleFiles.map(checkFileExists))).filter(Boolean);

    if (existingFiles.length === 0) {
        return res.status(200).json({ exists: false, images: [] });
    }

    return res.status(200).json({ exists: true, images: existingFiles });
}
