"use client"
import { restoreSession } from "@/redux/features/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
 
const RestoreSession=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{dispatch(restoreSession())},[]);
    return null
}

export default RestoreSession;
