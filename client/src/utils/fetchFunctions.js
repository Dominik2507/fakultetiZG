
export async function getFakulteti(){
    return await fetch(`/getFaks`,{cors:"no-cors"})
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
}

export async function getSmjer(){
    return await fetch(`/getSmjer`,{cors:"no-cors"})
      .then((response) => response.json())
      .catch((err) => console.log(err.message)); 
}

export async function getFakultetiWithSmjer(){
    return await fetch(`/getFaksWithSmjers`,{cors:"no-cors"})
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
}

export async function getFakultetById(id){
  return await fetch(`/fakultet/${id}`,{cors:"no-cors"})
      .then((response) => 
                {
                  if(response.ok) return response.json()
                  else if(response.status==404){
                    alert("Ne postoji traženi fakultet")
                    return null;
                  }
                })
      .catch((err) => console.log(err.message));
}

export async function createFaks(form){
  let obj={...form}
  console.log(obj)
   await fetch(`/fakultet`,{
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      if(response.ok){
        alert("Uspješno dodano");
        return true;
      }
      console.log(response.json())
    })
    .catch((err) => {console.log(err.message) ; return false;});
 
  
  return;
}
export async function updateFaks(form){
  let obj={...form}
  obj.id=obj.faksid;
  console.log(obj)
   await fetch(`/fakultet`,{
    method: "put",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      if(response.ok){
        alert("Uspješno uređeno")
        return response.json();
        console.log(response.json())
      }
    })
    .catch((err) => {console.log(err.message) ; return false;});
 
  
  return;
}

export async function deleteFaks(id){
 
  console.log(id)
   await fetch(`/fakultet/${id}`,{
    method: "delete",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      if(response.ok){
        alert("Uspješno obrisano");
        return true;
      }else if(response.status==404){
        alert("Nema ga")
      }
      console.log(response.json())
    })
    .catch((err) => {console.log(err.message) ; return false;});
 
  
  return;
}

export async function exportCSV(filterOption, filter = ""){

  console.log("filter: "+  filter)
  console.log("filterOption: " + filterOption)

  let obj={
    filter: filter,
    filterOption: filterOption
  }

   await fetch(`/createCSVFile`,{
    method: "post",
    cors: "no-cors",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      document.getElementById("exportCSV").click();
      console.log(response.json())})
    .catch((err) => console.log(err.message));
 
  
  return;
}
export async function exportJSON(filterOption, filter = ""){
  console.log("filter: "+  filter)
  console.log("filterOption: " + filterOption)

  let obj={
    filter: filter,
    filterOption: filterOption
  }

   await fetch(`/createJSONFile`,{
    method: "post",
    cors: "no-cors",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      document.getElementById("exportJSON").click();
      console.log(response.json())})
    .catch((err) => console.log(err.message));
 
  
  return;
}