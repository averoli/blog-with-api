function getUserData(id){
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
    .catch(error=>console.warn(error));
}

function getPostComments(id){
fetch("http://localhost:3000/comments")
.then(res => res.json())
.then(data => {
    const comments = data.filter(comment => comment.postId == id);
    
    comments.forEach(comment => {
        const commentsBlock = document.querySelector(".card");

        const commentName = document.createElement("p");
        const commentText = document.createElement("p");
        const commentEmail = document.createElement("p");
        
        commentName.append(comment.name);
        commentText.append(comment.body);
        commentEmail.append(comment.email);

        commentsBlock.append(commentName);
        commentsBlock.append(commentText);
        commentsBlock.append(commentEmail);

    })
    
    
})
}

//Getting posts and show
const fetchPosts = fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
    const postsList = document.getElementById("listGroup");
    data.forEach(post =>{
        const postElement = document.createElement("li");
        postElement.classList.add("list-group-item");
        postElement.setAttribute("data-bs-toggle", "modal");
        postElement.setAttribute("data-bs-target", "#staticBackdrop");
        const postTitle = post.title;
        postElement.append(postTitle);
        postElement.setAttribute("id", post.id);
        postElement.setAttribute("userId", post.userId);
        postElement.addEventListener('click', function (event) {
            // Button that triggered the modal
            // const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            // If necessary, you could initiate an AJAX request here
            // and then do the updating in a callback.
            //
            // Update the modal's content.
            const modalTitle = staticBackdrop.querySelector('.modal-title')
            const modalBodyInput = staticBackdrop.querySelector('.modal-body')
            modalTitle.textContent = document.getElementById(postElement.getAttribute("id")).textContent;
            modalBodyInput.textContent = post.body;

            const postElementId = document.getElementById(postElement.getAttribute("id"));
            const userId = postElementId.getAttribute("UserId");
            const postId = postElementId.getAttribute("id")
            getUserData(userId);
            getPostComments(postId);
        })
        postsList.append(postElement);
    })
})
.catch(error=> console.warn(error));
