<?php
function tsdate($exdate, $withtime)
{
	$tdate0 = str_replace("-", "", $exdate);
	$tdate1 = str_replace(":", "", $tdate0);
	$tdate = str_replace(" ", "", $tdate1);
	$tday = strval(intval(substr($tdate, 6, 2)));
	$tmonth0 = intval(substr($tdate, 4, 2));
	$tmonth = "";
		if ($tmonth0 == 1) { $tmonth = "มค.";}
		else if ($tmonth0 == 2){ $tmonth = "กพ.";}
		else if ($tmonth0 == 3){ $tmonth = "มีค.";}
		else if ($tmonth0 == 4){ $tmonth = "เมย.";}
		else if ($tmonth0 == 5){ $tmonth = "พค.";}
		else if ($tmonth0 == 6){ $tmonth = "มิย.";}
		else if ($tmonth0 == 7){ $tmonth = "กค.";}
		else if ($tmonth0 == 8){ $tmonth = "สค.";}
		else if ($tmonth0 == 9){ $tmonth = "กย.";}
		else if ($tmonth0 == 10){ $tmonth = "ตค.";}
		else if ($tmonth0 == 11){ $tmonth = "พย.";}
		else {$tmonth = "ธค.";}
	$tyear = strval(intval(substr($tdate, 0, 4)) +543);
	$thour = substr($tdate, 8, 2);
	$tmin = substr($tdate, 10, 2);
	if ($withtime == 0)
	{
	return $tday." ".$tmonth." ".$tyear;
	}
	else
	{
	return $tday." ".$tmonth." ".$tyear."  ".$thour.":".$tmin." น.";
	}
}

include 'm30_fct.php';
$cid = $_GET['cid'];
$ord = $_GET['ord'];
mysql_query("SET NAMES UTF8");
$order = "";
if ($ord !=="1") {$order = "DESC";}
$strSQL = "SELECT adl_date, adl_date AS label, CONCAT(adl1, adl2, adl3, adl4, adl5, adl6, adl7, adl8, adl9, adl10) AS adl, CONCAT(housing, cgiver, service, device, econ, disease, house1, house2, house3) AS adl1, house1_txt, house3_txt, cg_name, cg_relate, dv_name, dv_need, econ_pb, comp_diag, CAST(adl1 AS unsigned) + CAST(adl2 AS unsigned) + CAST(adl3 AS unsigned) + CAST(adl4 AS unsigned) + CAST(adl5 AS unsigned) + CAST(adl6 AS unsigned) + CAST(adl7 AS unsigned) + CAST(adl8 AS unsigned) + CAST(adl9 AS unsigned) + CAST(adl10 AS unsigned) AS rightText, CAST(housing AS unsigned) + CAST(cgiver AS unsigned) + CAST(service AS unsigned) + CAST(device AS unsigned) + CAST(econ AS unsigned) + CAST(disease AS unsigned) AS naddition, CAST(adl1 AS unsigned) + CAST(adl2 AS unsigned) + CAST(adl3 AS unsigned) + CAST(adl4 AS unsigned) + CAST(adl5 AS unsigned) + CAST(adl6 AS unsigned) + CAST(adl7 AS unsigned) + CAST(adl8 AS unsigned) + CAST(adl9 AS unsigned) + CAST(adl10 AS unsigned) + CAST(housing AS unsigned) + CAST(cgiver AS unsigned) + CAST(service AS unsigned) + CAST(device AS unsigned) + CAST(econ AS unsigned) + CAST(disease AS unsigned) AS ntotal, weight, height, auto_id FROM adl_pop WHERE cid = '".$cid."' ORDER BY adl_date ".$order;

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

		if($field == 'label:')
		{
			$value = '"'.tsdate(str_replace('"', '', $value), 0).'"';
		}

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