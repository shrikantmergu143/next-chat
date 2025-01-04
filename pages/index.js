import Utils from '../components/utils';
import Layout from '../components/layout/Layout';
export default function Home() {
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