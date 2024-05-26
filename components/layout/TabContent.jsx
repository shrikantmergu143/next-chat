import React from 'react'
import Scrollbar from '../common/Scrollbar'

export default function TabContent() {
  return (
    <div className='view_contents--sidebar'>
        <div className='channel_list'>
            <div className='sidebar_header '>
                
            </div>
            <Scrollbar style={{height: "calc(100vh - 100px)"}}>
                <div className='channel_sidebar__static_list'>
                </div>
            </Scrollbar>
        </div>
    </div>
  )
}
