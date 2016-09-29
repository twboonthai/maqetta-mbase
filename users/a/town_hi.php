<?php
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// User Define Function 								////
//// ตัวอย่าง function tsdate รับวันที่ datetime แสดงเป็นวันเดือนปี ภาษาไทยแบบย่อ 	////
//// เช่น 2016.01.05 -> 5 มค. 2559							////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// include php สำหรับติดต่อฐานข้อมูล Path, User Name, Password, ชื่อ Database
include 'm30_fct.php';

$town = $_GET['town_id'];

$strSQL = "SELECT * FROM hi_index WHERE town_id = '".$town."' ORDER BY hi_date DESC LIMIT 1"; 

///////////////////////////////////////////////////////////////////////////////////////////////////////
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ได้ผล Query แล้วนำมาสร้างเป็น Text รูปแบบ JSON Object เพื่อนำไปใช้ต่อโดย Javascript				////
//// ส่วนต่อจากนี้ ไม่ต้องแก้ไข ใช้ Code ตามนี้ได้เลย ยกเว้นต้องการปรับปรุงค่าใน Field เช่นแสดงวันที่ภาษาไทย จาก Date Field		////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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