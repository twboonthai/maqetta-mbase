<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
$cid = $_GET['cid'];
$ord = $_GET['ord'];
mysql_query("SET NAMES UTF8");
$order = "";
if ($ord !=="1") {$order = "DESC";}
$strSQL = "SELECT educate, brn1 + brn2 + brn3 + brn4 + brn5 + brn6 + brn7 + brn8 + brn9 + brn10 + brn11 + brn12 AS nbrn FROM brain_pop WHERE cid = '".$cid."' ORDER BY brn_date ".$order." LIMIT 1";

$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$record = mysql_num_rows($objQuery)-1;
$totalField = 2-1;
$return = '';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = '';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$value = $items[$nfield];

		if($nfield<$totalField)
		{
			$row = $row.trim($field.$value).','; // ลบ space
		}
		else
		{
			$row = $row.trim($field.$value); // ลบ space
		}
	}
	if($n<$record)
	{
		$return = $return.$row;
	}
	else
	{
		$return = $return.$row;
	}
	$row = "";
	$value = '';
}
echo $return;
//echo $return;
mysql_free_result($objQuery);
?> 