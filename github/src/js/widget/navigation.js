const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav__wrapper');

menuButton.addEventListener('click', function() {
  navigation.classList.toggle('show');
});
