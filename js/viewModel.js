(function(somenamespace) {
  //private function of the namespace (constructor)
  function EventViewModel() { 
    var self = this;
    //sessions
    self.yesSession = ko.observable();
     
    //navigation screens
    self.homeScreen = ko.observable(false);
    self.loginHomeScreen = ko.observable(false);
    self.loginScreen = ko.observable(false);
    self.registerScreen = ko.observable(false);
    self.passwordScreen = ko.observable(false);
    self.oneTrendScreen = ko.observable(false);
    self.myTagsScreen = ko.observable(false);

    //other observables
    //radio buttons in Forgot your password
    self.passwordFormOption = ko.observable(); 
    
    self.passwordFormOption2 = ko.computed(function() {
      
      if (self.passwordFormOption() == "username") {
        $('#noPasswordMsg').css({'display': 'none'});
        $('#noUsernameMsg').css({'display': 'block'});
        return true;
      }
      
      if (self.passwordFormOption() == "password") { 
        $('#noUsernameMsg').css({'display': 'none'});
        $('#noPasswordMsg').css({'display': 'block'});
        return false;
      }
      
    });

    //array gets populated on user login, with the list of their hashtags
    self.hashes = ko.observableArray(); 
    
    //sort hashtags alphabetically
    self.sortedHashes = ko.computed(function() {
      if (self.hashes() != null) {
        return self.hashes().sort();
      }
    });
    
    //which tag was typed in 
    self.selectedTag = ko.observable();
    
    //is this tag already being tracked?
    self.tagStatus = ko.observable(false);
    
    //tells a user they need to be logged in for certain actions
    self.needLoginMsg = ko.observable('');

    //array of posts for one hashtag
    self.posts = ko.observableArray();
    
    //computed T/F observable that depends on whether the self.posts array is empty or populated
    self.postsLoading = ko.computed(function() {
      if (self.posts() == '' || self.posts() == null) {
        return false;
      } else {
        return true;
      }
    });

    self.lastTimestamp = ko.observable();
    //dispays message that no posts matching a tag were found
    self.noPostsFound = ko.observable(false); 

    self.userName = ko.observable('');  
    

    
    //function from w3schools to get any cookie value
    self.getCookie = function(cname) { 
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i=0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    //SUB START SESSION - literally begins the session 
    //(with no conditions checked, self.startSession function does that)
    self.subStartSession = function(sessionUser) {
      //check for web storage support (HTML5)
      if (typeof(Storage) !== "undefined") { 
        sessionStorage['sessionUser'] = sessionUser;
        self.userName(sessionStorage['sessionUser']);    
      } else {
        document.cookie = "sessionUser=" + sessionUser;
        self.userName(getCookie('sessionUser'));
      }
   
    }

    //START SESSION
    self.startSession = function() {
      //end any current session
      self.stopSession(); 
      var u = $('#loginUsername').val();
      var p = $('#loginPassword').val();
      $('#loginMsg').html('');
      
      $.ajax({
        url: "php/checkLogin.php",
        data: {username: u, password: p},
        type: 'post',
        cache: false,
        success: function(data) {
          //if the login credentials didn't match
          if (data.indexOf("did not match") > -1) {
            $('#loginMsg').html(data);
          } else {  
            //means that username was accepted and can be assigned as this session's id
            var sessionUser = u;
            //ask the subStartSession function to assign the username we got to a new session
            self.subStartSession(sessionUser);
            self.yesSession(true);
            self.needLoginMsg('');
            self.goMyHashtags();
          }
        },
        error: function() {
          //do nothing
          console.log("ajax error in sessionStart");
        }

      })
    }

    
    //STOP SESSION
    self.stopSession = function() {
      //clear the users hashtag list
      self.hashes.removeAll(); 
      self.tagStatus(false);
      self.myTagsScreen(false);
      
      //check for web storage support (HTML5)
      if (typeof(Storage) !== "undefined") { 
        sessionStorage.clear();
        self.userName('');
        self.yesSession(false);
      } else {
        //destroy the cookie
        document.cookie = "sessionUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        self.userName('');
        self.yesSession(false);
      }
  
    }
    
    //CHECK FOR SESSION - returns the current session user's name
    self.checkForSession = function() { 
      
      //meaning we are logged in
      if (sessionStorage.getItem('sessionUser') != null || self.getCookie('sessionUser') != '') { 
        //get the username and tracked hashtags namespaces
        self.yesSession(true);
        var user;
        
        //if we're using sessionStorage
        if (typeof(Storage) !== "undefined") {
          self.userName(sessionStorage['sessionUser']);
          return user = sessionStorage['sessionUser'];
        } else {
          self.userName(getCookie('sessionUser'));  
          return user = self.getCookie('sessionUser');
        }

      } else {
        self.yesSession(false);
        //we are not logged in
        return false; 
      }
 

    }

    
    //CHECK FOR SESSION AND TAGS- returns the current session user's name
    self.checkForSessionAndTags = function() { 
      //this one just returns the username and sets the yesSession observable
      var middleCheck = self.checkForSession();
      
      if (middleCheck != false) {
        
        $.ajax({
          url: "php/getHashes.php",
          data: {username: middleCheck},
          type: 'post',
          cache: false,
          success: function(data) {
            
            //if any hashtags were returned (response is an array of data)
            if (data.indexOf("[") > -1) { 
              var hashtags = JSON.parse(data);
              self.hashes(hashtags);
            } else {
              //display the message that no hashtags are being tracked yet
              $('#tagsMsg').html(data); 
            }
          },
          error: function() {
            console.log('ajax error in checkForSessionAndTags');
          }

        })
        
      } else {
        //we are not logged in
        return false; 
      }
 

    }

    //process registration
    self.processRegistration = function() {
      //end any current session
      self.stopSession(); 
      var u = $('#username').val();
      var e = $('#email').val();
      var p = $('#password1').val();
      
      $.ajax({
        url: "php/processRegistration.php",
        data: {username: u, password: p, email: e},
        type: 'post',
        cache: false,
        success: function(data) {
          self.subStartSession(u);
          self.yesSession(true);
          self.needLoginMsg('');
          self.goMyHashtags();
        },
        error: function() {
          console.log('ajax error in processRegistration');
        }
      })

    }

    //sendUsername
    self.sendUsername = function() {
      var e = $('#passEmail').val();
      var p = $('#passPass').val();
 
      $.ajax({
        url: "php/sendUsername.php",
        data: {password: p, email: e},
        type: 'post',
        cache: false,
        success: function(data) {
          $('#noUsernameMsg').html(data);
        },
        error: function() {
          console.log('ajax error in sendUsername');
        }
      })
    
    }

    //sendPassword
    self.sendPassword = function() {
      var u = $('#passUsername').val();
      var e = $('#passEmail2').val();
 
      $.ajax({
        url: "php/sendPassword.php",
        data: {username: u, email: e},
        type: 'post',
        cache: false,
        success: function(data) {
          $('#noPasswordMsg').html(data);
        },
        error:function() {
          console.log('ajax error in sendPassword');
        }
      })
    }


    //reload screen
    self.reloadScreen = function() {
      window.location.reload();
    }



    //CHECK Tag Status
    self.checkTagStatus = function() {
      var currentUser = self.checkForSession();
      var hash = self.selectedTag().toLowerCase();
      
      if (currentUser&&hash != 'undefined' && hash != null && hash != '') {
        
        $.ajax({
          url: "php/checkTagStatus.php",
          type: 'post',
          data: {username: currentUser, hashtag: hash},
          cache: false,
          success: function(data) {
            //controls which button will show: track or stop tracking
            self.tagStatus(data);    
          },
          error: function() {
            console.log('ajax error in checkTagStatus');
          }
        })
        
      }

    }

    //Track tag
    self.trackTag = function() {
      //if not currently already tracking it
      if (self.tagStatus() == false) { 
        var currentUser = self.checkForSession();
        var hash = self.selectedTag().toLowerCase();
        
        if (currentUser && hash != 'undefined' && hash != null&&hash != '') {

          $.ajax({
            url: "php/addTag.php",
            type: 'post',
            data: {username: currentUser, hashtag: hash},
            cache: false,
            success: function(data) {
              
              if (self.hashes() != null) {
                self.hashes.push(hash);
              } else if (self.hashes() == null || self.hashes() == ''){
                console.log('error: self.hashes() is null!');
              }
              
              self.tagStatus(true); 
              $('#oneTrendScreenMsg').html(data);
  
            },
            
            error: function() {
              console.log('ajax error in trackTag');
            }
   
          })
        
        } else {
 
          self.goLoginMain();
          self.needLoginMsg("You need to be logged in to track permanently");
        }

      }
 
    }



    //STOP TRACKING
    self.stopTracking = function() {
      var currentUser = self.checkForSession();
      
      //if we're stopping tracking from a tag's own screen
      if (self.selectedTag() != undefined) { 
        var hash = self.selectedTag().toLowerCase();
      } else {
        //if we're stopping tracking from mytags page
        var hash = this.toLowerCase(); 
      }

      $.ajax({
        url: "php/stopTracking.php",
        type: 'post',
        data: {username: currentUser, hashtag: hash},
        cache: false,
        success: function(data) {
          self.hashes.remove(hash.toLowerCase());
          self.hashes.remove(hash.toUpperCase());
          self.tagStatus(false);
          $('#oneTrendScreenMsg').html(data);
        },
        error: function() {
          console.log('ajax error in stopTracking');
        }
      })
 
    }

    //GET TAGS POSTS (THE LATEST 10)
    self.getTagPosts = function() {
      
      $.ajax({
        url: "http://api.tumblr.com/v2/tagged?tag=" + self.selectedTag() + "&limit=10&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4",
        type: "get",
        cache: false,
        dataType: "jsonp",
        success: function(data) {
          
          if (data.response != "" && data.response != null && data.response != undefined) {
            self.noPostsFound(false);
            var finalData = data.response;
            var mappedPosts = $.map(finalData, function(item) {
              return new somenamespace.Post(item);
            });
            self.posts(mappedPosts);
            var arrlength = self.posts().length;
            self.lastTimestamp(self.posts()[arrlength-1].timestamp);
            //after the first 10 posts of the page are loaded and the last one's timestamp
            //is available for use, we can start spying on the scroll
            self.spyScroll();       
          
          } else {
            self.lastTimestamp(null);
            $('#bottom img').css({'display': 'none'});
            self.noPostsFound(true);
          }
          
        }
      });

    }


    //GET OLDER POSTS
    self.getOlderPosts = function() {
      $('#bottom img').css({'display': 'visible'});
      
      $.ajax({
        url: "http://api.tumblr.com/v2/tagged?tag=" + self.selectedTag() + "&limit=10&before=" + self.lastTimestamp() + "&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4",
        type: "get",
        cache: false,
        dataType: "jsonp",
        success: function(data) {
          var finalData = data.response;
          var moreMappedPosts = $.map(finalData, function(item) { return new somenamespace.Post(item) });
          
          self.posts(self.posts().concat(moreMappedPosts));
          var arrlength = moreMappedPosts.length;
       
          if (arrlength == 0 || moreMappedPosts == undefined) {
            $('#bottom img').css({'display':'none'});
          } else {
            var newTimeStamp = moreMappedPosts[arrlength - 1].timestamp;
            self.lastTimestamp(newTimeStamp);
            $('#bottom img').css({'display': 'none'});
            //now that we've loaded 10 more, we can start spying again!
            self.spyScroll();
          }
          
         }
      });

    }

    //SPY ON SCROLLING (to get more posts)
    self.spyScroll = function() {
      
      $(window).scroll(function() {
        var top = $(window).scrollTop();
        
        if ($("#bottom").offset() != undefined) {
          var bottom = $("#bottom").height() + $("#bottom").offset().top;
          var winHeight = window.innerHeight ? window.innerHeight : $(window).height();
          var winBot = top + winHeight;
          
          if (bottom  <= winBot ) {
            self.getOlderPosts();
            //once the first AJAX request has been called, stop spying.
            //otherwise, will end up sending (queuing) multiple identical ajax
            //calls with the same timestamp and will get stuck pulling the same 10 posts over and over
            $(window).unbind("scroll");
          }
  
        }
      });
    }

    
    //scroll to top
    self.scrollToTop = function() {
      $('.toTop').addClass('hidden');
      
      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        
        $(window).on("touchend", function(ev) {
          var scrollY = window.pageYOffset;
          
          if (scrollY > 400) {
            $('.toTop').removeClass('hidden');
          } else {
            $('.toTop').addClass('hidden'); 
          }
  
        });

      } else {
        
        window.onscroll = function() {
          if (window.pageYOffset > 400) {
            $('.toTop').removeClass('hidden');
          } else {
            $('.toTop').addClass('hidden'); 
          }
        };
        
      }


      $('.toTop').click(function() {
        
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
          window.scrollTo(0, 20);
          $('.toTop').addClass('hidden');
        } else {
          //html for Opera, documentElement for Chrome, IE, FF, body - for mobile
          $('html, documentElement, body').animate({ scrollTop: '0px' }, 'slow'); 
        }
        
        return false;

      });

    }
 
     
           
    self.goHome = function() {
      location.hash = '#/trackTrend';
    }

    self.goLoginMain = function(){
      location.hash = '#/loginMain';
    }

    self.goLoginScreen = function() {
      location.hash = '#/loginForm';
    }

    self.goRegisterScreen = function() {
      location.hash = '#/registerForm';
    }

    self.goPasswordScreen = function() {
      location.hash = '#/passwordForm';
    }

    self.goOneTrend = function() {
      location.hash = '#/oneTrend' + '&tag=' + $('#trackInput').val();
    }

    self.goOneTrend2 = function() {
      location.hash = '#/oneTrend' + '&tag=' + $('#trackInput2').val();
    }

    //accessing tag screens from MyTags view
    self.goOneMyTrend = function() { 
      var thisTrend = this;
      location.hash = '#/oneTrend' + '&tag=' + thisTrend;
      return false;
    }

    self.goMyHashtags = function(){
      location.hash = '#/myTags';
    }

  //end of EventViewModel function
  }


  //public property of the namespace
  somenamespace.EventViewModel = EventViewModel;

})(window.mainNameSpace = window.mainNameSpace || {});
