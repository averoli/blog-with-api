
//Getting posts and show
const fetchPosts = fetch("http://localhost:3000/posts")
.then(response=> response.json())
.then(data=>{
    const postsList = document.getElementById("listGroup");
    data.forEach(post =>{
        const postElement = document.createElement("li");
        postElement.classList.add("list-group-item");
        postElement.setAttribute("data-bs-toggle", "modal");
        postElement.setAttribute("data-bs-target", "#staticBackdrop");
        const postTitle = post.title;
        postElement.append(postTitle);
        postsList.append(postElement);
    })
})
.catch(error=> console.warn(error));