import JSZip from "jszip";
import { useEffect } from "react";
import emoji from "./emoji.json";

const emojis = emoji?.icons
const baseSvgUrl = "https://fonts.gstatic.com/s/e/notoemoji/latest/";
const baseWebpUrl = "https://fonts.gstatic.com/s/e/notoemoji/latest/";

async function fetchFile(url) {
    const response = await fetch(url);
    return response.blob();
}

const downloadEmojis = async () => {
    const zip = new JSZip();
    
    for (const emoji of emojis) {
        const folder = zip.folder(emoji?.codepoint);
        if (!folder) continue;
        
        const svgUrl = `${baseSvgUrl}${emoji?.codepoint}/emoji.svg`;
        const webpUrl = `${baseWebpUrl}${emoji?.codepoint}/512.webp`;

        const svgBlob = await fetchFile(svgUrl);
        const webpBlob = await fetchFile(webpUrl);
        
        folder.file("emoji.svg", svgBlob);
        folder.file("512.webp", webpBlob);
    }
    
    zip.generateAsync({ type: "blob" }).then((content) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "emojis.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
};

const EmojiDownloader = () => {
    // useEffect(() => {
    //     downloadEmojis();
    // }, []);

    return <button onClick={downloadEmojis}>Download Emojis</button>;
};

export default EmojiDownloader;