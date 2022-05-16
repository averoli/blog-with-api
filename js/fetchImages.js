function fetchImages(){
    const APIkey = "15187030-5dd150b11fa43e2de5dddfff6";
    fetch(`https://pixabay.com/api/?key=${APIkey}&q=nature`)
    .then(res=>res.json())
    .then(data=>{
        let images = [];
        data.hits.forEach(img=>{
            images.push(img.previewURL);
        })
        addImagestoBlog(images);
        return images;
    })
}

function addImagestoBlog(img){
    const pics = img;
    const list = document.getElementById("listGroup");
    Array.from(document.getElementById("listGroup").children).forEach(son=>{
        const imagePost = document.createElement("img");
        imagePost.classList.add("img-post")
        const index = Math.floor(Math.random() * (19-0) + 0);
        imagePost.setAttribute("src", img[index]);
        son.append(imagePost);
        son.prepend(imagePost);
    })
}

export {fetchImages}