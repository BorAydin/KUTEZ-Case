const date = document.getElementById('datepicker');
const item = document.getElementById('item');
const num = document.getElementById('productnumber');
const btn = document.getElementById('calculate');
message = document.querySelector('.message');

var flag = true;

date.addEventListener('input', (e)=>{
  
  date.style.color= 'black'
  date.style.border= '1px solid black'

})

item.addEventListener('input', (e)=>{
 
  item.style.color= 'black'
  item.style.border= '1px solid black'

})

productnumber.addEventListener('input', (e)=>{
  
  productnumber.style.color= 'black'
  productnumber.style.border= '1px solid black'

})

function inputCheck(){
  
  if(date.value === '' || item.value === '' || num.value === ''){
    
    flag = false;
    date.value = '';
    item.value = '';
    num.value = '';   

    showAlert('Please Fill All Information Correctly.', 'error') 

  } else {
    flag = true;
  }
  
  return flag;
}

function dateCheck(dt){
   
  const checkDate = new Date(dt)
  const diff = Date.now()-checkDate.getTime();

  if(diff >= 75600000){
      
    flag = false
    date.value = '';
    item.value = '';
    num.value = ''; 

    showAlert('Don\'t select the past date.', 'error') 

  } else {
    flag = true;
  }

  return flag;
}

function numCheck(nm){
   
  if(num.value != ''){
    if(nm <= 0 || nm >100){
      
      flag = false
      date.value = '';
      item.value = '';
      num.value = ''; 
      
      showAlert('Enter a value between 1 and 100.', 'error') 
  
    } else {
      flag = true;
    }
  }
  
  return flag;
}

function showAlert(message, className){
 
  const div = document.createElement('div');
  div.className = `alert ${className}`; 
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const field = document.querySelector('body');
  field.insertBefore(div, container);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);

}

function setFinal(dt){
  
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
  if(dt.getDate() == 4 && dt.getMonth() == 6 && dt.getDay() != 6){
    
    var fnDate = new Date(Date.parse(dt)+ 86400000);
    message.innerHTML = (`Your Estimated Shipping Time Is <span style="font-weight:bold">${fnDate.getDate()}  ${month[fnDate.getMonth()]}  ${fnDate.getFullYear()}</span>`)

  } else if (dt.getDate() == 25 && dt.getMonth() == 11 && dt.getDay() != 6){
    
    var fnDate = new Date(Date.parse(dt)+ 86400000);
    message.innerHTML = (`Your Estimated Shipping Time Is <span style="font-weight:bold">${fnDate.getDate()}  ${month[fnDate.getMonth()]}  ${fnDate.getFullYear()}</span>`)

  } else{
    message.innerHTML = (`Your Estimated Shipping Time Is <span style="font-weight:bold">${dt.getDate()}  ${month[dt.getMonth()]}  ${dt.getFullYear()}</span>`)
  } 
}
  
btn.addEventListener('click', (e)=>{

  dateCheck(date.value)
  inputCheck() 
  numCheck(num.value)
    
  if(flag){
    if(item.value == 'Cotton' && num.value<50){
      
      const arrdate = new Date(date.value)
      var day=arrdate.getDay()
     
      if(day == 5){
        
        var newDate = new Date(Date.parse(arrdate)+ 345600000);
        setFinal(newDate)

      } else if (day == 6){
       
        var newDate = new Date(Date.parse(arrdate)+ 259200000);
        setFinal(newDate)

      } else if (day == 0) {
        
        var newDate = new Date(Date.parse(arrdate)+ 172800000);
        setFinal(newDate)

      } else {
        
        const newDate = new Date(Date.parse(arrdate)+ 172800000);
        setFinal(newDate)

      } 
    } else if (item.value == 'Cotton' && num.value>=50){
      
      const arrdate = new Date(date.value);
      const newDate = new Date(Date.parse(arrdate)+ 259200000);
      setFinal(newDate)

    }
  
    if(item.value == 'Linen' && num.value<50){
     
      const arrdate = new Date(date.value)
      const newDate = new Date(Date.parse(arrdate)+ 345600000);
      setFinal(newDate) 

    } else if (item.value == 'Linen' && num.value>=50){
      
      const arrdate = new Date(date.value)
      const newDate = new Date(Date.parse(arrdate)+ 432000000);
      setFinal(newDate)
      
    }
  } 

  date.value = '';
  item.value = '';
  num.value = '';
  
  date.style.color= '#8d9092'
  date.style.border= '1px solid #8d9092'

  item.style.color= '#8d9092'
  item.style.border= '1px solid #8d9092'

  productnumber.style.color= '#8d9092'
  productnumber.style.border= '1px solid #8d9092'

  
  e.preventDefault()
})