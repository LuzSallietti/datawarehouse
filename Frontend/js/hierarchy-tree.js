function hierarchyTree(){
  let toggler = document.getElementsByClassName("caret");
  let blue_toggler = document.getElementsByClassName("caret-blue");

  for (let i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
  for (let i = 0; i < blue_toggler.length; i++) {
    blue_toggler[i].addEventListener("click", function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
}