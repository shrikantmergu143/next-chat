import styles from '../styles/Home.module.css';
import Utils from '../components/utils';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
  // const dispatch = useDispatch();
  // const state = useSelector(App_url.allReducers);
  return (
    <div>
      
    </div>
  );
}
export async function getServerSideProps(context) {
  const title = 'Welcome to Dashboard';
  const description = 'Home Page description';
  return {
    props: {
      title:title,
      description:description,
      env:JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url:Utils.getCurrentURL(context)
    },
  };z
}