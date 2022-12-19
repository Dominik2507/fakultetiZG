import React from "react";


import { useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateFaks, getFakultetById } from "../utils/fetchFunctions";

const Update= (props) => {
    let params=useParams();
    let navigate=useNavigate();

    const [form, handleForm] = useState(
        {
                    id: undefined,
                    ime:"",
                    adresa:"",
                    dekan:"",
                    eadresa:"",
                    faks:"",
                    telefon:"",
                    webadresa:""
        }
    )

    
    const [fakulteti, setFakultetiList] = useState([]);
    let fakultet=fakulteti[0];

    useEffect(() => {
       let id=params.id
      console.log("id: "+ id);
      const res = getFakultetById(id).then((item) => {
        //console.log(item.fakulteti[0])
        
        setFakultetiList(item.fakulteti);
        handleForm(item.fakulteti[0])
        
      handleForm({...form, "id":id});
       
      });
    }, []);
    

    let handleInputChange = (e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        handleForm({...form,[name]:value})
    }

    let HandleSubmit= ()=>{
        //console.log(form);
        let result=updateFaks(form).then(
            (item)=>{
                console.log(item)
            }
        )
        
        
        
        console.log(result)
        if(result){
            //navigate("/datatable")
        }else{
            alert("Neuspjeh")
            navigate("/update/"+params.id)
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
                <input name="id" value={form.id} id="id" readOnly hidden></input>
                <div style={{padding: "10px", width: "100%"}}>
                    <label for="ime">Ime fakulteta: </label>
                    <input required name="ime" value={form.ime} id="ime" onChange={(e)=>handleInputChange(e)} placeholder="ime" style={{width: "400px"}}></input>
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
                    <input required name="eadresa" value={form.eadresa} id="eadresa" onChange={(e)=>handleInputChange(e)} placeholder="email"></input>
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
                    <input style={{padding: "10px"}} type="submit" value="Spremi"></input>
                </div>
            </form>

        </div>
        <Link to={"/datatable"}> Datatable </Link>
        
        <a href="/" id="formlink" hidden/>
        </>

    );
};
export default Update;
