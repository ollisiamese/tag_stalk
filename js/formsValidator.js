(function(somenamespace){



 
 function formsValidator(er) {
 
var self=this;


//custom method for re-typing the password
self.vaLogIn=function() {


//validating the Log In form
$('#loginForm').validate({
  rules:{
   username:"required",
   password:{required:true, minlength:6}
  
  
      },
	  
  messages:{
    username:{required:"Username is required"},
	password:{required:"Password is required", minlength:"Password should be at least 6 characters long"}
 
    },
	
	
	
  submitHandler:er.startSession

})

 }
 
//

 self.vaRegister=function() {
$.validator.addMethod("passwordConfirm",function(value){
	
   var firstPassword=$('#password1').val();
    var secondPassword=$('#password2').val() ;
   if(firstPassword===secondPassword){
   return true;
   }
   else{return false;}


},"Please make sure your password confirmation matches");

//validating the Registration form
$('#registerForm').validate({
  
	 rules:{
      username:{required:true,  //ABSOLUTE LINK!
              remote:{url:"../tagstalk/php/checkUserName.php",type:"post", data:{userName:function(){return $('#username').val()}}}
			  },
      password:{required:true, minlength:6},
	  password2:{required:true,passwordConfirm:true },
	  email:{required:true, email:true,remote:{url:"../tagstalk/php/checkEmail.php",type:"post", data:{email:function(){return $('#email').val()}}}}
  
      },
	  
  messages:{
     username:{required:"Username is required", remote:"This username is already taken, please choose a different one"},
	 password:{required:"Password is required", minlength:"Password should be at least 6 characters long"},
	 password2:{required:"Password is required", passwordConfirm:"Please make sure your re-typed password matches the original"},
	 email:{required:"Email is required", email:"Please enter a valid email address",remote:"An account tied to this email already exists, please choose a different one"}
    },
	
	
	
	
  submitHandler:er.processRegistration

}

)

}
//

self.vaPassword1=function() {

//validating the Password form - no username
$('#noUsername').validate({
  ignore:".ignore",
  rules:{
   email:{required:true, email:true}, 
   password:{required:true, minlength:6},

      },
	  
  messages:{
     email:{required:"Email is required", email:"Please enter a valid email address"},	 
	 password:{required:"Password is required", minlength:"Password should be at least 6 characters long"},
	    
    },
	
  submitHandler:er.sendUsername

})


}
//


//validating the Password form - no password
self.vaPassword2=function() {


$('#noPassword').validate({
  ignore:".ignore",
  rules:{
   email2:{required:true, email:true},
   username:{required:true}
   
  
  
      },
	  
  messages:{    
	  email2:{required:"Email is required", email:"Please enter a valid email address"},
	 username:{required:"Username is required"}
   
    },
	
  submitHandler:er.sendPassword

})


}



//
self.vaTrackTrendForm=function(){
 $('#trackTagForm').validate({
  rules:{
     trackInput:'required' 
     },
  messages:{
     trackInput:''
     },
	 
	 
  submitHandler:er.goOneTrend
 
})
}

self.vaTrackTrendForm2=function(){
 $('#trackTagForm2').validate({
  rules:{
     trackInput2:'required' 
     },
  messages:{
     trackInput2:''
     },
	 
	 
  submitHandler:er.goOneTrend2
 
})
}

}


//public property of the namespace
somenamespace.formsValidator=formsValidator;


//...
})(window.mainNameSpace=window.mainNameSpace||{});