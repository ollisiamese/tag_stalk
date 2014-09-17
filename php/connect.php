<?php
function connect(){

$con=mysql_connect('tumblrdb.db.11959396.hostedresource.com','tumblrdb','Tumblrdb1!') or die (  "could not connect to the server");
            mysql_select_db('tumblrdb', $con) or die (  "could not connect to the database");

}

?>