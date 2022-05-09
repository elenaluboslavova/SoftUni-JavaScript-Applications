function loadRepos() {
   const url = 'https://api.github.com/users/testnakov/repos';
   const div = document.getElementById('res');
   let xhr = new XMLHttpRequest();
   xhr.open("GET", url);
   xhr.send();

   xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
         div.textContent = xhr.responseText;
      }
   }
   
}