const create_region_btn = document.getElementsByClassName("create-region");
const regions_list = document.getElementById("regionsList");
const new_region_section = document.getElementById("new-region-section");
const new_region_form = document.getElementById("createRegionForm");
const region_name = document.getElementById("regionName");
const confirmation_modal = document.getElementById("confirmationModal");
const close_confirmation_modal = document.getElementById("closeConfirmationModal");
const close_new_region_form = document.getElementById("close-form");
const close_alert_modal = document.getElementById("close-alert-msg");
const delete_region_modal = document.getElementById("deleteRegion-modal");
const edit_region_section = document.getElementById("edit-region-section");
const edit_region_form = document.getElementById("editRegionForm");
const edit_region_name = document.getElementById("regionName-Edited");
const close_edit_region_form = document.getElementById("close-edit-form");
const delete_rg_element = document.getElementById("deleteElement");

const create_country_btn = document.getElementsByClassName("create-country");
const new_country_section = document.getElementById("new-country-section");
const new_country_form = document.getElementById("createCountryForm");
const country_name = document.getElementById("countryName");
const close_new_country_form = document.getElementById("close-country-form");
const edit_country_section = document.getElementById("edit-country-section");
const edit_country_form = document.getElementById("editCountryForm");
const edit_country_name = document.getElementById("countryName-Edited"); 
const close_edit_country_form = document.getElementById("close-editCountry-form");
const delete_country_modal = document.getElementById("deleteCountry-modal");
const close_delete_country_modal = document.getElementById("discard-deleteCountry");
const discard_delete_country = document.getElementById("cancelDeleteCountry");

const new_city_section = document.getElementById("new-city-section");
const new_city_form = document.getElementById("createCityForm");
const close_new_city_form = document.getElementById("close-city-form");
const city_name = document.getElementById("cityName");
const edit_city_section = document.getElementById("edit-city-section");
const edit_city_form = document.getElementById("editCityForm");
const edit_city_name = document.getElementById("cityName-Edited");
const close_edit_city_form = document.getElementById("close-editCity-form");
const delete_city_modal = document.getElementById("deleteCity-modal");
const close_delete_city_modal = document.getElementById("discard-deleteCity");
const discard_delete_city = document.getElementById("cancelDeleteCity");

const error_modal = document.getElementById("errorModal");
const close_error_modal = document.getElementById("closeErrorModal");
let id_region ; //deberia llamarse id_pk;
let region_id_fk;
let country_id_fk;

const base_path = "http://localhost:3000/v1/";
const regions_path =`${base_path}regiones`;
const countries_path =`${base_path}paises`;
const cities_path = `${base_path}ciudades`;
// arrays de botones delete
const delete_region_btns = document.getElementsByClassName("delete-region");
const delete_country_btns = document.getElementsByClassName("a-delete-country");
const delete_city_btns = document.getElementsByClassName("a-delete-city");

//arrays de botones edit
const edit_rg_btns = document.getElementsByClassName("a-edit-region");
const edit_ctry_btns = document.getElementsByClassName("a-edit-country");
const edit_city_btns = document.getElementsByClassName("a-edit-city");

//arrays botones creacion
const add_country_btns = document.getElementsByClassName("add-country")
const add_city_btns = document.getElementsByClassName("add-city");

// reload cuando se cierran los modales de confirmacion de accion / error en accion
close_confirmation_modal.addEventListener('click', () => {
    window.location.reload();  
  }) 

close_error_modal.addEventListener('click', () => {
    window.location.reload(); 
} )

//disparar el form creación de region

for (let i = 0; i<create_region_btn.length; i++){
    let btn = create_region_btn[i];
    display_none_transition(new_region_section, btn);
}

//REGIONES --> POST nueva region

async function postRegion(name){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let data = {
        name: name
    };     

    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(regions_path, options);
    let content = await response.json();
    return content;
}

new_region_form.addEventListener('submit', (e) => {
    e.preventDefault();    
    let name = region_name.value;
    postRegion(name)
    .then(response => {
        if (response.msg && response.id){
          new_region_form.reset();
          $('#confirmationModal').modal('show');            
        }
      })
      .catch( error => console.log (error)); 
})  

