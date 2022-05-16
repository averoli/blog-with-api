import { getPosts } from "./main.js";

export function deletingPost(postId, userId){
    const mainContainer = document.getElementById("main-container");
    let containerDelete = document.createElement("dialog");
    containerDelete.classList.add("containerDeleteMessages");
    containerDelete.append(document.createElement("p").textContent = "Deleting post...wait a few seconds");
    mainContainer.append(containerDelete);
    let url = `http://localhost:3000/posts/${postId.toString()}`;
    fetch(url, {
        method: "DELETE",
    })
    .then(res=>res.json())
    .then(res=>{
        setTimeout(function(){
            containerDelete.textContent="Post deleted Successfully!";
            hideDialog();
        }, 2000);
    })
}

function hideDialog(){
    const mainContainer = document.getElementById("main-container");
    const containerDelete = document.querySelector(".containerDeleteMessages");
    setTimeout(function(){
        mainContainer.removeChild(containerDelete);
        getPosts();
    },2000);
}

