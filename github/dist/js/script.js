const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav__wrapper');

menuButton.addEventListener('click', function() {
  navigation.classList.toggle('show');
});

const profileDescription = document.querySelector('.profile-page .profile-page__description');
const repositorieDescription = document.querySelector('.rep__descr');

const arrShow = [repositorieDescription , profileDescription];

arrShow.forEach( function(item) {
  item.addEventListener('click', function() {
     item.classList.toggle('show');
   });
});

const paginationBtns = document.querySelectorAll('.pagination__button');

paginationBtns.forEach( function(item, i , arr) {
  item.addEventListener('click', function() {
     if(item.classList.contains('active')) {

     }else {
       for(var i = 0; i < arr.length; i++) {
         arr[i].classList.remove('active');
       }
       item.classList.add('active');
       if(item === arr[1]) {
         arr[0].classList.add('disabled');
       }else {
         arr[0].classList.remove('disabled');
       }
     }
   });
});


const searchForm = document.querySelector('.search-form__input');

if (screen.width >= 1024) {
  searchForm.setAttribute('placeholder', 'Search');
}else {

};

const repositories = document.querySelector('.content__repositories');
const people = document.querySelector('.content__people');
const projects = document.querySelector('.content__projects');

const contentNav = document.querySelectorAll('.content-nav__tab');
const arrContent = [repositories, people, projects];


contentNav.forEach( function(item, i , arr) {

  item.addEventListener('click' , function() {

    if(!item.classList.contains('active-tab')) {

      for(var j = 0; j < contentNav.length; j++) {
        contentNav[j].classList.remove('active-tab');
        arrContent[j].classList.remove('show-tab');
      }
      item.classList.add('active-tab');
      arrContent[i].classList.add('show-tab');

    }else {

    }
  });
});
