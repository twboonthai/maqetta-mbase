<?php
header("Access-Control-Allow-Origin: *");

// Connect to mySQL
$objConnect = mysql_connect("localhost","m30","1234") or die("Error Connect to Database");
$objDB = mysql_select_db("mbase_data1");
mysql_query("SET NAMES UTF8");
$parameter1 = $_GET['ward_no'];
$parameter2 = $_GET['doctor'];

$strSQL1 = "CREATE TEMPORARY TABLE ipd AS SELECT a.bed_no, g.nickname AS diagnosis, c.hn, a.visit_id, c.reg_datetime, 
	CAST(a.bed_no AS SIGNED) AS cbed, CONCAT(TRIM(b.fname), '  ', b.lname) AS patient, b.birthdate, b.sex, 
	i.town_name AS ampur, j.town_name AS province, k.zipcode, b.home_adr, b.telephone, 
	CONCAT(TRIM(e.fname), '  ', e.lname) AS staff, a.adm_id FROM ipd_reg a, population b, opd_visits c, cid_hn d, 
	population e, staff f, icd10new g, opd_diagnosis h, towns i, towns j, towns k 
	WHERE DAY(a.dsc_dt) = 0 AND a.is_cancel = 0 AND a.ward_no = '".$parameter1."' AND TRIM(a.bed_no) > '' 
	AND a.visit_id = c.visit_id AND c.hn = d.hn AND d.cid = b.cid AND a.adm_dr = f.staff_id 
	AND f.cid = e.cid AND c.visit_id = h.visit_id AND h.dxt_id = '1' AND g.icd10 = h.icd10 AND 
	b.town_id = k.town_id AND CONCAT(LEFT(b.town_id, 4), '0000') = i.town_id AND 
	CONCAT(LEFT(b.town_id, 2), '000000') = j.town_id AND a.adm_dr = '".$parameter2."' GROUP BY a.visit_id";
$objQuery1 = mysql_query($strSQL1) or die ("Error Query [".$strSQL1."]");

$strSQL = "SELECT visit_id, bed_no, patient, staff, reg_datetime, diagnosis, hn, birthdate, if (sex = '1', 'ชาย', 'หญิง') AS sex,
CASE 
	WHEN bed_no BETWEEN '001' AND '009' THEN CONCAT('เตียง ', cbed) 
	WHEN bed_no BETWEEN '010' AND '050' THEN CONCAT('เตียง ', cbed)
	WHEN bed_no BETWEEN '051' AND '060' THEN CONCAT('แทรก ', cbed-50)
	ELSE CONCAT('พิเศษ ', cbed-60)
END AS bed_name, adm_id, home_adr, ampur, province, zipcode, telephone FROM ipd ORDER BY bed_no";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$record = mysql_num_rows($objQuery)-1;
$totalField = 16-1;
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