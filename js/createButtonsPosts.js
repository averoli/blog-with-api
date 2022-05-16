import {buttonSend,buttonDelete} from "./main.js"
import { getUserData } from "./userData.js";
import { getPostComments } from "./comments.js";
import { modifyingPost } from "./modifyPost.js";
import { deletingPost } from "./deletePost.js";

export function createButtonsPosts(buttonSend, buttonDelete, postElement, post){
    const postElementId = document.getElementById(postElement.getAttribute("id"));
    const userId = postElementId.getAttribute("UserId");
    const order = postElementId.getAttribute("postOrder");
    getUserData(userId, order);
    getPostComments(postElementId.getAttribute("id"), order);
    
    //Add the buttons to modifying and delete a post
    const modalFooter = document.querySelector(".modal-footer");
    let modifyPost;
    let deletePost;
    if(document.getElementById("modifyPostButton") == null){
        deletePost = document.createElement("button");                
        modifyPost = document.createElement("button");

        modifyPost.setAttribute("type", "button");
        modifyPost.setAttribute("id", "modifyPostButton");

        deletePost.setAttribute("type", "button");
        deletePost.setAttribute("id", "deletePostButton");
        
        modifyPost.setAttribute("data-bs-toggle", "modal");
        modifyPost.setAttribute("data-bs-target", "#staticBackdrop-form");
        
        modifyPost.append("Modify");
        deletePost.append("Delete");
        modifyPost.classList.add("btn");
        modifyPost.classList.add("btn-primary");

        deletePost.classList.add("btn");
        deletePost.classList.add("btn-primary");
                    
        modalFooter.append(modifyPost);
        modalFooter.append(deletePost);
                    
        let postId = post.id;
        modifyPost.setAttribute("data-bs-dismiss", "modal");
        modifyPost.addEventListener("click", function(){
            //Hide the first modal
            const title = document.getElementById("titleModified");
            const bodyPost = document.getElementById("descriptionModified");
            const modalTitle = staticBackdrop.querySelector('.modal-title')
            const modalBodyInput = staticBackdrop.querySelector('.modal-body');
            title.value = modalTitle.textContent;
            bodyPost.value = modalBodyInput.textContent;
            buttonSend.setAttribute("data-bs-dismiss", "modal");
            buttonSend.addEventListener("click", function(){
                modifyingPost(postId, userId);
            });
    
        })

        deletePost.setAttribute("data-bs-dismiss", "modal");
        deletePost.addEventListener("click", function(){
            //Hide the first modal
            deletePost.setAttribute("data-bs-dismiss", "modal");
            deletingPost(postId, userId);    
        })
    }
}