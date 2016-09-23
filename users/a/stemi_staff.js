//////////////////////////
//// Public Variables ////
//////////////////////////
var lcadldate = "";
var lddate1 = new Date();
var lddate2 = new Date();
var lcdate1 = "";
var lcdate2 = "";
var lnhr1 = 0;
var lnmin1 = 0;
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
		var staff_v2 = reg.byId("staff_v2");
		var btn_stemi = reg.byId("btn_stemi");
		on(btn_stemi, "click", function() {
			stemi_v1h.set("label", "STEMI : " + lcname);
			list("stemi_visits", "stemi_cid.php?cid=" + lccid);
			staff_v2.performTransition("stemi_v1", 1, "slide", null);
			btn_stemi.set("checked", false);
			pt_fullname.set("value", lcname);
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_v1    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_v1 = reg.byId("stemi_v1");
		var stemi_v1h = reg.byId("stemi_v1h");
		var back_sv1 = reg.byId("back_sv1");
		var new_stemi = reg.byId("new_stemi");
		var stemi_visits = reg.byId("stemi_visits");
		//////////////////
		//// Events //////
		//////////////////
		on(back_sv1, "click", function() {
			stemi_v1.performTransition("staff_v2", -1, "slide", null);
		});
		on(new_stemi, "click", function() {
			lnauto = 0;
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
			
			lchx_n = "-";
			lchx_o = "-";
			lchx_p = "-";
			lchx_q = "-";
			lchx_r = "-";
			lchx_s = "-";
			lchx_t = "-";
			cp_list();
			
			lddate1 = new Date();
			lnhr1 = lddate1.getHours();
			lnmin1 = lddate1.getMinutes();
			hr1.set("value", pad(lnhr1.toString(), "00"));
			min1.set("value", pad(lnmin1.toString(), "00"));
			date1.set("value", tsdate(lddate1));
			lddate2 = new Date();
			lnhr2 = lddate2.getHours();
			lnmin2 = lddate2.getMinutes();
			hr2.set("value", pad(lnhr2.toString(), "00"));
			min2.set("value", pad(lnmin2.toString(), "00"));
			date2.set("value", tsdate(lddate2));
			stemi_v1.performTransition("stemi_v2", 1, "slide", null);
			stemi_v2h.set("label", "Visit : " + tsdate(lddate1));
			min1.focus(true);
		});
		on(stemi_visits, "click", function() {
			st_visit = selected_row("stemi_visits");
			// menu1 ข้อมูลทั่วไป
			stemi_v1.performTransition("stemi_v2", 1, "slide", null);
			stemi_v2h.set("label", "Visit : " + tsdate(lddate1));
    		lddate1 = ctot(st_visit.onset);
			date1.set("value", tsdate(lddate1));
			lnhr1 = lddate1.getHours();
			lchr1 = lnhr1.toString();
			hr1.set("value", pad(lchr1, "00"));
			lnmin1 = lddate1.getMinutes();
			lcmin1 = lnmin1.toString();
			min1.set("value", pad(lcmin1, "00"));
    		lddate2 = ctot(st_visit.fmc);
			date2.set("value", tsdate(lddate2));
			lnhr2 = lddate2.getHours();
			lchr2 = lnhr2.toString();
			hr2.set("value", pad(lchr2, "00"));
			lnmin2 = lddate2.getMinutes();
			lcmin2 = lnmin2.toString();
			min2.set("value", pad(lcmin2, "00"));
			lnauto = st_visit.auto_id;
			lndm = st_visit.dm;
			lnht = st_visit.ht;
			lnsm = st_visit.sm;
			lnlp = st_visit.lp;
			lnfm = st_visit.fm;
			lnxx = st_visit.xx;
			b_check("btn_dm", lndm);
			b_check("btn_ht", lnht);
			b_check("btn_lp", lnlp);
			b_check("btn_sm", lnsm);
			b_check("btn_fm", lnfm);
			b_check("btn_xx", lnxx);
			// menu2 ข้อมูลเจ็บหน้าอก NOPQRST
			lchx_n = st_visit.hx_n;
			lchx_o = st_visit.hx_o;
			lchx_p = st_visit.hx_p;
			lchx_q = st_visit.hx_q;
			lchx_r = st_visit.hx_r;
			lchx_s = st_visit.hx_s;
			lchx_t = st_visit.hx_t;
			cp_list();
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
		   		stemi_v2.performTransition("stemi_menu1", 1, "slide", null);
		   	}
		   	if (s==1) {
		   		// ประวัติเจ็บหน้าอก NOPQRST
		   		stemi_v2.performTransition("stemi_menu2", 1, "slide", null);
		   	}
		   	if (s==2) {
		   		stemi_v2.performTransition("stemi_menu3", 1, "slide", null);
		   	}
		   	if (s==3) {
		   		stemi_v2.performTransition("stemi_menu4", 1, "slide", null);
		   	}
		   	if (s==5) {
				lcdate2 = d2txt(lddate2, 1);
				lcdate1 = d2txt(lddate1, 1);
				lcphp = "stemi_save.php?cid=" + lccid + "&fmc=" + lcdate2 + "&onset=" + lcdate1 + "&auto_id=" + lnauto + "&dm=" + lndm + "&ht=" + lnht + "&lp=" + 
					lnlp + "&sm=" + lnsm + "&fm=" + lnfm + "&xx=" + lnxx + "&hx_n=" + lchx_n + "&hx_o=" + lchx_o + "&hx_p=" + lchx_p + "&hx_q=" + lchx_q +
					"&hx_r=" + lchx_r + "&hx_s=" + lchx_s + "&hx_t=" + lchx_t;
				mysave(lcphp);
				list("stemi_visits", "stemi_cid.php?cid=" + lccid);
			   	stemi_v2.performTransition("staff_v2", -1, "slide", null);	
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
		//////////////////
		//// Events //////
		//////////////////
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
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu3, "click", function() {
			stemi_menu3.performTransition("stemi_v2", -1, "slide", null);
		});
		
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
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu4, "click", function() {
			stemi_menu4.performTransition("stemi_v2", -1, "slide", null);
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