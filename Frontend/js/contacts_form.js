let regions_stored;
let countries_stored;
let cities_stored;
let companies_stored;
let channels_stored;
let new_contact_preferences = []; //almacenar las preferencias de contacto (canal+valor+preferencias)
let edit_contact_preferences = [];

const new_contact_company = document.getElementById("new_contactCompany");
const new_contact_region = document.getElementById("new_contactRegion");
const new_contact_country = document.getElementById("new_contactCountry");
const new_contact_city = document.getElementById("new_contactCity");
const new_contact_address = document.getElementById("new_contactAddress");



//abrir el form creacion de contacto
display_none_transition(create_contact_section, create_contact_btn);

//cerrar el form
display_none_transition(create_contact_section, close_create_contact_icon);
close_create_contact_icon.addEventListener('click', () =>{
    create_contact_form.reset();
})

const cleanOptions = (select) => {
    for (let i = select.options.length; i >= 1; i--) {        
        select.remove(i);
        
    }
};

//Rellenar el select de paises
window.addEventListener('load', () => {
    getData(all_regions)
    .then (response => {
        regions_stored = response;
        createRegionsOptions(regions_stored,new_contact_region);        
    })
    .catch (error => console.log (error));

    getData(all_countries)
    .then(response => countries_stored = response)
    .catch(error => console.log(error));
    
    getData(all_cities)
    .then (response => cities_stored = response)
    .catch (error => console.log(error));

    getData(all_companies)
    .then(response => {
        companies_stored = response
        createCompanyOptions(companies_stored, new_contact_company);
    })
    .catch (error => console.log(error));

    getData(all_contact_channels)
    .then(response => {
        channels_stored = response;
        createChannelsOptions("channelName", "channelData", "channelPref", channels_stored, contact_channels_section);
        createChannelsOptions("editChannelName", "editChannelData","editChannelPref",channels_stored, edit_contact_channels_section);
        
    })
    .catch (error => console.log(error));
})

//rellenar el select de compañías
function createCompanyOptions(companies, select){
    companies.forEach(company => {
        let option= document.createElement("option");
        select.appendChild(option);
        option.value = company.id;
        option.innerText = company.name;                
    });        
}

//crear select para cada canal de contacto

function createChannelsOptions (name_id_prefix, data_id_prefix, preference_id_prefix, channels, form){
    channels.forEach(channel => {
        let new_div = document.createElement("div");
        form.appendChild(new_div);
        new_div.classList.add("form-row", "justify-content-center", "my-3");
        new_div.innerHTML = `
        <div class="col-2 px-3">
                <label for="${name_id_prefix}-${channel.id}">Canal de contacto</label>
                <input
                  type="text"
                  class="form-control .bg-dark channel-name"
                  readonly
                  id = "${name_id_prefix}-${channel.id}"                                    
                  value=${channel.name}
                />
              </div>
              <div class="col-3 px-3">
                <label for="${data_id_prefix}-${channel.id}">Número / Cuenta de usuario</label>
                <input type="text" class="form-control .bg-dark channel-data" id="${data_id_prefix}-${channel.id}" value=" " />
              </div>
              <div class="col-2 px-3">
                <label for="${preference_id_prefix}-${channel.id}">Preferencias</label>
                <select class="form-control custom-select channel-pref" id="${preference_id_prefix}-${channel.id}" required>                
                  <option selected value="Sin preferencia">
                    Sin preferencia
                  </option>
                  <option value="Canal favorito">Canal favorito</option>
                  <option value="No molestar">No molestar</option>
                </select>
              </div>
        `
    })
}

function createRegionsOptions(regions, select){
    regions.forEach(region => {
        let option = document.createElement("option");
        select.appendChild(option);
        option.value = region.id;
        option.id = `reg-${region.id}`;
        option.innerText = region.name;
    })
}

//Crear el desplegable de paises segun region seleccionada

