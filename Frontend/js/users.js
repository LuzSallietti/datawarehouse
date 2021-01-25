const create_user_bt = document.getElementById("create-user");
const close_new_user_form = document.getElementById("close-form");
const new_user_section = document.getElementById("new-user-section");
const edit_user_btns = document.getElementsByClassName("fa-user-edit");
const edit_user_section = document.getElementById("edit-user-section");
const close_edit_user_form = document.getElementById("close-edit-form")
const users_list_section = document.getElementById("users-list");
const delete_btns = document.getElementsByClassName("fa-trash-alt");
const delete_modal = document.getElementById("delete-modal");
const close_alert_modal = document.getElementById("close-alert-msg");

const new_user_form = document.getElementById("new-user-form");
const new_user_firstname = document.getElementById("new-user-firstname");
const new_user_lastname = document.getElementById("new-user-lastname");
const new_user_email = document.getElementById("new-user-email");
const new_user_admin = document.getElementById("new-user-admin");
const new_user_password = document.getElementById("new-user-password");
const repeat_new_user_password = document.getElementById("repeat-new-user-password");
const confirmation_modal = document.getElementById("confirmationModal");
const close_confirmation_modal = document.getElementById("closeConfirmationModal");
const check_pass_msg = document.getElementById("checkPass");
const clean_create_user_form = document.getElementById("cleanCreateUser");

//paths de servicios
const base_path = "http://localhost:3000/v1/"
const get_all_users = `${base_path}usuarios`;


async function verifyToken(service){
  const jwt = sessionStorage.getItem("token");
  let bearer = 'Bearer ' + jwt;    
  let response = await fetch(service,{
   method: 'GET',    
   headers: {
       'Authorization': bearer,
       'Content-Type': 'application/json'
   }});
   let json_response = await response.json();
   let data = await json_response;
   return data;
}


function display_query_results (array, section){
  
  for (let i = 0 ; i < array.length; i++){
      let result = array[i];
      if (result.admin === 1){
        result.admin = "Administrador";
      } else if (result.admin === 0) {
        result.admin = "Básico";
      }     
      let div = document.createElement("div");
      section.appendChild(div);
      div.classList.add("results", "row", "justify-content-center", "align-items-center", "w-75", "mx-auto");
      div.innerHTML = `<div class="col-3 d-flex align-items-center justify-content-center">
        <span class="results-details" id="uName-${result.id}">${result.firstname}</span>
      </div>
      <div class="col-3 d-flex align-items-center justify-content-center">
        <span class="results-details" id="uLastname-${result.id}">${result.lastname}</span>
      </div>
      <div class="col-3 d-flex align-items-center justify-content-center">
        <span class="results-details" id="uEmail-${result.id}">${result.email}</span>
      </div>
      <div class="col-2 d-flex align-items-center justify-content-center">
        <span class="strong" id="uAdmin-${result.id}">${result.admin}</span>
      </div>
      <div class="col-1 d-flex align-items-center justify-content-center">
        <i class="fas fa-user-edit px-2 actions-icons" id="upd-${result.id}"></i>
        <i class="fas fa-trash-alt px-2 actions-icons" id="del-${result.id}"></i>
      </div>`;
    };
      //asignar event listeners a cada icono update
      for (let i = 0; i < edit_user_btns.length; i++){
          edit_user_btn = edit_user_btns[i];
          display_none_transition(edit_user_section, edit_user_btn);
          edit_user_btn.addEventListener('click', (e) => {
            let edit_id = (e.target.id).split("-");
            let user_id = edit_id[1];
            getValues (user_id);
            userToEdit = user_id;
          })          
      }
      display_none_transition(edit_user_section, close_edit_user_form);     
      
      //mostrar alert modal para cada botón delete
      for (let i = 0; i<delete_btns.length; i++){
          let delete_btn = delete_btns[i];
          display_none_transition(delete_modal, delete_btn);
          delete_btn.addEventListener('click', (e) => {
            let delete_id = (e.target.id).split("-");
            let user_id = delete_id[1];
            userToDelete = user_id;
          })
      }
  }

//ejecutar el jwt decoded antes del acceso (cuando se carga el html de Usuarios)
window.addEventListener('load', verifyToken(get_all_users)
                                .then(response => {
                                  if (response.name === "JsonWebTokenError" || response.name ==="TokenExpiredError") {                
                                    window.location = 'auth_error.html';
                                }
                                  if (response === "Unauthorized action"){
                                    create_user_bt.style.display="none"; //si no es admin oculto el boton crear usuario
                                    users_list_section.style.display="none"; // oculto la sección desde donde se crean los usuarios
                                  } else if (response[0].id){
                                  display_query_results(response, users_list_section) // si es admin, muestro las opciones de creacion de usuarios y los usuarios ya creados en la base de datos
                                  }
                                })
                                
                                .catch(error => console.log(error))

);

