import store, { persistor } from './../store/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import DefaultLayout from './../components/layout/DefaultLayout';
import "./../styles/global.css";
import "./../styles/animation.css";
import "./../styles/media.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import ConfirmModal from '../components/common/ConfirmModal';
import CreateChannelModal from '../components/common/modal/CreateChannelModal';

function App({ Component, pageProps }) {
  return (
    <DefaultLayout {...pageProps}>
      <Provider store={store}>
        <PersistGate loading={<div></div>} persistor={persistor}>
            <Component {...pageProps} />
            <ToastContainer />
            <CreateChannelModal/>
            <ConfirmModal/>
        </PersistGate>
      </Provider>
    </DefaultLayout>
  )
}

export default App;
