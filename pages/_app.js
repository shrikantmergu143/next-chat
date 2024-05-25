import store, { persistor } from './../store/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import DefaultLayout from './../components/layout/DefaultLayout';
import "./../styles/global.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }) {
  return (
    <DefaultLayout {...pageProps}>
      <Provider store={store}>
        <PersistGate loading={<div></div>} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </DefaultLayout>
  )
}

export default App;
