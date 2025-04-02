import React, { useEffect, useLayoutEffect } from 'react'
import { usePosterReducers } from '../components/context/usePosterReducers';
import { setStoreDeviceId, setStoreTheme, setUpdatePaginationList } from '../store/Actions';
import { uuidv4 } from '../components/utils';
import { useDispatch } from 'react-redux';
import PinGenerate from '../components/common/modal/PinGenerate';

export default function PageLoad() {
    const {device_id, theme, pagination} = usePosterReducers();
    const dispatch = useDispatch();
    useEffect(()=>{
        pageLoad();
    },[])
    const pageLoad = () =>{
      console.log("pagination", pagination)
        if(!device_id){
            dispatch(setStoreDeviceId(uuidv4()))
        }
        if(!pagination?.page_number){
          dispatch(setUpdatePaginationList({
            page_data:[],
            page_size:40,
            page_number:1
          }))
      }
    }
    useLayoutEffect(()=>{
      if(theme == undefined){
        dispatch(setStoreTheme())
      }
      if (theme) {
        console.log("theme", theme);
        const html = document.querySelector("html");
        const body = document.querySelector("body");
        // html.classList.toggle(theme);
        // body.classList.toggle(theme);
        body.setAttribute("class", theme);
        html.setAttribute("theme", theme);
      }
    },[theme])
  return (
    <div>
        <PinGenerate />
    </div>
  )
}
