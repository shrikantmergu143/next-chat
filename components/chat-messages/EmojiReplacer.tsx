import { useEffect, useRef, useState } from "react";
import Icon from "../common/Icon";

const EmojiReplacer = ({ emojiCode }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                root: null, // viewport
                rootMargin: "0px",
                threshold: 0.1,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;

        const tryLoadImage = (fileName) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                const path = `${window.location.origin}/assets/emoji/${emojiCode?.toLowerCase?.()}/${fileName}`;
                img.src = path;
                img.onload = () => resolve(path);
                img.onerror = () => reject();
            });
        };
        const loadEmojiImage = async () => {
            try {
                const webpPath = await tryLoadImage("512.webp");
                setImageUrl(webpPath);
            } catch {
                try {
                    const svgPath = await tryLoadImage("emoji.svg");
                    setImageUrl(svgPath);
                } catch {
                    setImageUrl(null);
                }
            }
        };

        loadEmojiImage();
    }, [shouldLoad, emojiCode]);

    return (
        <span className="emoji-span" ref={containerRef}>
            {imageUrl ? (
                <Icon attrIcon={imageUrl} image size="xsm" />
            ) : (
                <span className="emoji-span" {...{emoji:String.fromCodePoint(parseInt(emojiCode, 16))}} />
            )}
        </span>
    );
};

export default EmojiReplacer;
