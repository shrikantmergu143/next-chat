import { useEffect, useState } from "react";

const EmojiReplacer = ({ emojiCode }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const checkFolder = async () => {
            try {
                const res = await fetch(`/api/check-folder?emojiCode=${emojiCode}`);
                const data = await res.json();

                if (data.exists && data.images.length > 0) {
                    // Prioritize .webp, fallback to .svg
                    const webpImage = data.images.find(img => img.endsWith(".webp"));
                    const svgImage = data.images.find(img => img.endsWith(".svg"));
                    const selectedImage = webpImage || svgImage;

                    if (selectedImage) {
                        setImageUrl(`${window.location.origin}${selectedImage}`);
                    }
                }
            } catch (error) {
                console.error("Error fetching emoji images:", error);
            }
        };

        checkFolder();
    }, [emojiCode]);

    return (
        <>
            {imageUrl ? (
                <img src={imageUrl} alt={`Emoji ${emojiCode}`} width={24} height={24} />
            ) : (
                <span className="emoji-span" emoji={String.fromCodePoint(parseInt(emojiCode, 16))} /> // Fallback to emoji
            )}
        </>
    );
};

export default EmojiReplacer;
