import { useEffect, useMemo, useState } from 'react';
import Utils from '../../components/utils';
import Layout from '../../components/layout/Layout';
import ChannelDetails from '../../components/channels/ChannelDetails';
import action from '../../store/action';
import App_url from '../../components/common/constant';
import { useDispatch, useSelector } from 'react-redux';
import ChatMessageList from '../../components/chat-messages/ChatMessageList';
import { setStorePaginationList } from '../../store/Actions';

export default function ChannelId(props) {
    const {access_token, channelDetails, MessageList, pagination} = useSelector(App_url.allReducers);
    const dispatch = useDispatch();
    useEffect(()=>{
        callChannelDetails()
    }, [props?.chat_group_id]);

    const callChannelDetails = async () =>{
       await action.getChannelsDetails(access_token, dispatch, props?.chat_group_id)
    };
    const callGetMessages = async (date) =>{
        const payload = {group_id:props?.chat_group_id}
        if(MessageList?.[props?.chat_group_id]?.length){
            const length = MessageList?.[props?.chat_group_id]?.length-1;
            payload.updated_at = MessageList?.[props?.chat_group_id]?.[0]?.updated_at || new Date().toJSON();
            payload.limit = 40
        }
        if(date){
            payload.updated_at = date
        }
        const message_get = MessageList?.[props?.chat_group_id]?.[0];
        const response = await action.getChatMessagesList(access_token, dispatch, payload);
        if(message_get){
            Utils.gotoMainPageMessage(message_get?._id);
        }
        if(response?.status === 200){
            if(!MessageList?.[props?.chat_group_id]?.length){
                dispatch(setStorePaginationList({
                    page_data: response?.data?.data?.data,
                    page_size: 40,
                    page_number: 1
                }))
            }
        }else{
        }
    }
    const renderDom = () =>{
        return(
            <ChannelDetails chatGroupDetails={channelDetails} callGetMessages={callGetMessages} callBackUpdate={callChannelDetails} group_id={props?.chat_group_id}>
                <ChatMessageList {...props} callGetMessages={callGetMessages} group_id={props?.chat_group_id} />
            </ChannelDetails>
        )
    }
    if(channelDetails?.id !== props?.chat_group_id){
        return (
            <Layout {...props}>
            </Layout>
        );
    }
    return (
        <Layout {...props}>
            {renderDom()}
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { req, params } = context;
    const title = 'Welcome to Dashboard';
    const description = 'Home Page description';
    const cookies = req.headers.cookie ? Utils.parseCookies(req.headers.cookie) : {};
    const access_token = cookies.access_token;

    try {
        return {
            props: {
                title: title,
                description: description,
                env: JSON.stringify(Utils.getCommonEnv(process?.env)),
                localhost_url: Utils.getCurrentURL(context),
                chat_group_id: params?.chat_group_id
            },  
        };
    } catch (error) {
        console.error("Error fetching channel data:", error);
        return {
            props: {
                title: title,
                description: description,
                env: JSON.stringify(Utils.getCommonEnv(process?.env)),
                localhost_url: Utils.getCurrentURL(context),
                error: 'Failed to fetch channel data',
            },
        };
    }
}
