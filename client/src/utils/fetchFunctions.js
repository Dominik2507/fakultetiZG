
export async function getFakulteti(){
    return await fetch(`/getFaks`,{cors:"no-cors"})
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  
}export async function getSmjer(){
    return await fetch(`/getSmjer`,{cors:"no-cors"})
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  
}export async function getFakultetiWithSmjer(){
    return await fetch(`/getFaksWithSmjers`,{cors:"no-cors"})
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  
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