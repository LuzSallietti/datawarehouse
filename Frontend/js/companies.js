const base_path = "http://localhost:3000/v1/";
const countries_path = `${base_path}paises`;
const cities_path = `${base_path}ciudades`;
const companies_path = `${base_path}companias`;
const companies_section = document.getElementById("companies-list");
const create_company_btn = document.getElementById("create-company");
const new_company_section = document.getElementById("new-company-section");
const new_company_form = document.getElementById("new-company-form");
const close_company_form = document.getElementById("close-form");
const delete_modal = document.getElementById("delete-modal");
const close_alert_modal = document.getElementById("close-alert-msg");
const delete_confirmation = document.getElementById("delete-confirmation");
const discard_delete = document.getElementById("discard-delete");
const edit_company_section = document.getElementById("edit-company-section");
const edit_company_form = document.getElementById("edit-company-form");
const edit_company_name = document.getElementById("edited-company_name");
const edit_company_address = document.getElementById("edited-company-address");
const edit_company_email = document.getElementById("edited-company-email");
const edit_company_phone = document.getElementById("edited-company-phone");
const edit_company_city = document.getElementById("edit-select_db_cities");
const close_edit_company_form = document.getElementById("close-edit-form");
const close_error_modal = document.getElementById("closeErrorModal");

let update_and_delete_id; // almacenaré el dato para el update y el delete
let countries_select = document.getElementById("select_db_countries");
let cities_select = document.getElementById("select_db_cities");
let edition_countries_select = document.getElementById("edit-select_db_countries");
let edition_cities_select = document.getElementById("edit-select_db_cities");

let cities_on_db; // array donde almaceno los resultados de la consulta a la db
let companies_on_db // array donde almaceno los resultados de la consulta a la db
const confirmation_modal = document.getElementById("confirmationModal");
const close_confirmation_modal = document.getElementById("closeConfirmationModal");
const delete_btns = document.getElementsByClassName("fa-trash-alt");
const edit_btns = document.getElementsByClassName("fa-edit");

// UPDATE Compañía

