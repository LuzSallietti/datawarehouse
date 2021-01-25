function display_none_transition(element, trigger){    

trigger.addEventListener('click', function () {
  
  if (element.classList.contains('hidden') && element.classList.contains('index')) {
    element.classList.remove('index', 'hidden');
    element.classList.remove('hidden');
    
    setTimeout(function () {
      element.classList.remove('visuallyhidden');
    }, 50);
  } else {    
    setTimeout(function () {
      element.classList.add('visuallyhidden');
    }, 20)      
      element.classList.add('index');
      element.classList.add('hidden');
      
    }
})
}
