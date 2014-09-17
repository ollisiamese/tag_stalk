(function(e){function t(){var t=this;t.yesSession=ko.observable();t.getCookie=function(e){var t=e+"=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r].trim();if(i.indexOf(t)==0)return i.substring(t.length,i.length)}return""};t.subStartSession=function(e){if(typeof Storage!=="undefined"){sessionStorage["sessionUser"]=e;t.userName(sessionStorage["sessionUser"])}else{document.cookie="sessionUser="+e;t.userName(getCookie("sessionUser"))}};t.startSession=function(){t.stopSession();var e=$("#loginUsername").val();var n=$("#loginPassword").val();$("#loginMsg").html("");$.ajax({url:"php/checkLogin.php",data:{username:e,password:n},type:"post",cache:false,success:function(n){if(n.indexOf("did not match")>-1){$("#loginMsg").html(n)}else{var r=e;t.subStartSession(r);t.yesSession(true);t.needLoginMsg("");t.goMyHashtags()}},error:function(){console.log("ajax error in sessionStart")}})};t.stopSession=function(){t.hashes.removeAll();t.tagStatus(false);t.myTagsScreen(false);if(typeof Storage!=="undefined"){sessionStorage.clear();t.userName("");t.yesSession(false)}else{document.cookie="sessionUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT";t.userName("");t.yesSession(false)}};t.checkForSession=function(){if(sessionStorage.getItem("sessionUser")!=null||t.getCookie("sessionUser")!=""){t.yesSession(true);var e;if(typeof Storage!=="undefined"){t.userName(sessionStorage["sessionUser"]);return e=sessionStorage["sessionUser"]}else{t.userName(getCookie("sessionUser"));return e=t.getCookie("sessionUser")}}else{t.yesSession(false);return false}};t.checkForSessionAndTags=function(){var e=t.checkForSession();if(e!=false){$.ajax({url:"php/getHashes.php",data:{username:e},type:"post",cache:false,success:function(e){if(e.indexOf("[")>-1){var n=JSON.parse(e);t.hashes(n)}else{$("#tagsMsg").html(e)}},error:function(){console.log("ajax error in checkForSessionAndTags")}})}else{return false}};t.processRegistration=function(){t.stopSession();var e=$("#username").val();var n=$("#email").val();var r=$("#password1").val();$.ajax({url:"php/processRegistration.php",data:{username:e,password:r,email:n},type:"post",cache:false,success:function(n){t.subStartSession(e);t.yesSession(true);t.needLoginMsg("");t.goMyHashtags()},error:function(){console.log("ajax error in processRegistration")}})};t.sendUsername=function(){var e=$("#passEmail").val();var t=$("#passPass").val();$.ajax({url:"php/sendUsername.php",data:{password:t,email:e},type:"post",cache:false,success:function(e){$("#noUsernameMsg").html(e)},error:function(){console.log("ajax error in sendUsername")}})};t.sendPassword=function(){var e=$("#passUsername").val();var t=$("#passEmail2").val();$.ajax({url:"php/sendPassword.php",data:{username:e,email:t},type:"post",cache:false,success:function(e){$("#noPasswordMsg").html(e)},error:function(){console.log("ajax error in sendPassword")}})};t.reloadScreen=function(){window.location.reload()};t.checkTagStatus=function(){var e=t.checkForSession();var n=t.selectedTag().toLowerCase();if(e&&n!="undefined"&&n!=null&&n!=""){$.ajax({url:"php/checkTagStatus.php",type:"post",data:{username:e,hashtag:n},cache:false,success:function(e){t.tagStatus(e)},error:function(){console.log("ajax error in checkTagStatus")}})}};t.trackTag=function(){if(t.tagStatus()==false){var e=t.checkForSession();var n=t.selectedTag().toLowerCase();if(e&&n!="undefined"&&n!=null&&n!=""){$.ajax({url:"php/addTag.php",type:"post",data:{username:e,hashtag:n},cache:false,success:function(e){if(t.hashes()!=null){t.hashes.push(n)}else if(t.hashes()==null||t.hashes()==""){console.log("error:self.hashes() is null!")}t.tagStatus(true);$("#oneTrendScreenMsg").html(e)},error:function(){console.log("ajax error in trackTag")}})}else{t.goLoginMain();t.needLoginMsg("You need to be logged in to track permanently")}}};t.stopTracking=function(){var e=t.checkForSession();if(t.selectedTag()!=undefined){var n=t.selectedTag().toLowerCase()}else{var n=this.toLowerCase()}$.ajax({url:"php/stopTracking.php",type:"post",data:{username:e,hashtag:n},cache:false,success:function(e){t.hashes.remove(n.toLowerCase());t.hashes.remove(n.toUpperCase());t.tagStatus(false);$("#oneTrendScreenMsg").html(e)},error:function(){console.log("ajax error in stopTracking")}})};t.getTagPosts=function(){$.ajax({url:"http://api.tumblr.com/v2/tagged?tag="+t.selectedTag()+"&limit=10&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4",type:"get",cache:false,dataType:"jsonp",success:function(n){if(n.response!=""&&n.response!=null&&n.response!=undefined){t.noPostsFound(false);var r=n.response;var i=$.map(r,function(t){return new e.Post(t)});t.posts(i);var s=t.posts().length;t.lastTimestamp(t.posts()[s-1].timestamp);t.spyScroll()}else{t.lastTimestamp(null);$("#bottom img").css({display:"none"});t.noPostsFound(true)}}})};t.getOlderPosts=function(){$("#bottom img").css({display:"visible"});$.ajax({url:"http://api.tumblr.com/v2/tagged?tag="+t.selectedTag()+"&limit=10&before="+t.lastTimestamp()+"&api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4",type:"get",cache:false,dataType:"jsonp",success:function(n){var r=n.response;var i=$.map(r,function(t){return new e.Post(t)});t.posts(t.posts().concat(i));var s=i.length;if(s==0||i==undefined){$("#bottom img").css({display:"none"})}else{var o=i[s-1].timestamp;t.lastTimestamp(o);$("#bottom img").css({display:"none"});t.spyScroll()}}})};t.spyScroll=function(){$(window).scroll(function(){var e=$(window).scrollTop();if($("#bottom").offset()!=undefined){var n=$("#bottom").height()+$("#bottom").offset().top;var r=window.innerHeight?window.innerHeight:$(window).height();var i=e+r;if(n<=i){t.getOlderPosts();$(window).unbind("scroll")}}})};t.scrollToTop=function(){$(".toTop").addClass("hidden");if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){$(window).on("touchend",function(e){var t=window.pageYOffset;if(t>400){$(".toTop").removeClass("hidden")}else{$(".toTop").addClass("hidden")}})}else{window.onscroll=function(){if(window.pageYOffset>400){$(".toTop").removeClass("hidden")}else{$(".toTop").addClass("hidden")}}}$(".toTop").click(function(){if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){window.scrollTo(0,20);$(".toTop").addClass("hidden")}else{$("html,documentElement,body").animate({scrollTop:"0px"},"slow")}return false})};t.homeScreen=ko.observable(false);t.loginHomeScreen=ko.observable(false);t.loginScreen=ko.observable(false);t.registerScreen=ko.observable(false);t.passwordScreen=ko.observable(false);t.oneTrendScreen=ko.observable(false);t.myTagsScreen=ko.observable(false);t.passwordFormOption=ko.observable();t.passwordFormOption2=ko.computed(function(){if(t.passwordFormOption()=="username"){$("#noPasswordMsg").css({display:"none"});$("#noUsernameMsg").css({display:"block"});return true}if(t.passwordFormOption()=="password"){$("#noUsernameMsg").css({display:"none"});$("#noPasswordMsg").css({display:"block"});return false}});t.hashes=ko.observableArray();t.sortedHashes=ko.computed(function(){if(t.hashes()!=null)return t.hashes().sort()});t.selectedTag=ko.observable();t.tagStatus=ko.observable(false);t.needLoginMsg=ko.observable("");t.posts=ko.observableArray();t.postsLoading=ko.computed(function(){if(t.posts()==""||t.posts()==null){return false}else{return true}});t.lastTimestamp=ko.observable();t.noPostsFound=ko.observable(false);t.userName=ko.observable("");t.goHome=function(){location.hash="#/trackTrend"};t.goLoginMain=function(){location.hash="#/loginMain"};t.goLoginScreen=function(){location.hash="#/loginForm"};t.goRegisterScreen=function(){location.hash="#/registerForm"};t.goPasswordScreen=function(){location.hash="#/passwordForm"};t.goOneTrend=function(){location.hash="#/oneTrend"+"&tag="+$("#trackInput").val()};t.goOneTrend2=function(){location.hash="#/oneTrend"+"&tag="+$("#trackInput2").val()};t.goOneMyTrend=function(){var e=this;location.hash="#/oneTrend"+"&tag="+e;return false};t.goMyHashtags=function(){location.hash="#/myTags"}}e.EventViewModel=t})(window.mainNameSpace=window.mainNameSpace||{})