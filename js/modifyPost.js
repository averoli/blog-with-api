import { getPosts } from "./main.js";
export function modifyingPost(id, user){
    const modalModify = document.getElementById("staticBackdrop-form");
    const modalModifyButton = document.getElementById("modifyPostButton");
    let url = `http://localhost:3000/posts/${id.toString()}`;
    const title = document.getElementById("titleModified");
    const description = document.getElementById("descriptionModified");
    fetch(url,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"userId": `${user}`, "id": `${id}`, "title": title.value, "body":description.value})
    })
    .then(res=> res.json())
    .then(res=>{
        getPosts();
    });
}