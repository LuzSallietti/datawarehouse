const form = document.getElementsByTagName("form")[0];
const error_msg = document.getElementById("emailHelp");

async function checkData(){
    let data = {
        user: document.getElementById("user").value,
        password: document.getElementById("password").value
    };

    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    let response = await fetch(form.action, options);
    let content = await response.json();
    return content;
    
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    checkData()
    .then ( response => {        
        if (response.valid_user){
            let token = response.valid_user.token;
            let role = response.valid_user.role;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("role", role);            
            window.location = 'contacts.html';
        }
        if (response === "Incorrect username or password, or not registered user"){
            error_msg.classList.remove("text-muted");
            error_msg.innerText= "*Usuario o contraseña incorrectos";
        }
    })
    .catch ( error => console.log ("Error" + error));  
    
})   








