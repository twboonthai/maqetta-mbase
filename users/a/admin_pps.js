//////////////////////////
//// Public Variables ////
//////////////////////////


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

//		function () {

//		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
		var back_pps = reg.byId("back_pps");
		var pps_score = reg.byId("pps_score");
		var pps_main = reg.byId("pps_main");
		
		list("pps_score", "pps_frq.php");
		
		on(back_pps, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/admin_menu.html";
		});
		
		on(pps_score, "click", function() {
			pps_scale = selected_row("pps_score");
			var lcscore = "pps_score.php?npps=" + pps_scale.npps;
			list("pps_ampur", lcscore);
			pps1_title.set("label", "PPS=" + pps_scale.npps + " รายอำเภอ");
			pps_main.performTransition("pps1", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// pps1                 ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var pps1 = reg.byId("pps1");
		var back_pps1 = reg.byId("back_pps1");
		var pps_ampur = reg.byId("pps_ampur");
		var pps1_title = reg.byId("pps1_title");

		//////////////////
		//// Events //////
		//////////////////
		on(back_pps1, "click", function() {
			pps1.performTransition("pps_main", -1, "slide", null);
		});
		
		on(pps_ampur, "click", function() {
			ampur = selected_row("pps_ampur");
			var lcscore = "pps_score.php?npps=" + pps_scale.npps + "&town=" + ampur.ampur_id;
			list("pps_tumbon", lcscore);
			pps2_title.set("label", "PPS=" + pps_scale.npps + " อ." + ampur.ampur);
			pps1.performTransition("pps2", 1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// PPS 2                ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var pps2 = reg.byId("pps2");
		var back_pps2 = reg.byId("back_pps2");
		var pps_tumbon = reg.byId("pps_tumbon");
		var pps2_title = reg.byId("pps2_title");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_pps2, "click", function() {
			pps2.performTransition("pps1", -1, "slide", null);
		});
		
		on(pps_tumbon, "click", function() {
			tumbon = selected_row("pps_tumbon");
			var lcscore = "pps_score.php?npps=" + pps_scale.npps + "&town=" + tumbon.tumbon_id;
			list("pps_mooban", lcscore);
			pps3_title.set("label", "PPS=" + pps_scale.npps + " ต." + tumbon.tumbon);
			pps2.performTransition("pps3", 1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// PPS 3    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var pps3 = reg.byId("pps3");
		var back_pps3 = reg.byId("back_pps3");
		var pps_mooban = reg.byId("pps_mooban");
		var pps3_title = reg.byId("pps3_title");

		//////////////////
		//// Events //////
		//////////////////
		on(back_pps3, "click", function() {
			pps3.performTransition("pps2", -1, "slide", null);
		});
		
		on(pps_mooban, "click", function() {
			mooban = selected_row("pps_mooban");
			var lcscore = "pps_score.php?npps=" + pps_scale.npps + "&town=" + mooban.town_id;
			list("pps_cid", lcscore);
			pps4_title.set("label", "PPS=" + pps_scale.npps + "  " + mooban.mooban);
			pps3.performTransition("pps4", 1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// PPS4                 ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var pps4 = reg.byId("pps4");
		var back_pps4 = reg.byId("back_pps4");
		var pps_cid = reg.byId("pps_cid");
		var pps4_title = reg.byId("pps4_title");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_pps4, "click", function() {
			pps4.performTransition("pps3", -1, "slide", null);
		});
		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// view5 name    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		

		//////////////////
		//// Events //////
		//////////////////

		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});