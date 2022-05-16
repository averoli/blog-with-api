import { getPosts } from "./main.js";
import { createButtonsPosts } from "./createButtonsPosts.js";
import { fetchImages } from "./fetchImages.js";

const buttonSend = document.getElementById("buttonSend");
const buttonDelete = document.getElementById("deletePostButton");

export function searchPosts(input){
    if(input == ""){
        getPosts();
    }else{
        fetch("http://localhost:3000/posts")
        .then(response=>response.json())
        .then(data=>{
            const postsList = document.getElementById("listGroup");
            Array.from(document.getElementById("listGroup").children).forEach(son=>{
                son.remove();
            })
            data.sort(function(a,b){
                return (a.id.toString() - b.id.toString());
            })
            data.forEach(post =>{
                if(post.title.includes(input)){
                const postElement = document.createElement("section");
                postElement.classList.add("list-group-item");
                postElement.setAttribute("data-bs-toggle", "modal");
                postElement.setAttribute("data-bs-target", "#staticBackdrop");
                const postTitle = post.title;
                postElement.append(postTitle);
                postElement.setAttribute("id", post.id);
                postElement.setAttribute("userId", post.userId);
                postElement.setAttribute("postOrder", data.indexOf(post));
                postElement.addEventListener('click', function (event) {
                    // Button that triggered the modal
                    const button = event.relatedTarget
                    // Extract info from data-bs-* attributes
                    // If necessary, you could initiate an AJAX request here
                    // and then do the updating in a callback.
                    //
                    // Update the modal's content.
                    const modalTitle = staticBackdrop.querySelector('.modal-title')
                    const modalBodyInput = staticBackdrop.querySelector('.modal-body')
                    modalTitle.textContent = document.getElementById(postElement.getAttribute("id")).textContent;
                    modalBodyInput.textContent = post.body;
                    
                    createButtonsPosts(buttonSend, buttonDelete, postElement, post);
                })
                postsList.append(postElement);
                }
            }) 
            fetchImages();
        })
        .catch(error=>console.warn(error));
    }
}