import { useEffect } from 'react';
import Utils from '../components/utils';
import Layout from '../components/layout/Layout';
import { useSelector } from 'react-redux';
import App_url from '../components/common/constant';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
  // const dispatch = useDispatch();
  const {access_token} = useSelector(App_url.allReducers);
  // useEffect(()=>{
    const verification = Utils.validateJWT(access_token);
    console.log('Verification Result:', verification);
  // },[])
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