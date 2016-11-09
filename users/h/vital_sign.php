<?php
include 'mbase.php';

// รับ Parameters
$visit = $_GET['visit_id'];
$staff = $_GET['staff_id'];
$body_temp = $_GET['body_temp'];
//if (strlen($body_temp)=0) {$body_temp = 0;}
$pulse_rate = $_GET['pulse_rate'];
$resp_rate = $_GET['resp_rate'];
$bp_syst = $_GET['bp_syst'];
$bp_dias = $_GET['bp_dias'];
$weight = $_GET['weight'];
//if (strlen($weight)=0) {$weight = 0;}
$height = $_GET['height'];
//if (strlen($height)=0) {$height = 0;}
$waist= $_GET['waist'];


// กำหนดวันที่
$v_datetime = DATE("Y.m.d H:i");

$strSQL1 = "SELECT * FROM v_signs WHERE visit_id = '".$visit."' AND is_cancel = 0" ;
$objQuery1 = mysql_query($strSQL1) or die ("Error Query [".$strSQL1."]");
$num_rows = mysql_num_rows($objQuery1);

IF ($num_rows == 0)
{
	$strSQL2 = "INSERT INTO v_signs (visit_id, staff_id, v_datetime, body_temp, pulse_rate, resp_rate, bp_syst, bp_dias) VALUES ('".$visit."', '".$staff."', '".$v_datetime."', " 		.$body_temp.", '".$pulse_rate."', '".$resp_rate."', '".$bp_syst."', '".$bp_dias."')";
	$objQuery = mysql_query($strSQL2) or die ("Error Query [".$strSQL2."]");
	// บันทึก น้ำหนัก+ส่วนสูง + รอบเอว + vital signs ใน opd_visits
	$strSQL3 = "UPDATE opd_visits SET weight = ".$weight.", height =".$height.", waist ='".$waist."', body_temp = ".$body_temp.", pulse_rate = '".$pulse_rate."', resp_rate = '".$resp_rate."', bp_syst = '".$bp_syst."', bp_dias = '".$bp_dias."' WHERE visit_id = '".$visit."'";
	$objQuery3 = mysql_query($strSQL3) or die ("Error Query [".$strSQL3."]");
}

//ELSE
//{
//	$strSQL3 = "UPDATE opd_visits SET weight = ".$weight.", height =".$height.", waist ='".$waist."', body_temp = ".$body_temp.", pulse_rate = '".$pulse_rate."', //resp_rate = '".$resp_rate."', bp_syst = '".$bp_syst."', bp_dias = '".$bp_dias."' WHERE visit_id = '".$visit."'";
//	$objQuery3 = mysql_query($strSQL3) or die ("Error Query [".$strSQL3."]");
//}

?>