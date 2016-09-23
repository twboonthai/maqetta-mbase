<?php
function tsdate($exdate)
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
	return $tday." ".$tmonth." ".$tyear. " ".$thour.":".$tmin;
}

include 'm30_fct.php';
$cid = $_GET['cid'];

$strSQL = "SELECT *, fmc AS label, 'edit.jpg' AS icon, '>' AS rightText FROM stemi_visits WHERE cid = '".$cid."' ORDER BY fmc DESC";
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
mysql_free_result($objQuery);
?> 