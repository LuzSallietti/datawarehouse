const discard_delete_contact = document.getElementById("discard-delete-contact");
const confirm_delete_contact = document.getElementById("confirm-delete-contact");
const alert_multiple_delete = document.getElementById("delete-multiple-modal");
const confirm_multiple_delete = document.getElementById("confirm-delete-multiple-contacts");
const discard_multiple_delete = document.getElementById("discard-delete-multiple-contacts");
const close_multiple_delete_modal = document.getElementById("delete-multiple-modal");


//asignar event listeners a cada icono update
    function deleteTriggers (btns, alert_modal){
        for (let i = 0; i < btns.length; i++){
            let btn = btns[i];
            display_none_transition(alert_modal, btn);
            btn.addEventListener("click", (e) => {
                let get_id = (e.target.id).split("-"); // obtener el id del contacto para el delete
                contact_id = parseInt(get_id[1]);               
               
            })
        }
    }


//cerrar el modal de alerta (delete) desde ícono cruz o con botón cancelar    
display_none_transition(delete_modal, discard_delete_contact);
display_none_transition(delete_modal, close_alert_modal);
display_none_transition(alert_multiple_delete, discard_multiple_delete);
display_none_transition(alert_multiple_delete, close_multiple_delete_modal);

confirm_delete_contact.addEventListener('click', () => {
    console.log(contact_id); // pasar como parámetro a la función delete
    deleteData(all_contacts, contact_id)
    .then (response => {
        if (response === "Succesfully deleted"){
            window.location.reload();
          }
    })
    .catch (error => console.log(error));
    
})

//delete desde selección por checkbox


display_none_transition(alert_multiple_delete, delete_selected_contacts); //mostrar alerta
confirm_multiple_delete.addEventListener("click", () => {
    selected_contacts.forEach(contact_id => {
        deleteData(all_contacts, contact_id) 
        .then (response => {
            if (response === "Succesfully deleted"){
                window.location.reload();
              }
        })
        .catch (error => console.log(error));
    })
})