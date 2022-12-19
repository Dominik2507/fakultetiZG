import React from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { getFakulteti, getFakultetiWithSmjer, exportCSV, exportJSON , getFakultetById, deleteFaks} from "../utils/fetchFunctions";


import DataTable from 'react-data-table-component';


const BASE_URL="http://localhost:3000/fakultet/"


const SingleItem = (props) => {
  const [fakulteti, setFakultetiList] = useState([]);
  let fakultet=fakulteti[0];
  let params=useParams();
  let navigate=useNavigate();
  
  useEffect(() => {
    let id=params.id;
    console.log("id: "+ id);
    const res = getFakultetById(id).then((item) => {
      //console.log(item.fakulteti[0])
      console.log(item)
      if(item==null) navigate("/datatable")
      setFakultetiList(item.fakulteti);
     
    });
  }, []);
   
  let rows=[];
  for(let faksRow of fakulteti){
    rows.push(
    <div key={faksRow.imestudija} style={{paddingLeft: "40px"}}>
        <h4>Studij</h4>
        <div>Ime Studija:  {faksRow?.imestudija}</div>
        <div>Razina:  {fakultet?.razinastudija}</div>
        <div>Semestara:  {fakultet?.brojsemestara}</div>
        <div>Izvedba:  {fakultet?.nacinizvedbe}</div>
        <div>Akademska godina:  {fakultet?.akgodina}</div>
    </div>)
  }
  
  return (
    <div style={{padding: "10px"}}>
        <h1>Fakultet</h1>
        <div>Ime: {fakultet?.ime}</div>
        <div>Adresa: {fakultet?.adresa}</div>
        <div>Dekan: {fakultet?.dekan}</div>
        <div>Mail: {fakultet?.eadresa}</div>
        <div>Faks:  {fakultet?.faks}</div>
        <div>Telefon:  {fakultet?.telefon}</div>
        <div>Web adresa:  {fakultet?.webadresa}</div>
        <Link to={"/update/"+params.id}> Uredi </Link>
        <Link to={"/datatable"}> Nazad </Link>
        <button onClick={()=>deleteFaks(params.id)}> Obriši </button>
        <hr/>
        <h2>Studiji</h2>
        {rows}
    </div>
    
  );
  
};

export default SingleItem;