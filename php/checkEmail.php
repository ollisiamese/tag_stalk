<?php

 include("connect.php");
$email=$_POST['email'];

connect();

$query="SELECT * from accounts where email='$email'";
$result=mysql_query($query) or die ( "unable to process the query");
$numrows=mysql_num_rows($result);
if ($numrows==0) {
	echo 'true'; //true and false have to be in quotation marks!! 
} else {
	echo 'false';
} 

?>