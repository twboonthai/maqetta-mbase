<?php
include 'm30_fct.php';
//// รับ Parameters

$cid = $_GET['cid'];
$ord = $_GET['ord'];

//// SQL ติดต่อกับฐานข้อมูล mySQL
$order = "";
if ($ord !=="1") {$order = "DESC";}
$strSQL = "SELECT educate, brn1 + brn2 + brn3 + brn4 + brn5 + brn6 + brn7 + brn8 + brn9 + brn10 + brn11 + brn12 AS nbrn 
	FROM brain_pop WHERE cid = '".$cid."' ORDER BY brn_date ".$order." LIMIT 1";
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