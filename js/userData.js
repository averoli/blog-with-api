

export function getUserData(id, order){
    //We need to fecth users and filter and take the user data who has the same userId to id parameter
    fetch("http://localhost:3000/users")
    .then(res=>res.json())
    .then(data=>{
        const user = data.filter(user=>user.id == id);
        const userName = document.getElementById("userName");
        const userEmail = document.getElementById("email");
        userName.textContent = user[0].name;
        userEmail.textContent = user[0].email;
    })
    .catch((error) => console.warn(error));
}