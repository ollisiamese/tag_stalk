<?php
$username=$_POST['username'];
$password=$_POST['password'];
$email=$_POST['email'];

include("connect.php");
connect();

$query="INSERT into accounts (username,password,email) values ('$username','$password','$email')";
$result=mysql_query($query) or die ("Unable to process the query");
echo "Your profile has been registered and you may now Log In";
?>