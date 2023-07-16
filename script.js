const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

function toggleModal() {
  modal.classList.toggle("show-modal");
}

modalShow.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
window.addEventListener("click", (e) => {
  e.target == modal ? toggleModal() : false;
});

function validate(name, url) {
  var expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regEx = new RegExp(expression);
  if (!name || !url) {
    alert("Please give values for both fields");
    return false;
  }
  if (!url.match(regEx)) {
    alert("Please provide a valid URL");
    return false;
  }
  return true;
}

function storeBookmark(e) {
  e.preventDefault();
  const name = websiteName.value;
  let url = websiteUrl.value;
  if (!url.includes("https://") && !url.includes("http://")) {
    url = `https://${url}`;
  }
  if (!validate(name, url)) {
    return false;
  }
  bookmarks.push({
    name,
    url,
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteName.focus();
}
bookmarkForm.addEventListener("submit", storeBookmark);

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "Portfolio",
        url: "https://eswar-prasad-kona.netlify.app",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}
function buildBookmarks() {
  bookmarks.forEach((each) => {
    const { name, url } = each;
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favIcon = document.createElement("img");
    favIcon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favIcon.setAttribute("alt", "favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    //  Appending elements
    linkInfo.append(favIcon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

fetchBookmarks();
