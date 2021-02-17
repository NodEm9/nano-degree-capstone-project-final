import { isValidInput } from './js/inputsValidation';
import { handleSubmit, printBtn, deleteBtn } from './js/app';  
import { updateDaysCount } from './js/calcTrip';
import { linkedinLink } from './js/social-media';

// import { websiteImage } from './js/website-img';
import 'regenerator-runtime/runtime';                    
 
      
import './styles/base.scss';

document.querySelector('[data-submit-btn]').addEventListener('click', handleSubmit);  

document.querySelector('[ data-delete-btn]').addEventListener('click', deleteBtn );
document.querySelector('[data-print-trip]').addEventListener('click', printBtn);

   
//Configure the Hot Module Replacement
if (module.hot) {
          module.hot.accept('./js/app.js', function() {
          console.log('Accepting the updated handleSubmit module!');
          handleSubmit();
  });  
}   


export {
          isValidInput,
          handleSubmit, 
          updateDaysCount,
          printBtn,
          deleteBtn,
          linkedinLink 
       
};      