//mostrar form de creación de usuarios
display_none_transition(new_user_section, create_user_bt);

// cerrar form creacion de nuevo usuario y resetearlo
display_none_transition(new_user_section, close_new_user_form);
close_new_user_form.addEventListener("click", () => {
  new_user_form.reset();
})

//cerrar el modal de alerta (delete)
display_none_transition(delete_modal, close_alert_modal);

//CREAR (post) NUEVO USUARIO

close_confirmation_modal.addEventListener('click', () => {
  window.location.reload();  
})

clean_create_user_form.addEventListener('click', () => {
  new_user_form.reset();
})

new_user_form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (new_user_password.value === repeat_new_user_password.value){
    postNewUser()
    .then(response => {
      if (response.msg && response.id){
        new_user_form.reset();
        $('#confirmationModal').modal('show');            
      }
    })
    .catch( error => console.log (error)); 
    } else {
      check_pass_msg.classList.remove("text-muted");
      check_pass_msg.innerText="*Las contraseñas no coinciden";
    }
    

})

async function postNewUser(){
  
  const jwt = sessionStorage.getItem("token");
  let bearer = 'Bearer ' + jwt; 
  let data = {
      firstname: new_user_firstname.value,
      lastname: new_user_lastname.value,
      email: new_user_email.value,
      admin: new_user_admin.value,
      password: new_user_password.value
  };     

  let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
    }
  };
  let response = await fetch(get_all_users, options);
  let content = await response.json();
  return content;
  
}

//EDITAR (update) USUARIO
const edit_user_form = document.getElementById("edit-user-form");
const edit_user_firstname = document.getElementById("edit-user-firstname");
const edit_user_lastname = document.getElementById("edit-user-lastname");
const edit_user_email = document.getElementById("edit-user-email");
const edit_user_admin = document.getElementById("edit-user-admin");
const edit_user_password = document.getElementById("edit-user-password");
const repeat_edit_user_password = document.getElementById("repeat-edit-user-password");
const pass_error_msg = document.getElementById("passError")
const reset_edition = document.getElementById("resetEdition");
let userToEdit;

function getValues(id){
  let firstname = document.getElementById(`uName-${id}`).innerText;
  let lastname = document.getElementById(`uLastname-${id}`).innerText;
  let email = document.getElementById(`uEmail-${id}`).innerText;
  let admin = document.getElementById(`uAdmin-${id}`).innerText;
  edit_user_firstname.value = firstname;
  edit_user_lastname.value = lastname;
  edit_user_email.value = email;
  if (admin === "Administrador"){
    edit_user_admin.value = 1;
  } else {
    edit_user_admin.value = 0;
  }
}
edit_user_form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (edit_user_password.value === repeat_edit_user_password.value){    
    editUser()
    .then(response => {
      if (response === "Succesfully updated"){
        edit_user_form.reset();
        $('#confirmationModal').modal('show');
            
      }
    })
  } else {
    pass_error_msg.classList.remove("text-muted");
    pass_error_msg.innerText="*Las contraseñas no coinciden";
  }
})
reset_edition.addEventListener('click', () => {
  edit_user_form.reset();
})
async function editUser(){
  const put_delete_users = `${get_all_users}/${userToEdit}`
  const jwt = sessionStorage.getItem("token");
  let bearer = 'Bearer ' + jwt; 
  let data = {
      firstname: edit_user_firstname.value,
      lastname: edit_user_lastname.value,
      email: edit_user_email.value,
      admin: edit_user_admin.value,
      password: edit_user_password.value
  };     

  let options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        'Authorization': bearer,
        'Content-Type': 'application/json'
    }
  };
  let response = await fetch(put_delete_users, options);
  let content = await response.json();
  return content;
  
}

close_edit_user_form.addEventListener('click', () => {
  edit_user_form.reset();
})
//ELIMINAR USUARIO
let userToDelete;
const confirm_delete = document.getElementById("deleteUser");
const cancel_delete = document.getElementById("cancelDelete");

async function deleteUser(id){
  const path = `${get_all_users}/${id}`;
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
confirm_delete.addEventListener('click', () => {
  deleteUser(userToDelete)
  .then( response => {
    if (response === "Succesfully deleted"){
      window.location.reload();
    }
  })
  .catch( error => console.log(error));  
})

display_none_transition(delete_modal, cancel_delete);