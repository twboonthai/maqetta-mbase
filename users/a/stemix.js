//////////////////////////
//// Public Variables ////
//////////////////////////

//// General ///////////////
var lccid = "";
var lcfullname = "";
var lcage = "";
var lddate1 = "";
var lnhr1 = 0;
var lnmin1 = 0;
var lddate2 = "";
var lnhr2 = 0;
var lnmin2 = 0;
var ldekg = "";
var lnhrekg = 0;
var lnminekg = 0;
var ldtpt = "";
var lnhrtpt = 0;
var lnmintpt = 0;
var lcbt = "";
var lcpr = "";
var lcrr = "";
var lcsyst = "";
var lcdias = "";
var lccc = "";


//// Medication //////////
var ldiv = "";
var lnhriv = 0;
var lnminiv = 0;
var ldo2 = "";
var lnhro2 = 0;
var lnmino2 = 0;
var ldasa = "";
var lnhrasa = 0;
var lnminasa = 0;
var ldisd = "";
var lnhrisd = 0;
var lnminisd = 0;
var ldpvx = "";
var lnhrpvx = 0;
var lnminpvx = 0;
var ldmp = "";
var lnhrmp = 0;
var lnminmp = 0;
//////////////////////////
// Stemi
var lnstemi = 0;
var ldsk = "";
var lnreferto = 0;
var lnnosk = 0;
var lnhrsk = 0;
var lnminsk = 0;
var ldrf = "";
var lnhrrf = 0;
var lnminrf = 0;
///////////////////////////
var lcekg = "";
var lctpt = "";

var lndm = 0;
var lnht = 0;
var lnlp = 0;
var lnsm = 0;
var lnfm = 0;
var lnxx = 0;
var lnauto = 0;
var lchx_n = "";
var lchx_o = "";
var lchx_p = "";
var lchx_q = "";
var lchx_r = "";
var lchx_s = "";
var lchx_t = "";
var ip_address = "webmbase/";
var lcfullname = "";
///////////////////////////////////////////////////////////////////////////////////////

/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */

