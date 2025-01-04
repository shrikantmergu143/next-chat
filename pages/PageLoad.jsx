import React, { useEffect } from 'react'
import { usePosterReducers } from '../components/context/usePosterReducers';
import { setStoreDeviceId } from '../store/Actions';
import { uuidv4 } from '../components/utils';
import { useDispatch } from 'react-redux';

export default function PageLoad() {
    const {device_id} = usePosterReducers();
    const dispatch = useDispatch();
    useEffect(()=>{
        pageLoad();
    },[])
    const pageLoad = () =>{
        if(!device_id){
            dispatch(setStoreDeviceId(uuidv4()))
        }
    }
  return (
    <div>
        
    </div>
  )
}
