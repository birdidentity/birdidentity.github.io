const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.flex-wrapper');

menuButton.addEventListener('click', function() {
  navigation.classList.toggle('show');
});

const profileDescription = document.querySelector('p.profile-page__description');

profileDescription.addEventListener('click', function() {
  profileDescription.classList.toggle('show');
});
