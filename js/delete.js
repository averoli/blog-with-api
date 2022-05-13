const deletePost = (id) => {
    let url = `http://localhost:3000/posts/${id}`;
  fetch(url, {
      method: 'DELETE',
  })
  .then(res => res.json())
  .then(res => {
      console.log(res);
  })
};

export default deletePost;
