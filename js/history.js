(function(somenamespace) {
  //a scope to define all the screen routes navigation
  function HistoryRouter() { 
    //start the view model and apply its bindings
    var er = new somenamespace.EventViewModel(); 
    ko.applyBindings(er, document.getElementById('appContainer'));
    var fv = new somenamespace.formsValidator(er); 
    var self = this;
    
    //React to changes in the URL by presenting the right content
    self.navigation = $.sammy(function() {
      this.element_selector = '#appContainer';   
      
      //HOME (track trend) route
      this.get('#/trackTrend', function(context) {
        
        er.homeScreen(true);
        //to set er.yesSession() and the list of hashtags
        er.checkForSession(); 
        er.loginHomeScreen(false);
        er.loginScreen(false);
        er.registerScreen(false);
        er.passwordScreen(false);
        er.oneTrendScreen(false);
        er.myTagsScreen(false);
        fv.vaTrackTrendForm();
        fv.vaTrackTrendForm2();
        er.posts(null);

      //end of the HOME routeEvents
      }); 
    
      
      //LOG IN MAIN route
      this.get('#/loginMain', function(context) {
        
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

      //end of the LOG IN MAIN routeEvents
      }); 
    
      
      //LOG IN FORM route
      this.get('#/loginForm', function(context) {
        
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
       
      //end of the LOG IN FORM routeEvents
      }); 
    
      
      //REGISTER FORM route
      this.get('#/registerForm', function(context) {
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
       
      //end of the REGISTER FORM routeEvents
      }); 
    
      //PASSWORD FORM route
      this.get('#/passwordForm', function(context) {
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
       
      //end of the PASSWORD FORM route
      }); 
    
    
      //ONE TREND route
      this.get('#/oneTrend&tag=:hashtag', function(context) {
        //to grab the hashtag form the url
        er.selectedTag(this.params['hashtag']);
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
        $('#LoadingMsg').css({'display' : 'block'});            
        er.getTagPosts();       
        er.scrollToTop();
        er.checkTagStatus();
    
      //end of the ONE TREND route
      }); 
    
      //MY TAGS route
      this.get('#/myTags', function(context) {
      
        //this screen is only available to logged in users
        er.checkForSessionAndTags();
        
        if (er.yesSession() == true) {
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
          window.scroll(0, 30);
        
        } else {
          er.needLoginMsg("You need to be logged in to access your Hashtags");
          er.goLoginMain();
        }
       
      //end of the LOG MY TAGS route 
      }); 
    
    //end of Sammy
    }) 
   
 
    //call the home screen by default
    self.navigation.run('#/trackTrend');
  }
  
  //get public access
  somenamespace.HistoryRouter = HistoryRouter; 


})(window.mainNameSpace = window.mainNameSpace || {});