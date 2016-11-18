//////////////////////////
//// Public Variables ////
//////////////////////////
var spinner = {};
var gcsource_view = "";
var gcampur_name = "";
var gcampur_id = "";
var ceomenu = "";
var cimenu = "";

var cdate1 = "";
var cdate2 = "";
var source_view = "";
var gcheader = "";
var lclevel = "1";
var lchosp_name = "";
var lcpps = "";

// HI
var gctitle = "";
var lcgrade = "";

// date Return จาก select_dt
var lddate = new Date();
// code ที่ run หลังจากเลือก select_dt
var date2code = "";
// Parameter ที่ต้องการจาก select_dt
var ldparameter = "";

// ช่วงเวลาประมวลผล
var lddate1 = new Date();
var lddate2 = new Date();
 
//// General ///////////////


//// Specific //////////

///////////////////////////////////////////////////////////////////////////////////////

/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */

require([
	"spin.js",
	"dojo/_base/window",
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
 ], function(Spinner, win, popup, mitem, menu, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		function hi_list() {
			var hi_store = new ifws({data:{items:[]}});
			hi_menu.store = null;
			hi_menu.setStore(hi_store);
			var list_add = hi_menu.store.newItem({label: "<", rightText : "กลับ ข้อมูลสำหรับผู้บริหาร", value : "8"});
			var list_add = hi_menu.store.newItem({label: "ช่วงเวลาที่สำรวจ", value : "0", header : true});
			var list_add = hi_menu.store.newItem({label: "เริ่มจากวันที่", rightText: tsdate(lddate1) + " >", value : "1"});
			var list_add = hi_menu.store.newItem({label: "ถึงวันที่", rightText : tsdate(lddate2) + " >", value : "2"});
			var list_add = hi_menu.store.newItem({label: "ประมวลผล HI", value : "3", header : true});
			var list_add = hi_menu.store.newItem({label: "HI ทั้งจังหวัด", rightText: " >", value : "4"});
			var list_add = hi_menu.store.newItem({label: "HI รายอำเภอ", rightText : " >", value : "5"});
			var list_add = hi_menu.store.newItem({label: "HI Coverage (ความครอบคลุม) ", rightText: " >", value : "6"});
		}
		
		function ci_list() {
			var ci_store = new ifws({data:{items:[]}});
			ci_menu.store = null;
			ci_menu.setStore(ci_store);
			var list_add = ci_menu.store.newItem({label: "<", rightText : "กลับ ข้อมูลสำหรับผู้บริหาร", value : "8"});
			var list_add = ci_menu.store.newItem({label: "ช่วงเวลาที่สำรวจ", value : "0", header : true});
			var list_add = ci_menu.store.newItem({label: "เริ่มจากวันที่", rightText: tsdate(lddate1) + " >", value : "1"});
			var list_add = ci_menu.store.newItem({label: "ถึงวันที่", rightText : tsdate(lddate2) + " >", value : "2"});
			var list_add = ci_menu.store.newItem({label: "ประมวลผล CI", value : "3", header : true});
			var list_add = ci_menu.store.newItem({label: "CI ทั้งจังหวัด", rightText: " >", value : "4"});
			var list_add = ci_menu.store.newItem({label: "CI รายอำเภอ", rightText : " >", value : "5"});
			var list_add = ci_menu.store.newItem({label: "CI Coverage (ความครอบคลุม) ", rightText: " >", value : "6"});
		}
		
		function ci_show() {
			var a, b, c, d, e, f, g, h, i, j, k, l;
			a = "";
			b = "";
			c = "";
			d = "";
			e = "";
			f = "";
			g = "";
			h = "";
			i = "";
			j = "";
			k = "";
			l = "";
			if (cimenu == "4") {var cphp = "ci_score_pv.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&grade=0";}	
			else if (cimenu == "5") {var cphp = "ci_score_pv.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&grade=0&town_id=" + gcampur_id.substr(0, 4);}
			var ci_obj = php2obj(cphp, 1);
			var y = ci_obj.length;
			var x;
			for(x = 0; x < y; x++){
	       		var item = ci_obj[x];
	       		var ctype = item.ci_type;
	       		// วัด 001
	       		if (ctype == "001") {
	       			a = item.nci0;
	       			if (a=="") {a="0";}
	       			b = item.nci1;
	       			if (b=="") {b="0";}
	       		}
	       		// โรงเรียน 002
	       		else if (ctype == "002") {
	       			c = item.nci0;
	       			if (c=="") {c="0";}
	       			d = item.nci1;
	       			if (d=="") {d="0";}
	       		}
	       		// ศูนย์เด็ก 003
	       		else if (ctype == "003") {
	       			e = item.nci0;
	       			if (e=="") {e="0";}
	       			f = item.nci1;
	       			if (f=="") {f="0";}
	       		}
	       		// อบต 004
	       		else if (ctype == "004") {
	       			g = item.nci0;
	       			if (g=="") {g="0";}
	       			h = item.nci1;
	       			if (h=="") {h="0";}
	       		}
	       		// หน่วยงานอื่น 005
	       		else if (ctype == "005") {
	       			i = item.nci0;
	       			if (i=="") {i="0";}
	       			j = item.nci1;
	       			if (j=="") {j="0";}
	       		}
    		}
    		k = parseInt(a) + parseInt(c) + parseInt(e) + parseInt(g) + parseInt(i);
    		l = parseInt(b) + parseInt(d) + parseInt(f) + parseInt(h) + parseInt(j);
			var cp_store = new ifws({data:{items:[]}});
			ci_pv_list.store = null;
			ci_pv_list.setStore(cp_store);
			var list_add = ci_pv_list.store.newItem({label: "ค่า CI รวมทุกประเภท", value : "0", header : true});
			var list_add = ci_pv_list.store.newItem({label: "CI = 0", rightText: k + " >", ctype: "2", cgrade: "0", value : "1"});
			var list_add = ci_pv_list.store.newItem({label: "CI > 0", rightText: l + " >", ctype: "1", cgrade: "0", value : "2"});
			var list_add = ci_pv_list.store.newItem({label: "ค่า CI วัด", value : "3", header : true});
			var list_add = ci_pv_list.store.newItem({label: "วัด CI = 0", rightText: a + " >", cgrade: "0", ctype : "001", value : "4"});
			var list_add = ci_pv_list.store.newItem({label: "วัด CI > 0", rightText: b + " >", cgrade: "1", ctype : "001", value : "5"});
			var list_add = ci_pv_list.store.newItem({label: "ค่า CI โรงเรียน", value : "6", header : true});
			var list_add = ci_pv_list.store.newItem({label: "โรงเรียน CI = 0", rightText: c + " >", cgrade: "0", ctype : "002", value : "7"});
			var list_add = ci_pv_list.store.newItem({label: "โรงเรียน CI > 0", rightText: d + " >", cgrade: "1", ctype : "002", value : "8"});
			var list_add = ci_pv_list.store.newItem({label: "ค่า CI ศูนย์เด็กเล็ก", value : "9", header : true});
			var list_add = ci_pv_list.store.newItem({label: "ศูนย์เด็ก CI = 0", rightText: e + " >", cgrade: "0", ctype : "003", value : "10"});
			var list_add = ci_pv_list.store.newItem({label: "ศูนย์เด็ก CI > 0", rightText: f + " >", cgrade: "1", ctype : "003", value : "11"});
			var list_add = ci_pv_list.store.newItem({label: "ค่า CI อบต.", value : "12", header : true});
			var list_add = ci_pv_list.store.newItem({label: "อบต. CI = 0", rightText: g + " >", cgrade: "0", ctype : "004", value : "13"});
			var list_add = ci_pv_list.store.newItem({label: "อบต. CI > 0", rightText: h + " >", cgrade: "1", ctype : "004", value : "14"});
			var list_add = ci_pv_list.store.newItem({label: "ค่า CI หน่วยงานอื่นๆ", value : "15", header : true});
			var list_add = ci_pv_list.store.newItem({label: "หน่วยงานอื่น CI = 0", rightText: i + " >", cgrade: "0", ctype : "005", value : "16"});
			var list_add = ci_pv_list.store.newItem({label: "หน่วยงานอื่น CI > 0", rightText: j + " >", cgrade: "1", ctype : "005", value : "17"});
			spinner.stop();
		}
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
		//var standby = new Standby({target: "basic2"});
		//document.body.appendChild(standby.domNode);
		//standby.startup();
		//standby.show();
		spinner = new Spinner().spin();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// CEO Main       ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ceo_main = reg.byId("ceo_main");
		var ceo_menu = reg.byId("ceo_menu");
		var ceo_store = new ifws({data:{items:[]}});
		ceo_menu.store = null;
		ceo_menu.setStore(ceo_store);
		var list_add = ceo_menu.store.newItem({label: "<", rightText: "กลับเมนูหลัก", value : "6"});
		var list_add = ceo_menu.store.newItem({label: "กรุณาเลือกรายการ", value : "0", header : true});
		var list_add = ceo_menu.store.newItem({label: "ADL & Brain Evaluation", icon : "person.jpg", rightText: " >", value : "1", variableHeight: true});
		var list_add = ceo_menu.store.newItem({label: "PPS (Palliative Performance Scale)", icon : "palliative.jpg", rightText : " >", value : "2", variableHeight: true});
		var list_add = ceo_menu.store.newItem({label: "Household Index HI", icon : "hi.jpg", rightText : " >", value : "3"});
		var list_add = ceo_menu.store.newItem({label: "Container Index CI", icon : "ci.jpg", rightText : " >", value : "4"});
		
		
		//////////////////
		//// Events //////
		//////////////////
		on(ceo_menu, "click", function() {
			var obj = selected_row("ceo_menu");
			ceomenu = obj.value;
			if (ceomenu == "1") {
				ap_header.set("label", "ผล ADL & Brain Evaluation");
				ceo_main.performTransition("adl_main", 1, "slide", null);}
			else if (ceomenu == "2") {
				ap_header.set("label", "ผล Palliative Performance Scale");
				ceo_main.performTransition("adl_main", 1, "slide", null);}
			else if (ceomenu == "3") {
				ceo_main.performTransition("hi_main", 1, "slide", null);}
			else if (ceomenu == "4") {
				ceo_main.performTransition("ci_main", 1, "slide", null);}
			else if (ceomenu == "6") {window.location.href = "http://m30.phoubon.in.th/index.html";}
		});
		//////////////////
///////////////////////////////
//// ADL Main    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var adl_main = reg.byId("adl_main");
		var ap_header = reg.byId("ap_header");
		var adl_pv = reg.byId("adl_pv");
		var adlpv_store = new ifws({data:{items:[]}});
		adl_pv.store = null;
		adl_pv.setStore(adlpv_store);
		var list_add = adl_pv.store.newItem({label: "<", rightText: "กลับ ข้อมูลสำหรับผู้บริหาร", value : "0"});
		var list_add = adl_pv.store.newItem({label: "รวมทั้งจังหวัด", rightText: " >", value : "1"});
		var list_add = adl_pv.store.newItem({label: "แยกรายอำเภอ", value : "2", header : true});
		var adl_ampur = reg.byId("adl_ampur");
		list("adl_ampur", "ampur_list.php");
		//var xyz = list1("adl_ampur", "ampur_list.php");
		//alert (Xyz);
		//debugger;
		
		///////////////////////////////
		//////////////////
		//// Events //////
		//////////////////
		on(adl_pv, "click", function() {
			var cobj = selected_row("adl_pv");
			lcselect = cobj.value;
			var lcback = "";
			var lcnext = "";
			if (lcselect == "0") {adl_main.performTransition("ceo_main", -1, "slide", null);}
			else if (lcselect == "1") {
				var x_store = new ifws({data:{items:[]}});
				back_adl_brain.store = null;
				back_adl_brain.setStore(x_store);
				lclevel = "1";
				adl_header.set("label", "สรุปรวมทั้งจังหวัด");
				if (ceomenu == "1") { 
					lcback = "กลับ เมนูเลือก ADL";
					lcnext = "สรุปคะแนน ADL & Brain รวมทั้งจังหวัด";
					list("ab_score", "adl_brain_score.php?level=1"); }
				else if (ceomenu == "2") { 
					lcback = "กลับ เมนูเลือก PPS";
					lcnext = "สรุปคะแนน PPS รวมทั้งจังหวัด";
					list("ab_score", "pps_frq.php"); }
				// ปรับ back_adl_brain
				var list_add = back_adl_brain.store.newItem({label: "<", rightText: lcback, value : "1"});
				var list_add = back_adl_brain.store.newItem({label: lcnext, value : "2", header : true});
				
				adl_main.performTransition("adl_brain", 1, "slide", null);
			}
		});
		
		on(adl_ampur, "click", function() {
			var obj = selected_row("adl_ampur");
			var lchosp = obj.hosp_id;
			lchosp_name = obj.label;
			var lcampur = obj.ampur_id;
			lclevel = "2";
			var lcback = "";
			var lcnext = "";
			if (ceomenu == "1") {
				adl1_header.set("label", "ADL เฉพาะอำเภอ " + lchosp_name);
				list("ab_score1", "adl_brain_score.php?level=1&hosp_id=" + lchosp);
				lcback= "กลับ เมนู ADL & Brain";
				lcnext = "สรุปคะแนน ADL & Brain Evaluation";}
			else if (ceomenu == "2") {
				adl1_header.set("label", "PPS เฉพาะอำเภอ " + lchosp_name);
				list("ab_score1", "pps_frq.php?town=" + lcampur);
				lcback= "กลับ เมนู PPS";
				lcnext = "สรุปคะแนน PPS";}
			var x_store = new ifws({data:{items:[]}});
			back_adl_brain1.store = null;
			back_adl_brain1.setStore(x_store);
			var list_add = back_adl_brain1.store.newItem({label: "<", rightText: lcback, value : "1"});
			var list_add = back_adl_brain1.store.newItem({label: lcnext, value : "0", header : true});
				
			adl_main.performTransition("adl_brain1", 1, "slide", null);
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Adl_Brain    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var adl_brain = reg.byId("adl_brain");
		var adl_header = reg.byId("adl_header");
		var back_adl_brain = reg.byId("back_adl_brain");
		var ba_store = new ifws({data:{items:[]}});
		back_adl_brain.store = null;
		back_adl_brain.setStore(ba_store);
		var list_add = back_adl_brain.store.newItem({label: "<", rightText: "กลับ สรุปคะแนน ADL & Brain", value : "1"});
		var list_add = back_adl_brain.store.newItem({label: "สรุปคะแนน ADL & Brain Evaluation", value : "0", header : true});
		var ab_score = reg.byId("ab_score");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_adl_brain, "click", function() {
			var cobj = selected_row("back_adl_brain");
			if (cobj.value == 1) {	
				adl_brain.performTransition("adl_main", -1, "slide", null);
			} else {
				gcsource_view = "adl_brain";
				graph("ab_score", "amount", "graph_box", "Pie");
				adl_brain.performTransition("view_graph", 1, "slide");
			}
		});
		
		on(ab_score, "click", function() {
			var obj = selected_row("ab_score");
			var lclevel = obj.label;
			var lcnext = "";
			var lcnext2 = "";
			if (ceomenu == "1") {
				var lcgrade = obj.grade;
				aba_header.set("label", "สรุปคะแนน ADL & Brain " + lclevel);
				list("ab_score_ampur", "adl_brain_score.php?level=2&grade=" + lcgrade);
				lcnext = "สรุปคะแนน ADL & Brain แยกรายตำบล";
				lcnext2 = "สรุปคะแนน ADL & Brain แยกรายอำเภอ";}
			else if (ceomenu == "2") {
				lcpps = obj.npps.toString();
				aba_header.set("label", "สรุปคะแนน " + lclevel);
				list("ab_score_ampur", "pps_score.php?npps=" + lcpps);
				lcnext = "สรุปคะแนน PPS แยกรายตำบล";
				lcnext2 = "สรุปคะแนน PPS แยกรายอำเภอ";}
			var abt_store = new ifws({data:{items:[]}});
			back_ab_tumbon.store = null;
			back_ab_tumbon.setStore(abt_store);
			var list_add = back_ab_tumbon.store.newItem({label: "<", rightText: "กลับ แยกรายอำเภอ", value : "1"});
			var list_add = back_ab_tumbon.store.newItem({label: lcnext, value : "2", header : true});
			
			// ปรับ back ab_ampur
			var aba_store = new ifws({data:{items:[]}});
			back_ab_ampur.store = null;
			back_ab_ampur.setStore(aba_store);
			if (lclevel == "1") {var cback = "กลับ สรุปรวมทั้งจังหวัด";}
			else {var cback = "กลับ สรุปเฉพาะอำเภอ";}
			var list_add = back_ab_ampur.store.newItem({label: "<", rightText: cback, value : "1"});
			var list_add = back_ab_ampur.store.newItem({label: lcnext2, value : "2", header : true});
			
			adl_brain.performTransition("ab_ampur", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Adl_Brain1    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var adl_brain1 = reg.byId("adl_brain1");
		var adl1_header = reg.byId("adl1_header");
		var back_adl_brain1 = reg.byId("back_adl_brain1");
		var ab_score1 = reg.byId("ab_score1");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_adl_brain1, "click", function() {
			var cobj = selected_row("back_adl_brain1");
			if (cobj.value == 1) {	adl_brain1.performTransition("adl_main", -1, "slide", null);}
		});
		
		on(ab_score1, "click", function() {
			var obj = selected_row("ab_score1");
			var lcampur = obj.ampur_id;
		   	var lchosp = obj.hosp_id;
		   	var lcnext = "";
		   	var lcphp = "";
		   	lclevel = "2";
		   	if (ceomenu == "1") {
		   		var lcgrade = obj.grade;
		   		lcphp = "adl_brain_score.php?level=3&grade=" + lcgrade + "&hosp_id=" + lchosp;
		   		abt_header.set("label", "ADL ระดับ " + lcgrade + " เฉพาะอำเภอ" + lchosp_name);
		   		lcnext = "สรุปคะแนน ADL & Brain แยกรายตำบล";
		   	}
		   	else if (ceomenu == "2") {
		   		lcpps = obj.npps.toString();
		   		abt_header.set("label", "PPS ระดับ " + lcpps + "% เฉพาะอำเภอ" + lchosp_name);
		   		lcnext = "สรุปคะแนน PPS แยกรายตำบล";
		   		lcphp = "pps_score.php?npps=" + lcpps + "&town=" + lcampur;
		   	}
		   	list("ab_score_tumbon", lcphp);
		   	var abt_store = new ifws({data:{items:[]}});
			back_ab_tumbon.store = null;
			back_ab_tumbon.setStore(abt_store);
			var list_add = back_ab_tumbon.store.newItem({label: "<", rightText: "กลับ เฉพาะอำเภอ" + lchosp_name, value : "1"});
			var list_add = back_ab_tumbon.store.newItem({label: lcnext, value : "2", header : true});
		   	
			adl_brain1.performTransition("ab_tumbon", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Ab_ampur    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ab_ampur = reg.byId("ab_ampur");
		var aba_header = reg.byId("aba_header");
		var back_ab_ampur = reg.byId("back_ab_ampur");
		var ab_score_ampur = reg.byId("ab_score_ampur");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ab_ampur, "click", function() {
			var cobj = selected_row("back_ab_ampur");
			if (cobj.value == "1") {	ab_ampur.performTransition("adl_brain", -1, "slide", null);}
		});
		
		on(ab_score_ampur, "click", function() {
			var obj = selected_row("ab_score_ampur");
			var hosp_name = obj.label;
			var lcnext = "";
			if (ceomenu == "1") {
				var lcgrade = obj.grade;
		   		var lchosp = obj.hosp_id;
		   		lcnext = "ADL ระดับ " + lcgrade + " เฉพาะ " + hosp_name;
		   		list("ab_score_tumbon", "adl_brain_score.php?level=3&grade=" + lcgrade + "&hosp_id=" + lchosp);
		   	}
		   	else if (ceomenu == "2") {
		   		lcnext = "PPS ระดับ " + lcpps + "% เฉพาะ " + hosp_name;
				list("ab_score_tumbon", "pps_score.php?npps=" + lcpps + "&town=" + obj.ampur_id);
			}
		   	abt_header.set("label", lcnext);
			ab_ampur.performTransition("ab_tumbon", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Ab_tumbon    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ab_tumbon = reg.byId("ab_tumbon");
		var abt_header = reg.byId("abt_header");
		var back_ab_tumbon = reg.byId("back_ab_tumbon");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ab_tumbon, "click", function() {
			var cobj = selected_row("back_ab_tumbon");
			if (cobj.value == "1") {
				if (lclevel == "1") {ab_tumbon.performTransition("ab_ampur", -1, "slide", null);}
				else {ab_tumbon.performTransition("adl_brain1", -1, "slide", null);}
			}
		});
		
		on(ab_score_tumbon, "click", function() {
			var obj = selected_row("ab_score_tumbon");
			var lctumbon = obj.tumbon_id;
			var tumbon_name = obj.label;
			var lcnext = "";
			if (ceomenu == "1") {
				var lcgrade = obj.grade;
		   		list("ab_score_mooban", "adl_brain_score.php?level=4&grade=" + lcgrade + "&tumbon_id=" + lctumbon);
		   		abm_header.set("label", "ADL ระดับ " + lcgrade + " เฉพาะ " + tumbon_name);
		   		lcnext = "สรุปคะแนน ADL & Brain แยกรายหมู่บ้าน";}
		   	else if (ceomenu == "2") {
		   		abm_header.set("label", "PPS ระดับ " + lcpps + "% เฉพาะ " + tumbon_name);
		   		list("ab_score_mooban", "pps_score.php?npps=" + lcpps + "&town=" + lctumbon);
		   		lcnext = "สรุปคะแนน PPS แยกรายหมู่บ้าน";}
		   		
		   	var x_store = new ifws({data:{items:[]}});
			back_ab_mooban.store = null;
			back_ab_mooban.setStore(x_store);
			var list_add = back_ab_mooban.store.newItem({label: "<", rightText: "กลับ แยกรายตำบล", value : "1"});
			var list_add = back_ab_mooban.store.newItem({label: lcnext, value : "2", header : true});
		   		
			ab_tumbon.performTransition("ab_mooban", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Ab_mooban    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ab_mooban = reg.byId("ab_mooban");
		var abm_header = reg.byId("abm_header");
		var back_ab_mooban = reg.byId("back_ab_mooban");
		var ab_score_mooban = reg.byId("ab_score_mooban");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ab_mooban, "click", function() {
			var cobj = selected_row("back_ab_mooban");
			if (cobj.value == "1") {	ab_mooban.performTransition("ab_tumbon", -1, "slide", null);}
		});
		
		on(ab_score_mooban, "click", function() {
			var obj = selected_row("ab_score_mooban");
			var lcban = obj.town_id;
			var cnext = "";
			if (ceomenu == "1") {
				var lcgrade = obj.grade;
		    	var ctitle = "ADL ระดับ " + lcgrade + " รายบุคคล";
		    	cnext = "สรุปคะแนน ADL & Brain แยกรายบุคคล";
		   		list("ab_score_person", "adl_brain_score.php?level=5&grade=" + lcgrade + "&town_id=" + lcban);}
		   	else if(ceomenu == "2") {
		   		var ctitle = "PPS ระดับ " + lcpps + "% รายบุคคล";
		   		cnext = "สรุปคะแนน PPSn แยกรายบุคคล";
		   		list("ab_score_person", "pps_score.php?npps=" + lcpps + "&town=" + lcban);}
		   	abp_header.set("label", ctitle);
		   	ab_mooban.performTransition("ab_person", 1, "slide", null);
		   	
		   	var abp_store = new ifws({data:{items:[]}});
			back_ab_person.store = null;
			back_ab_person.setStore(abp_store);
			var list_add = back_ab_person.store.newItem({label: "<", rightText: "กลับ แยกรายหมู่บ้าน", value : "1"});
			var list_add = back_ab_person.store.newItem({label: cnext, value : "2", header : true});
		   	
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Ab_person    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ab_person = reg.byId("ab_person");
		var abp_header = reg.byId("abp_header");
		var back_ab_person = reg.byId("back_ab_person");

		var ab_score_person = reg.byId("ab_score_person");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ab_person, "click", function() {
			var cobj = selected_row("back_ab_person");
			if (cobj.value == "1") {	ab_person.performTransition("ab_mooban", -1, "slide", null);}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// HI Main     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		lddate1 = new Date(y, 0, 1);
		var lcdate = lddate1.getDate();
		var lcmonth = lddate1.getMonth()+1;
		var lcyear = lddate1.getFullYear();
		cdate1 = lcyear.toString() + "." + lcmonth.toString() + "." + lcdate.toString();
		
		lddate2 = new Date(y, m + 1, 0);
		var lcdate = lddate2.getDate();
		var lcmonth = lddate2.getMonth()+1;
		var lcyear = lddate2.getFullYear();
		cdate2 = lcyear.toString() + "." + lcmonth.toString() + "." + lcdate.toString();
		
		var hi_main = reg.byId("hi_main");
		var hi_menu = reg.byId("hi_menu");
		
		hi_list();
		//////////////////
		//// Events //////
		//////////////////
		on(hi_menu, "click", function() {
			var obj = selected_row("hi_menu");
			var lcmenu = obj.value;
			if (lcmenu == "1") {
				lddate = lddate1;
				source_view = "hi_main";
				ldparameter = "lddate1";
				date2code = "hi_list()";
				hi_main.performTransition("select_dt", 1, "slide", null);}
			if (lcmenu == "2") {
				lddate = lddate2;
				source_view = "hi_main";
				ldparameter = "lddate2";
				date2code = "hi_list()";
				hi_main.performTransition("select_dt", 1, "slide", null);}
			if (lcmenu == "4") {
				var lctext = "hi_score.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&level=1";
				list("hi_value", lctext);
				hi_main.performTransition("hi_show", 1, "slide", null);}
			if (lcmenu == "5") {
				back_list("back_ampur", "กลับเมนูหลัก HI", "เลือกรายชื่ออำเภอ", "ampur", "hi_main");
				hi_main.performTransition("ampur", 1, "slide", null);	}
			if (lcmenu == "6") {
				cv_title.set("label", "ความครอบคลุมการสำรวจ HI");
				back_list("back_hcoverage", "กลับเมนูหลัก HI", "T=จำนวนหมู่บ้าน, S=สำรวจ, P=ร้อยละ", "hi_coverage", "hi_main");
				list("hcoverage", "hi_ampur.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2));
				hi_main.performTransition("hi_coverage", 1, "slide", null);}
			if (lcmenu == "8") {hi_main.performTransition("ceo_main", -1, "slide", null);}
		});
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// HI Show    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_show = reg.byId("hi_show");
		var hi_value = reg.byId("hi_value");
		var back_hi_show = reg.byId("back_hi_show");
		back_list("back_hi_show", "กลับ เมนูหลัก HI", "ค่า HI ตามกลุ่ม / จำนวนหมู่บ้าน / ร้อยละ", "hi_show", "hi_main");

		on(back_hi_show, "click", function(){
			var obj = selected_row("back_hi_show");
			lheader = obj.header;
			if (lheader == true) {
				gcsource_view = "hi_show";
				graph("hi_value", "label", "graph_box", "Pie", undefined, undefined, "hi_text");
				hi_show.performTransition("view_graph", 1, "slide");
			}
		});
		
		//////////////////
		//// Events //////
		//////////////////
		//// คลิก Green, Yellow, Red
		on(hi_value, "click", function() {
			cdate1 = d2txt(lddate1);
			cdate2 = d2txt(lddate2);
			var obj = selected_row("hi_value");
		   	lcgrade = obj.grade;
			lheader = obj.header;
			if (lcgrade == "1") {gctitle = "HI=0 ";}
			if (lcgrade == "2") {gctitle = "HI<10 ";}
			if (lcgrade == "3") {gctitle = "HI>=10 ";}
			var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2&grade=" + lcgrade;
			list("hi_value_ampur", lctext);
			hi_titlea.set("label", gctitle + " แยกรายอำเภอ");
			back_list("back_hi_ampur", "กลับ เมนู HI รวมทั้งจังหวัด", "อำเภอ / จำนวนหมู่บ้าน " + gctitle, "hi_ampur", "hi_show");
			hi_show.performTransition("hi_ampur", 1, "slide", null);
		});
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// HI Ampur    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_ampur = reg.byId("hi_ampur");
		var hi_value_ampur = reg.byId("hi_value_ampur");
		var back_hi_ampur = reg.byId("back_hi_ampur");
		
		var hi_titlea = reg.byId("hi_titlea");
		//////////////////
		//// Events //////
		//////////////////
		//// คลิก Green, Yellow, Red
		on(hi_value_ampur, "click", function() {
			var cobj = selected_row("hi_value_ampur");
			var lchosp = cobj.hosp_id;
			var lcampname = cobj.label;
			var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2&hosp_id=" + lchosp + "&grade=" + lcgrade;
			hi_titlet.set("label", gctitle + " อ." + lcampname);
			list("hi_value_tumbon", lctext);
			back_list("back_hi_tumbon", "กลับ เมนู HI แยกรายอำเภอ", "ตำบล / จำนวนหมู่บ้าน " + gctitle, "hi_tumbon", "hi_ampur");
			hi_ampur.performTransition("hi_tumbon", 1, "slide", null);
		});
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// HI tumbon   //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_tumbon = reg.byId("hi_tumbon");
		var hi_value_tumbon = reg.byId("hi_value_tumbon");
		var back_hi_tumbon = reg.byId("back_hi_tumbon");
		
		var hi_titlet = reg.byId("hi_titlet");
		//////////////////
		//// Events //////
		//////////////////
		//// คลิก Green, Yellow, Red
		on(hi_value_tumbon, "click", function() {
			var cobj = selected_row("hi_value_tumbon");
			var lctb = cobj.tumbon_id;
			var lctbname = cobj.label;
			var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=3&tumbon_id=" + lctb + "&grade=" + lcgrade;
			hi_titlem.set("label", gctitle + " ต." + lctbname);
			list("hi_value_mooban", lctext);
			back_list("back_hi_mooban", "กลับ เมนู HI แยกรายตำบล", "หมู่บ้าน / ค่า HI ที่สำรวจได้", "hi_mooban", "hi_tumbon");
			hi_tumbon.performTransition("hi_mooban", 1, "slide", null);
		});
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// HI mooban   //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_mooban = reg.byId("hi_mooban");
		var hi_value_mooban = reg.byId("hi_value_mooban");
		var back_hi_mooban = reg.byId("back_hi_mooban");
		var hi_titlem = reg.byId("hi_titlem");
		//////////////////
		//// Events //////
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////
//// Datetime    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var select_dt = reg.byId("select_dt");
		var back_dt = reg.byId("back_dt")
		var calendar1 = reg.byId("calendar1");
		var lddate = new Date();
		calendar1.set("value", lddate);
		
		var hr1 = reg.byId("hr1");
		var min1 = reg.byId("min1");
		//////////////////
		//// Events //////
		//////////////////
		
		on(select_dt, "beforeTransitionIn", function() {
			calendar1.set("value", lddate);
			lchour = lddate.getHours().toString();
			hr1.set("value", pad(lchour, "00"));
			lcmin = lddate.getMinutes().toString();
			min1.set("value", pad(lcmin, "00"));
		});
		
		on(back_dt, "click", function() {
			var cmacro = ldparameter + " = lddate";
			eval(cmacro);
			eval(date2code);
			select_dt.performTransition(source_view, -1, "slide", null);
		});
		
		on(calendar1, "change", function() {
			lddate = calendar1.get("value");
		});
		
		on(hr1, "click", function() {
			hr1.domNode.selectionStart = 0;
			hr1.domNode.selectionEnd = 2;
		});
		
		on(min1, "click", function() {
			min1.domNode.selectionStart = 0;
			min1.domNode.selectionEnd = 2;
		});
		
		on(hr1, "keyup", function() {
     		lnhr1 = hr1.get("value");
     		if (lnhr1 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr1 = lnhr1.toString();
	     		var lnlength = lchr1.length;
				if (lnlength == 2 || lchr1 > "2") {
					lddate.setHours(lnhr1);
					hr1.set("value", pad(lchr1, "00"));
					min1.focus(true);
					min1.domNode.selectionStart = 0;
					min1.domNode.selectionEnd = 2;
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
					lddate.setMinutes(lnmin1);
					min1.set("value", pad(lcmin1, "00"));
					back_dt.focus(true);
				}
			}
		});
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////
//// Ampur    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ampur = reg.byId("ampur");
		var back_ampur = reg.byId("back_ampur");
		var ampur_list = reg.byId("ampur_list");
		list("ampur_list", "ampur_list.php");
		//////////////////
		//// Events //////
		//////////////////
		on(ampur_list, "click", function() {
			var cobj = selected_row("ampur_list");
			gchosp_id = cobj.hosp_id;
			gcampur_id = cobj.ampur_id;
			gcampur_name = cobj.label;
			if (ceomenu == "3") {
				// HI
				var ctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=1&hosp_id=" + gchosp_id;
				list("ampur_value", ctext);
				back_list("back_ampur_show", "กลับ เลือกอำเภอ", "ค่า HI แยกตามกลุ่ม / จำนวนหมู่บ้าน / ร้อยละ", "ampur_show", "ampur");
				ampur_title.set("label", "ค่า HI อ." + gcampur_name);
				ampur.performTransition("ampur_show", 1, "slide", null);
			} else if (ceomenu == "4") {
				// CI
				ci_pv_title.set("label", "ค่าสำรวจ CI อ." + gcampur_name);
				clearList("ci_pv_list");
				spinner.spin(ci_pv.domNode);
				setTimeout(function() {ci_show()}, 500);
				ampur.performTransition("ci_pv", 1, "slide", null);
			}
			
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// ampur_show    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ampur_show = reg.byId("ampur_show");
		var back_ampur_show = reg.byId("back_ampur_show");
		var ampur_title = reg.byId("ampur_title");
		var ampur_value = reg.byId("ampur_value");
		//////////////////
		//// Events //////
		//////////////////
		on(ampur_value, "click", function() {
			var cobj = selected_row("ampur_value");
			lchosp = cobj.hosp_id;
			lcgrade = cobj.grade;
			if (lcgrade == "1") {gctitle = "HI=0 ";}
		   	if (lcgrade == "2") {gctitle = "HI<10 ";}
		   	if (lcgrade == "3") {gctitle = "HI>=10 ";}
			var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2&hosp_id=" + lchosp + "&grade=" + lcgrade;
			hi_titlet.set("label", gctitle + " อ." + gcampur_name);
			list("hi_value_tumbon", lctext);
			back_list("back_hi_tumbon", "กลับ เมนู เฉพาะ อ." + gcampur_name, "ตำบล / จำนวนหมู่บ้าน " + gctitle, "hi_tumbon", "ampur_show", "0");
			ampur_show.performTransition("hi_tumbon", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// HI Coverage   //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_coverage = reg.byId("hi_coverage");
		var back_hcoverage = reg.byId("back_hcoverage");
		var hcoverage = reg.byId("hcoverage");
		var cv_title = reg.byId("cv_title");
		
		//////////////////
		//// Events //////
		//////////////////
		on(hcoverage, "click", function() {
			var cobj = selected_row("hcoverage");
			var lchosp = cobj.hosp_id;
			gcampur_name = cobj.label;
			gcampur_id = cobj.ampur_id;
			if (ceomenu == "3") {
				list("hcoverage2", "hi_tumbon.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2&hosp_id=" + lchosp);
				back_list("back_hcoverage2", "กลับเมนู Coverage รายอำเภอ", "T=จำนวนหมู่บ้าน, S=สำรวจ, P=ร้อยละ", "hi_coverage2", "hi_coverage");
			} else if (ceomenu == "4") {
				list("hcoverage2", "ci_score_tb.php?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=3&town_id=" + gcampur_id);
				back_list("back_hcoverage2", "กลับเมนู Coverage รายอำเภอ", "จำนวนสำรวจ / จำนวนหน่วยงาน / ร้อยละ", "hi_coverage2", "hi_coverage");
			}
			coverage_title.set("label", "ความครอบคลุม อ." + gcampur_name);
			hi_coverage.performTransition("hi_coverage2", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// HI Coverage2   //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_coverage2 = reg.byId("hi_coverage2");
		var coverage_title = reg.byId("coverage_title");
		var back_hcoverage2 = reg.byId("back_hcoverage2");
		var hcoverage2 = reg.byId("hcoverage2");
		
		//////////////////
		//// Events //////
		//////////////////
		on(hcoverage2, "click", function() {
			// CI Coverage
			var cobj = selected_row("hcoverage2");
			lctumbon = cobj.tumbon_id;
			lctumbonname = cobj.label;
			if (ceomenu == "4") {
				coverage3_title.set("label", "ความครอบคลุม CI ต." + lctumbonname);
				list("hcoverage3", "ci_unitcvg.php?date1=" + cdate1 + "&date2=" + cdate2 + "&town_id=" + lctumbon);
				back_list("back_hcoverage3", "กลับเมนู Coverage ตำบล", "ประเภทหน่วยสำรวจ / จำนวนหน่วยงาน / ร้อยละ", "hi_coverage3", "hi_coverage2");
				hi_coverage2.performTransition("hi_coverage3", 1, "slide", null);
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// HI Coverage3   //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hi_coverage3 = reg.byId("hi_coverage3");
		var coverage3_title = reg.byId("coverage3_title");
		var back_hcoverage3 = reg.byId("back_hcoverage3");
		var hcoverage3 = reg.byId("hcoverage3");
		
		//////////////////
		//// Events //////
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// CI Main   //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ci_main = reg.byId("ci_main");
		var ci_menu = reg.byId("ci_menu");
		ci_list();
		//////////////////
		//// Events //////
		//////////////////
		on(ci_menu, "click", function() {
			var obj = selected_row("ci_menu");
			cimenu = obj.value;
			if (cimenu == "1") {
				lddate = lddate1;
				source_view = "ci_main";
				ldparameter = "lddate1";
				date2code = "ci_list()";
				ci_main.performTransition("select_dt", 1, "slide", null);}
			if (cimenu == "2") {
				lddate = lddate2;
				source_view = "ci_main";
				ldparameter = "lddate2";
				date2code = "ci_list()";
				ci_main.performTransition("select_dt", 1, "slide", null);}
			if (cimenu == "4") {
				spinner.spin(ci_pv.domNode);
				clearList("ci_pv_list");
				setTimeout(function() {ci_show()}, 500);
				ci_pv_title.set("label", "ค่าสำรวจ CI รวมทั้งจังหวัด");
				ci_main.performTransition("ci_pv", 1, "slide", null);}
			if (cimenu == "5") {
				back_list("back_ampur", "กลับเมนูหลัก CI", "เลือกรายชื่ออำเภอ", "ampur", "ci_main", "0");
				ci_main.performTransition("ampur", 1, "slide", null);	}
			if (cimenu == "6") {
				cv_title.set("label", "ความครอบคลุมการสำรวจ CI");
				back_list("back_hcoverage", "กลับเมนูหลัก CI", "จำนวนสำรวจ / จำนวนหน่วยงาน / ร้อยละ", "hi_coverage", "ci_main", "0");
				list("hcoverage", "ci_score_ap.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&ctype=3");
				ci_main.performTransition("hi_coverage", 1, "slide", null);}
			if (cimenu == "8") {ci_main.performTransition("ceo_main", -1, "slide", null);}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////////////////////////////////////
//// ci_province    //////////////////
////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var back_ci_pv = reg.byId("back_ci_pv");
		var cx_store = new ifws({data:{items:[]}});
		back_ci_pv.store = null;
		back_ci_pv.setStore(cx_store);
		var list_add = back_ci_pv.store.newItem({label: "<", rightText : "กลับ เมนูหลัก CI"});
		var ci_pv = reg.byId("ci_pv");
		var ci_pv_list = reg.byId("ci_pv_list");
		var ci_pv_title = reg.byId("ci_pv_title");
		//////////////////
		//// Events //////
		//////////////////
		on(back_ci_pv, "click", function() {
			ci_pv.performTransition("ci_main", -1, "slide", null);
		});
		
		on(ci_pv_list, "click", function() {
			var cobj = selected_row("ci_pv_list");
			var lctype = cobj.ctype;
			var lcgrade = cobj.cgrade;
			var lnvalue = parseInt(cobj.value);
			var lcheader = cobj.label;
			if (cimenu == "4") {
				if (lnvalue < 3) {
					ci_header.set("label", lcheader + " แยกรายอำเภอ");
					list("ci_ap_list", "ci_score_ap.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&ctype=" + lctype);}
				else {
					ci_header.set("label", lcheader + " รวมทั้งจังหวัด");
					list("ci_ap_list", "ci_detail.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&ctype=" + lctype + "&grade=" + lcgrade);
				}
				back_list("back_ci_ap", "กลับเมนู CI ทั้งจังหวัด", lcheader + " จำแนกอำเภอ", "ci_ap", "ci_pv", "0");
			} else if(cimenu == "5") {
				if (lnvalue < 3) {
					ci_header.set("label", lcheader + " เฉพาะอำเภอ " + gcampur_name);
					list("ci_ap_list", "ci_score_tb.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&ctype=" + lctype + "&town_id=" + gcampur_id);
				} else {
					ci_header.set("label", lcheader + " เฉพาะอำเภอ " + gcampur_name);
					list("ci_ap_list", "ci_detail.php?date1=" + d2txt(lddate1) + "&date2=" + d2txt(lddate2) + "&ctype=" + lctype + "&grade=" + lcgrade + "&town_id=" + gcampur_id);
				}
				back_list("back_ci_ap", "กลับเมนู CI เฉพาะอำเภอ " + gcampur_name, lcheader + " จำแนกตำบล", "ci_ap", "ci_pv");
			}
			ci_pv.performTransition("ci_ap", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// ci_ampur    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ci_header = reg.byId("ci_header");
		var ci_ap = reg.byId("ci_ap");
		var ci_ap_list = reg.byId("ci_ap_list");
		var back_ci_ap = reg.byId("back_ci_ap");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ci_ap, "click", function() {
			ci_ap.performTransition("ci_pv", -1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// View Graph   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_graph = reg.byId("view_graph");
		var back_graph = reg.byId("back_graph");
		var graph_title = reg.byId("graph_title");
		var graph_box = reg.byId("graph_box");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(graph_title, "click", function() {
			back("back_graph", "view_graph", gcsource_view);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
	});
});