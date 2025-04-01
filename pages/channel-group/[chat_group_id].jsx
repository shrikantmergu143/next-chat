import { useEffect, useState } from 'react';
import Utils from '../../components/utils';
import Layout from '../../components/layout/Layout';
import ChannelDetails from '../../components/channels/ChannelDetails';
import action from '../../store/action';
import App_url from '../../components/common/constant';
import { useDispatch, useSelector } from 'react-redux';
import ChatMessageList from '../../components/chat-messages/ChatMessageList';

export default function ChannelId(props) {
    const {access_token, channelDetails, MessageList} = useSelector(App_url.allReducers);
    const dispatch = useDispatch();
    const [isTabActive, setIsTabActive] = useState(!document.hidden);
    useEffect(()=>{
        callChannelDetails()
    }, [props?.chat_group_id]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (!props?.chat_group_id) return;
        let interval;
        if (isTabActive) {
            interval = setInterval(() => {
                callGetMessages();
            }, 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [props?.chat_group_id, isTabActive]);
    const callChannelDetails = async () =>{
       await action.getChannelsDetails(access_token, dispatch, props?.chat_group_id)
    };
      const callGetMessages = async () =>{
        const payload = {group_id:props?.chat_group_id}
        if(MessageList?.[props?.chat_group_id]){
            // const length = MessageList?.[props?.chat_group_id]?.length-1;
            // console.log("length", length, MessageList?.[props?.chat_group_id]?.[length]?.updated_at)
            payload.updated_at = new Date().toJSON()
            payload.limit = 5
        }
        await action.getChatMessagesList(access_token, dispatch, payload);
      }
    if(channelDetails?.id !== props?.chat_group_id){
        return (
            <Layout {...props}>
            </Layout>
        );
    }
    return (
        <Layout {...props}>
            <ChannelDetails chatGroupDetails={channelDetails} callGetMessages={callGetMessages} callBackUpdate={callChannelDetails} group_id={props?.chat_group_id}>
                <ChatMessageList {...props}/>
            </ChannelDetails>
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
