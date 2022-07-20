const inputField = document.querySelector(".comment_field");
const commentList = document.querySelector("#comment_list");
const sendBtn = document.querySelector(".send_btn");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputField.value !== null) {
    let li = document.createElement("li");
    addChat(inputField.value, li);
    inputField.value = null;
    commentList.scrollTop = commentList.scrollHeight;
  }
});

function addChat(data, li) {
  li.innerHTML = `<div class="comment_item">
  <label class="username">Joe</label>
  <label class="date">123-12-34345</label>
  <label class="content">${data}</label>
  <hr class="item_divider"/>
</div>`;
  commentList.appendChild(li);
}

inputField.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendBtn.click();
  }
});
