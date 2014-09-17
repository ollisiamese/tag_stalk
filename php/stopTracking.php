<?php
$username=$_POST['username'];
$hashtag=$_POST['hashtag'];

include("connect.php");
connect();


$query2="DELETE from users_hashtags where username='$username' AND hashtag='$hashtag'";
$result=mysql_query($query2) or die ("Unable to process the query");
echo "You are no longer tracking #$hashtag";

?>