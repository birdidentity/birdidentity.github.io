const profileDescription = document.querySelector('.profile-page .profile-page__description');
const repositorieDescription = document.querySelector('.rep__descr');
const arrShow = [repositorieDescription , profileDescription];

arrShow.forEach( function(item) {
  item.addEventListener('click', function() {
     item.classList.toggle('show');
   });
});
