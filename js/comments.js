
export function getPostComments(id, order) {
    fetch(`http://localhost:3000/comments`)
      .then((res) => res.json())
      .then((data) => {
          //primero comprobar si tiene hijos, si los tiene se eliminan y sino se da paso al codigo de abajo
          data.sort(function(a,b){
            return (a.id.toString() - b.id.toString());
           })
          if(document.getElementById("div-card-body-collapse").children.length != 0){
              console.log(document.getElementById("div-card-body-collapse").children[0]);
              Array.from(document.getElementById("div-card-body-collapse").children).forEach(son=>{
                  son.remove();
              })
              const comments = data.filter((comment) => comment.postId == parseInt(id));
              const commentsBlock = document.querySelector(".card");
              comments.forEach((comment) => {
                  const commentName = document.createElement("p");
                  const commentText = document.createElement("p");
                  const commentEmail = document.createElement("p");
                  const separator = document.createElement("div");
                  separator.classList.add("div--separator");
                  commentName.append(comment.name);
                  commentText.append(comment.body);
                  commentEmail.append(comment.email);
                  commentsBlock.append(commentName);
                  commentsBlock.append(commentText);
                  commentsBlock.append(commentEmail);
                  commentsBlock.appendChild(separator);
              });
          }else{
              const comments = data.filter((comment) => comment.postId == parseInt(id));
              const commentsBlock = document.querySelector(".card");
              comments.forEach((comment) => {
                  const commentName = document.createElement("p");
                  const commentText = document.createElement("p");
                  const commentEmail = document.createElement("p");
                  const separator = document.createElement("div");
                  separator.classList.add("div--separator");
                  commentName.append(comment.name);
                  commentText.append(comment.body);
                  commentEmail.append(comment.email);
                  commentsBlock.append(commentName);
                  commentsBlock.append(commentText);
                  commentsBlock.append(commentEmail);
                  commentsBlock.appendChild(separator);
              });
          }
      });
  }