//GET Regiones

async function getAllRegions(){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;      

    let options = {
        method: "GET",        
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(regions_path, options);
    let content = await response.json();
    return content;
}

//GET Paises

async function getCountries(){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;      

    let options = {
        method: "GET",        
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(countries_path, options);
    let content = await response.json();
    return content;
}

//GET Ciudades
async function getCities(){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;      

    let options = {
        method: "GET",        
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(cities_path, options);
    let content = await response.json();
    return content;
}

//Mostrar paises y ciudades anidados

function editTriggers(btns, editionForm){
    for (let i = 0; i < btns.length; i++){
        edit_btn = btns[i];
        edit_btn.addEventListener('click', (e) => {                        
            let get_id = (e.target.id).split("-");
            id_region = get_id[1];            
            if (e.target.getAttribute("data-regionID")){
                region_id_fk = e.target.getAttribute("data-regionID");                
            }
            if (e.target.getAttribute("data-countryID")){
                country_id_fk = e.target.getAttribute("data-countryID");                
            }
        })
        display_none_transition (editionForm, edit_btn); 
    }
}
function deleteTriggers(btns, deleteModal){
    for (let i = 0; i < btns.length; i++){
        let delete_btn = btns[i];
        delete_btn.addEventListener('click', (e) => {
            let get_id = (e.target.id).split("-");
            id_region = get_id[1];                        
        })
        display_none_transition(deleteModal, delete_btn);
        
    }
}
function addTriggers(btns, creationForm){
    for (let i = 0; i<btns.length; i++){
        let btn = btns[i];
        btn.addEventListener('click', (e) => {
            let get_id = (e.target.id).split("-");
            id_region = get_id[1];            
        })       
        display_none_transition(creationForm, btn);
    }
}

function display_DB_Regions (array, section){
     for (let i = 0 ; i < array.length; i++){
        let result = array[i];           
        let div = document.createElement("div");
        section.appendChild(div);
        div.classList.add('col-12', 'm-auto');
        div.innerHTML = `
        <ul id="region-${result.id}">
            <li class="py-2">
                <span class="caret">${result.name}</span>
                <a class="btn reg-actions-btn ml-5 mr-1 a-edit-region" title="Editar"><i class="fas fa-edit" id ="regionUpd-${result.id}"></i></a>
                <a class="btn reg-actions-btn mx-1 delete-region" title="Eliminar"><i class="fas fa-trash-alt" id ="regionDel-${result.id}"></i></a>
                <a class="btn regions-btn ml-4 mr-1 create-region create-country add-country" id = "reg-${result.id}"><i class="fas fa-plus mr-2"></i>Nuevo país</a>
                <ul class="nested" id="nested-region-${result.id}">
                </ul>
            </li>
        </ul>`;                      
      };
    editTriggers(edit_rg_btns, edit_region_section); 
    deleteTriggers(delete_region_btns, delete_region_modal);
    addTriggers(add_country_btns, new_country_section);            
}

function display_DB_Countries(array){
    array.forEach(element => {
        let region_list = document.getElementById(`nested-region-${element.region_id}`);
        let new_list = document.createElement("li");
        region_list.appendChild(new_list);
        new_list.classList.add("py-2", "px-4", "my-2", "country");
        new_list.innerHTML=`
        <span class="caret-blue">${element.name}</span><a class="btn reg-actions-btn ml-5 mr-1 a-edit-country" title="Editar" ><i class="fas fa-edit" id="countryUpd-${element.id}" data-regionID=${element.region_id}></i></a><a class="btn reg-actions-btn mx-1 a-delete-country" title="Eliminar" ><i class="fas fa-trash-alt" id="countryDel-${element.id}"></i></a> <a class="btn regions-btn ml-4 mr-1 add-city" id="ctryID-${element.id}"><i class="fas fa-plus mr-2"></i>Nueva ciudad</a>
        <ul class="nested" id="nested-country-${element.id}">
                </ul>
        `          
    });
    editTriggers(edit_ctry_btns, edit_country_section);
    deleteTriggers(delete_country_btns, delete_country_modal);
    addTriggers(add_city_btns, new_city_section);
}

function display_DB_Cities (array){
    array.forEach(element => {
        let country_list = document.getElementById(`nested-country-${element.country_id}`);
        let new_list = document.createElement("li");
        country_list.appendChild(new_list);
        new_list.classList.add("py-2", "px-4", "city", "my-2");
        new_list.innerHTML=`
        <span class="caret-blue">${element.name}</span><a class="btn reg-actions-btn ml-5 mr-1 a-edit-city" title="Editar" ><i class="fas fa-edit" id="cityUpd-${element.id}" data-countryID=${element.country_id}></i></a><a class="btn reg-actions-btn mx-1 a-delete-city" title="Eliminar"><i class="fas fa-trash-alt" id="cityDel-${element.id}"></i></a>
        `        
    });
    editTriggers(edit_city_btns, edit_city_section);
    deleteTriggers(delete_city_btns, delete_city_modal);
}

window.addEventListener('load', () => {
    verifyRole();    
    getAllRegions() //primero obtiene regiones, luego paises, las ciudades y genera los resultados en html
    .then ( response => {
        if (response.name === "JsonWebTokenError" || response.name ==="TokenExpiredError") {                
            window.location = 'auth_error.html';
        }
        display_DB_Regions (response, regions_list);
        getCountries() 
            .then(response => {
                display_DB_Countries(response)
                hierarchyTree()
                getCities()
                    .then(response => {
                        display_DB_Cities(response)        
                    })
                    .catch(error => console.log(error));                
            })
            .catch(error => console.log(error));                 
            })
    .catch (error => console.log(error));  
})

//UPDATE Regiones
async function updateRegion(name, id){
    let upd_path = `${regions_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let data = {
        name: name
    };     

    let options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(upd_path, options);
    let content = await response.json();
    return content;

}

edit_region_section.addEventListener('submit', (e) => {
    e.preventDefault();    
    let name = edit_region_name.value;
    updateRegion(name, id_region)
    .then(response => {
        if (response === "Succesfully updated"){
          edit_region_form.reset();
          $('#confirmationModal').modal('show');            
        }
      })
      .catch( error => console.log (error));
})

// DELETE Region
async function deleteRegion(id){
    let del_path = `${regions_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let options = {
        method: "DELETE",      
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
      }
    };
    let response = await fetch(del_path, options);
    let content = await response.json();
    return content ;    
  }
  
delete_region_modal.addEventListener('click', (e) => {
    if(e.target.innerText === "Eliminar"){        
        deleteRegion(id_region)
        .then( response => {
            if (response === "Succesfully deleted"){
              window.location.reload();
            }
            else if (response.name === "SequelizeForeignKeyConstraintError"){                
                $('#errorModal').modal('show');                
            }
          })
          .catch( error => {
              console.log(error);
          });
    }    
})

//PAISES ---> POST Crear nuevo pais

async function postCountry(name, id_region){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let data = {
        name: name,
        region_id: id_region
    };     

    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(countries_path, options);
    let content = await response.json();
    return content;
}

new_country_form.addEventListener('submit', (e) => {
    e.preventDefault();    
    let name = country_name.value;    
    postCountry(name, id_region)
    .then(response => {
        if (response.msg && response.id){
          new_country_form.reset();
          $('#confirmationModal').modal('show');                            
        }
      })
      .catch( error => console.log (error)); 
})

//UPDATE Editar país

async function updateCountry (name, id, IDregion){
    let upd_path = `${countries_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let data = {
        name: name,
        region_id: IDregion
    };     

    let options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(upd_path, options);
    let content = await response.json();
    return content;
}

edit_country_section.addEventListener('submit', (e) => {
    e.preventDefault();    
    let name = edit_country_name.value;
    console.log(name);
    updateCountry(name, id_region, region_id_fk)
    .then(response => {
        if (response === "Succesfully updated"){
          edit_country_form.reset();
          $('#confirmationModal').modal('show');            
        }
      })
      .catch( error => console.log (error));
})

//DELETE Eliminar pais

async function deleteCountry(id){
    let del_path = `${countries_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let options = {
        method: "DELETE",      
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
      }
    };
    let response = await fetch(del_path, options);
    let content = await response.json();
    return content;    
  }

delete_country_modal.addEventListener('click', (e) => {
    if(e.target.innerText === "Eliminar"){        
        deleteCountry(id_region)
        .then( response => {
            if (response === "Succesfully deleted"){
              window.location.reload();
            }
            else if (response.name === "SequelizeForeignKeyConstraintError"){                
                $('#errorModal').modal('show');                
            }
          })
          .catch( error => {
              console.log(error);
          });
    }    
})

//CIUDADES --> POST Crear ciudad

async function postCity(name, id){
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let data = {
        name: name,
        country_id: id
    };     

    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(cities_path, options);
    let content = await response.json();    
    return content;
}

new_city_form.addEventListener('submit', (e) => {
    e.preventDefault();    
    let name = city_name.value;     
    postCity(name, id_region)
    .then(response => {
        if (response.msg && response.id){
          new_city_form.reset();
          $('#confirmationModal').modal('show');                           
        }
      })
      .catch( error => console.log (error)); 
})

//UPDATE Ciudades

async function updateCity (name, id, IDcountry){
    let upd_path = `${cities_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let data = {
        name: name,
        country_id: IDcountry
    };     

    let options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(upd_path, options);
    let content = await response.json();
    return content;
}

edit_city_section.addEventListener('submit', (e) => {
    e.preventDefault();    
    let name = edit_city_name.value;    
    updateCity(name, id_region, country_id_fk)
    .then(response => {
        if (response === "Succesfully updated"){
          edit_country_form.reset();
          $('#confirmationModal').modal('show');            
        }
      })
      .catch( error => console.log (error));
})

// DELETE Ciudades

async function deleteCity(id){
    let del_path = `${cities_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt; 
    let options = {
        method: "DELETE",      
        headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
      }
    };
    let response = await fetch(del_path, options);
    let content = await response.json();
    return content;    
  }

  delete_city_modal.addEventListener('click', (e) => {
    if(e.target.innerText === "Eliminar"){        
        deleteCity(id_region)
        .then( response => {
            if (response === "Succesfully deleted"){
              window.location.reload();
            }
            else if (response.name === "SequelizeForeignKeyConstraintError"){                
                $('#errorModal').modal('show');                
            }
          })
          .catch( error => {
              console.log(error);
          });
    }    
})

// cerrar forms de creacion y resetearlos
display_none_transition(new_region_section, close_new_region_form);
close_new_region_form.addEventListener('click', () => {
    new_region_form.reset();
})
display_none_transition(new_country_section, close_new_country_form);
close_new_country_form.addEventListener('click', () => {
    new_country_form.reset();
})
display_none_transition(new_city_section, close_new_city_form);
close_new_city_form.addEventListener('click', () => {
    new_city_form.reset();
})

//cerrar los forms de edicion y resetearlos
display_none_transition(edit_region_section, close_edit_region_form);
close_edit_region_form.addEventListener('click', () => {
    edit_region_form.reset();
})
display_none_transition(edit_country_section, close_edit_country_form);
close_edit_country_form.addEventListener('click', () => {
    edit_country_form.reset();
})
display_none_transition(edit_city_section, close_edit_city_form);
close_edit_city_form.addEventListener('click', () => {
    edit_city_form.reset();
})

//cerrar modales de alerta (delete)
display_none_transition(delete_region_modal, close_alert_modal);
display_none_transition(delete_country_modal, close_delete_country_modal);
display_none_transition(delete_city_modal, close_delete_city_modal);

//cancelar o descartar accion delete
display_none_transition(delete_region_modal, delete_rg_element); 
display_none_transition(delete_country_modal, discard_delete_country);
display_none_transition(delete_city_modal, discard_delete_city);