function verifyRole (){
    let role = parseInt(sessionStorage.getItem("role"));
    let users_nav = document.getElementById("users-page");
    if(role === 0){
        users_nav.classList.add("d-none");
    }
}