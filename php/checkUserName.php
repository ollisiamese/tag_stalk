<?php

 include("connect.php");
$username=$_POST['userName'];

connect();

$query="SELECT * from accounts where username='$username'";
$result=mysql_query($query) or die ( "unable to process the query");
$numrows=mysql_num_rows($result);
if ($numrows==0) {
	echo 'true'; //true and false have to be in quotation marks!
} else {
	echo 'false';
}
?>