<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
$cid = $_GET['cid'];
$ord = $_GET['ord'];
mysql_query("SET NAMES UTF8");
$order = "";
if ($ord !=="1") {$order = "DESC";}
$strSQL = "SELECT CAST(adl1 AS unsigned) + CAST(adl2 AS unsigned) + CAST(adl3 AS unsigned) + CAST(adl4 AS unsigned) + CAST(adl5 AS unsigned) + CAST(adl6 AS unsigned) + CAST(adl7 AS unsigned) + CAST(adl8 AS unsigned) + CAST(adl9 AS unsigned) + CAST(adl10 AS unsigned)  AS nadl FROM adl_pop WHERE cid = '".$cid."' ORDER BY adl_date ".$order." LIMIT 1";

$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$record = mysql_num_rows($objQuery)-1;
$totalField = 1-1;
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