require([
	"dijit/PopupMenuBarItem",
  	"dijit/MenuItem",
  	"dijit/Menu",
  	"gridx/modules/VirtualVScroller",
  	"dijit/layout/ContentPane",
  	"dijit/form/Button",
  	"dijit/form/ComboButton",
 	"dojo/ready",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/data/ItemFileReadStore",
 	"dijit/registry",
 	"dojo/on",
 	"dojo/dom",
    	"dojox/charting/Chart",
   	"dojox/charting/axis2d/Default",
  	"dojox/charting/plot2d/Lines",	
   	"dojox/charting/plot2d/StackedColumns",	
	"dojox/charting/plot2d/Grid",
 	"dojo/_base/xhr" // use xhr to make ajax call to remote server
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
 ], function(popup, mitem, menu, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		//// Click b_obj show icon right or wrong and store 0 or 1 to b_var
		function b_click(b_obj, b_var) {
			var f_obj = reg.byId(b_obj);
			var lcx = f_obj.tooltip;
			if (lcx == '') {
				cMacro = b_var + "= 1";
				eval(cMacro);
				f_obj.tooltip = "1";
				f_obj.domNode.style.backgroundImage = 'url("right.jpg")';}
			else {
				cMacro = b_var + "= 0";
				eval(cMacro);
				f_obj.tooltip = "";
				f_obj.domNode.style.backgroundImage = 'url("wrong.jpg")';}
		}
		
		//// show icon : nval = 1 right or nval = 0 wrong
		function b_check(b_obj, nval) {
			var f_obj = reg.byId(b_obj);
			var lcx = f_obj.tooltip;
			if (nval == 1) {
				f_obj.tooltip = "1";
				f_obj.domNode.style.backgroundImage = 'url("right.jpg")';}
			else {
				f_obj.tooltip = "";
				f_obj.domNode.style.backgroundImage = 'url("wrong.jpg")';}
		}
		
		//// click button csource and show label of csource in object cdestination and store label to variable creturn
		function btn2txt(csource, cdestination, creturn) {
			var s_obj = reg.byId(csource);
			var d_obj = reg.byId(cdestination);
			var s_txt = s_obj.label.trim();
			var d_txt = d_obj.get("value");
			if (s_txt.trim() == "Clear") {var cmacro1 = creturn + " = ''";	}
			else {var cmacro1 = creturn + " = '" + d_txt + " " + s_txt + "'.trim()";}
			eval(cmacro1);
			var cmacro2 = "d_obj.set('value', " + creturn + ")";
			eval(cmacro2);
		}
		
		//// show list according to public variable
		function cp_list() {
			//// แสดง NOPQRST
			clearList("chest_pain");		
			var list_add = chest_pain.store.newItem({label: lchx_n, icon : "n.jpg", value : "1"});
			var list_add = chest_pain.store.newItem({label: lchx_o, icon : "o.jpg", value : "2"});
			var list_add = chest_pain.store.newItem({label: lchx_p, icon : "p.jpg", value : "3"});
			var list_add = chest_pain.store.newItem({label: lchx_q, icon : "q.jpg", value : "4"});
			var list_add = chest_pain.store.newItem({label: lchx_r, icon : "r.jpg", value : "5"});
			var list_add = chest_pain.store.newItem({label: lchx_s, icon : "s.jpg", value : "6"});
			var list_add = chest_pain.store.newItem({label: lchx_t, icon : "t.jpg", value : "7"});
		}
		
		function inv_list() {
			//// แสดง NOPQRST
			clearList("investigate");		
			var list_add = investigate.store.newItem({label: "EKG", icon : "ekg.jpg", rightText : tsdate(ldekg, 1), value : "1"});
			var list_add = investigate.store.newItem({label: "Trop-T", icon : "heart.jpg", rightText: tsdate(ldtpt, 1), value : "2"});
		}

		function rx_list() {
			//// แสดง Medications
			clearList("treatment");		
			var list_add = treatment.store.newItem({label: "IV Fluid", icon : "iv_fluid.jpg", rightText: tsdate(ldiv, 1), value : "1"});
			var list_add = treatment.store.newItem({label: "Oxygen", icon : "oxygen.jpg", rightText : tsdate(ldo2, 1), value : "2"});
			var list_add = treatment.store.newItem({label: "Isosorbide", icon : "isordil.jpg", rightText : tsdate(ldisd, 1), value : "3"});
			var list_add = treatment.store.newItem({label: "ASA grV", icon : "asa.jpg", rightText : tsdate(ldasa, 1), value : "4"});
			var list_add = treatment.store.newItem({label: "Plavix", icon : "plavix.jpg", rightText : tsdate(ldpvx, 1), value : "5"});
			var list_add = treatment.store.newItem({label: "Morphine", icon : "poppy.jpg", rightText : tsdate(ldmp, 1), value : "6"});
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
//		var staff_v2 = reg.byId("staff_v2");
//		var btn_stemi = reg.byId("btn_stemi");
//		on(btn_stemi, "click", function() {
//			stemi_v1h.set("label", "STEMI : " + lcname);
//			list("stemi_visits", "stemi_cid.php?cid=" + lccid);
//			staff_v2.performTransition("stemi_v1", 1, "slide", null);
//			btn_stemi.set("checked", false);
//			pt_fullname.set("value", lcname);
//		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_v1    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var cid = reg.byId("cid");
		var stemi_v1 = reg.byId("stemi_v1");
		var stemi_v1h = reg.byId("stemi_v1h");
		var new_stemi = reg.byId("new_stemi");
		var stemi_visits = reg.byId("stemi_visits");

		//////////////////
		//// Events //////
		//////////////////
		on(cid, "keyup", function() {
     		lcuser = cid.get("value");
			lnLength = lcuser.length;
			if (lnLength == 13) {
				patient = php2obj("cid_search.php?cid=" + lcuser);
				lccid = patient.cid;
				lcage = getAge(patient.birthdate, "");
				lcfullname = patient.fname + " " + patient.lname;
				stemi_v1h.set("label", "STEMI : " + lcfullname + " (" + lcage + ")");
				new_stemi.focus(true);
				pt_fullname.set("value", lcfullname);
				list("stemi_visits", "stemi_cid.php?cid=" + lccid);
			}
		 });
		 
		//on(back_sv1, "click", function() {
		//	stemi_v1.performTransition("staff_v2", -1, "slide", null);
		//});
		on(new_stemi, "click", function() {
			if (lccid == "") {alert ("กรุณากรอก รหัสประชาชนก่อน !!!");}
			else {
				lnauto = 0;
				// General /////////
				lcbt = "";
				lcpr = "";
				lcrr = "";
				lcsyst = "";
				lcdias = "";
				lccc = "เจ็บหน้าอกด้านซ้าย";
				btemp.set("value", "");
				pulse.set("value", "");
				resp.set("value", "");
				syst.set("value", "");
				dias.set("value", "");
				c_complaint.set("value", "เจ็บหน้าอกด้านซ้าย");
				
				lndm = 0;
				lnht = 0;
				lnlp = 0;
				lnsm = 0;
				lnfm = 0;
				lnxx = 0;
				b_check("btn_dm", lndm);
				b_check("btn_ht", lnht);
				b_check("btn_lp", lnlp);
				b_check("btn_sm", lnsm);
				b_check("btn_fm", lnfm);
				b_check("btn_xx", lnxx);
				
				lchx_n = "";
				lchx_o = "";
				lchx_p = "";
				lchx_q = "";
				lchx_r = "";
				lchx_s = "";
				lchx_t = "";
				
				ldiv = "";
				ldo2 = "";
				ldasa = "";
				ldisd = "";
				ldpvx = "";
				ldmp = "";

				ldsk = "";
				ldrf = "";
				
				cp_list();
				rx_list();
				lnstemi = 0;
				stemi_yes.set("checked", false);
				stemi_no.set("checked", true);
				lnreferto = 0
				rf_er.set("checked", false);
				rf_ccu.set("checked", false);
				rf_lab.set("checked", false);
				lnnosk = 0;
				nosk1.set("checked", false);
				nosk2.set("checked", false);
				nosk3.set("checked", false);
				//// DateTime //////////////////////////////////////////
				// onset
				lddate1 = new Date();
				lnhr1 = lddate1.getHours();
				lnmin1 = lddate1.getMinutes();
				hr1.set("value", pad(lnhr1.toString(), "00"));
				min1.set("value", pad(lnmin1.toString(), "00"));
				date1.set("value", tsdate(lddate1));
				// fmc
				lddate2 = new Date();
				lnhr2 = lddate2.getHours();
				lnmin2 = lddate2.getMinutes();
				hr2.set("value", pad(lnhr2.toString(), "00"));
				min2.set("value", pad(lnmin2.toString(), "00"));
				date2.set("value", tsdate(lddate2));
				// ekg
				ekg_value.set("value", "");
				ldekg = "";
				hrekg.set("value", "");
				minekg.set("value", "");
				dateekg.set("value", "");
				lcekg = "";
				ekg_value.set("value", "");
				// Trop-T
				tpt_value.set("value", "");
				ldtpt = "";
				hrtpt.set("value", "");
				mintpt.set("value", "");
				datetpt.set("value", "");
				lctpt = "";
				tpt_value.set("value", "");
				//// Medication
				// IV Fluid
				dateiv.set("value", "");
				hriv.set("value", "");
				miniv.set("value", "");
				// O2
				dateo2.set("value", "");
				hro2.set("value", "");
				mino2.set("value", "");
				// ASA
				dateasa.set("value", "");
				hrasa.set("value", "");
				minasa.set("value", "");
				// isordil
				dateisd.set("value", "");
				hrisd.set("value", "");
				minisd.set("value", "");
				// Plavix
				datepvx.set("value", "");
				hrpvx.set("value", "");
				minpvx.set("value", "");
				// Morphine
				datemp.set("value", "");
				hrmp.set("value", "");
				minmp.set("value", "");
				//// Stemi
				// sk
				datesk.set("value", "");
				hrsk.set("value", "");
				minsk.set("value", "");
				// Refer
				daterf.set("value", "");
				hrrf.set("value", "");
				minrf.set("value", "");
				/////////////////////////////////////////////////////////////////
				stemi_v1.performTransition("stemi_v2", 1, "slide", null);
				stemi_v2h.set("label", "Visit : " + tsdate(lddate1));
				min1.focus(true);
			}
		});
//// Click Visit ////////////////////////////////////////////////////
		on(stemi_visits, "click", function() {
			st_visit = selected_row("stemi_visits");
			// Clear Medication Datetime
			//// Medication
				// IV Fluid
				dateiv.set("value", "");
				hriv.set("value", "");
				miniv.set("value", "");
				// O2
				dateo2.set("value", "");
				hro2.set("value", "");
				mino2.set("value", "");
				// ASA
				dateasa.set("value", "");
				hrasa.set("value", "");
				minasa.set("value", "");
				// isordil
				dateisd.set("value", "");
				hrisd.set("value", "");
				minisd.set("value", "");
				// Plavix
				datepvx.set("value", "");
				hrpvx.set("value", "");
				minpvx.set("value", "");
				// Morphine
				datemp.set("value", "");
				hrmp.set("value", "");
				minmp.set("value", "");
				
			// menu1 ข้อมูลทั่วไป
    		lddate1 = ctot(st_visit.onset);
    		lcbt = st_visit.body_temp;
    		lcpr = st_visit.pulse_rate;
    		lcrr = st_visit.resp_rate;
    		lcsyst = st_visit.bp_syst;
    		lcdias = st_visit.bp_dias;
    		lccc = st_visit.c_complaint;
    		btemp.set("value", lcbt);
			pulse.set("value", lcpr);
			resp.set("value", lcrr);
			syst.set("value", lcsyst);
			dias.set("value", lcdias);
			c_complaint.set("value", lccc);
			lndm = st_visit.dm;
			lnht = st_visit.ht;
			lnsm = st_visit.sm;
			lnlp = st_visit.lp;
			lnfm = st_visit.fm;
			lnxx = st_visit.xx;
			var lcrisk = "";
			if (lndm == 1) {
				if (lcrisk.length == 0) {lcrisk = "DM";}
				else {lcrisk = lcrisk + ", DM";}
			}
			if (lnht == 1) {
				if (lcrisk.length == 0) {lcrisk = "HT";}
				else {lcrisk = lcrisk + ", HT";}
			}
			if (lnlp == 1) {
				if (lcrisk.length == 0) {lcrisk = "LIPID";}
				else {lcrisk = lcrisk + ", LIPID";}
			}
			if (lnsm == 1) {
				if (lcrisk.length == 0) {lcrisk = "Smoking";}
				else {lcrisk = lcrisk + ", Smoking";}
			}
			if (lnfm == 1) {
				if (lcrisk.length == 0) {lcrisk = "Family";}
				else {lcrisk = lcrisk + ", Family";}
			}
			if (lnxx == 1) {
				if (lcrisk.length == 0) {lcrisk = "Other";}
				else {lcrisk = lcrisk + ", Other";}
			}
			// ข้อมูลทั่วไป
			clearList("er_visit");
			//// ชื่อ-สกุล
		    var item = new dojox.mobile.ListItem({
		        id: "er_name",
		        label: "ผู้ป่วย",
		        rightText: lcfullname + " (" + lcage + ")",
		    });
			er_visit.addChild(item);
			
			//// FMC
		    var item = new dojox.mobile.ListItem({
		        id: "er_fmc",
		        label: "FMC",
		        rightText: tsdate(ctot(st_visit.fmc), 1) + " >",
		    });
		    er_visit.addChild(item);
		    //// CC
		    var item = new dojox.mobile.ListItem({
		        id: "er_cc",
		        label: "C/C",
		        rightText: lccc + " >",
		    });
		    er_visit.addChild(item);
			//// Temperature
		    var item = new dojox.mobile.ListItem({
		        id: "er_T",
		        label: "Temperature",
		        rightText: lcbt + " C >",
		    });
		    er_visit.addChild(item);
			//// Pulse Rate
		    var item = new dojox.mobile.ListItem({
		        id: "er_P",
		        label: "Pulse Rate",
		        rightText: lcpr + "/min >",
		    });
		    er_visit.addChild(item);
		    //// Respiratory Rate
		    var item = new dojox.mobile.ListItem({
		        id: "er_R",
		        label: "Respiratory Rate",
		        rightText: lcrr + "/min >",
		    });
			er_visit.addChild(item);
			//// BP
		    var item = new dojox.mobile.ListItem({
		        id: "er_BP",
		        label: "Pulse Rate",
		        rightText: lcsyst + "/" + lcdias + " mmHg >",
		    });
			er_visit.addChild(item);
			////
		    var item = new dojox.mobile.ListItem({
		        id: "",
		        label: ""
		    });
			er_visit.addChild(item);
			//// Risk
		    var item = new dojox.mobile.ListItem({
		        id: "er_risk",
		        label: "Risk Factors",
		        rightText: lcrisk + " >",
		    });
		    er_visit.addChild(item);
			
    		// onset
			date1.set("value", tsdate(lddate1));
			lnhr1 = lddate1.getHours();
			lchr1 = lnhr1.toString();
			hr1.set("value", pad(lchr1, "00"));
			lnmin1 = lddate1.getMinutes();
			lcmin1 = lnmin1.toString();
			min1.set("value", pad(lcmin1, "00"));
			// FMC
    		lddate2 = ctot(st_visit.fmc);
			stemi_v2h.set("label", "Visit : " + tsdate(lddate2));
			date2.set("value", tsdate(lddate2));
			lnhr2 = lddate2.getHours();
			var lchr2 = lnhr2.toString();
			hr2.set("value", pad(lchr2, "00"));
			lnmin2 = lddate2.getMinutes();
			var lcmin2 = lnmin2.toString();
			min2.set("value", pad(lcmin2, "00"));
			// EKG
			ldekg = ctot(st_visit.ekg_dt);
			lcekg = st_visit.ekg_result;
			if (ldekg != "") {
				dateekg.set("value", tsdate(ldekg));
				lnhrekg = ldekg.getHours();
				var lchrekg = lnhrekg.toString();
				hrekg.set("value", pad(lchrekg, "00"));
				lnminekg = ldekg.getMinutes();
				var lcminekg = lnminekg.toString();
				minekg.set("value", pad(lcminekg, "00"));
				lcdekg = tsdate(ldekg, 1);
			}
			// Trop-T
			ldtpt = ctot(st_visit.tpt_dt);
			lctpt = st_visit.tpt_result;
			if (ldtpt != "") {
				datetpt.set("value", tsdate(ldtpt));
				lnhrtpt = ldtpt.getHours();
				var lchrtpt = lnhrtpt.toString();
				hrtpt.set("value", pad(lchrtpt, "00"));
				lnmintpt = ldtpt.getMinutes();
				var lcmintpt = lnmintpt.toString();
				mintpt.set("value", pad(lcmintpt, "00"));
				lcdtpt = tsdate(ldtpt, 1);
			}
			
			// Medication
			ldiv = ctot(st_visit.iv_dt);
			if (ldiv != "") {
				dateiv.set("value", tsdate(ldiv));
				lnhriv = ldiv.getHours();
				lchriv = lnhriv.toString();
				hriv.set("value", pad(lchriv, "00"));
				lnminiv = ldiv.getMinutes();
				lcminiv = lnminiv.toString();
				miniv.set("value", pad(lcminiv, "00"));
				lcdiv = tsdate(ldiv, 1);
			}
			ldo2 = ctot(st_visit.o2_dt);
			if (ldo2 != "") {
				dateo2.set("value", tsdate(ldo2));
				lnhro2 = ldo2.getHours();
				lchro2 = lnhro2.toString();
				hro2.set("value", pad(lchro2, "00"));
				lnmino2 = ldo2.getMinutes();
				lcmino2 = lnmino2.toString();
				mino2.set("value", pad(lcmino2, "00"));
				lcdo2 = tsdate(ldo2, 1);
			}
			ldasa = ctot(st_visit.asa_dt);
			if (ldasa != "") {
				dateasa.set("value", tsdate(ldasa));
				lnhrasa = ldasa.getHours();
				lchrasa = lnhrasa.toString();
				hrasa.set("value", pad(lchrasa, "00"));
				lnminasa = ldasa.getMinutes();
				lcminasa = lnminasa.toString();
				minasa.set("value", pad(lcminasa, "00"));
				lcdasa = tsdate(ldasa, 1);
			}
			ldisd = ctot(st_visit.isd_dt);
			if (ldisd != "") {
				dateisd.set("value", tsdate(ldisd));
				lnhrisd = ldisd.getHours();
				lchrisd = lnhrisd.toString();
				hrisd.set("value", pad(lchrisd, "00"));
				lnminisd = ldisd.getMinutes();
				lcminisd = lnminisd.toString();
				minisd.set("value", pad(lcminisd, "00"));
				lcdisd = tsdate(ldisd, 1);
			}
			ldpvx = ctot(st_visit.pvx_dt);
			if (ldpvx != "") {
				datepvx.set("value", tsdate(ldpvx));
				lnhrpvx = ldpvx.getHours();
				lchrpvx = lnhrpvx.toString();
				hrpvx.set("value", pad(lchrpvx, "00"));
				lnminpvx = ldpvx.getMinutes();
				lcminpvx = lnminpvx.toString();
				minpvx.set("value", pad(lcminpvx, "00"));
				lcdpvx = tsdate(ldpvx, 1);
			}
			ldmp = ctot(st_visit.mp_dt);
			if (ldmp != "") {
				datemp.set("value", tsdate(ldmp));
				lnhrmp = ldmp.getHours();
				lchrmp = lnhrmp.toString();
				hrmp.set("value", pad(lchrmp, "00"));
				lnminmp = ldmp.getMinutes();
				lcminmp = lnminmp.toString();
				minmp.set("value", pad(lcminmp, "00"));
				lcdmp = tsdate(ldmp, 1);
			}
			lnauto = st_visit.auto_id;
			
			b_check("btn_dm", lndm);
			b_check("btn_ht", lnht);
			b_check("btn_lp", lnlp);
			b_check("btn_sm", lnsm);
			b_check("btn_fm", lnfm);
			b_check("btn_xx", lnxx);
			// Risk Factors
			clearList("risk");
			var item = new dojox.mobile.ListItem({
		        id: "",
		        label: ""
		    });
		    risk.addChild(item);
			//// DM
		    var item = new dojox.mobile.ListItem({
		        id: "sw_dm",
		        label: "DM"
		    });
	    	var sw_dm = new dojox.mobile.Switch({
	        	class: "mblSwRoundShape1 color1"   
	    	});
	    	if (lndm == 1) {sw_dm.set("value", "on");}
	    	else {sw_dm.set("value", "off");}
	    	item.addChild(sw_dm);
			risk.addChild(item);
			//// HT
		    var item = new dojox.mobile.ListItem({
		        id: "sw_ht",
		        label: "HT"
		    });
	    	var sw_ht = new dojox.mobile.Switch({
	        	class: "mblSwRoundShape1 color1"   
	    	});
	    	if (lnht == 1) {sw_ht.set("value", "on");}
	    	else {sw_ht.set("value", "off");}
	    	item.addChild(sw_ht);
			risk.addChild(item);
			//// Lipid
		    var item = new dojox.mobile.ListItem({
		        id: "sw_lp",
		        label: "LIPID"
		    });
	    	var sw_lp = new dojox.mobile.Switch({
	        	class: "mblSwRoundShape1 color1"   
	    	});
	    	if (lnlp == 1) {sw_lp.set("value", "on");}
	    	else {sw_lp.set("value", "off");}
	    	item.addChild(sw_lp);
			risk.addChild(item);
			//// Smoking
		    var item = new dojox.mobile.ListItem({
		        id: "sw_sm",
		        label: "Smoking"
		    });
	    	var sw_sm = new dojox.mobile.Switch({
	        	class: "mblSwRoundShape1 color1"   
	    	});
	    	if (lnsm == 1) {sw_sm.set("value", "on");}
	    	else {sw_sm.set("value", "off");}
	    	item.addChild(sw_sm);
			risk.addChild(item);
			//// Family
		    var item = new dojox.mobile.ListItem({
		        id: "sw_fm",
		        label: "Family"
		    });
	    	var sw_fm = new dojox.mobile.Switch({
	        	class: "mblSwRoundShape1 color1"   
	    	});
	    	if (lnfm == 1) {sw_fm.set("value", "on");}
	    	else {sw_fm.set("value", "off");}
	    	item.addChild(sw_fm);
			risk.addChild(item);
			//// Other
		    var item = new dojox.mobile.ListItem({
		        id: "sw_xx",
		        label: "Other"
		    });
	    	var sw_xx = new dojox.mobile.Switch({
	        	class: "mblSwRoundShape1 color1"   
	    	});
	    	if (lnxx == 1) {sw_xx.set("value", "on");}
	    	else {sw_xx.set("value", "off");}
	    	item.addChild(sw_xx);
			risk.addChild(item);	
			
//// Add Switch to EdgetoEdgeList ////////////////////////////////
//		// Add new item to stemi_menu
//	    var item = new dojox.mobile.ListItem({
//	        id: "switch",
//	        label: "Test Switch"
//	    });
//	    var sw = new dojox.mobile.Switch({
//	        class: "mblSwRoundShape1 color1"   
//	    });
//	    item.addChild(sw);
//	
//	   stemi_menu.addChild(item);
//	   on(sw, "click", function() {
//	   		alert ("Here");
//	   });
//////////////////////////////////////////////////////////////			
			
			// menu2 ข้อมูลเจ็บหน้าอก NOPQRST
			lchx_n = st_visit.hx_n;
			lchx_o = st_visit.hx_o;
			lchx_p = st_visit.hx_p;
			lchx_q = st_visit.hx_q;
			lchx_r = st_visit.hx_r;
			lchx_s = st_visit.hx_s;
			lchx_t = st_visit.hx_t;
			// menu5 Stemi
			lnstemi = st_visit.is_stemi;
			stemi_yes.set("checked", false);
			stemi_no.set("checked", false);
			if (lnstemi == 0) {
				stemi_no.set("checked", true);}
			if (lnstemi == 1) {
				stemi_yes.set("checked", true);}
			
			// sk
			datesk.set("value", "");
			hrsk.set("value", "");
			minsk.set("value", "");
			// Refer
			daterf.set("value", "");
			hrrf.set("value", "");
			minrf.set("value", "");
			ldsk = ctot(st_visit.sk_dt);
			if (ldsk != "") {
				datesk.set("value", tsdate(ldsk));
				lnhrsk = ldsk.getHours();
				lchrsk = lnhrsk.toString();
				hrsk.set("value", pad(lchrsk, "00"));
				lnminsk = ldsk.getMinutes();
				lcminsk = lnminsk.toString();
				minsk.set("value", pad(lcminsk, "00"));
				lcdsk = tsdate(ldsk, 1);
			}
			ldrf = ctot(st_visit.refer_dt);
			if (ldrf != "") {
				daterf.set("value", tsdate(ldrf));
				lnhrrf = ldrf.getHours();
				lchrrf = lnhrrf.toString();
				hrrf.set("value", pad(lchrrf, "00"));
				lnminrf = ldrf.getMinutes();
				lcminrf = lnminrf.toString();
				minrf.set("value", pad(lcminrf, "00"));
				lcdrf = tsdate(ldrf, 1);
			}
			lnreferto = st_visit.refer_to;
			rf_er.set("checked", false);
			rf_ccu.set("checked", false);
			rf_lab.set("checked", false);
			if (lnreferto == 1) {rf_er.set("checked", true);}
			if (lnreferto == 2) {rf_ccu.set("checked", true);}
			if (lnreferto == 3) {rf_lab.set("checked", true);}
			lnnosk = st_visit.nosk;
			nosk1.set("checked", false);
			nosk2.set("checked", false);
			nosk3.set("checked", false);
			if (lnnosk == 1) {nosk1.set("checked", true);}
			if (lnnosk == 2) {nosk2.set("checked", true);}
			if (lnnosk == 3) {nosk3.set("checked", true);}
			////////////////////////////////////
			cp_list();
			rx_list();
			inv_list();
			
			stemi_v1.performTransition("stemi_v2", 1, "slide", null);
		});	
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_v2  ////  ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_v2 = reg.byId("stemi_v2");	
		var stemi_v2h = reg.byId("stemi_v2h");	
		var back_sv2 = reg.byId("back_sv2");
		var stemi_menu = reg.byId("stemi_menu");
		
//// Add Switch to EdgetoEdgeList ////////////////////////////////
//		// Add new item to stemi_menu
//	    var item = new dojox.mobile.ListItem({
//	        id: "switch",
//	        label: "Test Switch"
//	    });
//	    var sw = new dojox.mobile.Switch({
//	        class: "mblSwRoundShape1 color1"   
//	    });
//	    item.addChild(sw);
//	
//	   stemi_menu.addChild(item);
//	   on(sw, "click", function() {
//	   		alert ("Here");
//	   });
//////////////////////////////////////////////////////////////
		//////////////////
		//// Events //////
		//////////////////
		on(back_sv2, "click", function() {
			stemi_v2.performTransition("stemi_v1", -1, "slide", null);
		});
		//// เลือกรายการเมนู ///////////////////////
		on(stemi_menu, "click", function() {
			s = selected_row("stemi_menu", 1);
		   	if (s==0) {
		   		// ข้อมูลทั่วไป
		   		stemi_v2.performTransition("stemi_menu1_1", 1, "slide", null);
		   	}
		   	if (s==1) {
		   		// ประวัติเจ็บหน้าอก NOPQRST
		   		stemi_v2.performTransition("stemi_menu2", 1, "slide", null);
		   	}
		   	if (s==2) {
		   		// Investigation
		   		inv_list();
		   		stemi_v2.performTransition("stemi_menu3", 1, "slide", null);
		   	}
		   		// Treatment
		   	if (s==3) {
		   		rx_list();
		   		stemi_v2.performTransition("stemi_menu4", 1, "slide", null);
		   	}
		   	if (s==4) {
		   		stemi_v2.performTransition("stemi_menu5", 1, "slide", null);
		   	}

		   	if (s==6) {
				var lcdate2 = d2txt(lddate2, 1);
				var lcdate1 = d2txt(lddate1, 1);
				var lcdekg = d2txt(ldekg, 1);
				var lcdtpt = d2txt(ldtpt, 1);
				var lcdiv = d2txt(ldiv, 1);
				var lcdo2 = d2txt(ldo2, 1);
				var lcdasa = d2txt(ldasa, 1);
				var lcdisd = d2txt(ldisd, 1);
				var lcdpvx = d2txt(ldpvx, 1);
				var lcdmp = d2txt(ldmp, 1);
				var lcdsk = d2txt(ldsk, 1);
				var lcdrf = d2txt(ldrf, 1);
				lcbt = btemp.get("value").trim();
				lcpr = pulse.get("value").trim();
				lcrr = resp.get("value").trim();
				lcsyst = syst.get("value").trim();
				lcdias = dias.get("value").trim();
				lccc = c_complaint.get("value").trim();
				
				lcphp = "stemi_save.php?cid=" + lccid + "&fmc=" + lcdate2 + "&onset=" + lcdate1 + "&auto_id=" + lnauto + "&dm=" + lndm + "&ht=" + lnht + "&lp=" + 
					lnlp + "&sm=" + lnsm + "&fm=" + lnfm + "&xx=" + lnxx + "&hx_n=" + lchx_n + "&hx_o=" + lchx_o + "&hx_p=" + lchx_p + "&hx_q=" + lchx_q +
					"&hx_r=" + lchx_r + "&hx_s=" + lchx_s + "&hx_t=" + lchx_t + "&ekg_dt=" + lcdekg + "&ekg=" + lcekg + "&tpt_dt=" + lcdtpt + "&tpt=" + lctpt +
					"&iv=" + lcdiv + "&o2=" + lcdo2 + "&asa=" + lcdasa + "&isd=" + lcdisd + "&pvx=" + lcdpvx + "&mp=" + lcdmp +
					"&is_stemi=" + lnstemi + "&sk_dt=" + lcdsk + "&refer_dt=" + lcdrf + "&rf_to=" + lnreferto + "&nosk=" + lnnosk + "&bt=" + lcbt + "&pr=" + lcpr +
					"&rr=" + lcrr + "&syst=" + lcsyst + "&dias=" + lcdias + "&cc=" + lccc;
				mysave(lcphp, 'list("stemi_visits", "stemi_cid.php?cid=" + lccid)');
			   	inv_list();
			   	rx_list();
			   	
			   	// สร้าง PDF File //////////////////////////////////////
			   	var lcrisk = "";
			   	var lnrisk = 0;
			   	if (lndm == 1) {
			   		if (lnrisk == 0) {lcrisk = "DM";}
			   		else {lcrisk = lcrisk + ", DM";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnht == 1) {
			   		if (lnrisk == 0) {lcrisk = "HT";}
			   		else {lcrisk = lcrisk + ", HT";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnsm == 1) {
			   		if (lnrisk == 0) {lcrisk = "Smoking";}
			   		else {lcrisk = lcrisk + ", Smoking";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnlp == 1) {
			   		if (lnrisk == 0) {lcrisk = "Hyperlipidemia";}
			   		else {lcrisk = lcrisk + ", Hyperlipidemia";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnfm == 1) {
			   		if (lnrisk == 0) {lcrisk = "Family History";}
			   		else {lcrisk = lcrisk + ", Family History";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	// TPR
			   	var tpr = "BT=" + lcbt + ",  PR=" + lcpr + ",  RR=" + lcrr + "  BP=" + lcsyst + "/" + lcdias;
			   	// Refer
			   	var lcrfto = "";
			   	if (lnreferto==1) {lcrfto = "ER";}
			   	if (lnreferto==2) {lcrfto = "CCU";}
			   	if (lnreferto==3) {lcrfto = "Cath Lab";}
			   	
			   	// no SK
			   	var nosk = "";
			   	if (lnnosk == 1) {nosk = "ไม่ได้ฉีด SK เนื่องจากผู้ป่วยมีข้อห้ามในการใช้ยา SK";}
				if (lnnosk == 2) {nosk = "ไม่ได้ฉีด SK เนื่องจากความไม่พร้อมด้านบุคลากร";}
				if (lnnosk == 3) {nosk = "ไม่ได้ฉีด SK เนื่องจากความไม่พร้อมด้านวัสดุอุปกรณ์";}
			   	
			   	// PHP to PDF //////////////
			   	lcpdf = ip_address + "pdf.php?cid=" + lccid + "&pt_name=" + lcfullname + " อายุ " + lcage + "&cc=" + lccc + "&hxn=" + lchx_n + "&hxo=" + lchx_o + "&hxp=" + lchx_p + 
			   	"&hxq=" + lchx_q + "&hxr=" + lchx_r + "&hxs=" + lchx_s + "&hxt=" + lchx_t + "&risk=" + lcrisk + "&er=" + tsdate(lddate2, 1) + "&tpr=" + tpr + "&dekg=" + tsdate(ldekg, 1) +
			   	"&ekg=" + lcekg + "&dtpt=" + tsdate(ldtpt, 1) + "&tpt=" + lctpt + "&iv=" + tsdate(ldiv, 1) + "&o2=" + tsdate(ldo2, 1) + "&isd=" + tsdate(ldisd, 1) + "&asa=" + tsdate(ldasa, 1) + 
			   	"&pvx=" + tsdate(ldpvx, 1) + "&mp=" + tsdate(ldmp, 1) + "&sk=" + tsdate(ldsk, 1) + nosk + "&refer=" + tsdate(ldrf, 1) + "&rfto=" + lcrfto;
			   	//alert (lcpdf);
				document.location.href = lcpdf;
				alert ("สร้าง PDF ชื่อ stemi_" + lccid + ".pdf เรียบร้อยแล้ว");
			   	/////////////////////////////////////////////////////
			   	
				stemi_v2.performTransition("stemi_v1", -1, "slide", null);
		   	}
         });
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu1    /////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var back_menu1_1 = reg.byId("back_menu1_1");
		var stemi_menu1_1 = reg.byId("stemi_menu1_1");
		var back_menu1_2 = reg.byId("back_menu1_2");
		var stemi_menu1_2 = reg.byId("stemi_menu1_2");
		var er_visit = reg.byId("er_visit");
		
		var back_menu1 = reg.byId("back_menu1");
		var stemi_menu1 = reg.byId("stemi_menu1");
		var btn_dm = reg.byId("btn_dm");
		var btn_ht = reg.byId("btn_ht");
		var btn_lp = reg.byId("btn_lp");
		var btn_sm = reg.byId("btn_sm");
		var btn_fm = reg.byId("btn_fm");
		var btn_xx = reg.byId("btn_xx");
		
		var date2 = reg.byId("date2");
		var minus_d2 = reg.byId("minus_d2");
		var plus_d2 = reg.byId("plus_d2");
		var hr2 = reg.byId("hr2");
		var min2 = reg.byId("min2");
		var pt_fullname = reg.byId("pt_fullname");
		
		var btemp = reg.byId("btemp");
		var pulse = reg.byId("pulse");
		
		var risk = reg.byId("risk");
		
// Set Focus
//		dojo.connect( dojo.byId('pulse'), 'onfocus', function() {
//		    dojo.byId('pulse').select();
//		});
		var resp = reg.byId("resp");
		var syst = reg.byId("syst");
		var dias = reg.byId("dias");
		var c_complaint = reg.byId("c_complaint");
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu1_1, "click", function() {
			stemi_menu1_1.performTransition("stemi_v2", -1, "slide", null);
		});
		on(back_menu1_2, "click", function() {
			stemi_menu1_2.performTransition("stemi_menu1_1", -1, "slide", null);
		});
		on(back_menu1, "click", function() {
			stemi_menu1.performTransition("stemi_v2", -1, "slide", null);
		});
		
		on(date2, "click", function() {
			var txt = date2.get("value");
			if(txt.trim() == "") {lddate2 = new Date();}
			date2.set("value", tsdate(lddate2));
		});
		on(minus_d2, "click", function() {
			var lcdate = date2.get("value");
			if (lcdate.trim() == "") {lddate2 = new Date();}
			else {lddate = lddate2.getDate() - 1;
			lddate2.setDate(lddate);}
			date2.set("value", tsdate(lddate2));
		});
		on(plus_d2, "click", function() {
			var lcdate = date2.get("value");
			if (lcdate.trim() == "") {lddate2 = new Date();}
			else {lddate = lddate2.getDate() + 1;
			lddate2.setDate(lddate);}
			date2.set("value", tsdate(lddate2));
		});
		on(hr2, "keyup", function() {
     		lnhr2 = hr2.get("value");
     		if (lnhr2 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr2 = lnhr2.toString();
	     		var lnlength = lchr2.length;
				if (lnlength == 2 || lchr2 > "2") {
					lddate2.setHours(lnhr2);
					hr2.set("value", pad(lchr2, "00"));
					min2.focus(true);
				}
			}
		});
		on(min2, "keyup", function() {
     		lnmin2 = min2.get("value");
     		if (lnmin2 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmin2 = lnmin2.toString();
	     		var lnlength = lcmin2.length;
				if (lnlength == 2 || lcmin2 > "6" || lcmin2 == "6" && lnlength == 1) {
					lddate2.setMinutes(lnmin2);
					min2.set("value", pad(lcmin2, "00"));
					back_menu1.focus(true);
				}
			}
		});
		// เลือกรายการ ข้อมูลทั่วไป
		on(er_visit, "click", function() {
			var er = selected_row("er_visit", 1);
			if (er == 8) {stemi_menu1_1.performTransition("stemi_menu1_2", 1, "slide", null);}
		});
		
		on(btn_dm, "click", function() {
			b_click("btn_dm", "lndm");
		});
		on(btn_ht, "click", function() {
			b_click("btn_ht", "lnht");
		});
		on(btn_lp, "click", function() {
			b_click("btn_lp", "lnlp");
		});
		on(btn_sm, "click", function() {
			b_click("btn_sm", "lnsm");
		});
		on(btn_fm, "click", function() {
			b_click("btn_fm", "lnfm");
		});
		on(btn_xx, "click", function() {
			b_click("btn_xx", "lnxx");
		});
		
		on(btemp, "keyup", function() {
     		lctemp = btemp.get("value").trim();
     		var lnlength = lctemp.length;
			if (lnlength == 2 && (lctemp.substr(0, 1) == "3" || lctemp.substr(0, 1) == "4")) {btemp.set("value", lctemp + ".");}
			if (lnlength == 4 && lctemp.substr(3, 1) == ".") {
				btemp.set("value", lctemp.substr(0, 3));
				btemp.focus(true);}
			if (lnlength == 4 && lctemp.substr(3, 1) != ".") {
				lcbt = lctemp;
				pulse.focus(true);
			}
		});
		
		on(pulse, "keyup", function() {
     		lctemp = pulse.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 2) || lnlength == 3) {
				lcpr = lctemp;
				resp.focus(true);
			}
		});
		
		on(resp, "keyup", function() {
     		lctemp = resp.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 1) || lnlength == 3) {
				lcrr = lctemp;
				syst.focus(true);
			}
		});
		
		on(syst, "keyup", function() {
     		lctemp = syst.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 3) || lnlength == 3) {
				lcsyst = lctemp;
				dias.focus(true);
			}
		});
		
		on(dias, "keyup", function() {
     		lctemp = dias.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 2) || lnlength == 3) {
				lcdias = lctemp;
				back_menu1.focus(true);
			}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu2    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu2 = reg.byId("stemi_menu2");
		var back_menu2 = reg.byId("back_menu2");
		var chest_pain = reg.byId("chest_pain");
		var store_cp = new ifws({data:{items:[]}});
		chest_pain.store = null;
		chest_pain.setStore(store_cp);
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu2, "click", function() {
			stemi_menu2.performTransition("stemi_v2", -1, "slide", null);
		});
		on(chest_pain, "click", function() {
			lnpage = selected_row("chest_pain", 1);
			if (lnpage == 0) {
				hxn_value.set("value", lchx_n);
				stemi_menu2.performTransition("hx_n", 1, "slide", null);}
			else if (lnpage == 1) {
				stemi_menu2.performTransition("hx_o", 1, "slide", null);}
			else if (lnpage == 2) {
				hxp_value.set("value", lchx_p);
				stemi_menu2.performTransition("hx_p", 1, "slide", null);}
			else if (lnpage == 3) {
				hxq_value.set("value", lchx_q);
				stemi_menu2.performTransition("hx_q", 1, "slide", null);}
			else if (lnpage == 4) {
				hxr_value.set("value", lchx_r);
				stemi_menu2.performTransition("hx_r", 1, "slide", null);}
			else if (lnpage == 5) {
				hxs_value.set("value", lchx_s);
				stemi_menu2.performTransition("hx_s", 1, "slide", null);}
			else {
				hxt_value.set("value", lchx_t);
				stemi_menu2.performTransition("hx_t", 1, "slide", null);}
		});	
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_n    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_n = reg.byId("hx_n");
		var back_hxn = reg.byId("back_hxn");
		var hxn_value = reg.byId("hxn_value");
		var hxn1 = reg.byId("hxn1");
		var hxn2 = reg.byId("hxn2");
		var hxn3 = reg.byId("hxn3");
		var hxn4 = reg.byId("hxn4");
		
		//////////////////
		//// Events //////
		//////////////////
		on(hxn1, "click", function() {btn2txt("hxn1", "hxn_value", "lchx_n");});
		on(hxn2, "click", function() {btn2txt("hxn2", "hxn_value", "lchx_n");});
		on(hxn3, "click", function() {btn2txt("hxn3", "hxn_value", "lchx_n");});
		on(hxn4, "click", function() {btn2txt("hxn4", "hxn_value", "lchx_n");});
		
		on(back_hxn, "click", function() {
			lchx_n = hxn_value.get("value").trim();
			cp_list();
			hx_n.performTransition("stemi_menu2", -1, "slide", null);
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_o    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_o = reg.byId("hx_o");
		var back_hxo = reg.byId("back_hxo");
		var date1 = reg.byId("date1");
		var minus_d1 = reg.byId("minus_d1");
		var plus_d1 = reg.byId("plus_d1");
		var hr1 = reg.byId("hr1");
		var min1 = reg.byId("min1");
		var date2 = reg.byId("date2");
	
		//////////////////
		//// Events //////
		//////////////////
		on(back_hxo, "click", function() {
			lchx_o = tsdate(lddate1, 1);
			cp_list();
			hx_o.performTransition("stemi_menu2", -1, "slide", null);
		});
		on(date1, "click", function() {
			var txt = date1.get("value");
			if(txt.trim() == "") {lddate1 = new Date();}
			date1.set("value", tsdate(lddate1));
		});
		on(minus_d1, "click", function() {
			var lcdate = date1.get("value");
			if (lcdate.trim() == "") {lddate1 = new Date();}
			else {lddate = lddate1.getDate()-1;
			lddate1.setDate(lddate);}
			date1.set("value", tsdate(lddate1));
		});
		on(plus_d1, "click", function() {
			var lcdate = date1.get("value");
			if (lcdate.trim() == "") {lddate1 = new Date();}
			else {lddate = lddate1.getDate()+1;
			lddate1.setDate(lddate);}
			date1.set("value", tsdate(lddate1));
		});
		on(hr1, "keyup", function() {
     		lnhr1 = hr1.get("value");
     		if (lnhr1 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr1 = lnhr1.toString();
	     		var lnlength = lchr1.length;
				if (lnlength == 2 || lchr1 > "2") {
					lddate1.setHours(lnhr1);
					hr1.set("value", pad(lchr1, "00"));
					min1.focus(true);
				}
			}
		});
		on(min1, "keyup", function() {
     		lnmin1 = min1.get("value");
     		if (lnmin1 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmin1 = lnmin1.toString();
	     		var lnlength = lcmin1.length;
				if (lnlength == 2 || lcmin1 > "6" || lcmin1 == "6" && lnlength == 1) {
					lddate1.setMinutes(lnmin1);
					min1.set("value", pad(lcmin1, "00"));
					back_hxo.focus(true);
				}
			}
		});
		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_p    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_p = reg.byId("hx_p");
		var back_hxp = reg.byId("back_hxp");
		var hxp_value = reg.byId("hxp_value");
		var hxp1 = reg.byId("hxp1");
		var hxp2 = reg.byId("hxp2");
		var hxp3 = reg.byId("hxp3");
		var hxp4 = reg.byId("hxp4");
		var hxp5 = reg.byId("hxp5");
		var hxp6 = reg.byId("hxp6");
		var hxp7 = reg.byId("hxp7");
		var hxp8 = reg.byId("hxp8");
		var hxp9 = reg.byId("hxp9");

		//////////////////
		//// Events //////
		//////////////////
		on(hxp1, "click", function() {btn2txt("hxp1", "hxp_value", "lchx_p");});
		on(hxp2, "click", function() {btn2txt("hxp2", "hxp_value", "lchx_p");});
		on(hxp3, "click", function() {btn2txt("hxp3", "hxp_value", "lchx_p");});
		on(hxp4, "click", function() {btn2txt("hxp4", "hxp_value", "lchx_p");});
		on(hxp5, "click", function() {btn2txt("hxp5", "hxp_value", "lchx_p");});
		on(hxp6, "click", function() {btn2txt("hxp6", "hxp_value", "lchx_p");});
		on(hxp7, "click", function() {btn2txt("hxp7", "hxp_value", "lchx_p");});
		on(hxp8, "click", function() {btn2txt("hxp8", "hxp_value", "lchx_p");});
		on(hxp9, "click", function() {btn2txt("hxp9", "hxp_value", "lchx_p");});
		
		on(back_hxp, "click", function() {
			lchx_p = hxp_value.get("value").trim();
			cp_list();
			hx_p.performTransition("stemi_menu2", -1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_q    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_q = reg.byId("hx_q");
		var back_hxq = reg.byId("back_hxq");
		var hxq_value = reg.byId("hxq_value");
		var hxq1 = reg.byId("hxq1");
		var hxq2 = reg.byId("hxq2");
		var hxq3 = reg.byId("hxq3");
		var hxq4 = reg.byId("hxq4");
		var hxq5 = reg.byId("hxq5");
		var hxq6 = reg.byId("hxq6");
		var hxq7 = reg.byId("hxq7");
		var hxq8 = reg.byId("hxq8");
		var hxq9 = reg.byId("hxq9");
		//////////////////
		//// Events //////
		//////////////////
		on(back_hxq, "click", function() {
			lchx_q = hxq_value.get("value").trim();
			cp_list();
			hx_q.performTransition("stemi_menu2", -1, "slide", null);
		});
		
		on(hxq1, "click", function() {btn2txt("hxq1", "hxq_value", "lchx_q");});
		on(hxq2, "click", function() {btn2txt("hxq2", "hxq_value", "lchx_q");});
		on(hxq3, "click", function() {btn2txt("hxq3", "hxq_value", "lchx_q");});
		on(hxq4, "click", function() {btn2txt("hxq4", "hxq_value", "lchx_q");});
		on(hxq5, "click", function() {btn2txt("hxq5", "hxq_value", "lchx_q");});
		on(hxq6, "click", function() {btn2txt("hxq6", "hxq_value", "lchx_q");});
		on(hxq7, "click", function() {btn2txt("hxq7", "hxq_value", "lchx_q");});
		on(hxq8, "click", function() {btn2txt("hxq8", "hxq_value", "lchx_q");});
		on(hxq9, "click", function() {btn2txt("hxq9", "hxq_value", "lchx_q");});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_r    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_r = reg.byId("hx_r");
		var back_hxr = reg.byId("back_hxr");
		var hxr_value = reg.byId("hxr_value");
		var hxr1 = reg.byId("hxr1");
		var hxr2 = reg.byId("hxr2");
		var hxr3 = reg.byId("hxr3");
		var hxr4 = reg.byId("hxr4");
		var hxr5 = reg.byId("hxr5");
		//////////////////
		//// Events //////
		//////////////////
		on(back_hxr, "click", function() {
			lchx_r = hxr_value.get("value").trim();
			cp_list();
			hx_r.performTransition("stemi_menu2", -1, "slide", null);
		});
		on(hxr1, "click", function() {btn2txt("hxr1", "hxr_value", "lchx_r");});
		on(hxr2, "click", function() {btn2txt("hxr2", "hxr_value", "lchx_r");});
		on(hxr3, "click", function() {btn2txt("hxr3", "hxr_value", "lchx_r");});
		on(hxr4, "click", function() {btn2txt("hxr4", "hxr_value", "lchx_r");});
		on(hxr5, "click", function() {btn2txt("hxr5", "hxr_value", "lchx_r");});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_s    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_s = reg.byId("hx_s");
		var back_hxs = reg.byId("back_hxs");
		var hxs_value = reg.byId("hxs_value");
		var hxs1 = reg.byId("hxs1");
		var hxs2 = reg.byId("hxs2");
		var hxs3 = reg.byId("hxs3");
		var hxs4 = reg.byId("hxs4");
		var hxs5 = reg.byId("hxs5");
		var hxs6 = reg.byId("hxs6");
		var hxs7 = reg.byId("hxs7");
		var hxs8 = reg.byId("hxs8");
		var hxs9 = reg.byId("hxs9");
		var hxs10 = reg.byId("hxs10");
		var hxs11 = reg.byId("hxs11");
		//////////////////
		//// Events //////
		//////////////////
		on(back_hxs, "click", function() {
			lchx_s = hxs_value.get("value").trim();
			cp_list();
			hx_s.performTransition("stemi_menu2", -1, "slide", null);
		});
		
		on(hxs1, "click", function() {btn2txt("hxs1", "hxs_value", "lchx_s");});
		on(hxs2, "click", function() {btn2txt("hxs2", "hxs_value", "lchx_s");});
		on(hxs3, "click", function() {btn2txt("hxs3", "hxs_value", "lchx_s");});
		on(hxs4, "click", function() {btn2txt("hxs4", "hxs_value", "lchx_s");});
		on(hxs5, "click", function() {btn2txt("hxs5", "hxs_value", "lchx_s");});
		on(hxs6, "click", function() {btn2txt("hxs6", "hxs_value", "lchx_s");});
		on(hxs7, "click", function() {btn2txt("hxs7", "hxs_value", "lchx_s");});
		on(hxs8, "click", function() {btn2txt("hxs8", "hxs_value", "lchx_s");});
		on(hxs9, "click", function() {btn2txt("hxs9", "hxs_value", "lchx_s");});
		on(hxs10, "click", function() {btn2txt("hxs10", "hxs_value", "lchx_s");});
		on(hxs11, "click", function() {btn2txt("hxs11", "hxs_value", "lchx_s");});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_t    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_t = reg.byId("hx_t");
		var back_hxt = reg.byId("back_hxt");
		var hxt_value = reg.byId("hxt_value");
		var hxt1 = reg.byId("hxt1");
		var hxt2 = reg.byId("hxt2");
		var hxt3 = reg.byId("hxt3");
		var hxt4 = reg.byId("hxt4");
		var hxt5 = reg.byId("hxt5");
		var hxt6 = reg.byId("hxt6");
		//////////////////
		//// Events //////
		//////////////////
		on(back_hxt, "click", function() {
			cp_list();
			hx_t.performTransition("stemi_menu2", -1, "slide", null);
		});
		
		on(hxt1, "click", function() {btn2txt("hxt1", "hxt_value", "lchx_t");});
		on(hxt2, "click", function() {btn2txt("hxt2", "hxt_value", "lchx_t");});
		on(hxt3, "click", function() {btn2txt("hxt3", "hxt_value", "lchx_t");});
		on(hxt4, "click", function() {btn2txt("hxt4", "hxt_value", "lchx_t");});
		on(hxt5, "click", function() {btn2txt("hxt5", "hxt_value", "lchx_t");});
		on(hxt6, "click", function() {btn2txt("hxt6", "hxt_value", "lchx_t");});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu3    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu3 = reg.byId("stemi_menu3");
		var back_menu3 = reg.byId("back_menu3");
		var investigate = reg.byId("investigate");
		var store_inv = new ifws({data:{items:[]}});
		investigate.store = null;
		investigate.setStore(store_inv);
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu3, "click", function() {
			stemi_menu3.performTransition("stemi_v2", -1, "slide", null);
		});
		
		on(investigate, "click", function() {
			lnrow = selected_row("investigate", 1);
			ekg_value.set("value", lcekg);
			tpt_value.set("value", lctpt);
			if (lnrow == 0) {stemi_menu3.performTransition("menu3_ekg", 1, "slide", null);}
			else {stemi_menu3.performTransition("menu3_tpt", 1, "slide", null);}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu3_ekg    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu3_ekg = reg.byId("menu3_ekg");
		var back_ekg = reg.byId("back_ekg");
		var minus_ekg = reg.byId("minus_ekg");
		var plus_ekg = reg.byId("plus_ekg");
		var dateekg = reg.byId("dateekg");
		var hrekg = reg.byId("hrekg");
		var minekg = reg.byId("minekg");
		var ekg_value = reg.byId("ekg_value");
		var ekg1 = reg.byId("ekg1");
		var ekg2 = reg.byId("ekg2");
		var ekg3 = reg.byId("ekg3");
		var ekg4 = reg.byId("ekg4");
		var ekg5 = reg.byId("ekg5");
		var ekg6 = reg.byId("ekg6");
		var ekg7 = reg.byId("ekg7");
		var ekg8 = reg.byId("ekg8");
		var ekg9 = reg.byId("ekg9");
		var ekg10 = reg.byId("ekg10");
		var ekg11 = reg.byId("ekg11");
		var ekg12 = reg.byId("ekg12");
		var ekg13 = reg.byId("ekg13");
		var ekg14 = reg.byId("ekg14");
		var ekg15 = reg.byId("ekg15");
		var ekg16 = reg.byId("ekg16");
		var ekg17 = reg.byId("ekg17");
		var ekg18 = reg.byId("ekg18");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ekg, "click", function() {
			lcekg = ekg_value.get("value").trim();
			inv_list();
			menu3_ekg.performTransition("stemi_menu3", -1, "slide", null);
		});

		on(dateekg, "click", function() {
			var txt = dateekg.get("value");
			if(txt.trim() == "") {ldekg = new Date();}
			dateekg.set("value", tsdate(ldekg));
			hrekg.focus(true);
		});
		on(minus_ekg, "click", function() {
			var lcdate = dateekg.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldekg.getDate()-1;
			ldekg.setDate(lddate);}
			dateekg.set("value", tsdate(ldekg));
		});
		on(plus_ekg, "click", function() {
			var lcdate = dateekg.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldekg.getDate()+1;
			ldekg.setDate(lddate);}
			dateekg.set("value", tsdate(ldekg));
		});

		on(hrekg, "keyup", function() {
     		lnhrekg = hrekg.get("value");
     		if (lnhrekg > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrekg = lnhrekg.toString();
	     		var lnlength = lchrekg.length;
				if (lnlength == 2 || lchrekg > "2") {
					ldekg.setHours(lnhrekg);
					hrekg.set("value", pad(lchrekg, "00"));
					minekg.focus(true);
				}
			}
		});
		on(minekg, "keyup", function() {
     		lnminekg = minekg.get("value");
     		if (lnminekg > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminekg = lnminekg.toString();
	     		var lnlength = lcminekg.length;
				if (lnlength == 2 || lcminekg > "6" || lcminekg == "6" && lnlength == 1) {
					ldekg.setMinutes(lnminekg);
					minekg.set("value", pad(lcminekg, "00"));
					back_ekg.focus(true);
				}
			}
		});
		
		on(ekg1, "click", function() {btn2txt("ekg1", "ekg_value", "lcekg");});
		on(ekg2, "click", function() {btn2txt("ekg2", "ekg_value", "lcekg");});
		on(ekg3, "click", function() {btn2txt("ekg3", "ekg_value", "lcekg");});
		on(ekg4, "click", function() {btn2txt("ekg4", "ekg_value", "lcekg");});
		on(ekg5, "click", function() {btn2txt("ekg5", "ekg_value", "lcekg");});
		on(ekg6, "click", function() {btn2txt("ekg6", "ekg_value", "lcekg");});
		on(ekg7, "click", function() {btn2txt("ekg7", "ekg_value", "lcekg");});
		on(ekg8, "click", function() {btn2txt("ekg8", "ekg_value", "lcekg");});
		on(ekg9, "click", function() {btn2txt("ekg9", "ekg_value", "lcekg");});
		on(ekg10, "click", function() {btn2txt("ekg10", "ekg_value", "lcekg");});
		on(ekg11, "click", function() {btn2txt("ekg11", "ekg_value", "lcekg");});
		on(ekg12, "click", function() {btn2txt("ekg12", "ekg_value", "lcekg");});
		on(ekg13, "click", function() {btn2txt("ekg13", "ekg_value", "lcekg");});
		on(ekg14, "click", function() {btn2txt("ekg14", "ekg_value", "lcekg");});
		on(ekg15, "click", function() {btn2txt("ekg15", "ekg_value", "lcekg");});
		on(ekg16, "click", function() {btn2txt("ekg16", "ekg_value", "lcekg");});
		on(ekg17, "click", function() {btn2txt("ekg17", "ekg_value", "lcekg");});
		on(ekg18, "click", function() {btn2txt("ekg18", "ekg_value", "lcekg");});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu3_tpt    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu3_tpt = reg.byId("menu3_tpt");
		var back_tpt = reg.byId("back_tpt");
		var minus_tpt = reg.byId("minus_tpt");
		var plus_tpt = reg.byId("plus_tpt");
		var datetpt = reg.byId("datetpt");
		var hrtpt = reg.byId("hrtpt");
		var mintpt = reg.byId("mintpt");
		var tpt_value = reg.byId("tpt_value");
		var tpt1 = reg.byId("tpt1");
		var tpt2 = reg.byId("tpt2");
		var tpt3 = reg.byId("tpt3");
		var tpt4 = reg.byId("tpt4");

		//////////////////
		//// Events //////
		//////////////////
		on(back_tpt, "click", function() {
			lctpt = tpt_value.get("value").trim();
			inv_list();
			menu3_tpt.performTransition("stemi_menu3", -1, "slide", null);
		});

		on(datetpt, "click", function() {
			var txt = datetpt.get("value");
			if(txt.trim() == "") {ldtpt = new Date();}
			datetpt.set("value", tsdate(ldtpt));
			hrtpt.focus(true);
		});
		on(minus_tpt, "click", function() {
			var lcdate = datetpt.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldtpt.getDate()-1;
			ldtpt.setDate(lddate);}
			datetpt.set("value", tsdate(ldtpt));
		});
		on(plus_tpt, "click", function() {
			var lcdate = datetpt.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldtpt.getDate()+1;
			ldtpt.setDate(lddate);}
			datetpt.set("value", tsdate(ldtpt));
		});

		on(hrtpt, "keyup", function() {
     		lnhrtpt = hrtpt.get("value");
     		if (lnhrtpt > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrtpt = lnhrtpt.toString();
	     		var lnlength = lchrtpt.length;
				if (lnlength == 2 || lchrtpt > "2") {
					ldtpt.setHours(lnhrtpt);
					hrtpt.set("value", pad(lchrtpt, "00"));
					mintpt.focus(true);
				}
			}
		});
		on(mintpt, "keyup", function() {
     		lnmintpt = mintpt.get("value");
     		if (lnmintpt > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmintpt = lnmintpt.toString();
	     		var lnlength = lcmintpt.length;
				if (lnlength == 2 || lcmintpt > "6" || lcmintpt == "6" && lnlength == 1) {
					ldtpt.setMinutes(lnmintpt);
					mintpt.set("value", pad(lcmintpt, "00"));
					back_tpt.focus(true);
				}
			}
		});

		on(tpt1, "click", function() {btn2txt("tpt1", "tpt_value", "lctpt");});
		on(tpt2, "click", function() {btn2txt("tpt2", "tpt_value", "lctpt");});
		on(tpt3, "click", function() {btn2txt("tpt3", "tpt_value", "lctpt");});
		on(tpt4, "click", function() {btn2txt("tpt4", "tpt_value", "lctpt");});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu4    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu4 = reg.byId("stemi_menu4");
		var back_menu4 = reg.byId("back_menu4");
		var treatment = reg.byId("treatment");
		var store_rx = new ifws({data:{items:[]}});
		treatment.store = null;
		treatment.setStore(store_rx);
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu4, "click", function() {
			stemi_menu4.performTransition("stemi_v2", -1, "slide", null);
		});
		on(treatment, "click", function() {
			stemi_menu4.performTransition("menu4_dt", 1, "slide", null);
//			lnrow = selected_row("treatment", 1);
//			if (lnrow == 0) {stemi_menu3.performTransition("000", 1, "slide", null);}
//			else if (lnrow == 1) {stemi_menu3.performTransition("111", 1, "slide", null);}
//			else if (lnrow == 2) {stemi_menu3.performTransition("222", 1, "slide", null);}
//			else if (lnrow == 3) {stemi_menu3.performTransition("333", 1, "slide", null);}
//			else if (lnrow == 4) {stemi_menu3.performTransition("444", 1, "slide", null);}
//			else {stemi_menu3.performTransition("555", 1, "slide", null);}
		});
		
		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu4_dt    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu4_dt = reg.byId("menu4_dt");
		var back_4dt = reg.byId("back_4dt");

		var minus_iv = reg.byId("minus_iv");
		var plus_iv = reg.byId("plus_iv");
		var dateiv = reg.byId("dateiv");
		var hriv = reg.byId("hriv");
		var miniv = reg.byId("miniv");

		var minus_o2 = reg.byId("minus_o2");
		var plus_o2 = reg.byId("plus_o2");
		var dateo2 = reg.byId("dateo2");
		var hro2 = reg.byId("hro2");
		var mino2 = reg.byId("mino2");

		var minus_asa = reg.byId("minus_asa");
		var plus_asa = reg.byId("plus_asa");
		var dateasa = reg.byId("dateasa");
		var hrasa = reg.byId("hrasa");
		var minasa = reg.byId("minasa");

		var minus_isd = reg.byId("minus_isd");
		var plus_isd = reg.byId("plus_isd");
		var dateisd = reg.byId("dateisd");
		var hrisd = reg.byId("hrisd");
		var minisd = reg.byId("minisd");

		var minus_pvx = reg.byId("minus_pvx");
		var plus_pvx = reg.byId("plus_pvx");
		var datepvx = reg.byId("datepvx");
		var hrpvx = reg.byId("hrpvx");
		var minpvx = reg.byId("minpvx");

		var minus_mp = reg.byId("minus_mp");
		var plus_mp = reg.byId("plus_mp");
		var datemp = reg.byId("datemp");
		var hrmp = reg.byId("hrmp");
		var minmp = reg.byId("minmp");
		//////////////////
		//// Events //////
		//////////////////
		on(back_4dt, "click", function() {
			rx_list();
			menu4_dt.performTransition("stemi_menu4", -1, "slide", null);
		});

		on(dateiv, "click", function() {
			var txt = dateiv.get("value");
			ldiv = new Date();
			dateiv.set("value", tsdate(ldiv));
			hriv.focus(true);
		});
		on(minus_iv, "click", function() {
			var lcdate = dateiv.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldiv.getDate()-1;
			ldiv.setDate(lddate);}
			dateiv.set("value", tsdate(ldiv));
		});
		on(plus_iv, "click", function() {
			var lcdate = dateiv.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldiv.getDate()+1;
			ldiv.setDate(lddate);}
			dateiv.set("value", tsdate(ldiv));
		});

		on(hriv, "keyup", function() {
     		lnhriv = hriv.get("value");
     		if (lnhriv > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchriv = lnhriv.toString();
	     		var lnlength = lchriv.length;
				if (lnlength == 2 || lchriv > "2") {
					ldiv.setHours(lnhriv);
					hriv.set("value", pad(lchriv, "00"));
					miniv.focus(true);
				}
			}
		});
		on(miniv, "keyup", function() {
     		lnminiv = miniv.get("value");
     		if (lnminiv > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminiv = lnminiv.toString();
	     		var lnlength = lcminiv.length;
				if (lnlength == 2 || lcminiv > "6" || lcminiv == "6" && lnlength == 1) {
					ldiv.setMinutes(lnminiv);
					miniv.set("value", pad(lcminiv, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////

		on(dateo2, "click", function() {
			var txt = dateo2.get("value");
			ldo2 = new Date();
			dateo2.set("value", tsdate(ldo2));
			hro2.focus(true);
		});
		on(minus_o2, "click", function() {
			var lcdate = dateo2.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldo2.getDate()-1;
			ldo2.setDate(lddate);}
			dateo2.set("value", tsdate(ldo2));
		});
		on(plus_o2, "click", function() {
			var lcdate = dateo2.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldo2.getDate()+1;
			ldo2.setDate(lddate);}
			dateo2.set("value", tsdate(ldo2));
		});

		on(hro2, "keyup", function() {
     		lnhro2 = hro2.get("value");
     		if (lnhro2 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchro2 = lnhro2.toString();
	     		var lnlength = lchro2.length;
				if (lnlength == 2 || lchro2 > "2") {
					ldo2.setHours(lnhro2);
					hro2.set("value", pad(lchro2, "00"));
					mino2.focus(true);
				}
			}
		});
		on(mino2, "keyup", function() {
     		lnmino2 = mino2.get("value");
     		if (lnmino2 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmino2 = lnmino2.toString();
	     		var lnlength = lcmino2.length;
				if (lnlength == 2 || lcmino2 > "6" || lcmino2 == "6" && lnlength == 1) {
					ldo2.setMinutes(lnmino2);
					mino2.set("value", pad(lcmino2, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////

		on(dateasa, "click", function() {
			var txt = dateasa.get("value");
			ldasa = new Date();
			dateasa.set("value", tsdate(ldasa));
			hrasa.focus(true);
		});
		on(minus_asa, "click", function() {
			var lcdate = dateasa.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldasa.getDate()-1;
			ldasa.setDate(lddate);}
			dateasa.set("value", tsdate(ldasa));
		});
		on(plus_asa, "click", function() {
			var lcdate = dateasa.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldasa.getDate()+1;
			ldasa.setDate(lddate);}
			dateasa.set("value", tsdate(ldasa));
		});

		on(hrasa, "keyup", function() {
     		lnhrasa = hrasa.get("value");
     		if (lnhrasa > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrasa = lnhrasa.toString();
	     		var lnlength = lchrasa.length;
				if (lnlength == 2 || lchrasa > "2") {
					ldasa.setHours(lnhrasa);
					hrasa.set("value", pad(lchrasa, "00"));
					minasa.focus(true);
				}
			}
		});
		on(minasa, "keyup", function() {
     		lnminasa = minasa.get("value");
     		if (lnminasa > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminasa = lnminasa.toString();
	     		var lnlength = lcminasa.length;
				if (lnlength == 2 || lcminasa > "6" || lcminasa == "6" && lnlength == 1) {
					ldasa.setMinutes(lnminasa);
					minasa.set("value", pad(lcminasa, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		

		on(dateisd, "click", function() {
			var txt = dateisd.get("value");
			ldisd = new Date();
			dateisd.set("value", tsdate(ldisd));
			hrisd.focus(true);
		});
		on(minus_isd, "click", function() {
			var lcdate = dateisd.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldisd.getDate()-1;
			ldisd.setDate(lddate);}
			dateisd.set("value", tsdate(ldisd));
		});
		on(plus_isd, "click", function() {
			var lcdate = dateisd.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldisd.getDate()+1;
			ldisd.setDate(lddate);}
			dateisd.set("value", tsdate(ldisd));
		});

		on(hrisd, "keyup", function() {
     		lnhrisd = hrisd.get("value");
     		if (lnhrisd > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrisd = lnhrisd.toString();
	     		var lnlength = lchrisd.length;
				if (lnlength == 2 || lchrisd > "2") {
					ldisd.setHours(lnhrisd);
					hrisd.set("value", pad(lchrisd, "00"));
					minisd.focus(true);
				}
			}
		});
		on(minisd, "keyup", function() {
     		lnminisd = minisd.get("value");
     		if (lnminisd > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminisd = lnminisd.toString();
	     		var lnlength = lcminisd.length;
				if (lnlength == 2 || lcminisd > "6" || lcminisd == "6" && lnlength == 1) {
					ldisd.setMinutes(lnminisd);
					minisd.set("value", pad(lcminisd, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(datepvx, "click", function() {
			var txt = datepvx.get("value");
			ldpvx = new Date();
			datepvx.set("value", tsdate(ldpvx));
			hrpvx.focus(true);
		});
		on(minus_pvx, "click", function() {
			var lcdate = datepvx.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldpvx.getDate()-1;
			ldpvx.setDate(lddate);}
			datepvx.set("value", tsdate(ldpvx));
		});
		on(plus_pvx, "click", function() {
			var lcdate = datepvx.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldpvx.getDate()+1;
			ldpvx.setDate(lddate);}
			datepvx.set("value", tsdate(ldpvx));
		});

		on(hrpvx, "keyup", function() {
     		lnhrpvx = hrpvx.get("value");
     		if (lnhrpvx > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrpvx = lnhrpvx.toString();
	     		var lnlength = lchrpvx.length;
				if (lnlength == 2 || lchrpvx > "2") {
					ldpvx.setHours(lnhrpvx);
					hrpvx.set("value", pad(lchrpvx, "00"));
					minpvx.focus(true);
				}
			}
		});
		on(minpvx, "keyup", function() {
     		lnminpvx = minpvx.get("value");
     		if (lnminpvx > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminpvx = lnminpvx.toString();
	     		var lnlength = lcminpvx.length;
				if (lnlength == 2 || lcminpvx > "6" || lcminpvx == "6" && lnlength == 1) {
					ldpvx.setMinutes(lnminpvx);
					minpvx.set("value", pad(lcminpvx, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(datemp, "click", function() {
			var txt = datemp.get("value");
			ldmp = new Date();
			datemp.set("value", tsdate(ldmp));
			hrmp.focus(true);
		});
		on(minus_mp, "click", function() {
			var lcdate = datemp.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldmp.getDate()-1;
			ldmp.setDate(lddate);}
			datemp.set("value", tsdate(ldmp));
		});
		on(plus_mp, "click", function() {
			var lcdate = datemp.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldmp.getDate()+1;
			ldmp.setDate(lddate);}
			datemp.set("value", tsdate(ldmp));
		});

		on(hrmp, "keyup", function() {
     		lnhrmp = hrmp.get("value");
     		if (lnhrmp > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrmp = lnhrmp.toString();
	     		var lnlength = lchrmp.length;
				if (lnlength == 2 || lchrmp > "2") {
					ldmp.setHours(lnhrmp);
					hrmp.set("value", pad(lchrmp, "00"));
					minmp.focus(true);
				}
			}
		});
		on(minmp, "keyup", function() {
     		lnminmp = minmp.get("value");
     		if (lnminmp > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminmp = lnminmp.toString();
	     		var lnlength = lcminmp.length;
				if (lnlength == 2 || lcminmp > "6" || lcminmp == "6" && lnlength == 1) {
					ldmp.setMinutes(lnminmp);
					minmp.set("value", pad(lcminmp, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu5    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu5 = reg.byId("stemi_menu5");
		var back_menu5 = reg.byId("back_menu5");
		var stemi_yes = reg.byId("stemi_yes");
		var stemi_no = reg.byId("stemi_no");
		var nosk1 = reg.byId("nosk1");
		var nosk2 = reg.byId("nosk2");
		var nosk3 = reg.byId("nosk3");
		// sk date
		var minus_sk = reg.byId("minus_sk");
		var plus_sk = reg.byId("plus_sk");
		var datesk = reg.byId("datesk");
		var hrsk = reg.byId("hrsk");
		var minsk = reg.byId("minsk");
		//refer date
		var minus_rf = reg.byId("minus_rf");
		var plus_rf = reg.byId("plus_rf");
		var daterf = reg.byId("daterf");
		var hrrf = reg.byId("hrrf");
		var minrf = reg.byId("minrf");
		// Refer to
		var rf_er = reg.byId("rf_er");
		var rf_ccu = reg.byId("rf_ccu");
		var rf_lab = reg.byId("rf_lab");
		// No SK
		var nosk1 = reg.byId("nosk1");
		var nosk2 = reg.byId("nosk2");
		var nosk3 = reg.byId("nosk3");
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu5, "click", function() {
			stemi_menu5.performTransition("stemi_v2", -1, "slide", null);
		});
		
		on(stemi_yes, "click", function() {
			lcheck = stemi_yes.get("checked");
			if (lcheck == true) {
				lnstemi = 1;
				stemi_no.set("checked", false);
			} else {
				lnstemi = 0;
				stemi_no.set("checked", true);
				nosk1.set("checked", false);
				nosk2.set("checked", false);
				nosk3.set("checked", false);
				lcnosk = "";
			}
		});
		on(stemi_no, "click", function() {
			lcheck = stemi_no.get("checked");
			if (lcheck == true) {
				lnstemi = 0;
				lnnosk = 0;
				lnreferto = 1;
				ldsk = "";
				datesk.set("value", "");
				hrsk.set("value", "");
				minsk.set("value", "");
				stemi_yes.set("checked", false);
				nosk1.set("checked", false);
				nosk2.set("checked", false);
				nosk3.set("checked", false);
				rf_er.set("checked", true);
				rf_ccu.set("checked", false);
				rf_lab.set("checked", false);
			} else {
				lnstemi = 1;
				stemi_yes.set("checked", true);
			}
		});
		
		on(datesk, "click", function() {
			var txt = datesk.get("value");
			if(txt.trim() == "") {ldsk = new Date();
				hrsk.focus(true);}
			datesk.set("value", tsdate(ldsk));
		});
		on(minus_sk, "click", function() {
			var lcdate = datesk.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldsk.getDate()-1;
			ldsk.setDate(lddate);}
			datesk.set("value", tsdate(ldsk));
		});
		on(plus_sk, "click", function() {
			var lcdate = datesk.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldsk.getDate()+1;
			ldsk.setDate(lddate);}
			datesk.set("value", tsdate(ldsk));
		});

		on(hrsk, "keyup", function() {
     		lnhrsk = hrsk.get("value");
     		if (lnhrsk > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrsk = lnhrsk.toString();
	     		var lnlength = lchrsk.length;
				if (lnlength == 2 || lchrsk > "2") {
					ldsk.setHours(lnhrsk);
					hrsk.set("value", pad(lchrsk, "00"));
					minsk.focus(true);
				}
			}
		});
		on(minsk, "keyup", function() {
     		lnminsk = minsk.get("value");
     		if (lnminsk > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminsk = lnminsk.toString();
	     		var lnlength = lcminsk.length;
				if (lnlength == 2 || lcminsk > "6" || (lcminsk == "6" && lnlength == 1)){
					ldsk.setMinutes(lnminsk);
					minsk.set("value", pad(lcminsk, "00"));
					lnnosk = 0;
					nosk1.set("checked", false);
					nosk2.set("checked", false);
					nosk3.set("checked", false);
					back_menu5.focus(true);
				}
			}
		});
		
		on(daterf, "click", function() {
			var txt = daterf.get("value");
			if(txt.trim() == "") {ldrf = new Date();
				hrrf.focus(true);}
			daterf.set("value", tsdate(ldrf));
		});
		on(minus_rf, "click", function() {
			var lcdate = daterf.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldrf.getDate()-1;
			ldrf.setDate(lddate);}
			daterf.set("value", tsdate(ldrf));
		});
		on(plus_rf, "click", function() {
			var lcdate = daterf.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldrf.getDate()+1;
			ldrf.setDate(lddate);}
			daterf.set("value", tsdate(ldrf));
		});

		on(hrrf, "keyup", function() {
     		lnhrrf = hrrf.get("value");
     		if (lnhrrf > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrrf = lnhrrf.toString();
	     		var lnlength = lchrrf.length;
				if (lnlength == 2 || lchrrf > "2") {
					ldrf.setHours(lnhrrf);
					hrrf.set("value", pad(lchrrf, "00"));
					minrf.focus(true);
				}
			}
		});
		on(minrf, "keyup", function() {
     		lnminrf = minrf.get("value");
     		if (lnminrf > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminrf = lnminrf.toString();
	     		var lnlength = lcminrf.length;
				if (lnlength == 2 || lcminrf > "6" || (lcminrf == "6" && lnlength == 1)) {
					ldrf.setMinutes(lnminrf);
					minrf.set("value", pad(lcminrf, "00"));
					back_menu5.focus(true);
				}
			}
		});
		
		on(rf_er, "click", function() {
			if (rf_er.get("checked")==true) {
				lnreferto = 1;
				rf_ccu.set("checked", false);
				rf_lab.set("checked", false);
			}
		});
		on(rf_ccu, "click", function() {
			if (rf_ccu.get("checked")==true) {
				lnreferto = 2;
				rf_er.set("checked", false);
				rf_lab.set("checked", false);
			}
		});
		on(rf_lab, "click", function() {
			if (rf_lab.get("checked")==true) {
				lnreferto = 3;
				rf_ccu.set("checked", false);
				rf_er.set("checked", false);
			}
		});
		
		on(nosk1, "click", function() {
			if (nosk1.get("checked") == true) {
				lnnosk = 1;
				nosk2.set("checked", false);
				nosk3.set("checked", false);
				// sk
				datesk.set("value", "");
				hrsk.set("value", "");
				minsk.set("value", "");
				ldsk = "";
			}
		});
		on(nosk2, "click", function() {
			if (nosk2.get("checked") == true) {
				lnnosk = 2;
				nosk1.set("checked", false);
				nosk3.set("checked", false);
				// sk
				datesk.set("value", "");
				hrsk.set("value", "");
				minsk.set("value", "");
				ldsk = "";
			}
		});
		on(nosk3, "click", function() {
			if (nosk3.get("checked") == true) {
				lnnosk = 3;
				nosk2.set("checked", false);
				nosk1.set("checked", false);
				// sk
				datesk.set("value", "");
				hrsk.set("value", "");
				minsk.set("value", "");
				ldsk = "";
			}
		});
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});