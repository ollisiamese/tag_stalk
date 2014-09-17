<?php
$username=$_POST['username'];
$hashtag=$_POST['hashtag'];

include("connect.php");
connect();


$query2="INSERT into users_hashtags (username,hashtag) values ('$username','$hashtag')";
$result=mysql_query($query2) or die ("Unable to process the query");
echo "You are now tracking #$hashtag";

?>