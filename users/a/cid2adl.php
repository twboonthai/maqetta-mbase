<?php
include 'm30_fct.php';

$cid = $_GET['cid'];
$order = $_GET['order'];

$strSQL = "SELECT CAST(adl1 AS unsigned) + CAST(adl2 AS unsigned) + CAST(adl3 AS unsigned) + CAST(adl4 AS unsigned) + 
	CAST(adl5 AS unsigned) + CAST(adl6 AS unsigned) + CAST(adl7 AS unsigned) + CAST(adl8 AS unsigned) + 
	CAST(adl9 AS unsigned) + CAST(adl10 AS unsigned)  AS nadl FROM adl_pop WHERE cid = '".$cid."' ORDER BY adl_date ".$order." LIMIT 1";

$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$record = mysql_num_rows($objQuery)-1;
$totalField = mysql_num_fields($objQuery)-1;
$return = '{identifier: "unique_id", items:[';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = 'unique_id:'.$idnumber.',';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$field = mysql_field_name($objQuery, $nfield).''.':';
		$value = '"'.$items[$nfield].'"';
		//// ปรับวันที่ mySQL ใน Field ชื่อ birthdate เป็น วันที่ไทยแบบย่อ //////////////////
		//// if($field == 'birthdate:')
		//// {
		////	$value = '"'.tsdate(str_replace('"', '', $value), 0).'"';
		//// }
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if($nfield<$totalField)
		{
			$row = $row.trim($field.$value).','; // ลบ space
		}
		else
		{
			$row = $row.trim($field.$value); // ลบ space
		}
	}
	$return = $return.'{';
	if($n<$record)
	{
		$return = $return.$row.'},';
	}
	else
	{
		$return = $return.$row.'}';
	}
	$row = "";
	$value = '';
}
echo $return."]}";
mysql_free_result($objQuery);
?> 