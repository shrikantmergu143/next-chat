import { useEffect } from 'react';
import Utils from '../../components/utils';
import Layout from '../../components/layout/Layout';
import ChannelDetails from '../../components/channels/ChannelDetails';
import action from '../../store/action';
import App_url from '../../components/common/constant';
import { useDispatch, useSelector } from 'react-redux';

export default function ChannelId(props) {
    const {access_token, friendsDetails} = useSelector(App_url.allReducers);
    const dispatch = useDispatch();
    useEffect(()=>{
        callChannelDetails()
    }, [props?.friend_id]);
    const callChannelDetails = async () =>{
       await action.getFriendsDetails(access_token, dispatch, props?.friend_id)
    };
    if(friendsDetails?.friend_id !== props?.friend_id){
        return (
            <Layout {...props}>
            </Layout>
        );
    }
    return (
        <Layout {...props}>
            <ChannelDetails chatGroupDetails={friendsDetails} />
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
                friend_id: params?.friend_id
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
