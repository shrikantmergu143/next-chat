const App_url = {
    allReducers: (state) => state.allReducers,
    icons:{
        ArrowLeft: "/assets/icons/ArrowLeft.svg",
        ClockIcon: "/assets/icons/ClockIcon.svg",
        SearchIcon: "/assets/icons/SearchIcon.svg",
        default_image: "/assets/default_image.webp",
        default_group_light: "/assets/icons/default_group_light.webp",
        default_group: "/assets/icons/default_group.webp",
        default_user_light: "/assets/icons/default_user_light.webp",
        HomeIcon: "/assets/icons/HomeIcon.svg",
        ChatIcon: "/assets/icons/ChatIcon.svg",
        repeat: "/assets/icons/repeat.svg",
        Ellipsis: "/assets/icons/Ellipsis.svg",
        Notification: "/assets/icons/Notification.svg",
        PlusIcon: "/assets/icons/PlusIcon.svg",
        Setting: "/assets/icons/Setting.svg",
        Bookmark: "/assets/icons/Bookmark.svg",
        Edit: "/assets/icons/Edit.svg",
        FilterIcon: "/assets/icons/FilterIcon.svg",
        Down: "/assets/icons/Down.svg",
        Lock: "/assets/icons/Lock.svg",
        DownDot: "/assets/icons/DownDot.svg",
        Hash: "/assets/icons/Hash.svg",
        Close: "/assets/icons/Close.svg",
        Bold: "/assets/icons/Bold.svg",
        Italic: "/assets/icons/Italic.svg",
        Indent: "/assets/icons/Indent.svg",
        Attach: "/assets/icons/Attach.svg",
        OrderList: "/assets/icons/OrderList.svg",
        Strike: "/assets/icons/Strike.svg",
        UnOrderList: "/assets/icons/UnOrderList.svg",
        Quote: "/assets/icons/Quote.svg",
        Code: "/assets/icons/Code.svg",
        CodeBlock: "/assets/icons/CodeBlock.svg",
        Underline: "/assets/icons/Underline.svg",
        Link: "/assets/icons/Link.svg",
        Undo: "/assets/icons/Undo.svg",
        Redo: "/assets/icons/Redo.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Alphabet: "/assets/icons/Alphabet.svg",
        Send: "/assets/icons/Send.svg",
        Smile: "/assets/icons/Smile.svg",
        People: "/assets/icons/People.svg",
        Activities: "/assets/icons/Activities.svg",
        Travel: "/assets/icons/Travel.svg",
        Food: "/assets/icons/Food.svg",
        Check: "/assets/icons/Check.svg",
        Dot: "/assets/icons/Dot.svg",
        Objects: "/assets/icons/Objects.svg",
        Flags: "/assets/icons/Flags.svg",
        Tag: "/assets/icons/Tag.svg",
        AudioRecording: "/assets/icons/AudioRecording.svg",
        VideoRecording: "/assets/icons/VideoRecording.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",
        Eraser: "/assets/icons/Eraser.svg",

    },
    link:{
        Register:"/register",
        Login:"/login",
        Home:"/",
        Channel:"/channel",
        ChatGroup:"/channel-group",
        Friend:"/friend",
    },
    api:{
        API_AUTH_LOGIN: "api/login",
        API_REGISTER: "api/register",
        API_CHANNELS:"api/channels",
        SEND_FRIEND_REQUEST:"api/friends",
        // express.ts api
        API_LOGIN:"api/sign-in",
        API_SIGN_UP:"api/sign-up",
        API_GET_GROUPS:"api/chat/get-group",
        API_USER_DETAILS:"api/user-details",
        API_CREATE_GROUP:"api/chat/create-group",
        API_GET_GROUP_DETAILS:"api/chat/get-group-details",
        API_GET_CHAT_MESSAGES_LIST:"api/chat/get-message-list",
        API_UPDATE_CHAT_MESSAGE:"api/chat/update-message",
        API_CREATE_CHAT_MESSAGE:"api/chat/create-message",
        API_UPDATE_INVITE_GROUP:"api/chat/update-invite-group"
    }
}

export default App_url;