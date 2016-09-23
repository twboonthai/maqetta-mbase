//// ประกาศตัวแปร
lnadl1 = 0;
lnadl2 = 0;
lnadl3 = 0;
lnadl4 = 0;
lnadl5 = 0;
lnadl6 = 0;
lnadl7 = 0;
lnadl8 = 0;
lnadl9 = 0;
lnadl10 = 0;

lcadl1 = "1. Feeding";
lcadl2 = "2. Grooming";
lcadl3 = "3. Transfer";
lcadl4 = "4. Toilet Use";
lcadl5 = "5. Mobility";
lcadl6 = "6. Dressing";
lcadl7 = "7. Stairs";
lcadl8 = "8. Bathing";
lcadl9 = "9. Bowels";
lcadl10 = "10. Bladder";
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
//// User Defined Functions
//// Reset ค่า adl ////////////////////////////////////////////
		function adl_list() {
			//// แสดงข้อมูลใหม่
			clearList("adl_detail");
			//// แสดงคะแนน ADL เดิม
			var list_add = adl_detail.store.newItem({label: lcadl1 + " = " + lnadl1.toString(), value : lnadl1.toString(), value1 : "1", moveTo: "adl1"});
			var list_add = adl_detail.store.newItem({label: lcadl2 + " = " + lnadl2.toString(), value : lnadl2.toString(), value1 : "2", moveTo: "adl2"});
			var list_add = adl_detail.store.newItem({label: lcadl3 + " = " + lnadl3.toString(), value : lnadl3.toString(), value1 : "3", moveTo: "adl3"});
			var list_add = adl_detail.store.newItem({label: lcadl4 + " = " + lnadl4.toString(), value : lnadl4.toString(), value1 : "4", moveTo: "adl4"});
			var list_add = adl_detail.store.newItem({label: lcadl5 + " = " + lnadl5.toString(), value : lnadl5.toString(), value1 : "5", moveTo: "adl5"});
			var list_add = adl_detail.store.newItem({label: lcadl6 + " = " + lnadl6.toString(), value : lnadl6.toString(), value1 : "6", moveTo: "adl6"});
			var list_add = adl_detail.store.newItem({label: lcadl7 + " = " + lnadl7.toString(), value : lnadl7.toString(), value1 : "7", moveTo: "adl7"});
			var list_add = adl_detail.store.newItem({label: lcadl8 + " = " + lnadl8.toString(), value : lnadl8.toString(), value1 : "8", moveTo: "adl8"});
			var list_add = adl_detail.store.newItem({label: lcadl9 + " = " + lnadl9.toString(), value : lnadl9.toString(), value1 : "9", moveTo: "adl9"});
			var list_add = adl_detail.store.newItem({label: lcadl10 + " = " + lnadl10.toString(), value : lnadl10.toString(), value1 : "10", moveTo: "adl10"});
		}

   		function adl_reset(adlscore) {
   			adlscore = adlscore || "";
   			for (n=1; n<=10; n++) {
				var cobject = reg.byId("adl" + n.toString());
				var ctitle = eval("lcadl" + n.toString());
				var cmacro = eval("lnadl" + n.toString() + "=0");
				if (adlscore.length > 0) {
					var ctxt = reg.byId("adl_" + n.toString() + "_" + adlscore.substr(n-1, 1))
					var ctext = ctxt.get("label");
					var cmacro = eval("lnadl" + n.toString() + "=" + adlscore.substr(n-1, 1));
					cobject.set("title", ctitle + "=" + ctext);
				}
       			else {cobject.set("title", ctitle);}
       		}
   		}
   		
   		function adl_check(fobject, fnumber) {
   			var fobj = reg.byId(fobject);
   			var lnobj = fobject.length;
   			var fvar = "ln" + fobject.substr(0, lnobj-2);
   			var fval = fobject.substr(lnobj-1, 1);
   			if (fobj.checked == true) {
				cmacro = eval(fvar + " = " + fval);
				for (n=0; n<=fnumber-1; n++) {
					var fobj0 = fobject.substr(0, lnobj-1) + n.toString();
					var fobj1 = reg.byId(fobj0);
					fobj1.set("checked", false);
				}
				fobj.set("checked", true);
				adl_list();
				var macro = eval(fobject.substr(0, lnobj-2) + '.performTransition("adl_main", -1, "slide", null)');
			}
   		}
   		
