<?php
$username=$_POST['username'];
$hashtag=$_POST['hashtag'];

include("connect.php");
connect();

$query="SELECT * FROM users_hashtags WHERE username='$username' AND hashtag='$hashtag'";

$result=mysql_query($query) or die ("Unable to process the query");

$numrows=mysql_num_rows($result);

if($numrows!=0){
	echo true;
} else{
	echo false;
}
?>