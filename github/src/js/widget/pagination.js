const paginationBtns = document.querySelectorAll('.pagination__button');

paginationBtns.forEach( function(item, i , arr) {
  item.addEventListener('click', function() {
     if(!item.classList.contains('active')) {
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
