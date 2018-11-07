const repositories = document.querySelector('.content__repositories');
const people = document.querySelector('.content__people');
const projects = document.querySelector('.content__projects');
const contentNav = document.querySelectorAll('.content-tabs__tab');
const arrContent = [repositories, people, projects];
const peopleCounter = document.querySelector('.people__counter');

contentNav.forEach( function(item, i) {

  item.addEventListener('click' , function() {

    if(!item.classList.contains('active-tab')) {

      tabs();
      item.classList.add('active-tab');
      arrContent[i].classList.add('show-tab');

    };
  });
});

peopleCounter.addEventListener('click' , function() {
  tabs();
  contentNav[1].classList.add('active-tab');
  arrContent[1].classList.add('show-tab');
});

function tabs() {
  for(var j = 0; j < contentNav.length; j++) {
    contentNav[j].classList.remove('active-tab');
    arrContent[j].classList.remove('show-tab');
  }
};
