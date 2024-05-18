import React from 'react'
import dynamic from 'next/dynamic'
const SeoMetaData = dynamic(() =>import('./SeoMetaData'), {ssr:true})

export default function DefaultLayout(props) {
  const Env = props?.env? JSON.parse(props?.env):null
  const StaticData = {...props, ...Env };

  return (
    <React.Fragment>
      <SeoMetaData {...StaticData}/>
      {props?.children}
    </React.Fragment>
  )
}
