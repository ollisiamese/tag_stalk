<?php
//Enable session.  We will store token information here later
session_start();
//echo 'hello';
//require 'vendor/autoload.php';
require_once('vendor/tumblroauthnonnative/tumblroauth.php');

//Tumblr API urls
$req_url = 'http://www.tumblr.com/oauth/request_token';
$authurl = 'http://www.tumblr.com/oauth/authorize';
$acc_url = 'http://www.tumblr.com/oauth/access_token';

//Your Application key and secret
$consumer_key='vliXIm52B9BG2L1hfRAy6SvPbekkOk5JEsRITW5MeOH1Xnknl2';
$consumer_secret='3Pqe75MjkrvqdrHAyKuZ9Z3nWMlCuLKjfMnT5E1H0rrz8WXVay';
$callback_url='callback.php';

$tum_oauth = new TumblrOAuth($consumer_key, $consumer_secret);

$request_token = $tum_oauth->getRequestToken($callback_url);

$_SESSION['request_token'] = $token = $request_token['oauth_token'];
$_SESSION['request_token_secret'] = $request_token['oauth_token_secret'];

switch ($tum_oauth->http_code) {
  case 200:
    // Ask Tumblr to give us a special address to their login page
    $url = $tum_oauth->getAuthorizeURL($token);
	
	// Redirect the user to the login URL given to us by Tumblr
    header('Location: ' . $url);
	
	// That's it for our side.  The user is sent to a Tumblr Login page and
	// asked to authroize our app.  After that, Tumblr sends the user back to
	// our Callback URL (callback.php) along with some information we need to get
	// an access token.
	
    break;
default:
    // Give an error message
    echo 'Could not connect to Tumblr. Refresh the page or try again later.';
}
exit();









/*
//$client = new Tumblr\API\Client($consumerKey, $consumerSecret);
//$client->setToken($token, $tokenSecret);
// Authenticate via OAuth
$client = new Tumblr\API\Client(
  'vliXIm52B9BG2L1hfRAy6SvPbekkOk5JEsRITW5MeOH1Xnknl2',
  '3Pqe75MjkrvqdrHAyKuZ9Z3nWMlCuLKjfMnT5E1H0rrz8WXVay',
  'O4WUkfq502ZLxDuZm7yqgjnLrVgWP97yn0Yn6fYc3k5998gcSc',
  '6dKhAPX1Sfn788qfrZoXanCfLx8Io3W3gQkjxMI0bY3LN9eng8'
);

// Make the request
$client->getUserInfo();
//$client->getDashboardPosts();
echo 'hello';

*/
?>