//// Reset ค่า ADL Additional
		var house1_0 = reg.byId("house1_0");
		var house1_1 = reg.byId("house1_1");
		var house2_0 = reg.byId("house2_0");
		var house2_1 = reg.byId("house2_1");
		var house3_0 = reg.byId("house3_0");
		var house3_1 = reg.byId("house3_1");
		var house1_detail = reg.byId("house1_detail");
		var house3_detail = reg.byId("house3_detail");
		var cg_0 = reg.byId("cg_0");
		var cg_1 = reg.byId("cg_1");
		var cg_2 = reg.byId("cg_2");
		var cg_name = reg.byId("cg_name");
		var cg_relate = reg.byId("cg_relate");
		var sv_0 = reg.byId("sv_0");
		var sv_1 = reg.byId("sv_1");
		var sv_2 = reg.byId("sv_2");
		var dv_0 = reg.byId("dv_0");
		var dv_1 = reg.byId("dv_1");
		var dv_name = reg.byId("dv_name");
		var dv_need = reg.byId("dv_need");
		var econ_0 = reg.byId("econ_0");
		var econ_1 = reg.byId("econ_1");
		var econ_pb = reg.byId("econ_pb");
		var comp_0 = reg.byId("comp_0");
		var comp_1 = reg.byId("comp_1");
		var comp_diag = reg.byId("comp_diag");
		var diag1 = reg.byId("diag1");
		var diag2 = reg.byId("diag2");
		var diag3 = reg.byId("diag3");
		var diag4 = reg.byId("diag4");

   		function adl1_reset(adlscore, h01, h03, c01, c02, d01, d02, ec1, dg1) {
   			adlscore = adlscore || "";
   			house1_0.set("checked", false);
		   	house1_1.set("checked", false);
		   	house2_0.set("checked", false);
		   	house2_1.set("checked", false);
		   	house3_0.set("checked", false);
		   	house3_1.set("checked", false);
		   	house1_detail.set("value", "");
		   	house3_detail.set("value", "");
		   	cg_0.set("checked", false);
		   	cg_1.set("checked", false);
		   	cg_2.set("checked", false);
		   	cg_name.set("value", "");
		   	cg_relate.set("value", "");
		   	sv_0.set("checked", false);
		   	sv_1.set("checked", false);
		   	sv_2.set("checked", false);
		    dv_0.set("checked", false);
		   	dv_1.set("checked", false);
		   	dv_name.set("value", "");
		   	dv_need.set("value", "");
		   	econ_0.set("checked", false);
		    econ_1.set("checked", false);
		   	econ_pb.set("value", "");
		   	comp_0.set("checked", false);
		   	comp_1.set("checked", false);
		   	diag1.set("checked", false);
		   	diag2.set("checked", false);
		   	diag3.set("checked", false);
		   	diag4.set("checked", false);
		   	comp_diag.set("value", "");
		   	
		   	if (adlscore.length > 0) {
			   	for (n=1; n<=6; n++) {
       				var cscore = adlscore.substr(n-1, 1);
       				if (n == 1) {cobject = reg.byId("house");}
       				else if (n == 2) {cobject = reg.byId("cgiver");}
       				else if (n == 3) {cobject = reg.byId("service");}
       				else if (n == 4) {cobject = reg.byId("device");}
       				else if (n == 5) {cobject = reg.byId("econ");}
       				else if (n == 6) {cobject = reg.byId("disease");}
					var ctitle = eval("lcadd" + n.toString());
					cobject.set("title", ctitle + "=" + cscore);
	       		}
	       		// Housing
	       		var h1 = adlscore.substr(6, 1);
	       		if (h1 == "1") { 
	       			house1_1.set("checked", true);
	       			house1_0.set("checked", false);
	       		}
	       		else {
	       			house1_0.set("checked", true);
	       			house1_1.set("checked", false);
	       		}
	       		
	       		var h2 = adlscore.substr(7, 1);
	       		if (h2 == "1") { 
	       			house2_1.set("checked", true);
	       			house2_0.set("checked", false);
	       		}
	       		else {
	       			house2_0.set("checked", true);
	       			house2_1.set("checked", false);
	       		}
	       		
	       		var h3 = adlscore.substr(8, 1);
	       		if (h3 == "1") { 
	       			house3_1.set("checked", true);
	       			house3_0.set("checked", false);
	       		}
	       		else {
	       			house3_0.set("checked", true);
	       			house3_1.set("checked", false);
	       		}
	       		house1_detail.set("value", h01);
	       		house3_detail.set("value", h03);
	       		
	       		// Care Giver
	       		var cg =  adlscore.substr(1, 1);
	       		if (cg == "4") {cg_2.set("checked", true);}
	       		else if (cg == "2") {cg_1.set("checked", true);}
	       		else {cg_0.set("checked", true);}
	       		
	       		cg_name.set("value", c01);
	       		cg_relate.set("value", c02);
	       		
	       		// Service
	       		var sv = adlscore.substr(2, 1);
	       		if (sv == "2") {sv_2.set("checked", true);}
	       		else if (sv == "12") {sv_1.set("checked", true);}
	       		else {sv_0.set("checked", true);}
	       		
	       		// device
	       		var dv =  adlscore.substr(3, 1);
	       		if (dv == "3") {dv_1.set("checked", true);}
	       		else {dv_0.set("checked", true);}
	       		
	       		dv_name.set("value", d01);
	       		dv_need.set("value", d02);
	       		
	       		// Economics
	       		var ec =  adlscore.substr(4, 1);
	       		if (ec == "1") {econ_1.set("checked", true);}
	       		else {econ_0.set("checked", true);}
	       		
	       		econ_pb.set("value", ec1);
	       		
	       		// Complications
	       		var cp =  adlscore.substr(5, 1);
	       		if (cp == "4") {comp_1.set("checked", true);}
	       		else {comp_0.set("checked", true);}
	       		
	       		comp_diag.set("value", dg1);
	       	}
   			
   		}
 ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////
