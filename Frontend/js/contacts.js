const all_checkboxes = document.getElementById("all-checkboxes");
const selection_count = document.getElementById("selection-count");
const delete_selected_contacts = document.getElementById("delete-selected-contacts");
let row_count = 0;
let selected_contacts = []; //almacenar los contactos a eliminar
const interest_range = document.getElementById("gradoInteres");
const interest_value = document.getElementById("grado-value");
const close_create_contact_icon = document.getElementById("close-create-contact-form");
const create_contact_section = document.getElementById("new-contact-section");
const create_contact_form = document.getElementById("create_new_contact_form");

const new_contact_firstname = document.getElementById("new_contactName");
const new_contact_lastname = document.getElementById("new_contactLastname");
const new_contact_email = document.getElementById("new_contactEmail");
const new_contact_companyID = document.getElementById("new_contactCompany");
const new_contact_city_id = document.getElementById("new_contactCity");
const new_contact_job_title = document.getElementById("new_contactJobTitle");
const new_contact_interesting = document.getElementById("gradoInteres");

const contact_channels_section = document.getElementById("contact_channels_section");
const edit_contact_channels_section = document.getElementById("edit_contact_channels_section")
const create_contact_btn = document.getElementById("create-contact");
const search_contact_filter = document.getElementById("search-contact-filter");
const dropdown_search_icon = document.getElementById("dropdown-search");
const search_icon = document.getElementById("search-icon");
const edit_contact_section = document.getElementById("edit-contact-section");
const close_edit_contact_icon = document.getElementById("close-edit-contact-form")
const close_alert_modal = document.getElementById("close-alert-msg");
const delete_modal = document.getElementById("delete-modal");
const contacts_list_section = document.getElementById("contacts-list");


let contacts_stored; //array donde almaceno los contactos para mostrar los resultados y para editar sus datos
let contact_id;
let contact_channels_preferences; //array donde almaceno las preferencias de canalaes del contacto 

const close_confirmation_modal = document.getElementById("closeConfirmationModal");
// reload cuando se cierran los modales de confirmacion de accion / error en accion
close_confirmation_modal.addEventListener('click', () => {
    window.location.reload();
})
//array de edit btns
const edit_contact_btns = document.getElementsByClassName("fa-user-edit");
// array de botones delete
const delete_btns = document.getElementsByClassName("fa-trash-alt");
//paths de servicios
const base_path = "http://localhost:3000/v1/"
const all_contacts = `${base_path}contactos`;
const contacts_search = `${all_contacts}/filtrar`;
const all_regions = `${base_path}regiones`;
const all_countries = `${base_path}paises`;
const all_cities = `${base_path}ciudades`;
const all_companies = `${base_path}companias`;
const all_contact_channels = `${base_path}canales`;
const channels_x_contact = `${base_path}canales/contacto`;

async function verifyToken(service) {
    const jwt = sessionStorage.getItem("token");
    let bearer = 'Bearer ' + jwt;
    let response = await fetch(service, {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    });
    let json_response = await response.json();
    let data = await json_response;
    return data;
}

function display_query_results(array, section) {

    for (let i = 0; i < array.length; i++) {
        let result = array[i];
        console.log(result);
        let div = document.createElement("div");
        section.appendChild(div);
        div.classList.add("results", "row", "justify-content-center", "align-items-center");
        div.innerHTML = `<div class="col-1 d-flex align-items-center justify-content-center">
        <input type="checkbox" id="contact-${result.id}">
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center flex-wrap">
            <span class="strong">${result.firstname} ${result.lastname}</span>
            <span class="smaller-text">${result.email}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center flex-wrap">
            <span>${result.country_name}</span>
            <span class="smaller-text">${result.region_name}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
            <span class="strong">${result.company_name}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
            <span class="results-details">${result.job_title}</span>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-center">
            <span class="bar-number w-25">${result.interesting}%</span>
            <div class="bar justify-content-start w-100">                
                <div class="interest-bar w-${result.interesting} grade-${result.interesting}">                
                </div>
            </div>            
        </div>
        <div class="col-1 d-flex align-items-center justify-content-center">
            <i class="fas fa-user-edit px-2 actions-icons" title="Editar" id="upd-${result.id}"></i>
            <i class="fas fa-trash-alt px-2 actions-icons" title="Eliminar" id="del-${result.id}"></i>
        </div>`;
    };
}



