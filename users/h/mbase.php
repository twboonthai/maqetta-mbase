<?php
header("Access-Control-Allow-Origin: *");
$objConnect = mysql_connect("192.168.200.7", "root","1234") or die("Error Connect to Database");
mysql_query("SET NAMES UTF8");
$objDB = mysql_select_db("mbase_data1");
?> 