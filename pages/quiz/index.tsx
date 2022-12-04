import type { NextPage } from "next";
import { useEffect, useState } from 'react'
import UserMedia from "../../components/UserMedia/UserMedia.component";
import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../../utils"
import { submitForm } from "../../db/db"
import { auth } from "../../db/firebase"
import { wrapper} from "../../store/store"
import { setMediaState } from "../../store/mediaSlice";
import { setTimerState } from "../../store/timer";
import { getAuth } from "firebase/auth";
import React from "react";
import Router from "next/router";


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            store.dispatch(setMediaState(false));
            store.dispatch(setTimerState(false));
            return {
                props: {
                    authState: false,
                    timerState: false,
                },
            };
        }
);


const Quiz: any = () => {
  const auth = getAuth();
  let model = [{
    required : true,
    title : "What is 12 times 2?",
    type : "short-text",
  },
  {
    required : true,
    title : "What is 20 divided by 5?",
    type : "short-text",
  },{
    required : true,
    title : "What is 5 times 5?",
    type : "short-text",
  }]
  const [fillableModel, setFillableModel] = useState(model)
  console.log(model)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<any[]|undefined>()
  const [time1, setTime1] = useState<number[]>([]);
  const [time2, setTime2] = useState<number[]>([]);
  const [diff,setDiff] = useState(0)
  const [hard,setHard] = useState([])
  const [loadingtime,setLoad] = useState(false)
  const [index,setIndex] = useState(0)
  const [status, setStatus] = useState([]);
  const [start, setStart] = useState(false);
  
  React.useEffect(() => {
    if (auth.currentUser === null || auth.currentUser.uid === null || auth.currentUser.email === null) {
      Router.push("/auth/signIn");
      return;
    }
    if (auth.currentUser ===undefined || auth.currentUser.uid === undefined || auth.currentUser.email === undefined) {
      Router.push("/auth/signIn");
      return;
    }
  }, [auth.currentUser]);
  

  const startTime =  () => {
    setLoad(true)
    setTime1([...time1,Date.now()]);
    setLoad(false)
    console.log(time1);
}

const endTime =   () => {
    setIndex(index + 1);
    setLoad(true)
    setTime2([...time2,Date.now()]);
    setTime1([...time1,Date.now()])
    setLoad(false)
    console.log(time2);
}

const onstart = () => {
    setStart(true);
    setTime1([...time1,Date.now()])
}

const handleSubmit = async () => {
    setTime2([...time2,Date.now()]);
    setIndex(index + 1);
    console.log("inside handle submit");
    if(loading) return
    let error : any= hasError(fillableModel)
    setErr(error)
    console.log(error);
    if(error) return setErr(error) 
    setLoading(true)
    console.log(fillableModel)
    let submitableModel = createSubmitableModel(fillableModel)
    try{
        console.log("inside try block");
        await submitForm(submitableModel, 0,time1,time2,hard)
        setLoading(false)
    }catch(e){
        console.log("inside catch block");
        setLoading(false)
    }
}

  

      while(index != fillableModel.length){
         if(fillableModel[index]["type"] === "number"){
            console.log(fillableModel[index]["type"]);
            return (
                
                <div className="grey-container mb-1">
                  <div key={index} className="input">
                  <label>{fillableModel[index]["title"]}{fillableModel[index]["required"] && <span className="err">*</span>}</label>
                      <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                      
                      
                      <div>
                        {index+1==fillableModel.length?(<button className="btn" onClick={handleSubmit}>{ loadingtime ? <span className="spinner white"></span> : <span>Submit</span>}</button>):( <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>)}
                      </div>
                      </div>
                </div>
            )
        } else if(fillableModel[index]["type"] === "number"){
            return (
                <div className="grey-container mb-1">
                    <div key={index} className="input">
                    <label>{fillableModel[index]["title"]}{fillableModel[index]["required"] && <span className="err">*</span>}</label>
                        <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                        
                        <div>
                        {index+1==fillableModel.length?(<button className="btn" onClick={handleSubmit}>{ loadingtime ? <span className="spinner white"></span> : <span>Submit</span>}</button>):( <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>)}
                        </div>
                    </div>
                </div>
            )
        } else if(fillableModel[index]["type"] === "short-text"){
            return (
            <div className="grey-container mb-1">
                <div key={index} className="input">
                <label>{fillableModel[index]["title"]}${fillableModel[index]["required"] && <span className="err">*</span>}</label>
                    <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                    
                    
                    <div>
                    {index+1==fillableModel.length?(<button className="btn" onClick={handleSubmit}>{ loadingtime ? <span className="spinner white"></span> : <span>Submit</span>}</button>):( <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>)}
                    </div>
                </div>
            </div>
            )
        }
         
    }
    
}

