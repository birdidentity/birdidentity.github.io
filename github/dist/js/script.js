const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.flex-wrapper');

menuButton.addEventListener('click', function() {
  navigation.classList.toggle('show');
});

const profileDescription = document.querySelector('p.profile-page__description');
const repositorieDescription = document.querySelector('p.rep__descr');

const arrShow = [repositorieDescription , profileDescription];

arrShow.forEach( function(item, i , arr) {
  item.addEventListener('click', function() {
     item.classList.toggle('show');
   });
});
