<?php
include 'm30_fct.php';
$autoid = $_GET['auto_id'];
$onset = $_GET['onset'];
$fmc = $_GET['fmc'];
$cid = $_GET['cid'];
$dm = $_GET['dm'];
$ht = $_GET['ht'];
$sm = $_GET['sm'];
$lp = $_GET['lp'];
$fm = $_GET['fm'];
$xx = $_GET['xx'];
$hxn = $_GET['hx_n'];
$hxo = $_GET['hx_o'];
$hxp = $_GET['hx_p'];
$hxq = $_GET['hx_q'];
$hxr = $_GET['hx_r'];
$hxs = $_GET['hx_s'];
$hxt = $_GET['hx_t'];
$ekg_dt = $_GET['ekg_dt'];
$ekg = $_GET['ekg'];
$tpt_dt = $_GET['tpt_dt'];
$tpt = $_GET['tpt'];
$isd = $_GET['isd'];
$iv = $_GET['iv'];
$o2 = $_GET['o2'];
$asa = $_GET['asa'];
$pvx = $_GET['pvx'];
$mp = $_GET['mp'];
$stemi = $_GET['is_stemi'];
$skd = $_GET['sk_dt'];
$rfd = $_GET['refer_dt'];
$rf_to = $_GET['rf_to'];
$nosk = $_GET['nosk'];
$bt = $_GET['bt'];
$pr = $_GET['pr'];
$rr = $_GET['rr'];
$syst = $_GET['syst'];
$dias = $_GET['dias'];
$cc = $_GET['cc'];
$riskxx = $_GET['riskxx'];
$dx = $_GET['diagnosis'];
$tx = $_GET['treatment'];

mysql_query("SET NAMES UTF8");

if ($autoid == "0") {
	$strSQL = "INSERT INTO stemi_visits (cid, onset, fmc, dm, ht, sm, lp, fm, xx, hx_n, hx_o, hx_p, hx_q, hx_r, hx_s, hx_t, ekg_dt, 
	ekg_result, tpt_dt, tpt_result, iv_dt, o2_dt, asa_dt, isd_dt, pvx_dt, mp_dt, is_stemi, sk_dt, refer_dt, refer_to, nosk, 
	body_temp, pulse_rate, resp_rate, bp_syst, bp_dias, c_complaint, risk_xx, diagnosis, treatment) 
	VALUES ('".$cid."', '".$onset."', '".$fmc."', ".$dm.", ".$ht.", ".$sm.", ".$lp.", ".$fm.", ".$xx.", '".$hxn."', '".$hxo.
	"', '".$hxp."', '".$hxq."', '".$hxr."', '".$hxs."', '".$hxt."', '".$ekg_dt."', '".$ekkg."', '".$tpt_dt."', '".$tpt."', '".$iv."', '".
	$o2."', '".$asa."', '".$isd."', '".$pvx."', '".$mp."', ".$stemi.", '".$skd."', '".$rfd."', ".$rf_to.", ".$nosk.
	", '".$bt."', '".$pr."', '".$rr."', '".$syst."', '".$dias."', '".$cc."', '".$riskxx."', '".$dx."', '".$tx."')";
} else {
	$strSQL = "UPDATE stemi_visits SET cid = '".$cid."', onset = '".$onset."', fmc = '".$fmc."', dm = ".$dm.", ht = ".$ht.
	", sm = ".$sm.", lp = ".$lp. ", fm = ".$fm.", xx = ".$xx.", hx_n = '".$hxn."', hx_o = '".$hxo."', hx_p = '".$hxp.
	"', hx_q = '".$hxq."', hx_r = '".$hxr."', hx_s = '".$hxs."', hx_t = '".$hxt. "', ekg_dt = '".$ekg_dt."', ekg_result = '".$ekg.
	"', tpt_dt= '".$tpt_dt."', tpt_result = '".$tpt."', iv_dt = '".$iv."', o2_dt = '".$o2."', asa_dt = '".$asa."', isd_dt = '".
	$isd."', pvx_dt = '".$pvx."', mp_dt = '".$mp."', is_stemi=".$stemi.", sk_dt='".$skd."', refer_dt='".$rfd."', refer_to=".$rf_to.
	", nosk=".$nosk.", body_temp='".$bt."', pulse_rate='".$pr."', resp_rate='".$rr."', bp_syst='".$syst."', bp_dias='".$dias."', c_complaint='".$cc.
	"', risk_xx = '".$riskxx."', diagnosis='".$dx."', treatment='".$tx."' WHERE auto_id = ".$autoid;
}
echo $strSQL;
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

mysql_free_result($objQuery);

?>