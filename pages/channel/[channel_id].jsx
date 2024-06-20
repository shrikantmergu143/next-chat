import { useEffect } from 'react';
import Utils from '../../components/utils';
import Layout from '../../components/layout/Layout';
import ChannelDetails from '../../components/channels/ChannelDetails';
import action from '../../store/action';
import App_url from '../../components/common/constant';
import { useDispatch, useSelector } from 'react-redux';

export default function ChannelId(props) {
    const {access_token, channelDetails} = useSelector(App_url.allReducers);
    const dispatch = useDispatch();
    useEffect(()=>{
        callChannelDetails()
    }, [props?.channel_id]);
    const callChannelDetails = async () =>{
       await action.getChannelsDetails(access_token, dispatch, props?.channel_id)
    };
    if(channelDetails?.channel_id !== props?.channel_id){
        return (
            <Layout {...props}>
            </Layout>
        );
    }
    return (
        <Layout {...props}>
            <ChannelDetails channelDetails={channelDetails} />
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
        // const response = await GetFetchRequestAPI(`${App_url.api.API_CHANNELS}/${params?.channel_id}`, access_token);
        // console.log("response", response, access_token, false, params?.channel_id);
        return {
            props: {
                title: title,
                description: description,
                env: JSON.stringify(Utils.getCommonEnv(process?.env)),
                localhost_url: Utils.getCurrentURL(context),
                channel_id: params?.channel_id
                // channelData: response, // Pass the fetched channel data to props
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
