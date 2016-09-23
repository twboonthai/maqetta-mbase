//////////////////////////
//// Public Variables ////
//////////////////////////
lcstaff = "";
lcdoctor = "";
lcpsw = "";
lcshow = "";
lcstaffpsw = "";
lcwardname = "";
lcpatient = "";
lchnumber = "";
lcanumber = "";
lcward = "";
lcbed = "";
lcdiag = "";
lcvisit = "";
//// General ///////////////


//// Specific //////////

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
		function ipd_list() {
			clearList("ipd_item");
			var list_add = ipd_item.store.newItem({label: "ข้อมูลสถานบริการ", value : "1", header: true});
			var list_add = ipd_item.store.newItem({label: "Ward :", value : "2", rightText: lcwardname + " >"});
			var list_add = ipd_item.store.newItem({label: "แพทย์ผู้ดูแล :", value : "3", rightText: lcdoctor + " >"});
			var list_add = ipd_item.store.newItem({label: "ข้อมูลผู้ป่วย", value : "4", header: true});
			var list_add = ipd_item.store.newItem({label: "", value : "5", rightText: "ทะเบียนรายชื่อผู้ป่วย >"});
			var list_add = ipd_item.store.newItem({label: "ชื่อ-สกุล : " + lcpatient + " / HN : " + lchnumber + " / AN : " + lcanumber + " / " + lcbed, value : "6", variableHeight: true});
			var list_add = ipd_item.store.newItem({label: "Diagnosis : " + lcdiag, variableHeight: true, value : "7"});
			var list_add = ipd_item.store.newItem({label: "Actions", value : "8", header: true});
			var list_add = ipd_item.store.newItem({label: "Progress Note", value : "9", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "Laboratory", value : "10", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "X-Ray", value : "11", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "Investigate", value : "12", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "Operation", value : "13", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "Order for One Day", value : "14", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "Order for Continuation", value : "15", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "Discharge", value : "16", rightText: " >"});
			var list_add = ipd_item.store.newItem({label: "", value : "17"});
			var list_add = ipd_item.store.newItem({label: "Log Out", value : "18", rightText : "ออกจากระบบ", rightIcon2 : "exit.jpg"});
		}
		
		function ward() {
			clearList("ward_list");
			var list_add = ward_list.store.newItem({label: "กรุณาเลือก Ward ที่ต้องการ", value : "0", header: true});
			sw2list("ward_list", "sw_38", "แผนกผู้ป่วยใน ชาย", lcward2n("38"));
			sw2list("ward_list", "sw_39", "แผนกผู้ป่วยใน หญิง", lcward2n("39"));
			sw2list("ward_list", "sw_22", "แผนกห้องคลอด ห้องผ่าตัด", lcward2n("22"));
		}
		
		function lcward2n (cward) {
			if (cward == lcward) {nreturn = 1;}
			else { nreturn = 0;}
			return nreturn;
		}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// IPD Login        ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var user_name = reg.byId("user_name");
		var user_search = reg.byId("user_search");
		var password = reg.byId("password");
		var doctor_list = reg.byId("doctor_list");
		var btn_login = reg.byId("btn_login");
		var ipd_login = reg.byId("ipd_login");
		list("doctor_list", "staff_name.php");

		//////////////////
		//// Events //////
		//////////////////
	
		// key ชื่อ เพื่อค้นหา
		on(user_search, "keypress", function() {
			txt_search("user_search", "doctor_list");
		});
		
		// Click รายชื่อเพื่อเลือกแพทย์
		on(doctor_list, "click", function() {
			var doctor = selected_row("doctor_list");
			lcdoctor = doctor.label.trim();
			lcstaffpsw = decode(doctor.staff_pw);
			user_name.set("value", lcdoctor);
			password.focus(true);
		});
		
		// key password
		on(password, "keypress", function() {
			var lctxt = password.get("value").trim();
			var lnlen = lctxt.length;
			var lnkey = event.which || event.keyCode;
			var lcnew = String.fromCharCode(lnkey);
			
			lcpsw = lcpsw.substr(0, lnlen);
			lcshow = lcshow.substr(0, lnlen);
			
			lcpsw = lcpsw + lcnew
			lcpsw = lcpsw.toUpperCase();
			password.set("value", lcshow);
			lcshow = lcshow + "*";
		});
		
		// Click Log In
		on(btn_login, "click", function() {
			if (lcpsw == lcstaffpsw) {
				ipd_list();
				ipd_login.performTransition("ipd_main", 1, "slide", null);}
			else {
				alert ("password ไม่ถูกต้อง !!!");
				lcpsw = "";
				password.set("value", "");
				password.focus(true);
			}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Ipd Main     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ipd_main = reg.byId("ipd_main");
		var ipd_item = reg.byId("ipd_item");
		var ipd_store = new ifws({data:{items:[]}});
		ipd_item.store = null;
		ipd_item.setStore(ipd_store);

		//////////////////
		//// Events //////
		//////////////////
		on(ipd_item, "click", function() {
			lcaction = selected_row("ipd_item");
			lcchoice = lcaction.value;
			if (lcaction.value == "18") {
				lcdoctor = "";
				lcpsw = "";
				lcshow = "";
				lcstaffpsw = "";
				lcwardname = "";
				lcpatient = "";
				lchnumber = "";
				lcanumber = "";
				lcbed = "";
				lcdiag = "";
				password.set("value", "");
				user_name.set("value", "")
				user_search.set("value", "");
				list("doctor_list", "staff_name.php");
				ipd_main.performTransition("ipd_login", -1, "slide", null);
			}
			if (lcchoice == "2" || lcchoice == "3") { 
				ward();
				ipd_main.performTransition("provider", 1, "slide", null);}
			if (lcchoice == "5") {
				list("pt_list", "ipd_patient_doctor.php?ward=" + lcward + "&doctor=" + lcstaff, "เลือกผู้ป่วยที่ต้องการ");
				ipd_main.performTransition("patient", 1, "slide", null);
			}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// IPD Provider    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var provider = reg.byId("provider");
		var ward_list = reg.byId("ward_list");
		var ward_store = new ifws({data:{items:[]}});
		ward_list.store = null;
		ward_list.setStore(ward_store);
		
		var doctors = reg.byId("doctors");
		list("doctors", "staff_name.php", "กรุณาเลือกแพทย์ผู้ดูแล");
		
		var pt_list = reg.byId("pt_list");
		list("pt_list", "ipd_patient.php?ward=" + lcward, "กรุณาเลือกผู้ป่วย");
		
		//////////////////
		//// Events //////
		//////////////////
		on(ward_list, "click", function() {
			var lcobj = selected_row("ward_list");
			lcward = lcobj.id.substr(3, 2);
			lcwardname = lcobj.label;	
			ipd_list();
			provider.performTransition("ipd_main", -1, "slide", null);
		});
		
		on(doctors, "click", function() {
			var lcobj = selected_row("doctors");
			lcdoctor = lcobj.label;
			lcstaff = lcobj.staff_id;
			ipd_list();
			provider.performTransition("ipd_main", -1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Patient    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var patient = reg.byId("patient");
		var pt_list = reg.byId("pt_list");
		//////////////////
		//// Events //////
		//////////////////
		on(pt_list, "click", function() {
			var lcpt = selected_row("pt_list");
			lcpatient = lcpt.label;
			lcbed = lcpt.rightText;
			lcvisit = lcpt.visit_id;
			lchnumber = lcpt.hn;
			lcanumber = lcpt.adm_id;
			lcdiag = lcpt.diagnosis;
			ipd_list();
			patient.performTransition("ipd_main", -1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 4    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 5    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		
		//////////////////
		//// Events //////
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 6    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});