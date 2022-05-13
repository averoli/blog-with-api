const updatePost = (id, titleEdit, bodyEdit)=> {
    let url = `http://localhost:3000/posts/${id}`;
fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: titleEdit, body: bodyEdit })
 })
.then(res => res.json())
.then(res=> {
      console.log(res);
})
}

export default updatePost;