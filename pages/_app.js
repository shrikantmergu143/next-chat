import store, { persistor } from './../store/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import DefaultLayout from './../components/layout/DefaultLayout';
import "./../styles/global.css";
import "./../styles/animation.css";
import "./../styles/media.css";
import "./../styles/print.css";
import "./../styles/theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import ConfirmModal from '../components/common/ConfirmModal';
import CreateChannelModal from '../components/common/modal/CreateChannelModal';
import Context from '../components/context/SocketContext';
import CreateFriend from '../components/common/modal/CreateFriend';
import PageLoad from './PageLoad';
import React from 'react';

function App({ Component, pageProps }) {
  const loadComponent = () =>{
    return (
      <Context {...pageProps}>
        <Component {...pageProps} />
        <ToastContainer />
        <CreateChannelModal/>
        <ConfirmModal/>
        <CreateFriend/>
      </Context>
    )
  }

  return (
    <DefaultLayout {...pageProps}>
      <Provider store={store}>
        <PersistGate loading={<div></div>} persistor={persistor}>
          {loadComponent()}
          <PageLoad/>
        </PersistGate>
      </Provider>
    </DefaultLayout>
  )
}

export default App;