//// Define Object //////////////////////////////////
		var a1_back = reg.byId("a1_back");
		var a2_back = reg.byId("a2_back");
		var a3_back = reg.byId("a3_back");
		var a4_back = reg.byId("a4_back");
		var a5_back = reg.byId("a5_back");
		var a6_back = reg.byId("a6_back");
		var a7_back = reg.byId("a7_back");
		var a8_back = reg.byId("a8_back");
		var a9_back = reg.byId("a9_back");
		var a10_back = reg.byId("a10_back");
		var adl_back = reg.byId("adl_back");
		var adl_detail = reg.byId("adl_detail");
		var store_adetail = new ifws({data:{items:[]}});
		adl_detail.store = null;
		adl_detail.setStore(store_adetail);
		var adl_main = reg.byId("adl_main");
		var adl_new = reg.byId("adl_new");
		var adl_person = reg.byId("adl_person");
		var adl_series = reg.byId("adl_series");
		var adl_score = reg.byId("adl_score");
		var adl1 = reg.byId("adl1");
		var adl1_0 = reg.byId("adl1_0");
		var adl1_1 = reg.byId("adl1_1");
		var adl1_2 = reg.byId("adl1_2");
		var adl2 = reg.byId("adl2");
		var adl2_0 = reg.byId("adl2_0");
		var adl2_1 = reg.byId("adl2_1");
		var adl3 = reg.byId("adl3");
		var adl3_0 = reg.byId("adl3_0");
		var adl3_1 = reg.byId("adl3_1");
		var adl3_2 = reg.byId("adl3_2");
		var adl3_3 = reg.byId("adl3_3");
		var adl4 = reg.byId("adl4");
		var adl4_0 = reg.byId("adl4_0");
		var adl4_1 = reg.byId("adl4_1");
		var adl4_2 = reg.byId("adl4_2");
		var adl5 = reg.byId("adl5");
		var adl5_0 = reg.byId("adl5_0");
		var adl5_1 = reg.byId("adl5_1");
		var adl5_2 = reg.byId("adl5_2");
		var adl5_3 = reg.byId("adl5_3");
		var adl6 = reg.byId("adl6");
		var adl6_0 = reg.byId("adl6_0");
		var adl6_1 = reg.byId("adl6_1");
		var adl6_2 = reg.byId("adl6_2");
		var adl7 = reg.byId("adl7");
		var adl7_0 = reg.byId("adl7_0");
		var adl7_1 = reg.byId("adl7_1");
		var adl7_2 = reg.byId("adl7_2");
		var adl8 = reg.byId("adl8");
		var adl8_0 = reg.byId("adl8_0");
		var adl8_1 = reg.byId("adl8_1");
		var adl9 = reg.byId("adl9");
		var adl9_0 = reg.byId("adl9_0");
		var adl9_1 = reg.byId("adl9_1");
		var adl9_2 = reg.byId("adl9_2");
		var adl10 = reg.byId("adl10");
		var adl10_0 = reg.byId("adl10_0");
		var adl10_1 = reg.byId("adl10_1");
		var adl10_2 = reg.byId("adl10_2");
		var adlp_score = reg.byId("adlp_score");
		var adl_save = reg.byId("adl_save");
		var am_back = reg.byId("am_back");
		var staff_v2 = reg.byId("staff_v2");
