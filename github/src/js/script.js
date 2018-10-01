const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.flex-wrapper');

menuButton.addEventListener("click", function() {
  navigation.classList.toggle("show");
});
