const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.flex-wrapper');

menuButton.addEventListener('click', function() {
  navigation.classList.toggle('show');
});

const profileDescription = document.querySelector('p.profile-page__description');
const repositorieDescription = document.querySelector('.rep__descr');

const arrShow = [profileDescription, repositorieDescription];

arrShow[].addEventListener('click', function() {
  profileDescription.classList.toggle('show');
});

arrShow[].forEach(arrShow, function(item) {
      item.addEventListener('click', function() {
        if (item.classList.contains('show')) {
        item.classList.remove('show');
      } else {
        item.classList.add('show');
      }
  });
});