async function updateCompany (company_data, id){
    let upd_path = `${companies_path}/${id}`
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;    
    let options = {
        method: "PUT",
        body: JSON.stringify(company_data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(upd_path, options);
    let content = await response.json();
    return content;
}

//mostrar form edicion de compañia con datos actuales en la bd y el desplegable de paises y ciudades
function showCompanyInfo (id){
    companies_on_db.forEach(company => {
        if(company.id === id){            
            edit_company_name.value = company.name;
            edit_company_address.value = company.address;
            edit_company_email.value = company.email;
            edit_company_phone.value = company.phone;
        }
    })
}

function editTriggers() {
    for (let i = 0; i < edit_btns.length; i++) {
        let edit_btn = edit_btns[i];        
        display_none_transition(edit_company_section, edit_btn);
        edit_btn.addEventListener('click', (e) => {
            let target_id = (e.target.id).split("-");
            let company_id = parseInt(target_id[1]);
            update_and_delete_id = company_id;            
            showCompanyInfo(company_id);
            get_DB_Countries()
                .then(countries => {
                    createCountriesSelect(countries, edition_countries_select)
                })
                .catch(error => console.log(error));
        })
    }
}

function deleteTriggers(btns, deleteModal){
    for (let i = 0; i < btns.length; i++){
        let delete_btn = btns[i];                
        display_none_transition(deleteModal, delete_btn); 
        delete_btn.addEventListener('click', (e) => {
            let target_id = (e.target.id).split("-");
            let company_id = parseInt(target_id[1]);
            update_and_delete_id = company_id;            
        })                             
    }
}

edition_countries_select.addEventListener('input', () => {
    let country_id = parseInt(edition_countries_select.value);    
    cleanCities(edition_cities_select);    
    cities_on_db.forEach(element => {
        if (element.country_id === country_id) {
            createCitiesSelect(element, edition_cities_select);
        }
    })
})

edit_company_form.addEventListener('submit',(e) => {
    e.preventDefault();   

    let updated_company = {
        name: edit_company_name.value,
        address: edit_company_address.value,
        email: edit_company_email.value,
        phone: edit_company_phone.value,
        city_id: edit_company_city.value
    }

    updateCompany(updated_company, update_and_delete_id)
    .then (response => {
        if (response === "Succesfully updated"){
            edit_company_form.reset();
            $('#confirmationModal').modal('show');            
          }          
        })
        .catch( error => console.log (error));
    })
    


//cerrar el form de edicion de compañía y resetearlo
display_none_transition(edit_company_section, close_edit_company_form);
close_edit_company_form.addEventListener('click', () => {
    edit_company_form.reset();
})


//mostrar alert modal para cada botón delete
for (let i = 0; i < delete_btns.length; i++) {
    let delete_btn = delete_btns[i];
    delete_btn.addEventListener("click", () => {
        delete_modal.classList.remove("d-none");
    })
}

//POST --> Crear nueva compañía
//mostrar el form de creación de compañía y alimentarlo con el listado de paises/ciudades
//cerrar el form creacion de compañia y resetearlo

display_none_transition(new_company_section, create_company_btn);
display_none_transition(new_company_section, close_company_form);
close_company_form.addEventListener('click', () => {
    new_company_form.reset();
})

//get paises y ciudades

async function get_DB_Countries() {
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

function createCountriesSelect(array, select) {

    array.forEach(element => {
        let new_option = document.createElement("option");
        select.appendChild(new_option);
        new_option.value = element.id;
        new_option.innerText = element.name;
    });
}

async function get_DB_Cities() {
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

function createCitiesSelect(city, select) {
    let new_option = document.createElement("option");
    select.appendChild(new_option);
    new_option.value = city.id;
    new_option.dataset.country_id = city.country_id;
    new_option.innerText = city.name;
}

const cleanCities = (select) => {
    for (let i = select.options.length; i >= 0; i--) {
        select.remove(i);
    }
};

window.addEventListener('load', () => {
    verifyRole();
    get_DB_Countries()
        .then(response => { 
            if (response.name === "JsonWebTokenError" || response.name ==="TokenExpiredError") {                
                window.location = 'auth_error.html';
            }           
            createCountriesSelect(response, countries_select);
            get_DB_Cities()
                .then(cities => {
                    cities_on_db = cities;
                    getCompanies()
                        .then(companies => {
                            companies_on_db = companies;
                            findCityName(companies);
                            displayCompanies(companies);
                            editTriggers();
                            deleteTriggers(delete_btns, delete_modal);
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

})

countries_select.addEventListener('input', () => {
    let country_id = parseInt(countries_select.value);
    cleanCities(cities_select);
    cities_on_db.forEach(element => {
        if (element.country_id === country_id) {
            createCitiesSelect(element, cities_select);
        }
    })
})

async function createCompany(company_data) {

    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;
    let options = {
        method: "POST",
        body: JSON.stringify(company_data),
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(companies_path, options);
    let content = await response.json();
    return content;
}

new_company_form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.getElementById("new_company_name");
    let address = document.getElementById("new-company_address");
    let email = document.getElementById("new_company_email");
    let phone = document.getElementById("new_company_phone");
    let city_id = document.getElementById("select_db_cities");

    let new_company = {
        name: name.value,
        address: address.value,
        email: email.value,
        phone: phone.value,
        city_id: city_id.value
    }

    createCompany(new_company)
        .then(response => {
            if (response.msg && response.id) {
                new_company_form.reset();
                $('#confirmationModal').modal('show');
            }
        })
        .catch(error => console.log(error));
})

//GET Compañías

async function getCompanies() {
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;

    let options = {
        method: "GET",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    };
    let response = await fetch(companies_path, options);
    let content = await response.json();
    return content;
}

function findCityName(companies) {
    companies.forEach(company => {
        let company_city_id = company.city_id;
        for (let i = 0; i < cities_on_db.length; i++) {
            let city = cities_on_db[i];
            if (city.id === company_city_id) {
                company.city_name = city.name;                
            }
        }
    })
}

function displayCompanies(companies) {
    companies.forEach(company => {        
        let new_div = document.createElement("div");
        companies_section.appendChild(new_div);
        new_div.classList.add("results", "row", "justify-content-center", "align-items-center");
        new_div.innerHTML = `
        <div class="col-2 d-flex align-items-center justify-content-center">
          <span class="strong">${company.name}</span>
        </div>
        <div class="col-3 d-flex align-items-center justify-content-center">
          <span class="results-details">${company.address}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <span class="results-details">${company.email}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <span class="results-details">${company.phone}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
          <span class="results-details">${company.city_name}</span>
        </div>
        <div class="col-1 d-flex align-items-center justify-content-center">
          <i class="fas fa-edit px-2 actions-icons" title="Editar" id="upd-${company.id}"></i>
          <i class="fas fa-trash-alt px-2 actions-icons" title="Eliminar" id="del-${company.id}"></i>
        </div>
        `
    }); 
}

//DELETE Compañia

async function deleteCompany(id){
    let del_path = `${companies_path}/${id}`
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

delete_confirmation.addEventListener('click', () => {
    deleteCompany(update_and_delete_id)
    .then (response =>{
        if (response === "Succesfully deleted"){
            window.location.reload();
          }
          else if (response.name === "SequelizeForeignKeyConstraintError"){                
            $('#errorModal').modal('show');                
        }
        })
    .catch (error => console.log (error));
})

close_error_modal.addEventListener('click', () => {
    window.location.reload(); 
} )

//cancelar o descartar delete company
display_none_transition(delete_modal,discard_delete);

//cerrar el modal delete (descartar)
display_none_transition(delete_modal, close_alert_modal);


// reload cuando se cierran los modales de confirmacion de accion / error en accion
close_confirmation_modal.addEventListener('click', () => {
    window.location.reload();
})