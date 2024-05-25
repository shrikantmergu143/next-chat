import { useEffect } from 'react';
import Utils from '../components/utils';
import Layout from '../components/layout/Layout';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
  // const dispatch = useDispatch();
  // const state = useSelector(App_url.allReducers);
  useEffect(()=>{
    // Example usage
    const token = Utils.generateAuthToken({ id: "asdasdsadsadasdsadsadsadsa", email: 'example@example.com', access_type: 'admin', user:"login" });
    console.log('Generated Token:', token);

    const verification = Utils.validateJWT("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNocmlrYW50X21lcmd1IiwicGFzc3dvcmQiOiJTaHJpa2FudEAxMjMiLCJlbWFpbCI6InNocmlrYW50MzJAbWFpbGluYXRvci5jb20iLCJmaXJzdF9uYW1lIjoiRmlyc3QgbmFtZSBmaWVsZCBpcyByZXF1aXJlZCIsImxhc3RfbmFtZSI6Ikxhc3QgbmFtZSBmaWVsZCBpcyByZXF1aXJlZCIsIl9pZCI6IjY2NGNiZmQxYzJkYWZkMzdjNDBhOTcyYiIsImV4cCI6MTcxNjM0OTA3NH0.83pPBbpGBMlSmp0tYBxefExq4yt3mrj_fjpgRwP6rUo");
    console.log('Verification Result:', verification);
  },[])
  return (
    <Layout>
      
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