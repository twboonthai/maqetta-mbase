//////////////////////////
//// Public Variables ////
//////////////////////////

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
  	"dijit/Dialog", 
    "dijit/form/Form", 
    "dijit/form/TextBox",
    "dijit/form/DateTextBox", 
    "dijit/form/TimeTextBox",
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
 	"dojo/_base/xhr" // use xhr to make ajax call to remote server
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
 ], function(popup, mitem, menu, Dialog, Form, TextBox, DateTextBox, TimeTextBox, VirtualVScroller, pane, Button, combobtn, ready, ifws, ifrs, reg, on, dom, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// main View        ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var officer_menu = reg.byId("officer_menu");
		var ofc_store = new ifws({data:{items:[]}});
		officer_menu.store = null;
		officer_menu.setStore(ofc_store);
		var list_add = officer_menu.store.newItem({label: "กรุณาเลือกทำรายการ", value : "0", header : true});
		var list_add = officer_menu.store.newItem({label: "ADL & ประเมินสมอง", value : "1", icon : "person.jpg", rightText : ">"});
		var list_add = officer_menu.store.newItem({label: "PPS (Paliative Performance Scale)", value : "2", icon : "palliative.jpg", rightText : ">"});
		var list_add = officer_menu.store.newItem({label: "HI (Household Index)", value : "3", icon : "hi.jpg", rightText : ">"});
		var list_add = officer_menu.store.newItem({label: "CI (Container Index)", value : "4", icon : "ci.jpg", rightText : ">"});

		//////////////////
		//// Events //////
		//////////////////
		var fname = "";
		var lname = "";
		var bdate = "";
		var btime = "";
		var test = "";
		on(officer_menu, "click", function() {
			dialog("ทดสอบ", "alert (test)", "fname", "c", "ชื่อ", "lname", "c", "นามสกุล", "bdate", "d", "วันเกิด", "btime", "T", "เวลา", "test", "c", "ทดสอบ");
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 1     /////////////////
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