///////////////////////////////////////////////////
//// Back จากหน้าจอรายละเอียด //////////////////////////////////
		on(adl_back, "click", function() {
			adl_person.performTransition("staff_v2", -1, "slide", null);
		});
		on(am_back, "click", function() {
			adl_main.performTransition("adl_person", -1, "slide", null);
		});
		on(a1_back, "click", function() {
			adl1.performTransition("adl_main", -1, "slide", null);
		});
		on(a2_back, "click", function() {
			adl2.performTransition("adl_main", -1, "slide", null);
		});
		on(a3_back, "click", function() {
			adl3.performTransition("adl_main", -1, "slide", null);
		});
		on(a4_back, "click", function() {
			adl4.performTransition("adl_main", -1, "slide", null);
		});
		on(a5_back, "click", function() {
			adl5.performTransition("adl_main", -1, "slide", null);
		});
		on(a6_back, "click", function() {
			adl6.performTransition("adl_main", -1, "slide", null);
		});
		on(a7_back, "click", function() {
			adl7.performTransition("adl_main", -1, "slide", null);
		});
		on(a8_back, "click", function() {
			adl8.performTransition("adl_main", -1, "slide", null);
		});
		on(a9_back, "click", function() {
			adl9.performTransition("adl_main", -1, "slide", null);
		});
		on(a10_back, "click", function() {
			adl10.performTransition("adl_main", -1, "slide", null);
		});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กรอก ADL รายการใหม่  //////////////////////////////////////////////////////////////////////////////////////////////
		on (adl_new, "click", function() {
			adl_reset();
			adl_list();
			//// Clear ตัวเลือกที่เคย Checked
			for (n=1; n<=10; n++){
				var lcobj0 = "adl" + n.toString();
				var rnd = 2;
		   		if (n==2 || n==8){ rnd = 1;}
		   		else if (n==3 || n==5) {rnd = 3;}
		   		for (r=0; r <=rnd; r++){
		   			var lcobj1 = lcobj0 + "_" + r.toString();
		   			var lcobj = reg.byId(lcobj1);
		   			lcobj.set("checked", false);
		   		}
		   	}
			////////////////////////////////////////////////////////////////////////////////
			adl_person.performTransition("adl_main", 1, "slide", null);
		});
		
//// เลือก ADL1 //////////////////////////////////////
		on (adl1_0, "click", function() {
			adl_check("adl1_0", 3);
		});
		on (adl1_1, "click", function() {
			adl_check("adl1_1", 3);
		});
		on (adl1_2, "click", function() {
			adl_check("adl1_2", 3);
		});
//// เลือก ADL2 //////////////////////////////////////
		on (adl2_0, "click", function() {
			adl_check("adl2_0", 2);
		});
		on (adl2_1, "click", function() {
			adl_check("adl2_1", 2);
		});
//// เลือก ADL3 //////////////////////////////////////
		on (adl3_0, "click", function() {
			adl_check("adl3_0", 4);
		});
		on (adl3_1, "click", function() {
			adl_check("adl3_1", 4);
		});
		on (adl3_2, "click", function() {
			adl_check("adl3_2", 4);
		});
		on (adl3_3, "click", function() {
			adl_check("adl3_3", 4);
		});
//// เลือก ADL4 //////////////////////////////////////
		on (adl4_0, "click", function() {
			adl_check("adl4_0", 3);
		});
		on (adl4_1, "click", function() {
			adl_check("adl4_1", 3);
		});
		on (adl4_2, "click", function() {
			adl_check("adl4_2", 3);
		});
//// เลือก ADL5 //////////////////////////////////////
		on (adl5_0, "click", function() {
			adl_check("adl5_0", 4);
		});
		on (adl5_1, "click", function() {
			adl_check("adl5_1", 4);
		});
		on (adl5_2, "click", function() {
			adl_check("adl5_2", 4);
		});
		on (adl5_3, "click", function() {
			adl_check("adl5_3", 4);
		});
//// เลือก ADL6 //////////////////////////////////////
		on (adl6_0, "click", function() {
			adl_check("adl6_0", 3);
		});
		on (adl6_1, "click", function() {
			adl_check("adl6_1", 3);
		});
		on (adl6_2, "click", function() {
			adl_check("adl6_2", 3);
		});
//// เลือก ADL7 //////////////////////////////////////
		on (adl7_0, "click", function() {
			adl_check("adl7_0", 3);
		});
		on (adl7_1, "click", function() {
			adl_check("adl7_1", 3);
		});
		on (adl7_2, "click", function() {
			adl_check("adl7_2", 3);
		});
