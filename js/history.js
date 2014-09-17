(function(somenamespace){
  
  
	
	
	function HistoryRouter() { //a scope to define all the screen routes navigation
	 
	
	 var er=new somenamespace.EventViewModel(); //start the view model and apply its bindings
	     ko.applyBindings(er, document.getElementById('appContainer'));
	 var fv=new somenamespace.formsValidator(er);
     
	 
	 
	 
	 var self=this;
	 
	 //React to changes in the URL by presenting the right content
	 
	 self.navigation=$.sammy(function(){
           this.element_selector = '#appContainer';
        
		//HOME (track trend) route
		this.get('#/trackTrend',function(context){
		
             er.homeScreen(true);
			 er.checkForSession(); //to set er.yesSession() and the list of hashtags
			 er.loginHomeScreen(false);
			 er.loginScreen(false);
             er.registerScreen(false);
             er.passwordScreen(false);
			 er.oneTrendScreen(false);
			 er.myTagsScreen(false);
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
			 er.posts(null);
			 
			 
			 
			 
			 

        }); //end of the HOME routeEvents
		
		//LOG IN MAIN route
		this.get('#/loginMain',function(context){
             er.homeScreen(false);
			 er.loginHomeScreen(true);
             er.loginScreen(false);
             er.registerScreen(false);
             er.passwordScreen(false);
			 er.oneTrendScreen(false);
			 er.myTagsScreen(false);
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
			 er.posts(null);
			 

        }); //end of the LOG IN MAIN routeEvents
		
		//LOG IN FORM route
		this.get('#/loginForm',function(context){
             er.homeScreen(false);
			 er.loginHomeScreen(false);
             er.loginScreen(true);
             er.registerScreen(false);
             er.passwordScreen(false);
			 er.oneTrendScreen(false);
			 er.myTagsScreen(false);
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
             fv.vaLogIn();
			 er.posts(null);
			 
        }); //end of the LOG IN FORM routeEvents
		
		//REGISTER FORM route
		this.get('#/registerForm',function(context){
             er.homeScreen(false);
			 er.loginHomeScreen(false);
             er.loginScreen(false);
             er.registerScreen(true);
             er.passwordScreen(false);
			 er.oneTrendScreen(false);
			 er.myTagsScreen(false);
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
             fv.vaRegister();
			 er.posts(null);
			 
        }); //end of the REGISTER FORM routeEvents
		
		//PASSWORD FORM route
		this.get('#/passwordForm',function(context){
             er.homeScreen(false);
			 er.loginHomeScreen(false);
             er.loginScreen(false);
             er.registerScreen(false);
             er.passwordScreen(true);
			 er.oneTrendScreen(false);
			 er.myTagsScreen(false);
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
			 
             er.passwordFormOption("username");			 
			 fv.vaPassword1();			 
			 fv.vaPassword2();
			 
			 er.posts(null);
			 
        }); //end of the PASSWORD FORM route
		
		
		//ONE TREND route
		this.get('#/oneTrend&tag=:hashtag',function(context){
             er.selectedTag(this.params['hashtag']);//to grab the hashtag form the url
			 
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
			 er.homeScreen(false);
			 er.loginHomeScreen(false);
             er.loginScreen(false);
             er.registerScreen(false);
             er.passwordScreen(false);
			 er.oneTrendScreen(true);
			 er.myTagsScreen(false);
			 
			 er.posts(null);
			 $('#LoadingMsg').css({'display':'block'});
               		 
		     er.getTagPosts();			 
			 er.scrollToTop();
			 er.checkTagStatus();
			 
			 
			 
        }); //end of the ONE TREND route
		
		//MY TAGS route
		this.get('#/myTags',function(context){
           er.checkForSessionAndTags();//this screen is only available to logged in users
		   if(er.yesSession()==true){
		   
			 er.homeScreen(false);
			 er.loginHomeScreen(false);
             er.loginScreen(false);
             er.registerScreen(false);
             er.passwordScreen(false);
			 er.oneTrendScreen(false);
			 er.myTagsScreen(true);
			 fv.vaTrackTrendForm();
			 fv.vaTrackTrendForm2();
			 er.posts(null);
			 window.scroll(0,30);
			 
			 }
			 else {
			 er.needLoginMsg("You need to be logged in to access your Hashtags");
			 er.goLoginMain();
			 }
			 
			 
        }); //end of the LOG MY TAGS route
		
		
		
		}) //end of Sammy
	 
	 
	 
	 
	
	
	
    //Navigation methods ( 'er' refers to the main viewmodel. In  order to manipulate its observables that control the page views)
	
	
	 
	 
	 
	 
	 
	 
	 
	 
	  //call the home screen by default
	  self.navigation.run('#/trackTrend');
	}
	
	
	
	
	
	
	somenamespace.HistoryRouter=HistoryRouter; //get public access


})(window.mainNameSpace=window.mainNameSpace||{});