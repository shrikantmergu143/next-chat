import React, { useEffect } from 'react'
import { usePosterReducers } from '../components/context/usePosterReducers';
import { setStoreDeviceId, setStoreTheme } from '../store/Actions';
import { uuidv4 } from '../components/utils';
import { useDispatch } from 'react-redux';

export default function PageLoad() {
    const {device_id, theme} = usePosterReducers();
    const dispatch = useDispatch();
    useEffect(()=>{
        pageLoad();
    },[])
    const pageLoad = () =>{
        if(!device_id){
            dispatch(setStoreDeviceId(uuidv4()))
        }
    }
    useEffect(()=>{
      if(theme == undefined){
        dispatch(setStoreTheme())
      }
      if(theme){
        const html = document.querySelector("html");
        const body = document.querySelector("body");
          html.classList.toggle(theme);
          body.classList.toggle(theme);
          html.setAttribute("theme", theme);
      }
    },[theme])
  return (
    <div>
        
    </div>
  )
}