//asignar event listeners a cada icono update
function editTriggers(btns, edit_form) {
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        display_none_transition(edit_form, btn);
        btn.addEventListener("click", (e) => {
            let get_id = (e.target.id).split("-"); // obtener el id del contacto para el update
            contact_id = parseInt(get_id[1]);
            //completa el form con los datos de ese contacto, filtrado x su id
            showContactInfo(contacts_stored, contact_id);
            interestRange();            
            getData_by_id(channels_x_contact, contact_id)
                .then(response => {
                    contact_channels_preferences = response;
                    fillChannelsOptions(contact_channels_preferences)
                })
                .catch(error => console.log(error));
        })
    }
}
// cerrar el form de edición de contacto y resetearlo
display_none_transition(edit_contact_section, close_edit_contact_icon);
close_edit_contact_icon.addEventListener('click', () => {
    edit_contact_form.reset();
})

//ejecutar el jwt decoded antes del acceso
window.addEventListener('load', () => {
    verifyRole();
    verifyToken(all_contacts)
        .then(response => {
            contacts_stored = response;
            display_query_results(contacts_stored, contacts_list_section);
            editTriggers(edit_contact_btns, edit_contact_section);
            deleteTriggers(delete_btns, delete_modal);
            checkboxesTriggers();
            singleCheckTrigger();
            if (response.name === "JsonWebTokenError" || response.name ==="TokenExpiredError") {                
                window.location = 'auth_error.html';
            }
        })
        .catch(error => {
            console.log(error);

        })
});

//rango de interes del contacto
interest_value.innerHTML = `${interest_range.value}%`;

interest_range.oninput = function () {
    interest_value.innerHTML = `${this.value}%`;
}

//seleccion multiple
function checkboxesTriggers() {

    all_checkboxes.addEventListener('change', (e) => {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (e.target.checked) {
            //está clickeado
            selected_contacts = [];
            for (let i = 1; i < checkboxes.length; i++) {
                let checkbox = checkboxes[i];
                checkbox.checked = true;
                let contact_id = (checkbox.id.split("-"))[1];
                selected_contacts.push(contact_id);
                console.log(selected_contacts);
            }
            selection_count.classList.remove("d-none");
            row_count = checkboxes.length - 1;
            selection_count.innerText = `${row_count} seleccionados`;
            delete_selected_contacts.classList.remove("d-none");
        } else {
            // está desclickeado
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                selection_count.classList.add("d-none");
                row_count = 0;
                selection_count.innerText = ``;
                delete_selected_contacts.classList.add("d-none");
                let contact_id = (checkbox.id.split("-"))[1];
                console.log(contact_id);

                selected_contacts.forEach((contact, index) => {
                    if (contact === contact_id) {
                        selected_contacts.splice(index, 1);
                        console.log(selected_contacts);
                    }
                })
            })
        }
    })
}


function singleCheckTrigger() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 1; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selection_count.classList.remove("d-none");
                row_count += 1;
                selection_count.innerText = `${row_count} seleccionados`;
                let contact_id = (e.target.id.split("-"))[1];
                selected_contacts.push(contact_id);
                console.log(selected_contacts);
                delete_selected_contacts.classList.remove("d-none");
            } else {
                row_count -= 1;
                selection_count.innerText = `${row_count} seleccionados`;
                let contact_id = (e.target.id.split("-"))[1];
                console.log(contact_id);
                selected_contacts.forEach((contact, index) => {
                    if (contact === contact_id) {
                        selected_contacts.splice(index, 1);
                        console.log(selected_contacts);
                    }
                })
            }
        })
    }
}