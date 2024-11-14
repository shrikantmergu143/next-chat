import { useContext, useEffect } from 'react';
import Utils from '../components/utils';
import Layout from '../components/layout/Layout';
import { useSelector } from 'react-redux';
import App_url from '../components/common/constant';
import { SocketConnect } from '../components/context/SocketContext';
import SendRequest from '../components/context/SocketRequest';
import WebRTCChat from '../components/video_chat/VideoChatPage';
import VideoChat from '../components/video_chat/VideoBase';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
  const {connect} = useContext(SocketConnect)
  // const dispatch = useDispatch();
  // const {access_token} = useSelector(App_url.allReducers);
  // useEffect(()=>{
    // const verification = Utils.validateJWT(access_token);
    // console.log('Verification Result:', verification);
  // },[])
  useEffect(()=>{
    if(connect){
      SendRequest(connect, {"url":"get_user_details", "request":{"user_id":"643bae35482bb59a80685acd",  broadcast:true}, broadcast:true})
    }
  },[connect])
  return (
    <Layout>
      <VideoChat/>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const title = 'Welcome to Dashboard';
  const description = 'Home Page description';
  return {
    props: {
      title: title,
      description: description,
      env: JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url: Utils.getCurrentURL(context)
    },
  };z
}