function closeModal() {
  var x = document.getElementById("country_info");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  x.classList.remove("show");
   setTimeout(function(){
  $('.modal-backdrop').remove();
  }, 1000);
}




