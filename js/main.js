const postElement = document.createElement("li");
//Getting posts and show
const fetchPosts = fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => {
    const postsList = document.getElementById("listGroup");

    data.forEach((post) => {
    const postElement = document.createElement("li");
      postElement.classList.add("list-group-item");
      postElement.setAttribute("id", post.id);
      postElement.setAttribute("data-bs-toggle", "modal");
      postElement.setAttribute("data-bs-target", "#staticBackdrop");
      const postTitle = post.title;
      postElement.append(postTitle);
      postsList.append(postElement);

      postElement.addEventListener("click", function (event) {
        const modalTitle = document.getElementById("modalTitle");
        const modalBodyInput = document.querySelector(".modal-body");
    
        modalTitle.textContent = document.getElementById(
          postElement.getAttribute("id")
        ).textContent;
        modalBodyInput.textContent = post.body;

      });
    });
  })
  .catch((error) => console.warn(error));



  const userName = document.getElementById("userName");
        const userEmail = document.getElementById("email");
        postElement.setAttribute("userId", post.userId);
        const fetchUsers = fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(
           data.filter(user => user.id === post.userId)
           
        )