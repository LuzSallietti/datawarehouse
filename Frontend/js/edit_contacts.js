const edit_contact_form = document.getElementById("edit_contact_form");
const edit_contact_name = document.getElementById("edit_contact_name");
const edit_contact_lastname = document.getElementById("edit_contact_lastname");
const edit_contact_job_title = document.getElementById("edit_contact_job_title");
const edit_contact_email = document.getElementById("edit_contact_email");
const edit_contact_address = document.getElementById("edit_contact_address");
const edit_contact_company = document.getElementById("edit_contact_company");
const edit_contact_region = document.getElementById("edit_contact_region");
const edit_contact_country = document.getElementById("edit_contact_country");
const edit_contact_city = document.getElementById("edit_contact_city");
const edit_contact_interesting = document.getElementById("edit_contact_gradoInteres");
const edit_contact_interesting_value = document.getElementById("edit_grado-value");

let contact_to_edit; //almaceno el objeto contacto que necesito editar para usar su info en el select de paises y ciudades
let edited_contact;




function fillEditionForm (contact_data){
    edit_contact_name.value = contact_data.firstname;
    edit_contact_lastname.value = contact_data.lastname;
    edit_contact_job_title.value = contact_data.job_title;
    edit_contact_email.value = contact_data.email;
    edit_contact_address.value = contact_data.address;
}

function showContactInfo(array, id){
    array.forEach(contact => {
        if(contact.id === id){
            contact_to_edit = contact;
            fillEditionForm(contact);
            createCompanyOptions(companies_stored, edit_contact_company);
            edit_contact_company.value = contact.company_id;
            createRegionsOptions(regions_stored, edit_contact_region);
            edit_contact_region.value = contact.region_id;
            displayRegionCountries (contact.region_id, edit_contact_country);
            edit_contact_country.value = contact.country_id;
            displayCountryCities(contact.country_id, edit_contact_city);
            edit_contact_city.value = contact.city_id;
            edit_contact_interesting.value = contact.interesting;     
        }            
    });
}

edit_contact_region.addEventListener('input', () => {
    let region_id = parseInt(edit_contact_region.value);  
    cleanOptions(edit_contact_country); 
    cleanOptions(edit_contact_city); 
    displayRegionCountries (region_id, edit_contact_country);
    
  
})

edit_contact_country.addEventListener('input', () => {
    let country_id = parseInt(edit_contact_country.value);    
    cleanOptions(edit_contact_city);
    displayCountryCities(country_id, edit_contact_city);
    
})

function fillChannelsOptions(contact_channels){
    contact_channels.forEach(channel => {
        let data_option = document.getElementById(`editChannelData-${channel.channel_id}`);
        data_option.value = channel.value;
        let preference_option = document.getElementById(`editChannelPref-${channel.channel_id}`);
        preference_option.value = channel.preference;
    })
}

function getEditedContactData(){
    edited_contact = {
        firstname: edit_contact_name.value,
        lastname: edit_contact_lastname.value,
        email: edit_contact_email.value,
        company_id : edit_contact_company.value,
        city_id: edit_contact_city.value,
        job_title: edit_contact_job_title.value,
        interesting: edit_contact_interesting.value,
        address: edit_contact_address.value
    } 
    return edited_contact;
}

async function updateContactChannels (contact_id){
    edit_contact_preferences.forEach(channel => {
        channel.contact_id = contact_id;
        let channel_data = {
            channel_id : channel.channel_id,
            value: channel.value,
            preference: channel.preference
        }
        updateData(channels_x_contact, contact_id, channel_data)
        .then(response =>{
             if (response === "Succesfully updated") {
            edit_contact_form.reset();
            $('#confirmationModal').modal('show');
             }                 
        })
        .catch(error => console.log (error));
    })
}
//rango de interes del contacto
function interestRange(){
edit_contact_interesting_value.innerHTML = `${edit_contact_interesting.value}%`;

edit_contact_interesting.oninput = function () {
    edit_contact_interesting_value.innerHTML = `${this.value}%`;
}
}

edit_contact_form.addEventListener('submit', (e) => {
    e.preventDefault();
    getEditedContactData();
    console.log(edited_contact);
    
    getContact_ChannelPreferences("editChannelData", "editChannelPref", edit_contact_preferences);
    console.log(edit_contact_preferences);

    updateData(all_contacts, contact_id, edited_contact)
    .then(response => {
        if(response === "Succesfully updated"){
            console.log("actualizó en contacts");
            updateContactChannels(contact_id)
            .then (response => console.log(response))
            .catch (error => console.log(error));
            
        }
    })//ya está ok el update en la tabla contacts / falta el de la tabla contacts_channels
    .catch (error => console.log(error));
})