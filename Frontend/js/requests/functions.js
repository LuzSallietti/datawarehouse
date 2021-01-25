async function getData(route){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;

    let options = {
        method: "GET",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(route, options);
    let content = await response.json();
    return content;
}

async function getDataByFilter(route){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;    
    let options = {
        method: "GET",        
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(route, options);
    let content = await response.json();
    return content;

}

async function postData(route, data){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;
    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(route, options);
    let content = await response.json();
    return content;
}

async function getData_by_id(route, id){
    const path = `${route}/${id}`;
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;

    let options = {
        method: "GET",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(path, options);
    let content = await response.json();
    return content;
}

async function updateData(route, contact_id, data){
    const path = `${route}/${contact_id}`;
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;
    let options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(path, options);
    let content = await response.json();
    return content;
}

async function deleteData(route, id){
  const path = `${route}/${id}`;
  const jwt = sessionStorage.getItem("token");
  let bearer = 'Bearer ' + jwt; 
  let options = {
      method: "DELETE",      
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
    }
  };
  let response = await fetch(path, options);
  let content = await response.json();
  return content ;
}