const endTime =   () => {
    setIndex(index + 1);
    setLoad(true)
    setTime2([...time2,Date.now()]);
    setTime1([...time1,Date.now()])
    setLoad(false)
    console.log(time2);
}

const onstart = () => {
    setStart(true);
    setTime1([...time1,Date.now()])
}

const handleSubmit = async () => {
    setTime2([...time2,Date.now()]);
    setIndex(index + 1);
    console.log("inside handle submit");
    if(loading) return
    let error : any= hasError(fillableModel)
    setErr(error)
    console.log(error);
    if(error) return setErr(error) 
    setLoading(true)
    console.log(fillableModel)
    let submitableModel = createSubmitableModel(fillableModel)
    try{
        console.log("inside try block");
        await submitForm(submitableModel, 0,time1,time2,hard)
        setLoading(false)
    }catch(e){
        console.log("inside catch block");
        setLoading(false)
    }
}

  

      while(index != fillableModel.length){
         if(fillableModel[index]["type"] === "number"){
            console.log(fillableModel[index]["type"]);
            return (
                <div>
                <div className="grey-container mb-1">
                  <div key={index} className="input">
                  <label>{fillableModel[index]["title"]}{fillableModel[index]["required"] && <span className="err">*</span>}</label>
                      <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                      
                      
                      <div>
                        {index+1==fillableModel.length?(<button className="btn" onClick={handleSubmit}>{ loadingtime ? <span className="spinner white"></span> : <span>Submit</span>}</button>):( <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>)}
                      </div>
                      </div>
                </div>
                <UserMedia uid = {auth.currentUser?.uid} email = {auth.currentUser?.email}/>
                </div>
            )
        } else if(fillableModel[index]["type"] === "number"){
            return (
              <div>
                <div className="grey-container mb-1">
                    <div key={index} className="input">
                    <label>{fillableModel[index]["title"]}{fillableModel[index]["required"] && <span className="err">*</span>}</label>
                        <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                        
                        <div>
                        {index+1==fillableModel.length?(<button className="btn" onClick={handleSubmit}>{ loadingtime ? <span className="spinner white"></span> : <span>Submit</span>}</button>):( <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>)}
                        </div>
                    </div>
                </div>
                <UserMedia uid = {auth.currentUser?.uid} email = {auth.currentUser?.email}/>
                </div>
            )
        } else if(fillableModel[index]["type"] === "short-text"){
            return (
            <div>
            <div className="grey-container mb-1">
                <div key={index} className="input">
                <label>{fillableModel[index]["title"]}${fillableModel[index]["required"] && <span className="err">*</span>}</label>
                    <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                    
                    
                    <div>
                    {index+1==fillableModel.length?(<button className="btn" onClick={handleSubmit}>{ loadingtime ? <span className="spinner white"></span> : <span>Submit</span>}</button>):( <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>)}
                    </div>
                </div>
            </div>
            <UserMedia uid = {auth.currentUser?.uid} email = {auth.currentUser?.email}/>
             </div>
            )
        }
         
    }
    
}

