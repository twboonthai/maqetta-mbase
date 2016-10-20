<?php
Header("Access-Control-Allow-Origin: *");
//Header('Content-type: application/json; charset=utf-8');

include 'm30_fct.php';
$cid = $_GET['cid'];
$psw = $_GET['psw'];

mysql_query("SET NAMES UTF8");

$strSQL = "UPDATE population SET psw = '".$psw."' WHERE cid = '".$cid."'";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

mysql_free_result($objQuery);

?>