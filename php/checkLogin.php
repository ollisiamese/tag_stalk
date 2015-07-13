<?php
$username=$_POST['username'];
$password=$_POST['password'];

include("connect.php");
connect();
$query="SELECT * FROM accounts where username='$username' and password='$password'";
$result=mysql_query($query) or die ("unable to perform query");
$numrows=mysql_num_rows($result);

if($numrows==0) {
	echo "The username and password you entered did not match";
} else { //look up this user's hashtags
	echo 'true';
	/*while($row=mysql_fetch_array($result, MYSQL_ASSOC)) {
	$query2="SELECT * FROM users_hashtags WHERE username='$username'";
	$result=mysql_query($query2) or die ("unable to perform query2");
	$numrows=mysql_num_rows($result);
	if($numrows==0){

	echo "you are not tracking any hashtags yet";
	}
	else {
		$arr1=array();
		while($row=mysql_fetch_array($result, MYSQL_ASSOC)) {
		
		array_push($arr1,$row['hashtag']);//create an array of hashtags
		//$sesh=$row['username']; //note the username for the session
		}
		//$fullArr=array('session'=>$sesh, 'hashtags'=>$arr1);//put the above into the new array like so:[session:'asd',hashtags:[array of hasthags here]]
		echo json_encode($arr1);
	 }
	}
	*/
}
?>