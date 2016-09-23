//////////////////////////
//// Public Variables ////
//////////////////////////
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
			var list_add = ipd_item.store.newItem({label: "Ward", value : "2", rightText: lcwardname + " >"});
			var list_add = ipd_item.store.newItem({label: "แพทย์ผู้ดูแล", value : "3", rightText: lcdoctor + " >"});
			var list_add = ipd_item.store.newItem({label: "ข้อมูลผู้ป่วย", value : "4", header: true});
			var list_add = ipd_item.store.newItem({label: "ชื่อ-สกุล", value : "5", rightText: lcpatient + " >"});
			var list_add = ipd_item.store.newItem({label: "HN " + "AN " + "เตียง ", value : "6"});
			var list_add = ipd_item.store.newItem({label: "Diagnosis", value : "7"});
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
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 2    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 3    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////

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