function displayRegionCountries(region_id, select){
    countries_stored.forEach(country => {        
        if(country.region_id === region_id){
            let option = document.createElement("option");
            select.appendChild(option);
            option.value = country.id;
            option.innerText = country.name;
        }
    })
}

new_contact_region.addEventListener('input', () => {
    let region_id = parseInt(new_contact_region.value);  
    cleanOptions(new_contact_country); 
    cleanOptions(new_contact_city); 
    displayRegionCountries (region_id, new_contact_country);
})

function displayCountryCities(country_id, select){
    cities_stored.forEach(city => {
        if(city.country_id === country_id){            
            let option = document.createElement("option");
            select.appendChild(option);
            option.value = city.id;
            option.innerText = city.name;
        }
    })
}

new_contact_country.addEventListener('input', () => {
    let country_id = parseInt(new_contact_country.value);    
    cleanOptions(new_contact_city);
    displayCountryCities(country_id, new_contact_city);
})

function getContact_ChannelPreferences(data_prefix, preference_prefix,storage_array){   
    let channel_1_data = document.getElementById(`${data_prefix}-1`);
    let channel_1_preferences = document.getElementById(`${preference_prefix}-1`);
    let channel_2_data = document.getElementById(`${data_prefix}-2`);
    let channel_2_preferences = document.getElementById(`${preference_prefix}-2`);
    let channel_3_data = document.getElementById(`${data_prefix}-3`);
    let channel_3_preferences = document.getElementById(`${preference_prefix}-3`);
    let channel_4_data = document.getElementById(`${data_prefix}-4`);
    let channel_4_preferences = document.getElementById(`${preference_prefix}-4`);
    let channel_5_data = document.getElementById(`${data_prefix}-5`);
    let channel_5_preferences = document.getElementById(`${preference_prefix}-5`);
    let channel_6_data = document.getElementById(`${data_prefix}-6`);
    let channel_6_preferences = document.getElementById(`${preference_prefix}-6`);

    let channel_1 = {
        channel_id: 1,
        value: channel_1_data.value,
        preference: channel_1_preferences.value
    }

    let channel_2 = {
        channel_id: 2,
        value: channel_2_data.value,
        preference: channel_2_preferences.value
    }

    let channel_3 = {
        channel_id: 3,
        value: channel_3_data.value,
        preference: channel_3_preferences.value
    }

    let channel_4 = {
        channel_id: 4,
        value: channel_4_data.value,
        preference: channel_4_preferences.value
    }

    let channel_5 = {
        channel_id: 5,
        value: channel_5_data.value,
        preference: channel_5_preferences.value
    }

    let channel_6 = {
        channel_id: 6,
        value: channel_6_data.value,
        preference: channel_6_preferences.value
    }

    storage_array.push(channel_1, channel_2, channel_3, channel_4, channel_5, channel_6);

}

//POST --> crear contacto
create_contact_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let contact_data = {
        firstname: new_contact_firstname.value, //traer la declaracion de las variables a este archivo
        lastname: new_contact_lastname.value,
        email: new_contact_email.value,
        company_id: parseInt(new_contact_companyID.value),
        city_id: parseInt(new_contact_city_id.value),
        job_title: new_contact_job_title.value,
        interesting: parseInt(new_contact_interesting.value),
        address: new_contact_address.value

    }
    getContact_ChannelPreferences("channelData", "channelPref", new_contact_preferences);
     
    
    async function storeContactChannels(id){
        new_contact_preferences.forEach(channel => {
            channel.contact_id = id;
            postData(channels_x_contact, channel)
            .then(response =>{
                 if (response.msg && response.id) {
                create_contact_form.reset();
                $('#confirmationModal').modal('show');
                 }                 
            })
            .catch(error => console.log (error));
        })
    
    }   
    
    postData(all_contacts,contact_data) 
    .then (response => {
        let contact_id = response.id;
        storeContactChannels(contact_id)        
    })
    .catch (error => console.log(error));
})


