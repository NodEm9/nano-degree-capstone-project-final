const isValidInput = (inputText) =>{

let placeName = ['placeName', 'country', 'city', 'date', 'weather', 'lat', 'lon', 'description' ];
if(!placeName.values(inputText)){
// console.log(inputText); 
    return false; 
}else { 
    return true;       
 } 
};

export { isValidInput };