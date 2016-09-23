<?php
Header("Access-Control-Allow-Origin: *");
//Header('Content-type: application/json; charset=utf-8');

include 'm30_fct.php';
$ciid = $_GET['ci_id'];
$staff = $_GET['staffcid'];
$ci_index = $_GET['ci_index'];

mysql_query("SET NAMES UTF8");

$strSQL = "INSERT INTO ci_index (ci_date, cid, ci_id, ci_value) VALUES (CURDATE(), '".$staff."', '".$ciid."', ".$ci_index.")";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
echo $strSQL;
mysql_free_result($objQuery);

?>