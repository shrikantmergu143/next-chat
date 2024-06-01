import { useEffect } from 'react';
import Utils from '../../components/utils';
import LoginLayout from '../../components/layout/LoginLayout';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
  // const dispatch = useDispatch();
  // const state = useSelector(App_url.allReducers);
  return (
    <LoginLayout>
      
    </LoginLayout>
  );
}
export async function getServerSideProps(context) {
  const title = 'Login';
  const description = 'Login';
  return {
    props: {
      title: title,
      description: description,
      env: JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url: Utils.getCurrentURL(context)
    },
  };z
}