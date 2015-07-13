<?php
// Start a session, load the library
session_start();
require 'vendor/autoload.php';
require_once('vendor/tumblroauthnonnative/tumblroauth.php');

// Define the needed keys
$consumer_key = 'vliXIm52B9BG2L1hfRAy6SvPbekkOk5JEsRITW5MeOH1Xnknl2';
$consumer_secret = '3Pqe75MjkrvqdrHAyKuZ9Z3nWMlCuLKjfMnT5E1H0rrz8WXVay';

// Once the user approves your app at Tumblr, they are sent back to this script.
// This script is passed two parameters in the URL, oauth_token (our Request Token)
// and oauth_verifier (Key that we need to get Access Token).
// We'll also need out Request Token Secret, which we stored in a session.

// Create instance of TumblrOAuth.
// It'll need our Consumer Key and Secret as well as our Request Token and Secret
$tum_oauth = new TumblrOAuth($consumer_key, $consumer_secret, $_SESSION['request_token'], $_SESSION['request_token_secret']);
 
$access_token = $tum_oauth->getAccessToken($_REQUEST['oauth_verifier']);

// We're done with the Request Token and Secret so let's remove those.
unset($_SESSION['request_token']);
unset($_SESSION['request_token_secret']);

// Make sure nothing went wrong.
if (200 == $tum_oauth->http_code) {
	// good to go
} else {
	die('Unable to authenticate');
}

$tum_oauth = new TumblrOAuth($consumer_key, $consumer_secret, $access_token['oauth_token'], $access_token['oauth_token_secret']);
echo $access_token['oauth_token'];
echo $access_token['oauth_token_secret'];

?>