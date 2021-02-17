const departDate = document.querySelector('[data-departure-date]');
const returnDate = document.querySelector('[data-return-date]');
const placeName = document.querySelector('[data-place-name]');

const duration = document.querySelector('[data-trip-duration]');

 
const updateDaysCount = ()  => {
  //Get current date
  const startDate = new Date(departDate.value);

  
  //Update countdown to trip day
  const daysInterval = setInterval ( () => {

 //Get end date
  const endDate = new Date(returnDate.value);

  //Get difference in milliseconds
  let diff = endDate.getTime() - startDate.getTime();

  let milisecondsInDay = 1000 * 3600 * 24;

  duration.innerHTML = 'You have'+ ' ' + diff/milisecondsInDay + ' '+' days left to your trip.';

  duration.value = '';

    //Check if counterdown is elapse and clear interval 
    if(diff < 1){
      duration.innerHTML =`Your trip to ${placeName.value} date will expire in one day`;
      
    }else if(diff < 0){
      clearInterval(daysInterval);
      duration.innerHTML = 'EXPIRED, Don\'t forget your trip';
    }
  }, 3600);
         

}; 




export { updateDaysCount };