const linkedinLink = document.getElementById('linkedin');
const gitHunLink = document.getElementById('gitHub');
const facebookLink = document.getElementById('facebook');
    
    
linkedinLink.addEventListener('click', () => {
          if(linkedinLink) {
           window.open('https://www.linkedin.com/in/emmanuel-nodolomwanyi-60b56246/');   
          }else{
            window.location = '/';
          }
});

gitHunLink.addEventListener('click', () => {
          if(gitHunLink){
                    window.open('https://github.com/NodEm9');
          }else{
                    window.location = '/';
          }
});

facebookLink.addEventListener('click', () => {
          if(facebookLink) {
                    window.open('https://www.facebook.com/');
          }else{
                    window.location = '/';
          }
});


export {linkedinLink};