import React, { useMemo, useState, useEffect, useRef } from "react";
import emoji from "./emoji.json";
import Scrollbar from "../common/Scrollbar";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import emoji_new from "./emoji_new.json";

const ITEMS_PER_PAGE = 2000000;

const EmojiPicker = (props) => {
    const [SelectEmojiTab, setSelectEmojiTab] = useState("Smileys and emotions");
    const [searchEmojiValue, setSearchEmojiValue] = useState("");
    const [page, setPage] = useState(1);
    const scrollRef = useRef(null);
    const [show, setShow] = useState(false);

    // Create a ref for the emoji picker modal container
    const emojiPickerRef = useRef(null);

    const selectEmoji = (emoji) => {
        if (props.onEmojiClick) {
            if (emoji?.codepoint) {
                props.onEmojiClick({
                    image: `${window.location.origin}/assets/emoji/${emoji?.codepoint}/512.webp`,
                });
            }
            if (emoji?.emoji) {
                props.onEmojiClick({
                    emoji: emoji?.emoji,
                });
            }
        }
    };

    const filteredEmojis = useMemo(() => {
        return (
            emoji_new
                ?.filter((elm) => elm?.categories?.includes(SelectEmojiTab))
                ?.filter((elm) =>
                    searchEmojiValue === ""
                        ? true
                        : elm?.description?.toLowerCase()?.includes(searchEmojiValue?.toLowerCase())
                ) || []
        );
    }, [SelectEmojiTab, searchEmojiValue]);

    const paginatedEmojis = useMemo(() => {
        return filteredEmojis.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredEmojis, page]);

    const icons = [
        { name: "Smileys and emotions", icon: App_url.icons.Smile },
        { name: "People", icon: App_url.icons.People },
        { name: "Activities and events", icon: App_url.icons.Activities },
        { name: "Travel and places", icon: App_url.icons.Travel },
        { name: "Food and drink", icon: App_url.icons.Food },
        { name: "Objects", icon: App_url.icons.Objects },
        { name: "Flags", icon: App_url.icons.Flags },
    ];

    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(true);
    };

    const renderEmojis = () => {
        if (!show) {
            return null;
        }
        return (
            <div
                ref={emojiPickerRef} // Attach the ref to the modal container
                className={`emoji-content ${props?.className ? props?.className : "max-w-sm"}`}
            >
                <div className="emoji-type">
                    {icons?.map?.((tab) => (
                        <Icon
                            key={tab.name}
                            attrIcon={tab?.icon}
                            button
                            variant={SelectEmojiTab === tab?.name ? "primary" : ""}
                            onClick={()=>setSelectEmojiTab(tab?.name)}
                        />
                    ))}
                </div>

                <div className="emoji-section">
                    <div className="search-emoji">
                        <input
                            type="text"
                            value={searchEmojiValue}
                            onChange={(e) => setSearchEmojiValue(e.target.value)}
                            placeholder={`Search emoji in ${SelectEmojiTab.replace("_", " ").toLowerCase()}`}
                            className="w-full leading-none p-1 px-2 border rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <Scrollbar style={{ height: 206 }}>
                        <ul className="emoji-list">
                            {paginatedEmojis.map((emoji, index) => (
                                <li
                                    key={index}
                                    className="flex justify-center items-center text-2xl cursor-pointer bg-transparent rounded-3xl drop-shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-br from-yellow-200 to-yellow-400"
                                    onClick={() => selectEmoji(emoji)}
                                >
                                    {emoji?.codepoint && (
                                        <Icon image attrIcon={`${window.location.origin}/assets/emoji/${emoji?.codepoint}/emoji.svg`} />
                                    )}
                                    {emoji?.emoji}
                                </li>
                            ))}
                            {paginatedEmojis.length === 0 && (
                                <div className="col-span-8 flex flex-col items-center">
                                    <h4 className="text-gray-500 text-sm">Emoji Not Found</h4>
                                </div>
                            )}
                        </ul>
                    </Scrollbar>
                </div>
            </div>
        );
    };

    // Close the emoji picker if the user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShow(false); // Close the modal if clicked outside
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="emojis">
            <div className="emoji-icons" onClick={onClick}>
                {props?.children}
            </div>
            {renderEmojis()}
        </div>
    );
};

export default EmojiPicker;
