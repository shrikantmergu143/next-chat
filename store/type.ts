
export type IStoreDeleteMessage={
    group_id: String;
    message_id: String;
}
export type IAllReducers = {
    payload: IStoreDeleteMessage | any;
    type: String;
}
export type IReducers = {
    currentUser: any;
    access_token: any;
    channelsList: any;
    friendsList: any;
    MessageList: any;
    ModalPopup: any;
    channelDetails: any;
    friendsDetails: any;
    activeTab: any;
    device_id: any;
    theme: any;
    socketResponse: any;
    pinEntered: any;
    pagination: any;
}
export type IMessagesStatus = {
    read_at: String;
    delivery_at: String;
    _id: String;
}
export type IMessageItem={
    _id?: string;
    sender_id?: string;
    index?: number;
    group_id?: string;
    message?: string;
    message_type?: string;
    media_url?: "";
    is_deleted?: [];
    messages_status?: {
        [user_id: string]: IMessagesStatus
    };
    chat_id?: string;
    created_at?: string;
    updated_at?: string;
    __v?: any;
    hideAvatar?:Boolean;
};