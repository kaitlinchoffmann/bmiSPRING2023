let postForm = document.getElementById("post-form");
if(postForm) postForm.addEventListener("submit", createPost)

function createPost(e) {
  e.preventDefault();

  let createdPost = document.getElementById("post").value;

  let newPost = {
    post: createdPost
  }

  console.log(newPost)
}