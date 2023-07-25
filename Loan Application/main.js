const submit = document.getElementById('sub');
const Emi = document.getElementById('calbtn');


const validate = () =>{
  const name = document.getElementById('Fname').value.trim();
  const emailid = document.getElementById('email').value.trim();
  const panid = document.getElementById('Pan').value.trim().toUpperCase();
  
  // validate name
  let namearr = name.split(" ");
  const nameregex = /^[A-Za-z\s]*$/;
  if(name === ""){
  setErrorMsg(Fname,"Name cannot be blank");
  }
  else if(!name.match(nameregex)){
  setErrorMsg(Fname,"Please Enter Alphabets Only");
  }
  else if(namearr.length < 2){
    setErrorMsg(Fname,"Please Enter Full Name");
  }
  else if(checkWordLength(namearr)){
    setErrorMsg(Fname,"Each word should be more than 4 chars");
    return false;
  }
  else {setSuccess(Fname);}

  // validate email
  if(emailid === ""){
    setErrorMsg(email,"Email cannot be blank");
  }
  else if(!isEmail(emailid)){
    setErrorMsg(email,"Not a Valid Email");
    return false;
  }
  else {setSuccess(email);}

  // validate pan id
  if(panid.length!=10){
    setErrorMsg(Pan,"Enter Complete Pan Id Ex. PANID1234A");
  }
  else if(!isPan(panid)){
    setErrorMsg(Pan,"Enter valid Pan Id Ex. PANID1234A");
    return false;
  }
  else{
    setSuccess(Pan);
  }

  // validate loan details
  const loanamt = document.getElementById('LoanAmt').value.trim();
  const tenure = document.getElementById('Ltenure').value.trim();
  if(loanamt==""){
    setErrorMsg(LoanAmt,"Please Enter Loan Amount");
    return false
  }
  else{
    setSuccess(LoanAmt);
  }
  if(tenure == ""){
    setErrorMsg(Ltenure,"Please Enter Tenure");
    return false;
  }
  else{
    setSuccess(Ltenure);
  }
  return true;
}

function checkWordLength(names){
for(let i=0;i<names.length;i++){
  if(names[i].length<4){
    return true;
  }
}
}
function isEmail(email){
  let at = email.indexOf("@");
  if(at<1) return false;
  let dot = email.lastIndexOf(".");
  if(dot <= at +2) return false;
  if(dot === email.length-1) false;
  return true;
}

function isPan(pan){
  for(let i=0;i<=9;i++){
    if(i<5 || i==9){
      if(pan.charCodeAt(i)<65 || pan.charCodeAt(i)>90){
        return false;
        // break; 
      }
    }
    else if(i>=5 && i<=8){
        if(pan.charCodeAt(i)<=47 || pan.charCodeAt(i)>=58){
        return false;
        // break;
        }
      }
    }
    return true;
}


// error message
function setErrorMsg(id,errormsg){
  const forminput = id.parentElement;
  forminput.className = "form-inputs error";
  const small = forminput.querySelector('small');
  small.innerText = errormsg;
}

// success msg
function setSuccess(id){
  const forminput = id.parentElement;
  forminput.className = "form-inputs success";
}

//generate otp
function generateOtp(){
  let digits = "0123456789"
  let random = '';
  for(let i=0;i<4;i++){
    random += digits[Math.floor(Math.random()*10)];
  }
  return random;
}
//alert next page and store/pass value
const handleSubmit = (e) =>{
  e.preventDefault();
  if(validate()){
    const otp = generateOtp();
    const valname = document.getElementById('Fname').value.trim();
    const email = document.getElementById('email').value.trim();
    //submit form
  window.alert(`Your Otp for Validation is : ${otp}.`)

  //store value

  localStorage.setItem('storename',valname);
  localStorage.setItem('storeemail',email);
  localStorage.setItem('storeotp',otp);

  //redirect to next page
  window.location.href = "secondindex.html"
  }
}

//add event on submit
submit.addEventListener("click",handleSubmit);


//emi claculate

function calculateEmi() {
  // validate();
  const loanamt = document.getElementById('LoanAmt').value.trim();
  const tenure = document.getElementById('Ltenure').value.trim();
  const tenuremth  = tenure*12;
  const Lint = parseFloat((8.5/12)/100); 
  const Emi = Math.round((loanamt * Lint * Math.pow((1+Lint),tenuremth))/(Math.pow((1+Lint),tenuremth)-1));
  if(validate()){
  document.getElementById('EstEmi').innerText = `Estimated EMI: Rs. ${Emi} / Month`;
  }
}


const getEmi = (e) => {
  e.preventDefault();
  calculateEmi();
}
//add event on estemited emi
Emi.addEventListener("click",getEmi);








