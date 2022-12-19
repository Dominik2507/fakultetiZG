import React from "react";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFaks } from "../utils/fetchFunctions";

const Create= (props) => {
    
    const [form, handleForm] = useState(
        {
                    ime:"",
                    adresa:"",
                    dekan:"",
                    eadresa:"",
                    faks:"",
                    telefon:"",
                    webadresa:""
        }
    )
    let navigate=useNavigate();
    

    let handleInputChange = (e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        handleForm({...form,[name]:value})
    }

    let HandleSubmit= ()=>{
        //console.log(form);
        if(createFaks(form)) navigate("/create")
        else{
            alert("Neuspjeh")
        }
       
    }

    return (
        <>  
        <div >
            <form lang="hr" action="/" onSubmit={(e)=>{
                                e.preventDefault();
                                HandleSubmit(e);
                                }
                                }>
                <div style={{padding: "10px"}}>
                    <label for="ime">Ime fakulteta: </label>
                    <input required name="ime" value={form.ime} id="ime" onChange={(e)=>handleInputChange(e)} placeholder="ime"></input>
                </div>
                <div style={{padding: "10px"}}>
                    <label for="adresa">Adresa: </label>
                    <input required name="adresa" value={form.adresa} id="adresa" onChange={(e)=>handleInputChange(e)} placeholder="adresa"></input>
                </div>
                <div style={{padding: "10px"}}>
                    <label for="dekan">Dekan: </label>
                    <input required name="dekan" value={form.dekan} id="dekan" onChange={(e)=>handleInputChange(e)} placeholder="dekan"></input>
                </div>
                <div style={{padding: "10px"}}> 
                    <label for="eadresa">Email: </label>
                    <input required name="eadresa" type={"email"} value={form.eadresa} id="eadresa" onChange={(e)=>handleInputChange(e)} placeholder="email"></input>
                </div>
                <div style={{padding: "10px"}}>
                    <label for="faks">Faks:</label>
                    <input required value={form.faks} name="faks" id="faks" onChange={(e)=>handleInputChange(e)} placeholder="faks"></input>
                </div>
                <div style={{padding: "10px"}}>
                    <label for="telefon">Telefon:</label>
                    <input required value={form.telefon} name="telefon" id="telefon" onChange={(e)=>handleInputChange(e)} placeholder="telefon"></input>
                </div>
                <div style={{padding: "10px"}}>
                    <label for="webadresa">Web adresa:</label>
                    <input required value={form.webadresa} name="webadresa" id="webadresa" onChange={(e)=>handleInputChange(e)} placeholder="webadresa"></input>
                </div>
               
                <div >
                    <input style={{padding: "10px", margin: "10px"}} type="reset" onClick={()=>handleForm({
                    ime:"",
                    adresa:"",
                    dekan:"",
                    eadresa:"",
                    faks:"",
                    telefon:"",
                    webadresa:""
        })}></input>
                    <input style={{padding: "10px"}} type="submit" value="Stvori novi zapis"></input>
                </div>
            </form>

        </div>
        <a href="/" id="formlink" hidden/>
        </>

    );
};
export default Create;
