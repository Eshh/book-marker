const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

modalShow.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
window.addEventListener("click", (e) => {
  e.target == modal ? toggleModal() : false;
});
