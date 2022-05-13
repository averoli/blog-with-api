import deletePost from "./delete.js";
import updatePost from "./update.js";

function getUserData(id) {
  //We need to fecth users and filter and take the user data who has the same userId to id parameter
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      const user = data.filter((user) => user.id == id);
      const userName = document.getElementById("userName");
      const userEmail = document.getElementById("email");
      userName.textContent = user[0].name;
      userEmail.textContent = user[0].email;
    })
    .catch((error) => console.warn(error));
}

function getPostComments(id) {
  fetch("http://localhost:3000/comments")
    .then((res) => res.json())
    .then((data) => {
      const comments = data.filter((comment) => comment.postId == id);
      const commentsBlock = document.querySelector(".card");

      comments.forEach((comment) => {
        if (!commentsBlock.hasChildNodes()) {
          console.log("kuku");
        }
        const commentName = document.createElement("p");
        const commentText = document.createElement("p");
        const commentEmail = document.createElement("p");
        commentName.textContent = comment.name;
        commentText.textContent = comment.body;
        commentEmail.textContent = comment.email;
        commentsBlock.append(commentName);
        commentsBlock.append(commentText);
        commentsBlock.append(commentEmail);
      });
    })
    .catch((error) => console.warn(error));
}

//Getting posts and show
const fetchPosts = fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
    const postsList = document.getElementById("listGroup");
    data.forEach((post) => {
      const postElement = document.createElement("li");
      const btnUpdate = document.createElement("button");
      const btnDelete = document.createElement("button");
      const postTitle = post.title;

      postElement.classList.add("list-group-item");
      btnUpdate.classList.add("btn", "btn-outline-primary");
      btnUpdate.setAttribute("id", post.id);
      btnDelete.classList.add("btn", "btn-outline-secondary");
      btnDelete.setAttribute("id", post.id);
      btnUpdate.append("Edit");
      btnDelete.append("Delete");
      postElement.setAttribute("data-bs-toggle", "modal");
      postElement.setAttribute("data-bs-target", "#staticBackdrop");

      btnUpdate.setAttribute("data-bs-toggle", "modal");
      btnUpdate.setAttribute("data-bs-target", "#modalEdit");

      postElement.append(postTitle);
      postElement.setAttribute("id", post.id);
      postElement.setAttribute("userId", post.userId);

      const modalTitle = staticBackdrop.querySelector(".modal-title");
      const modalBodyInput = staticBackdrop.querySelector(".modal-body");
      //
      //MODAL WITH
      //POST TITLE, POST BODY
      //USER NAME, USER EMAIL
      //COMMENTS
      //
      postElement.addEventListener("click", function () {
        modalTitle.textContent = document.getElementById(
          postElement.getAttribute("id")
        ).textContent;
        modalBodyInput.textContent = post.body;

        const postElementId = document.getElementById(
          postElement.getAttribute("id")
        );
        const userId = postElementId.getAttribute("UserId");
        const postId = postElementId.getAttribute("id");
        getUserData(userId);
        getPostComments(postId);
      });
      //
      //DELELE POST
      //
      btnDelete.addEventListener("click", function () {
        const btnDeleteId = document.getElementById(
          btnDelete.getAttribute("id")
        );
        const postId = btnDeleteId.getAttribute("id");
        deletePost(postId);
      });

      //
      //UPDATE POST
      //
    //   let titleEdit = document.getElementById("titleEdit");
    //   let bodyEdit = document.getElementById("bodyEdit");
    //   btnUpdate.addEventListener("click", function () {
    //     titleEdit.textContent = post.title;
    //     bodyEdit.textContent = post.body;
    //   });

    //   document
    //     .getElementById("saveEdit")
    //     .addEventListener("click", function (e) {
    //       const btnUpdateId = document.getElementById(
    //         btnUpdate.getAttribute("id")
    //       );
    //       const postId = btnUpdateId.getAttribute("id");
    //       titleEdit = e.target.value;
    //       console.log(titleEdit);
    //       bodyEdit = e.target.value;
    //       updatePost(postId, titleEdit, bodyEdit);
    //     });

      postsList.append(postElement);
      postsList.append(btnUpdate);
      postsList.append(btnDelete);
    });
  })
  .catch((error) => console.warn(error));
