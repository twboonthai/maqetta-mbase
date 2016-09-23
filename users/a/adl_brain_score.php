<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");

$level = $_GET['level'];
$grade = $_GET['grade'];
$hosp = $_GET['hosp_id'];
$tumbon = $_GET['tumbon_id'];
$mooban = $_GET['town_id'];

// ADL
$strSQL1 = "CREATE TEMPORARY TABLE adl_temp AS SELECT CONCAT(TRIM(b.fname), '  ', b.lname) AS fullname, a.cid, b.town_id, b.hosp_id, c.hosp_name, d.town_name, ";
$strSQL2 = "CONCAT(LEFT(b.town_id, 6), '00') AS tumbon_id, CAST(adl1 AS unsigned) + CAST(adl2 AS unsigned) + CAST(adl3 AS unsigned) + ";
$strSQL3 = "CAST(adl4 AS unsigned) + CAST(adl5 AS unsigned) + CAST(adl6 AS unsigned) + CAST(adl7 AS unsigned) + CAST(adl8 AS unsigned) + ";
$strSQL4 = "CAST(adl9 AS unsigned) + CAST(adl10 AS unsigned) AS nadl, b.home_adr FROM adl_pop a, population b, hospitals c, towns d ";
$strSQL5 = "WHERE a.cid = b.cid AND b.hosp_id = c.hosp_id AND b.town_id = d.town_id ORDER BY a.adl_date DESC";
$strSQL = $strSQL1.$strSQL2.$strSQL3.$strSQL4.$strSQL5;
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE adl_cid AS SELECT a.*, b.town_name AS tumbon FROM adl_temp a, towns b WHERE a.tumbon_id = b.town_id GROUP BY cid";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// Brain
$strSQL1 = "CREATE TEMPORARY TABLE brn_temp AS SELECT cid, educate, brn1+brn2+brn3+brn4+brn5+brn6+brn7+brn8+brn9+brn10+brn11+brn12 AS nbrn ";
$strSQL2 = "FROM brain_pop ORDER BY brn_date DESC";
$strSQL = $strSQL1.$strSQL2;
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE brn_cid AS SELECT * FROM brn_temp GROUP BY cid";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ADL+Brain
$strSQL = "CREATE TEMPORARY TABLE ab_temp AS SELECT a.cid, a.town_id, a.hosp_id, a.fullname, a.town_name, a.tumbon, tumbon_id, a.hosp_name, 
	a.home_adr, b.educate, a.nadl, b.nbrn FROM adl_cid a, brn_cid b WHERE a.cid = b.cid";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// Calculation ////////////////////////////////////////////////////////////////////////
$strSQL = "CREATE TEMPORARY TABLE cid_score AS SELECT cid, town_id, hosp_id, nadl, nbrn, educate, fullname, hosp_name, town_name, tumbon, tumbon_id, 
	CASE WHEN educate = 0 THEN '-' 
	     	WHEN nadl >= 12 THEN '1'
		WHEN nadl < 5 AND educate = 1 AND nbrn >= 14 THEN '4'
		WHEN nadl < 5 AND educate = 1 AND nbrn < 14 THEN '5'
		WHEN nadl < 5 AND educate = 2 AND nbrn >= 17 THEN '4'
		WHEN nadl < 5 AND educate = 2 AND nbrn < 17 THEN '5'
		WHEN nadl < 5 AND educate = 3 AND nbrn >= 22 THEN '4'
		WHEN nadl < 5 AND educate = 3 AND nbrn < 22 THEN '5'
		WHEN nadl >= 5 AND nadl < 12 AND educate = 1 AND nbrn >= 14 THEN '2'
		WHEN nadl >= 5 AND nadl < 12 AND educate = 1 AND nbrn < 14 THEN '3'
		WHEN nadl >= 5 AND nadl < 12 AND educate = 2 AND nbrn >= 17 THEN '2'
		WHEN nadl >= 5 AND nadl < 12 AND educate = 2 AND nbrn < 17 THEN '3'
		WHEN nadl >= 5 AND nadl < 12 AND educate = 3 AND nbrn >= 22 THEN '2'
		WHEN nadl >= 5 AND nadl < 12 AND educate = 3 AND nbrn < 22 THEN '3'
	END AS grade, home_adr FROM ab_temp";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
///////////////////////////////////////////////////////////////////////////////////////

if ($level == "1"){
	if (strlen($hosp)==0) {
		$strSQL = "SELECT CONCAT('ระดับ  ' , grade) AS label, hosp_id, grade, CONCAT(COUNT(grade), ' >') AS rightText FROM cid_score GROUP BY grade ORDER by grade";
	} else {
		$strSQL = "SELECT CONCAT('ระดับ  ' , grade) AS label, hosp_id, grade, CONCAT(COUNT(grade), ' >') AS rightText FROM cid_score WHERE hosp_id = '".$hosp."' GROUP BY grade ORDER by grade";
	}
} elseif ($level=="2") {
	$strSQL = "SELECT CONCAT('CUP ', hosp_name) AS label, hosp_id, grade, CONCAT(COUNT(grade), ' >') AS rightText FROM cid_score WHERE grade = '".$grade."' GROUP BY hosp_id ORDER BY hosp_name";
} elseif ($level=="3") {
	$strSQL = "SELECT CONCAT('ต.', tumbon) AS label, grade, tumbon_id, CONCAT(COUNT(grade), ' >') AS rightText FROM cid_score WHERE grade = '".$grade."' AND hosp_id = '".$hosp."' GROUP BY tumbon ORDER BY tumbon";
} elseif ($level=="4") {
	$strSQL = "SELECT CONCAT('บ.', town_name) AS label, grade, town_id, CONCAT(COUNT(grade), ' >') AS rightText FROM cid_score WHERE grade = '".$grade."' AND tumbon_id = '".$tumbon."' GROUP BY town_name ORDER BY town_name";
} elseif ($level=="5") {
	$strSQL = "SELECT fullname AS label, cid, town_id, home_adr, CONCAT(cid, ' # ', home_adr) AS rightText FROM cid_score WHERE grade = '".$grade."' AND town_id = '".$mooban."' ORDER BY fullname";
}
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$record = mysql_num_rows($objQuery)-1;
$totalField = mysql_num_fields($objQuery)-1;
$return = '{identifier: "unique_id", items:[';
//$return = '';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = 'unique_id:'.$idnumber.',';
	//$row = '"unique_id":'.$idnumber.',';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$field = mysql_field_name($objQuery, $nfield).''.':';
		//$field = '"'.mysql_field_name($objQuery, $nfield).'"'.':';
		$value = '"'.$items[$nfield].'"';

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
//echo $return;
mysql_free_result($objQuery);
?> 