<?php

$password=$_POST['password'];
$email=$_POST['email'];

include("connect.php");
connect();

$query="SELECT * FROM accounts WHERE password='$password' AND email='$email'";
$result=mysql_query($query) or die("Unable to process the query");
$numrows=mysql_num_rows($result);

if($numrows==0) {
	echo "No match was found for your email-password combination";
} else {
	$row=mysql_fetch_array($result, MYSQL_ASSOC);
	$username=$row['username'];
	$subject="TagStalk account information";

	$body="<table style='max-width:600px;border:1px solid rgb(15,15,16);background-color:rgb(48,48,49);color:#fff'>
	   <tr style='border:none'>
	   <td>
	   <img src='http://www.ogeinitz.com/tagstalk/img/logo4dark.png' alt='tagstalk'/>
	   </td>
	   <td>
	   </td>
	   </tr>
	   <tr>
	   <td colspan='2' style='border:none'>
		 You have recently filled out a form on <a style='color:#CACEED' href=\"http://ogeinitz.com/tagstalk/index.html#/passwordForm\">TagStalk</a>, asking to restore your password.
	   <br/>
	   <br/>
	   </td>
	   
	   <tr style='border:none'>
	   <td colspan='2' style='border:none'>
	   Here is your requested account information:<br/><br/>
	   </td>
	   </tr>
	   
	   <tr style='border:none'>
	   <td colspan='2' style='border:none;text-align:center'>
	   Your username:
	   
	   <span style='color:#B8F5CF;border:none;text-align:left'>
	   $username
	   </span>
	   </td>
	   </tr>
	   </table>
	";

	//$body="You have recently filled out a form on <a href=\"http://ogeinitz.com/tagstalk/index.html#/passwordForm\">TagStalk</a>, asking to restore your username.<br/>
	//     It is included below: <br/>
	//   Your username: <span style='color:green'> $username </span>";
	$headers = "From: TagStalk \r\n"."Content-Type: text/html; charset=ISO-8859-1\r\n";
	mail($email,$subject,$body,$headers);
	echo "Thank you! Your username will be emailed to you shortly!";
}

?>