//// เลือก ADL8 //////////////////////////////////////
		on (adl8_0, "click", function() {
			adl_check("adl8_0", 2);
		});
		on (adl8_1, "click", function() {
			adl_check("adl8_1", 2);
		});
//// เลือก ADL9 //////////////////////////////////////
		on (adl9_0, "click", function() {
			adl_check("adl9_0", 3);
		});
		on (adl9_1, "click", function() {
			adl_check("adl9_1", 3);
		});
		on (adl9_2, "click", function() {
			adl_check("adl9_2", 3);
		});
//// เลือก ADL7 //////////////////////////////////////
		on (adl10_0, "click", function() {
			adl_check("adl10_0", 3);
		});
		on (adl10_1, "click", function() {
			adl_check("adl10_1", 3);
		});
		on (adl10_2, "click", function() {
			adl_check("adl10_2", 3);
		});
		
		
		on(adl_series, "click", function() {
			var all_list = adl_series.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break;}
		   	}
			lcadldate = all_list[s].label;
		   	lcvalue0 = all_list[s].value2;
		   	lcvalue1 = all_list[s].value3;
		   	var hx1 = all_list[s].value4;
			var hx2 = all_list[s].value5;
			var cx1 = all_list[s].value6;
			var cx2 = all_list[s].value7;
			var dx1 = all_list[s].value8;
			var dx2 = all_list[s].value9; 
			var ecx = all_list[s].value10;
			var dgx = all_list[s].value11;
			
			adldate = lcadldate;
			lcscore = all_list[s].label;
		   	
			adl_score.set("value", "ADL Score : " + lcscore);
			adlp_score.set("value", "ADL Score : " + lcscore);
			
		   	adl0_reset(lcvalue0);
		   	
		   	//adl1_reset(lcvalue1, hx1, hx2, cx1, cx2, dx1, dx2, ecx, dgx);

		   	adl_person.performTransition("adl_main", 1, "slide", null);
		 });
		 
//// เลือก adl ทีละข้อ
		on(adl_detail, "click", function() {	
			//// ระบุรายการที่เลือก
			lcorder = "";
			var all_list = adl_detail.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	lcpage = all_list[s].moveTo;
			adl_main.performTransition(lcpage, 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////		 
//// Save ข้อมูล ADL
			
			on(adl_save, "click", function() {
				var lcreturn = "";
				var lnadl = lnadl1+lnadl2+lnadl3+lnadl4+lnadl5+lnadl6+lnadl7+lnadl8+lnadl9+lnadl10;
				var lcadl_code = lnadl1.toString()+lnadl2.toString()+lnadl3.toString()+lnadl4.toString()+lnadl5.toString()+lnadl6.toString()+lnadl7.toString()+lnadl8.toString()+lnadl9.toString()+lnadl10.toString();
				var r = confirm("ต้องการบันทึกข้อมูล" + "\nADL " + lnadl.toString() + " คะแนน ?");
				if (r == true) {
					xhr.get({
						url: ip_address + "adl_add.php",
						content: {staff_cid: lcstaffcid, cid: lccid, adl: lcadl_code },
						headers: { "X-Requested-With": null },
						load: function(result) {
							list("adl_series", "cid_adlplus.php?cid=" + lccid);
							//// แสดง Graph  ADL/////////////////////////////////////////////////////////////////////////////////////////////
						  	xhr.get({
								url: ip_address + "cid_adlplus.php",
								content: { cid: lccid, ord: "1" },
								headers: { "X-Requested-With": null },
								load: function(result) {
									// กำจัด chr(10) chr(13)
								   	var json1 = result.replace(/[\n\r]*/g,'');
								   	var myData = eval("(" + json1 + ")");
								   	// ผล ADL แสดงเป็น Graph
								   	var item = myData.items;
								   	var item_list = [];
								   	var item_cnt = item.length;
									for (i = 0; i < item_cnt; i++)
									{
										item_list[i] = parseFloat(item[i]["rightText"]);
									}
									var adl_chart = Chart(dom.byId("adl_chart"));
									adl_chart.destroy();
									var adl_chart = Chart(dom.byId("adl_chart")).
								        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true  }).
								        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
								        addPlot("default", { type: Lines }).
								        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
								        addSeries("Series A", item_list, {stroke: {color: "blue", width: 4}}).
								        render();
									// จบการแสดง Graph
								},
								error: function() {
									alert("Failed ADL Graph !");
								}
						  	});
							},
						error: function() {alert("Failed ADL Save !");}
					});
					adl_main.performTransition("adl_person", -1, "slide", null);
				}
			});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});