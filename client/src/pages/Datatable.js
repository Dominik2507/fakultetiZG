import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";
import { getFakulteti, getFakultetiWithSmjer, exportCSV, exportJSON } from "../utils/fetchFunctions";


import DataTable from 'react-data-table-component';




const Datatable = (props) => {
  const [fakulteti, setFakultetiList] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterOption, setFilterOption]= useState("wildcard");
  
  
  
  //console.log(columns)
  let optionArray=[]
  Object.keys(fakulteti[0] || {}).forEach(key => optionArray.push(<option key={key} value={key}>{key}</option>))
  
  
  if(filterOption==="wildcard"){

    var faksArray=fakulteti.length > 0 ? 
      fakulteti.filter((fakultet)=>{
        for(let value in fakultet){
            if(fakultet[value].toString().toLowerCase().includes(filter.toString().toLowerCase())) return true;
        }
        return false;
      }) : []
  }
  else{
    console.log(filterOption)
    var faksArray=fakulteti.length>0 ? fakulteti.filter((value)=>{
        return value[filterOption].toString().toLowerCase().includes(filter.toString().toLowerCase())
        }) : [];
  }
 
  
  useEffect(() => {
    const res = getFakultetiWithSmjer().then((item) => {
      //console.log(item.fakulteti[0])
      setFakultetiList(item.fakulteti);
      let columnsTemp=[];
      
      Object.keys(item.fakulteti[0]).forEach(key => columnsTemp.push({name: key, selector: (row)=>row[key], wrap: true}))
      console.log(columnsTemp)
      setColumns(columnsTemp);
    });
  }, []);
   
  let handleChange=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value);

  }
  return (<>
    <TableSection>
      <h1>Tablični prikaz podataka</h1>
      <a href="/"> Vrati se na naslovnicu</a>
      <h2>Prikaz podataka:</h2>
        <form onSubmit={(e) => e.preventDefault()}>
            <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                <option value={"wildcard"}>svi podatci</option>
                {optionArray}
            </select>
          <input type="text" name="filter" id="filter" placeholder="filtriraj" value={filter} onChange={(event)=>{handleChange(event)}}></input>
          <ExportButton onClick={()=>exportCSV(filterOption, filter)}> EXPORT CSV</ExportButton>
        <ExportButton onClick={()=>exportJSON(filterOption, filter)}> EXPORT JSON</ExportButton>
        </form>
        
        <a hidden id="exportCSV" href="./naziv.csv" download="fakulteti" target="_blank"></a>
        <a hidden id="exportJSON" href="./naziv.json" download="fakulteti" target="_blank"></a>
        </TableSection>
        <DataTable
            columns={columns}
            data={faksArray}
            pagination
            highlightOnHover
          
        />
    </>
  );
  
};

export default Datatable;

//styles
const TableSection= styled.section`
    a{
      display:block;
      margin: 10px;
      padding-left: 10px;
    }
    h1{
      width:100%;
      font-size: 2rem;
      padding: 20px;
      background-color: lightgray;
    }
    h2{
      font-size: 1.5rem;
      padding-bottom: 10px;
      margin-left:10px;
    }
    form{
      padding-left: 10px;
      input{
        height: 40px;
      }
      select{height: 40px;}
    }
`;

const ExportButton=styled.button`
  padding:10px;
  margin-left: 10px;
`;