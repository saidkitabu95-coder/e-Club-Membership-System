function checkAdmin(){

    const admin = localStorage.getItem("admin");


    if(!admin){

        window.location.href = "admin-login.html";

    }

}



function logout(){

    localStorage.removeItem("admin");

    window.location.href = "admin-login.html";

}


checkAdmin();