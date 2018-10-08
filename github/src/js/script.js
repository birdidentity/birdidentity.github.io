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
