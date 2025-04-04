export default async function handler(req, res) {
    const { emojiCode } = req.query;

    if (!emojiCode) {
        return res.status(400).json({ error: "Emoji code is required" });
    }

    // Get the full base URL dynamically from the request
    const protocol = req.headers["x-forwarded-proto"] || (req.connection.encrypted ? "https" : "http");
    const host = req.headers.host;
    const baseURL = `${protocol}://${host}`;

    // Define possible file paths
    const basePath = `/assets/emoji/${emojiCode}`;
    const possibleFiles = [`${basePath}/512.webp`, `${basePath}/emoji.svg`];

    // Function to check if the file exists by sending a `HEAD` request
    const checkFileExists = async (filePath) => {
        try {
            const response = await fetch(`${baseURL}${filePath}`, { method: "HEAD" });
            return response.ok ? `${baseURL}${filePath}` : null;
        } catch (error) {
            return null;
        }
    };

    // Check all files
    const existingFiles = (await Promise.all(possibleFiles.map(checkFileExists))).filter(Boolean);

    if (existingFiles.length === 0) {
        return res.status(200).json({ exists: false, images: [] });
    }

    return res.status(200).json({ exists: true, images: existingFiles });
}
