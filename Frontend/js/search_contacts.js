const search_form = document.getElementById("search-form");
const search_firstname = document.getElementById("search-firstname");
const search_lastname = document.getElementById("search-lastname");
const search_job_title = document.getElementById("search-job-title");
const search_country = document.getElementById("search-country");
const search_city = document.getElementById("search-city");
const search_company = document.getElementById("search-company");
const search_channel = document.getElementById("search-channel");
const search_interesting = document.getElementById("search-interesting");
//mostrar el form de busqueda

dropdown_search_icon.addEventListener("click", () => {
    if(search_contact_filter.classList.contains("hidden", "visuallyhidden")){
        search_contact_filter.classList.remove("hidden", "visuallyhidden")
        createCompanyOptions(countries_stored, search_country); 
        createCompanyOptions(companies_stored, search_company); //esta función sirve para completar todos los inputs simples
        createCompanyOptions(channels_stored, search_channel);
    } else {
        search_contact_filter.classList.add("hidden", "visuallyhidden");
        search_form.reset();
        cleanOptions(search_country);
        cleanOptions(search_city);
        cleanOptions(search_company);
        cleanOptions(search_channel);
    }   
})

search_country.addEventListener("click", () => {
    let country_id = parseInt(search_country.value);    
    cleanOptions(search_city);
    displayCountryCities(country_id, search_city);
})

function deleteResults(section){
    if ( section.hasChildNodes() )
        {
        while ( section.childNodes.length >= 1 )
        {
        section.removeChild( section.firstChild );
        }
    }
}


search_icon.addEventListener('click', () => {
    search_contact_filter.classList.add("hidden", "visuallyhidden");
    
    //oculto y limpio el form de búsqueda

    var url = new URL(`${contacts_search}`);
    var search_params = url.searchParams;
    

    if (search_firstname.value !==""){
        // asignar parámetros nombre/valor
        search_params.set('firstname', `${search_firstname.value}`);
        
    }
    if (search_lastname.value !==""){
        
        search_params.set('lastname', `${search_lastname.value}`);
    }
    if (search_job_title.value !==""){
        
        search_params.set('job_title', `${search_job_title.value}`);
    }
    if (search_company.value !==""){
       
        search_params.set('company_id', `${search_company.value}`);
    }       
    if (search_city.value !==""){
        
        search_params.set('city_id', `${search_city.value}`);
    }
    if (search_country.value !==""){
        
        search_params.set('country_id', `${search_country.value}`);
    }
    if (search_interesting.value !==""){
       
        search_params.set('interesting', `${search_interesting.value}`);
    }
    if (search_channel.value !==""){
        
        search_params.set('fav_channel', `${search_channel.value}`);
    }
    
    // cambiar la propiedad de búsqueda de la URL principal
    url.search = search_params.toString();

    // la nueva url a string
    var search_url = url.toString();

    // output : 
    console.log(search_url);

    //va al request GET contacts by filter
    getDataByFilter(search_url)
    .then(response => {
        console.log(response)
        search_form.reset();
        cleanOptions(search_country);
        cleanOptions(search_city);
        cleanOptions(search_company);
        cleanOptions(search_channel); //limpio el form de busqueda

        if (response.length >= 1 ){
        let search_results = response;
        deleteResults(contacts_list_section) // borro los child nodes
        display_query_results (search_results, contacts_list_section);
        editTriggers(edit_contact_btns,edit_contact_section);
        deleteTriggers(delete_btns, delete_modal);
        checkboxesTriggers();
        singleCheckTrigger();
        } else {
            deleteResults(contacts_list_section);
            let div = document.createElement("div");//crear el mensaje sin resultados para los criterios ingresados
            contacts_list_section.appendChild(div);
            div.classList.add("col-12", "text-center", "p-5")
            div.innerHTML=`<h4>No hay resultados que coincidan con tu criterio de búsqueda.</h4>`;
        }
    
    }) 
    .catch(error => console.log(error));        
});