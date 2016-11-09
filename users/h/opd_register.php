<?php
include 'mbase.php';
$strSQL = "SELECT a.hn, b.cid, a.visit_id, a.reg_datetime, CONCAT(TRIM(b.fname), '  ', b.lname) AS patient, b.birthdate, b.sex, a.height, 
    CONCAT(TRIM(b.fname), '  ', TRIM(b.lname), ' >') AS rightText, TIME(a.reg_datetime) AS label FROM opd_visits a, 
	population b, cid_hn c WHERE a.reg_datetime >= CONCAT(CAST(CURDATE() AS char), ' 07:00') AND a.is_cancel = 0 AND a.hn = c.hn AND b.cid = c.cid 
	AND a.visit_id NOT IN (SELECT visit_id FROM v_signs) AND a.unit_reg = '02' AND DAY(a.finish_datetime) = 0 AND a.visit_id NOT IN (SELECT visit_id FROM opd_diagnosis) 	AND a.visit_id NOT IN (SELECT visit_id FROM prescriptions) AND a.visit_id NOT IN (SELECT visit_id FROM opd_operations) ORDER BY a.reg_datetime" ;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ได้ผล Query แล้วนำมาสร้างเป็น Text รูปแบบ JSON Object เพื่อนำไปใช้ต่อโดย Javascript
//// ส่วนต่อจากนี้ ไม่ต้องแก้ไข ใช้ Code ตามนี้ได้เลย ยกเว้นต้องการปรับปรุงค่าใน Field เช่นแสดงวันที่ภาษาไทย จาก Date Field
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
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ปรับเปลี่ยนเครื่องหมาย " เพื่อไม่มีปัญหาในการแปลงเป็น Object
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$value = str_replace('"', "'", $items[$nfield]);
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// กรณีต้องการใช้ function tsdate ปรับวันที่ mySQL ใน Field date เช่น birthdate เป็น วันที่ไทยแบบย่อ
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////if($field == 'birthdate:')
		////{
		////	$value = tsdate(str_replace('"', '', $value));
		////}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if($nfield<$totalField)
		{
			$row = $row.trim($field.'"'.$value.'"').','; // ลบ space
		}
		else
		{
			$row = $row.trim($field.'"'.$value.'"'); // ลบ space
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