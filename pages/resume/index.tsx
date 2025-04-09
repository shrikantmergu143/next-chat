import React from 'react'
import ResumePage from '../../components/resume/ResumePage'
import DefaultLayout from '../../components/layout/DefaultLayout';
import Utils from '../../components/utils';

export default function resume(props) {
  return (
    <DefaultLayout {...props} >
      <ResumePage/>
    </DefaultLayout>
  )
}

export async function getServerSideProps(context) {
  const title = 'Shrikant Mergu | Sr. Software Developer | MERN Stack Developer';
  const description = 'Shrikant Mergu | Sr. Software Developer @ Appristine Technologies | Master of Computer Applications';
  // const description = 'Home Page description';
  return {
    props: {
      title: title,
      description: description,
      // image: ""
      env: JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url: Utils.getCurrentURL(context)
    },
  };
}