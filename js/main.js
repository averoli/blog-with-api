import {modifyingPost} from "./modifyPost.js";
import { deletingPost } from "./deletePost.js";
import { getUserData } from "./userData.js";
import {getPostComments} from "./comments.js";
import { fetchImages} from "./fetchImages.js";
import { createButtonsPosts } from "./createButtonsPosts.js";
import { searchPosts } from "./search.js";

const buttonSend = document.getElementById("buttonSend");
const buttonDelete = document.getElementById("deletePostButton");
const inputSearch = document.getElementById("input-search");

//addEventListener for search posts
document.getElementById("search-icon").addEventListener("click",function() {
    searchPosts(inputSearch.value);
})

//Getting posts and show
function getPosts(){
const fetchPosts = fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
      //First check if there are post in the page if it doesnt exist we create, if not we remove all lis and create them 
      //check the number of li exists, if its equals to length of data we display them
      //else we remove li and create from the beggining all of them
      const postsList = document.getElementById("listGroup");//get the ul element
      if(listGroup.children.length == 0){//if ul hasnt got childs, we create them
        data.sort(function(a,b){
         return (a.id.toString() - b.id.toString());
        })
        data.forEach(post =>{
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
        })
      }else{//if the user deleted some posts or modify some post, we delete all li and create all of them from the beggining
        Array.from(document.getElementById("listGroup").children).forEach(son=>{
            son.remove();
        })
        data.sort(function(a,b){
            return (a.id.toString() - b.id.toString());
        })
        data.forEach(post =>{
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
        })
      }
    fetchImages();
})
.catch(error=> console.warn(error));
}

getPosts();

export {getPosts, buttonSend, buttonDelete}