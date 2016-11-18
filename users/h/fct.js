//////////////////////////
//// Public Variables ////
//////////////////////////
//// General ///////////////
var spinner = {};
var lcselected = "";
var lnauto = 0;
var lcmenu = "";
var lcauto = "";

 // parameter สำหรับ view select_dt
var lddate = new Date();
var ldparameter = "x";

// parameter สำหรับ Text Input
// View ที่ต้องการกลับหลังเสร็จงาน
var gcsource_view = "main_view";
// เก็บText : lccode = F, เก็บ Value : lccode = T
var lccode = "F";
// ประเภทของตัวแปร C(haracter) หรือ N(umber)
var lcvartype = "C";
// กลับสู่ View ทันทีเมื่อทำการเลือกรายการ ไม่ต้องกดปุ่ม Back
var lautoback = false;
// Show Text ที่ txt_return โดยไม่ต้อง Clear
var ltxtshow = false;
// Function ที่ต้องการ run เมื่อกลับสู่ gcsource_view
var gcfunction = "";

//// Specific //////////
// Staff
var lcpsw = "";
var lcshow = "";
var lcpassword = "";
var lcstaff = "";
var lcstaffcid = "";
var ladmin = 0;

// CUP
var lchosp_id = "10953";
var lcampur_id = "34140000";
var lcampur_name = "ม่วงสามสิบ";

// Person
var lccid = "";
var lcname = "";
var lcsex = "";
var lcage = "";
var lcaddress = "";
var lctel1 = "";
var lctel2 = "";
var lctel3 = "";
var lctel4 = "";
var lcosm = "";
var ppsw = "";
var lctown = "";

// ADL
var adl1 = "";
var adl2 = "";
var adl3 = "";
var adl4 = "";
var adl5 = "";
var adl6 = "";
var adl7 = "";
var adl8 = "";
var adl9 = "";
var adl10 = "";
var nadl = 0;

// Brain
var brn1 = "";
var brn2 = "";
var brn3 = "";
var brn4 = "";
var brn5 = "";
var brn6 = "";
var brn7 = "";
var brn8 = "";
var brn9 = "";
var brn10 = "";
var brn11 = "";
var brn12 = "";
var nbrn = 0;
var lcedu = "";

var bd1 = "";
var bd2 = "";
var bd3 = "";
var bd4 = "";
var bd5 = "";
var bd6 = "";
var bd7 = "";
var bd8 = "";
var bd9 = "";
var nlevel = 0;

//// Public Function
var person_detail = function() {};

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
		function adl_brain(nadl, nbrain, nliteral) {
			if (nadl == 0 || nbrain == 0 || nliteral == 0) {
				cReturn = "-";}
			else {
				cReturn = "1";
				if (nadl < 12) {
					if (nadl < 5) {
						if (nliteral = 1) {
							if (nbrain > 14) {cReturn = "4";}
							else {cReturn = "5";}
						}
						else if (nliteral = 2) {
							if (nbrain > 17) {cReturn = "4";}
							else {cReturn = "5";}
						}
						else {
							if (nbrain > 22) {cReturn = "4";}
							else {cReturn = "5";}
						}
					}
					else {
						if (nliteral = 1) {
							if (nbrain > 14) {cReturn = "2";}
							else {cReturn = "3";}
						}
						else if (nliteral = 2) {
							if (nbrain > 17) {cReturn = "2";}
							else {cReturn = "3";}
						}
						else {
							if (nbrain > 22) {cReturn = "2";}
							else {cReturn = "3";}
						}
					}
				}
			}
			return cReturn;
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
spinner = new Spinner().spin();
///////////////////////////////
//// Datetime    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var select_dt = reg.byId("select_dt");
		var select_dt_title = reg.byId("select_dt_title");
		var back_select_dt = reg.byId("back_select_dt");
		var calendar1 = reg.byId("calendar1");
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
		
		on(select_dt_title, "click", function() {
			var isback = back_select_dt.get("focused");
			if (isback == true) {
				var cmacro = ldparameter + " = lddate";
				eval(cmacro);
				eval(gcfunction);
				select_dt.performTransition(gcsource_view, -1, "slide", null);
			}
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
					calendar1.focus(true);
				}
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// txt_input    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var text_input = reg.byId("text_input");
		var txt_search = reg.byId("txt_search");
		var txt_list = reg.byId("txt_list");
		var txt_return = reg.byId("txt_return");
		var back_txt = reg.byId("back_txt");
		var txt_clear = reg.byId("txt_clear");
		var txt_title = reg.byId("txt_title");

		//////////////////
		//// Events //////
		//////////////////
		
		on(text_input, "beforeTransitionIn", function() {
			if (ltxtshow == false) {txt_return.set("value", "");}
			ltxtshow = false;
			txt_search.set("value", "");
		});
		
		on(txt_search, "keyup", function() {
			lcsearchtext = txt_search.get("value").trim().toUpperCase();
	    	txt_list.setQuery({label:lcsearchtext + "*"});
		});
		
		on(txt_title, "click", function() {
			var isdel = txt_clear.get("focused");
			if (isdel == true) {	txt_return.set("value", "");}
			
			var isback = back_txt.get("focused");
			if (isback == true) {
				if (lccode != "T") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				text_input.performTransition(gcsource_view, -1, "slide", null);
				lautoback = false;
				gcfunction = "";
			}
		});
		
		on(txt_list, "click", function() {
			var lcnewtxt = "";
			var lcoldtxt = txt_return.get("value");
			var obj = selected_row("txt_list");
			v0_list = obj.list0;
			v0_val = obj.val0;
			// แทนค่าตัวแปรด้วย value ที่ได้จากการเลือก List
			if (lcoldtxt.trim() == "") { lcnewtxt = obj.label; }
				else { lcnewtxt = lcoldtxt + " " + obj.label; }
			txt_return.set("value", lcnewtxt);
			if (lccode == "T") {
				if (lcvartype == "N") { var cmacro = lcvar + "=" + obj.value; }
				else { var cmacro = lcvar + "='" + obj.value + "'";  }
			} else {
				var cmacro = lcvar + "= '" + lcnewtxt + "'";
			}
			eval(cmacro);
			if (lautoback == true) {
				if (lccode != "T") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				text_input.performTransition(gcsource_view, -1, "slide", null);
				lautoback = false;
			}
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////
//// FCT Login        ////////////
////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var login = reg.byId("login");
		var user_id = reg.byId("user_id");
		var password = reg.byId("password");
		var btn_login = reg.byId("btn_login");
		var login_title = reg.byId("login_title");
		var back_staff = reg.byId("back_staff");
		//////////////////
		//// Function ////
		//////////////////
		function chk_psw (){
			var staff = php2obj("id2staff.php?staff_id=" + lcstaff);
			lcpassword = staff.staff_pw;
			lcstaffcid = staff.cid;
			ladmin = staff.is_admin;
			if (lcpsw == decode(lcpassword)) {
				main_list();
				login.performTransition("main_menu", 1, "slide", null);
				spinner.stop();}
			else {
				spinner.stop();
				var lcpsw1 = password.get("value");
				if (lcpsw1 == decode(lcpassword)) {
					main_list();
					login.performTransition("main_menu", 1, "slide", null);
				} else {
					dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", "User ID/password ไม่ถูกต้อง !!!");
					lcpsw = "";
					password.set("value", "");
					password.focus(true);
				}
			}
		}
		//////////////////
		//// Events //////
		//////////////////
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
			// รายละเอียด Staff จากฐานข้อมูล
			lcstaff = user_id.get("value");
			lcstaff = pad(lcstaff, "0000");
			spinner.spin(login.domNode);
			setTimeout(function() {chk_psw()}, 500);
		});

		on (login_title, "click", function() {
			var back2main = back_staff.get("focused");
			if (back2main == true) {
				window.location.href = "http://m30.phoubon.in.th/index.html";
			}
		});
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Main Menu    //////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var main_menu = reg.byId("main_menu");
		var main_menu_title = reg.byId("main_menu_title");
		var back_main_menu = reg.byId("back_main_menu");
		var main_menu_list = reg.byId("main_menu_list")
		
		///////////////////
		//// Function //////
		///////////////////
		// Main Menu
		function main_list() {
			var fm_store = new ifws({data:{items:[]}});
			main_menu_list.store = null;
			main_menu_list.setStore(fm_store);
			
			var list_add = main_menu_list.store.newItem({label: "สำหรับ Admin", value : "0", header : true});
			if (ladmin == 0) {
				var list_add = main_menu_list.store.newItem({label: "กำหนด/แก้ไข ผู้ใช้งาน", rightText : ">", value : "1", style: "color: #808080"});
				var list_add = main_menu_list.store.newItem({label: "Upload ประชากร", rightText : ">", value : "2", style: "color: #808080"});
				var list_add = main_menu_list.store.newItem({label: "แก้ไข HI", rightText : ">", value : "8", style: "color: #808080"});
			} else {
				var list_add = main_menu_list.store.newItem({label: "กำหนด/แก้ไข ผู้ใช้งาน", rightText : ">", value : "1"});
				var list_add = main_menu_list.store.newItem({label: "Upload ประชากร", rightText : ">", value : "2"});
				var list_add = main_menu_list.store.newItem({label: "แก้ไข HI", rightText : ">", value : "8"});

			}
			var list_add = main_menu_list.store.newItem({label: "", value : "3"});
			var list_add = main_menu_list.store.newItem({label: "สำหรับ เจ้าหน้าที่", value : "4", header : true});
			var list_add = main_menu_list.store.newItem({label: "กำหนดเครือข่าย", rightText : lcampur_name, value : "5"});
			var list_add = main_menu_list.store.newItem({label: "ค้นประชากร จากรหัส 13 หลัก", rightText : ">", value : "6"});
			var list_add = main_menu_list.store.newItem({label: "ค้นประชากร จากที่อยู่", rightText : ">", value : "7"});
		}
		
		//////////////////
		//// Events //////
		//////////////////
		on(main_menu_title, "click", function() {
			var back2main = back_main_menu.get("focused");
			if (back2main == true) {
				window.location.href = "http://m30.phoubon.in.th/index.html";
			}
		});
		
		on(main_menu_list, "click", function() {
			var cobj = selected_row("main_menu_list");
			lcmenu = cobj.value;
			if (lcmenu == "5") {main_menu.performTransition("cup", 1, "slide", null);}
			if (lcmenu == "6") {
				main_menu.performTransition("person", 1, "flip", null);
				cid_box.focus(true);
			}
			if (lcmenu == "7") {
				list("pcu_list", "pcu_list.php?hosp_id=" + lchosp_id);
				main_menu.performTransition("pcu", 1, "slide", null);
			}
			if (lcmenu == "8") {
				if (ladmin == 1) {
					list("pcu_list", "pcu_list.php?hosp_id=" + lchosp_id);
					main_menu.performTransition("pcu", 1, "slide", null);
				} else {alert ("ท่านไม่มีสิทธิแก้ไขค่า HI ...");}
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// CUP     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var cup = reg.byId("cup");
		var cup_title = reg.byId("cup_title");
		var back_cup = reg.byId("back_cup");
		var cup_list = reg.byId("cup_list");
		list("cup_list", "ampur_list.php");
		//////////////////
		//// Events //////
		//////////////////
		on(cup_title, "click", function() {
			selected_clear("cup_list");
			back("back_cup", "cup", "main_menu");
		});
		
		on(cup_list, "click", function() {
			var cobj = selected_row("cup_list");
			lcampur_id = cobj.ampur_id;
			lcampur_name = cobj.label;
			lchosp_id = cobj.hosp_id;
			main_list();
			cup.performTransition("main_menu", -1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Person     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var person = reg.byId("person");
		var back_person = reg.byId("back_person");
		var go_adr = reg.byId("go_adr");
		var person_title = reg.byId("person_title");
		var person_list = reg.byId("person_list");
		var cid_box = reg.byId("cid_box");
		var btn_ok = reg.byId("btn_ok");
		//////////////////
		//// Function  ////
		//////////////////
		// Person
		person_detail = function() {
			var cedu = "ไม่มีข้อมูล";
			if (lcedu == "1") {cedu = "อ่านเขียนไม่ได้";}
			else if (lcedu == "2") {cedu = "จบชั้นประถมศึกษา";}
			else if (lcedu == "3") {cedu = "สูงกว่าชั้นประถมศึกษา";}
			var pd_store = new ifws({data:{items:[]}});
			person_list.store = null;
			person_list.setStore(pd_store);
			var list_add = person_list.store.newItem({label: "รายละเอียดบุคคล", value : "0", header : true});
			var list_add = person_list.store.newItem({label: lcname, rightText: "เพศ " + lcsex + " อายุ " + lcage, value : "1"});
			var list_add = person_list.store.newItem({label: "ระดับ ADL + สภาวะทางสมอง", value : "0", header : true});
			var list_add = person_list.store.newItem({label: "A=" + nadl + "/B=" + nbrn + "/" + cedu, rightText: nlevel, value : "0"});
			var list_add = person_list.store.newItem({label: "สถานที่อยู่/ติดต่อ", value : "2", header: true});
			var list_add = person_list.store.newItem({label: lcaddress, value : "3", variableHeight: true});
			var list_add = person_list.store.newItem({label: "หมายเลขโทรศัพท์ : " + lctel1, value: "4", rightIcon2: "telephone.jpg"});
			var list_add = person_list.store.newItem({label: "Family Care Team", value : "5", header: true});
			var list_add = person_list.store.newItem({label: "อสม. : " + lcosm, value : "6"});
			var list_add = person_list.store.newItem({label: "หมายเลขโทรศัพท์ : " + lctel2, value: "7", rightIcon2: "telephone.jpg"});
			var list_add = person_list.store.newItem({label: "รพ.สต. : ", value : "8"});
			var list_add = person_list.store.newItem({label: "หมายเลขโทรศัพท์ : " + lctel3, value: "9", rightIcon2: "telephone.jpg"});
			var list_add = person_list.store.newItem({label: "แพทย์ : ", value : "10"});
			var list_add = person_list.store.newItem({label: "หมายเลขโทรศัพท์ : " + lctel4, value: "11", rightIcon2: "telephone.jpg"});
			var list_add = person_list.store.newItem({label: "สำรวจสถานะสุขภาพ", value : "12", header: true});
			var list_add = person_list.store.newItem({label: "ADL", value: "13", rightText: ">"});
			var list_add = person_list.store.newItem({label: "สภาวะทางสมอง", value: "14", rightText: ">"});
			var list_add = person_list.store.newItem({label: "PPS", value: "15", rightText: ">"});
			var list_add = person_list.store.newItem({label: "กำหนดรหัสผ่าน", value: "16", rightText: ppsw});
		}

		function cid_search() {
			var pop = php2obj("cid_pop.php?cid=" + lccid);
			if (pop == "") {
				spinner.stop();
				dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", "ไม่พบรหัสประชาชน " + lccid + " !!!");
				cid_box.set("value", "");
				clearList("person_list");
				cid_box.focus(true);}
			else {
				ppsw = pop.psw;
				lcage = getAge(pop.birthdate, "");
				lcname = pop.fname + " " + pop.lname;
				lcsex = pop.sex;
				lcaddress = pop.home_adr + " " + pop.ban + " " + pop.town;
				lctel1 = pop.telephone;
				var osm = php2obj("cid_osm.php?cid=" + lccid);
				lcosm = osm.osm;
				lctel2 = osm.osm_phone;
				
				var cobj = php2obj("cid2brain.php?cid=" + lccid);
				if (cobj !== "") {
					lcedu = cobj.educate;
					nbrn = parseInt(cobj.nbrn);
				} else {
					nbrn = 0;
					lcedu = "";
				}
				var cobj = php2obj("cid2adl.php?cid=" + lccid);
				if (cobj !== "") {nadl = cobj.nadl;
				}  else {nadl = 0}
				nlevel = adl_brain(nadl, nbrn, parseInt(lcedu));
				
				person_detail();
				// Hide Keyboard
				btn_ok.focus(true);
				spinner.stop();
			}
		}
		
		//////////////////
		//// Events //////
		//////////////////
		on(person_title, "click", function() {
			var isadr = go_adr.get("focused");
			if (isadr == true) {
				person.performTransition("adr", 1, "cube", null);
			} else {back("back_person", "person", "main_menu", "person_list");}
		});
		

		on(cid_box, "click", function() {
			cid_box.domNode.selectionStart = 0;
			cid_box.domNode.selectionEnd = 13;
		});

		on(cid_box, "keyup", function() {
     		lccid = cid_box.get("value");
			lnLength = lccid.length;
			if (lnLength == 13) {
				spinner.spin(person.domNode);
				setTimeout(function() {cid_search()}, 500);
			}
		 });
		 
		 on(person_list, "click", function() {
		 	var paction = selected_row("person_list");
		 	var csel = paction.value;
		 	// โทรศัพท์
		 	if (csel == "4") {
		 		window.location.href = "tel:+66" + lctel1;
		 	}
		 	// อสม
		 	if (csel == "7") {
		 		window.location.href = "tel:+66" + lctel2;
		 	}
		 	// ADL
		 	if (csel == "13") {
		 		adl_title.set("label", "ADL : " + lcname);
		 		list("adl_list", "adl_cid.php?cid=" + lccid, "ประวัติการประเมิน ADL");
		 		person.performTransition("adl", 1, "slide", null);
		 	}
		 	// Brain
		 	if (csel == "14") {
		 		brain_title.set("label", "Brain : " + lcname);
		 		list("brain_list", "brain_cid.php?cid=" + lccid, "ประวัติการประเมินสภาวะทางสมอง");
		 		person.performTransition("brain", 1, "slide", null);
		 	}
			// กำหนดรหัสผ่าน
			if (csel == "16") {
				var ccode = 'mysave("psw_save.php?cid=" + lccid + "&psw=" + cpsw);ppsw = cpsw; person_detail()';
				dialog("กำหนดรหัสผ่านใหม่", ccode, "cpsw", "c", "กรอกรหัสผ่าน");
		 	}
		 });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// ADL     /////////////////
///////////////////////////////
		//////////////////
		//// Function /////
		//////////////////
		
		//////////////////
		//// Register ////
		//////////////////
		var adl = reg.byId("adl");
		var back_adl = reg.byId("back_adl");
		var new_adl = reg.byId("new_adl");
		var adl_title = reg.byId("adl_title");
		var adl_list = reg.byId("adl_list");
		//////////////////
		//// Events //////
		//////////////////
		on(adl_title, "click", function() {
			var isnew = new_adl.get("focused");
			if (isnew == true) {
				// new adl
				lnauto = 0;
				adl1 = adl2 = adl3 = adl4 = adl5 = adl6 = adl7 = adl8 = adl9 = adl10 = "";
				adl_score();
				adl.performTransition("a_score", 1, "cube", null);
			} else {back("back_adl", "adl", "person", "adl_list");}
		});
		
		on(adl_list, "click", function() {
			var cobj = selected_row("adl_list");
			var cadl = cobj.adl;
			lnauto = cobj.auto_id;
			adl1 = cadl.substr(0, 1);
			adl2 = cadl.substr(1, 1);
			adl3 = cadl.substr(2, 1);
			adl4 = cadl.substr(3, 1);
			adl5 = cadl.substr(4, 1);
			adl6 = cadl.substr(5, 1);
			adl7 = cadl.substr(6, 1);
			adl8 = cadl.substr(7, 1);
			adl9 = cadl.substr(8, 1);
			adl10 = cadl.substr(9, 1);
			adl_score();
			adl.performTransition("a_score", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// a_score     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		
		function adl_score(cval) {
			var nval = parseInt(cval)-1;
			var a_store = new ifws({data:{items:[]}});
			a_score_list.store = null;
			a_score_list.setStore(a_store);
			var list_add = a_score_list.store.newItem({label: "Feeding", rightText: adl1 + " >", value : "1"});
			var list_add = a_score_list.store.newItem({label: "Grooming", rightText: adl2 + " >", value : "2"});
			var list_add = a_score_list.store.newItem({label: "Transfer", rightText: adl3 + " >", value : "3"});
			var list_add = a_score_list.store.newItem({label: "Toilet Use", rightText: adl4 + " >", value : "4"});
			var list_add = a_score_list.store.newItem({label: "Mobility", rightText: adl5 + " >", value : "5"});
			var list_add = a_score_list.store.newItem({label: "Dressing", rightText: adl6 + " >", value : "6"});
			var list_add = a_score_list.store.newItem({label: "Stairs", rightText: adl7 + " >", value : "7"});
			var list_add = a_score_list.store.newItem({label: "Bathing", rightText: adl8 + " >", value : "8"});
			var list_add = a_score_list.store.newItem({label: "Bowels", rightText: adl9 + " >", value : "9"});
			var list_add = a_score_list.store.newItem({label: "Bladder", rightText: adl10 + " >", value : "10"});
			row_mark("a_score_list", nval);
		}
		
		var a_score = reg.byId("a_score");
		var back_a_score = reg.byId("back_a_score");
		var save_a_score = reg.byId("save_a_score");
		var a_score_title = reg.byId("a_score_title");
		var a_score_list = reg.byId("a_score_list");
		
		//////////////////
		//// Events //////
		//////////////////
		
		on(a_score_title, "click", function() {
			var issave = save_a_score.get("focused");
			if (issave == true) {
				// Save adl ////////////////////////////////////////////////
				var adl_str = adl1.toString() + adl2.toString() + adl3.toString() + adl4.toString() + adl5.toString() + adl6.toString() + adl7.toString() + adl8.toString() + 
						adl9.toString() + adl10.toString();
				var csave ="adl_addupd.php?auto_id=" + lnauto + "&cid=" + lccid + "&staff_cid=" + lcstaffcid + "&adl=" + adl_str;
				mysave(csave, "list('adl_list', 'adl_cid.php?cid=' + lccid, 'ประวัติการประเมิน ADL')");
				a_score.performTransition("adl", -1, "swirl", null);
				///////////////////////////////////////////////////////////
			} else {back("back_a_score", "a_score", "adl");}
		});
		
		on(a_score_list, "click", function() {
			var obj = selected_row("a_score_list");
			var cval = obj.value;
			gcsource_view = "a_score";
			lccode = "T";
			lcvartype = "N";
			gcfunction = "adl_score(" + cval + ")";
			ltxtshow = true;
			lautoback = true;
			
			if (cval == "1") {
				lcvar = "adl1";
				clearList("txt_list");
				txt_title.set("label", "Feeding");
				txt_return.set("value", "รับประทานอาหาร เมื่อเตรียมสำรับไว้ให้เรียบร้อยต่อหน้า");
				var list_add = txt_list.store.newItem({label: "ต้องมีคนป้อนให้รับประทาน", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ตักอาหารเองได้ แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไว้ให้ หรือตัดเป็นชิ้นเล็กๆไว้ล่วงหน้า", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ตักอาหาร และช่วยตัวเองได้ปกติ", rightText: "2", value : "2", variableHeight: true});
				highlight("txt_list", "value", adl1);
			} else if (cval == "2") {
				lcvar = "adl2";
				clearList("txt_list");
				txt_title.set("label", "Grooming");
				txt_return.set("value", "ล้างหน้า หวีผม แปรงฟัน โกนหนวดใน 24-48 ชม.ที่ผ่านมา");
				var list_add = txt_list.store.newItem({label: "ต้องการความช่วงเหลือ", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ทำเองได้ (รวมทั้งที่ทำได้เอง ถ้าเตรียมอุปกรณ์ไว้ให้)", rightText: "1", value : "1", variableHeight: true});
				highlight("txt_list", "value", adl2);
			} else if (cval == "3") {
				lcvar = "adl3";
				clearList("txt_list");
				txt_title.set("label", "Transfer");
				txt_return.set("value", "ลุกนั่งจากที่นอน หรือจากเตียงไปเก้าอี้");
				var list_add = txt_list.store.newItem({label: "ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คน 2 คนช่วยกันยกขึ้น", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ต้องการความช่วยเหลืออย่างมาก จึงนั่งได้ เช่นใช้คนแข็งแรง มีทักษะ 1 คน หรือคนทั่วไป 2 คน ช่วยพยุง", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ต้องการความช่วยเหลือบ้าง จึงนั่งได้ เช่นบอกให้ทำตาม หรือช่วยพยุงเล็กน้อย หรือต้องมีคนดูแลเพื่อความปลอดภัย", rightText: "2", value : "2", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ทำได้เอง", rightText: "3", value : "3", variableHeight: true});
				highlight("txt_list", "value", adl3);
			} else if (cval == "4") {
				lcvar = "adl4";
				clearList("txt_list");
				txt_title.set("label", "Toilet Use");
				txt_return.set("value", "การใช้ห้องน้ำ");
				var list_add = txt_list.store.newItem({label: "ช่วยตัวเองไม่ได้", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ทำเองได้บ้าง (อย่างน้อยทำความสะอาดตัวเองได้ หลังเสร็จธุระ", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ช่วนตัวเองได้ดี ขึ้นนั่งและลงจากโถส้วมได้ ทำความสะอาดตัวเอง ถอดใส่เสื้อผ้าได้เรียบร้อย", rightText: "2", value : "2", variableHeight: true});
				highlight("txt_list", "value", adl4);
			} else if (cval == "5") {
				lcvar = "adl5";
				clearList("txt_list");
				txt_title.set("label", "Motility");
				txt_return.set("value", "การเคลื่อนที่ในห้อง หรือในบ้าน");
				var list_add = txt_list.store.newItem({label: "เคลื่อนที่ไปไหนไม่ได้", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ต้องใช้รถเข็น ช่วยตัวเองให้เคลื่อนที่ได้ ไม่ต้องมีคนเจ็น และต้องเข้าออก จากมุมห้อง หรือประตูได้", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "เดิน หรือเคลื่อนที่ โดยมีคนช่วยพยุง หรือบอกให้ทำตาม หรือช่วยดูแลเพื่อให้ปลอดภัย", rightText: "2", value : "2", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "เดิน หรือเคลื่อนที่ไปได้เอง", rightText: "3", value : "3", variableHeight: true});
				highlight("txt_list", "value", adl5);
			} else if (cval == "6") {
				lcvar = "adl6";
				clearList("txt_list");
				txt_title.set("label", "Dressing");
				txt_return.set("value", "การสวมใส่เสื้อผ้า");
				var list_add = txt_list.store.newItem({label: "ต้องมีคนสวมใส่ให้ ช่วยตัวเองได้น้อย หรือแทบไม่ได้เลย", rightText: "0", value : 0, variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ช่วยตัวเองได้ประมาณ 50% ที่เหลือต้องมีคนช่วย", rightText: "1", value : 1, variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ช่วยตัวเองได้ดี รวมทั้งกลัดกระดุม รูดซิป หรือใช้เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้", rightText: "2", value : 2, variableHeight: true});
				highlight("txt_list", "value", adl6);
			} else if (cval == "7") {
				lcvar = "adl7";
				clearList("txt_list");
				txt_title.set("label", "Stairs");
				txt_return.set("value", "การขึ้นลงบันได 1 ขั้น");
				var list_add = txt_list.store.newItem({label: "ไม่สามารถทำได้", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ต้องการคนช่วย", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "ขึ้นลงได้เอง ถ้าใช้เครื่องช่วนเดิน จะต้องเอาขึ้นเองได้ด้วย", rightText: "2", value : "2", variableHeight: true});
				highlight("txt_list", "value", adl7);
			} else if (cval == "8") {
				lcvar = "adl8";
				clearList("txt_list");
				txt_title.set("label", "Bathing");
				txt_return.set("value", "การอาบน้ำ");
				var list_add = txt_list.store.newItem({label: "ต้องมีคนช่วย หรือทำให้", rightText: "0", value : 0, variableHeight: true});
				var list_add = txt_list.store.newItem({label: "อาบน้ำเองได้", rightText: "1", value : 1, variableHeight: true});
				highlight("txt_list", "value", adl8);
			} else if (cval == "9") {
				lcvar = "adl9";
				clearList("txt_list");
				txt_title.set("label", "Bowels");
				txt_return.set("value", "การกลั้นการถ่ายอุจจาระ ใน 1 สัปดาห์ที่ผ่านมา");
				var list_add = txt_list.store.newItem({label: "กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "กลั้นไม่ได้บางครั้ง (เป็นน้อยกว้า 1 ครั้งต่อสัปดาห์)", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "กลั้นได้เป็นปกติ", rightText: "2", value : "2", variableHeight: true});
				highlight("txt_list", "value", adl9);
			} else if (cval == "10") {
				lcvar = "adl10";
				clearList("txt_list");
				txt_title.set("label", "Bladder");
				txt_return.set("value", "การกลั้นปัสสาวะ ใน 1 สัปดาห์ที่ผ่านมา");
				var list_add = txt_list.store.newItem({label: "กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะ แต่ไม่สามารถดูแลเองได้", rightText: "0", value : "0", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "กลั้นไม่ได้บางครั้ง (เป็นน้อยกว้าวันละ 1 ครั้ง)", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "กลั้นได้เป็นปกติ", rightText: "2", value : "2", variableHeight: true});
				highlight("txt_list", "value", adl10);
			} 
				
			a_score.performTransition("text_input", 1, "slide", null);
		});		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Brain     /////////////////
///////////////////////////////
		//////////////////
		//// Function /////
		//////////////////
		
		//////////////////
		//// Register ////
		//////////////////
		var brain = reg.byId("brain");
		var back_brain = reg.byId("back_brain");
		var new_brain = reg.byId("new_brain");
		var brain_title = reg.byId("brain_title");
		var brain_list = reg.byId("brain_list");
		//////////////////
		//// Events //////
		//////////////////
		on(brain_title, "click", function() {
			var isnew = new_brain.get("focused");
			if (isnew == true) {
				// new brain
				lnauto = 0;
				brn1 = 0;
				brn2 = 0;
				brn3 = 0;
				brn4 = 0;
				brn5 = 0;
				brn6 = 0;
				brn7 = 0;
				brn8 = 0;
				brn9 = 0;
				brn10 = 0;
				brn11 = 0;
				brn12 = 0;
				lcedu = 0;
				bd1 = "";
				bd2 = "";
				bd3 = "";
				bd4 = "";
				bd5 = "";
				bd6 = "";
				bd7 = "";
				bd8 = "";
				bd9 = "";
				brain_score();
				brain.performTransition("b_score", 1, "cube", null);
			} else {back("back_brain", "brain", "person", "brain_list");}
		});
		
		on(brain_list, "click", function() {
			var cobj = selected_row("brain_list");
			lnauto = cobj.auto_id;
			var cbrn = cobj.brn;
			brn1 = cbrn.substr(0, 1);
			brn2 = cbrn.substr(1, 1);
			brn3 = cbrn.substr(2, 1);
			brn4 = cbrn.substr(3, 1);
			brn5 = cbrn.substr(4, 1);
			brn6 = cbrn.substr(5, 1);
			brn7 = cbrn.substr(6, 1);
			brn8 = cbrn.substr(7, 1);
			brn9 = cbrn.substr(8, 1);
			brn10 = cbrn.substr(9, 1);
			brn11 = cbrn.substr(10, 1);
			brn12 = cbrn.substr(11, 1);
			lcedu = cobj.educate;
			
			bd1 = cobj.bd1;
			bd2 = cobj.bd2;
			bd3 = cobj.bd3;
			bd4 = cobj.bd4;
			bd5 = cobj.bd5;
			bd6 = cobj.bd6;
			bd7 = cobj.bd7;
			bd8 = cobj.bd8;
			bd9 = cobj.bd9;
			
			brain_score();
			brain.performTransition("b_score", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// b_score     /////////////////
///////////////////////////////
		//////////////////
		//// Function /////
		//////////////////
		function edu(cedu) {
			var creturn = "ไม่มีข้อมูล";
			if (cedu == "1") {creturn = "อ่านเขียนไม่ได้";}
			else if (cedu == "2") {creturn = "จบชั้นประถมศึกษา"}
			else if (cedu == "3") {creturn = "สูงกว่าชั้นประถมศึกษา"}
			return creturn;
		}
		
		function brain_score() {
			//var nval = parseInt(cval)-1;
			var b_store = new ifws({data:{items:[]}});
			b_score_list.store = null;
			b_score_list.setStore(b_store);
			var list_add = b_score_list.store.newItem({label: "การอ่านออกเขียนได้", value: "0", rightText: edu(lcedu) + " >"});
			var list_add = b_score_list.store.newItem({label: "เวลา", rightText: brn1 + " >", value : "1"});
			var list_add = b_score_list.store.newItem({label: "สถานที่", rightText: brn2 + " >", value : "2"});
			var list_add = b_score_list.store.newItem({label: "จดจำ", rightText: brn3 + " >", value : "3"});
			var list_add = b_score_list.store.newItem({label: "คำนวณ", rightText: brn4 + " >", value : "4"});
			var list_add = b_score_list.store.newItem({label: "สมาธิ", rightText: brn5 + " >", value : "5"});
			var list_add = b_score_list.store.newItem({label: "ความจำระยะสั้น", rightText: brn6 + " >", value : "6"});
			var list_add = b_score_list.store.newItem({label: "เรียกชื่อ", rightText: brn7 + " >", value : "7"});
			var list_add = b_score_list.store.newItem({label: "พูดตาม", rightText: brn8 + " >", value : "8"});
			var list_add = b_score_list.store.newItem({label: "ทำตามคำบอก", rightText: brn9 + " >", value : "9"});
			sw2list("b_score_list", "sw_brn10", "ทำตามคำเขียน", brn10);
			var list_add = b_score_list.store.newItem({label: "ทำตามคำสั่งที่เขียนได้ถูกต้อง", value: "0", variableHeight: true, style: "color: #808080"});
			sw2list("b_score_list", "sw_brn11", "เขียน", brn11);
			var list_add = b_score_list.store.newItem({label: "(ถ้าเขียนไม่ได้ ให้ข้ามไปวาดภาพ)  ให้เขียนข้อความที่อ่านรู้เรื่อง มึความหมาย 1 ประโยค", value: "0", variableHeight: true, style: "color: #808080"});
			sw2list("b_score_list", "sw_brn12", "วาดภาพ", brn12);
			var list_add = b_score_list.store.newItem({label: "วาดภาพให้เหมือนภาพตัวอย่างได้ถูกต้อง", value: "0", variableHeight: true, style: "color: #808080"});
			//row_mark("b_score_list", nval);
		}
		//////////////////
		//// Register ////
		//////////////////
		var b_score = reg.byId("b_score");
		var back_b_score = reg.byId("back_b_score");
		var save_b_score = reg.byId("save_b_score");
		var b_score_title = reg.byId("b_score_title");
		var b_score_list = reg.byId("b_score_list");
		var bd1 = bd2 = bd3 = bd4 = bd5 = bd6 = bd7 = bd8 = bd9 = bd10 = "";
		//////////////////
		//// Events //////
		//////////////////
		on(b_score_title, "click", function() {
			var issave = save_b_score.get("focused");
			if (issave == true) {
				// Save brain ////////////////////////////////////////////////
				var brain_str = "";

				lcbrn10 = sw_brn10.innerText;
				lnsearch = lcbrn10.search("YES");
				if (lnsearch > 0) {brn10 = "1";}
				else {brn10 = "0";}
				
				lcbrn11 = sw_brn11.innerText;
				lnsearch = lcbrn11.search("YES");
				if (lnsearch > 0) {brn11 = "1";}
				else {brn11 = "0";}
				
				lcbrn12 = sw_brn12.innerText;
				lnsearch = lcbrn12.search("YES");
				if (lnsearch > 0) {brn12 = "1";}
				else {brn12 = "0";}
				var csave = "brain_addupd.php?auto_id=" + lnauto + "&cid=" + lccid + "&staff_cid=" + lcstaff + "&educate=" + lcedu + "&brn1=" + brn1+ "&brn2=" + brn2 + "&brn3=" + brn3 + 
					"&brn4=" + brn4 + "&brn5=" + brn5 + "&brn6=" + brn6 + "&brn7=" + brn7 + "&brn8=" + brn8 + "&brn9=" + brn9 + "&brn10=" + brn10 + "&brn11=" + brn11 + "&brn12=" + brn12 + 
					"&bd1=" + bd1 + "&bd2=" + bd2 + "&bd3=" + bd3 + "&bd4=" + bd4 + "&bd5=" + bd5 + "&bd6=" + bd6 + "&bd7=" + bd7 + "&bd8=" + bd8 + "&bd9=" + bd9;
				mysave(csave, "list('brain_list', 'brain_cid.php?cid='  + lccid, 'ประวัติการประเมินสภาวะทางสมอง')");
				b_score.performTransition("brain", -1, "swirl", null);
				///////////////////////////////////////////////////////////
			} else {back("back_b_score", "b_score", "brain");}
		});
		
		on(b_score_list, "click", function() {
			var cobj = selected_row("b_score_list");
			var cval = cobj.value;
			var csw = cobj.id;
			gcsource_view = "b_score";
			lccode = "T";
			lcvartype = "C";
			gcfunction = "brain_score(" + cval + ")";
			ltxtshow = true;
			lautoback = true;
			
			if (cval == "0") {
				lcvar = "lcedu";
				clearList("txt_list");
				txt_title.set("label", "การอ่านออกเขียนได้");
				var list_add = txt_list.store.newItem({label: "อ่านเขียนไม่ได้", rightText: "1", value : "1", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "จบชั้นประถมศึกษา", rightText: "2", value : "2", variableHeight: true});
				var list_add = txt_list.store.newItem({label: "สูงกว่าชั้นประถมศึกษา", rightText: "3", value : "3", variableHeight: true});
				highlight("txt_list", "value", lcedu);
				b_score.performTransition("text_input", 1, "slide", null);
			} else {
				if (cval == "1") {
					var n1 = parseInt(bd1.substr(0, 1));
					var n2 = parseInt(bd1.substr(1, 1));
					var n3 = parseInt(bd1.substr(2, 1));
					var n4 = parseInt(bd1.substr(3, 1));
					var n5 = parseInt(bd1.substr(4, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "รับรู้วันเวลา");
					sw2list("b_detail_list", "sw_bd1", "วันที่", n1, "bd1", "brn1");
					sw2list("b_detail_list", "sw_bd2", "วัน", n2);
					sw2list("b_detail_list", "sw_bd3", "เดือน", n3);
					sw2list("b_detail_list", "sw_bd4", "ปี", n4);
					sw2list("b_detail_list", "sw_bd5", "ฤดู", n5);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "2") {
					var n1 = parseInt(bd2.substr(0, 1));
					var n2 = parseInt(bd2.substr(1, 1));
					var n3 = parseInt(bd2.substr(2, 1));
					var n4 = parseInt(bd2.substr(3, 1));
					var n5 = parseInt(bd2.substr(4, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "รับรู้สถานที่");
					sw2list("b_detail_list", "sw_bd1", "บ้านเลขที่", n1, "bd2", "brn2");
					sw2list("b_detail_list", "sw_bd2", "หมู่บ้าน", n2);
					sw2list("b_detail_list", "sw_bd3", "อำเภอ", n3);
					sw2list("b_detail_list", "sw_bd4", "จังหวัด", n4);
					sw2list("b_detail_list", "sw_bd5", "ภาค", n5);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "3") {
					var n1 = parseInt(bd3.substr(0, 1));
					var n2 = parseInt(bd3.substr(1, 1));
					var n3 = parseInt(bd3.substr(2, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "จดจำ พูดตาม 3 อย่าง");
					sw2list("b_detail_list", "sw_bd1", "ดอกไม้", n1, "bd3", "brn3");
					sw2list("b_detail_list", "sw_bd2", "แม่น้ำ", n2);
					sw2list("b_detail_list", "sw_bd3", "รถไฟ", n3);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "4") {
					var n1 = parseInt(bd4.substr(0, 1));
					var n2 = parseInt(bd4.substr(1, 1));
					var n3 = parseInt(bd4.substr(2, 1));
					var n4 = parseInt(bd4.substr(3, 1));
					var n5 = parseInt(bd4.substr(4, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "คำนวณเลข");
					sw2list("b_detail_list", "sw_bd1", "100 - 7 =", n1, "bd4", "brn4");
					sw2list("b_detail_list", "sw_bd2", "93 - 7 =", n2);
					sw2list("b_detail_list", "sw_bd3", "86 - 7 =", n3);
					sw2list("b_detail_list", "sw_bd4", "79 - 7 =", n4);
					sw2list("b_detail_list", "sw_bd5", "72 - 7 =", n5);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "5") {
					var n1 = parseInt(bd5.substr(0, 1));
					var n2 = parseInt(bd5.substr(1, 1));
					var n3 = parseInt(bd5.substr(2, 1));
					var n4 = parseInt(bd5.substr(3, 1));
					var n5 = parseInt(bd5.substr(4, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "สมาธิ มะนาว ถอยหลัง");
					sw2list("b_detail_list", "sw_bd1", "ว", n1, "bd5", "brn5");
					sw2list("b_detail_list", "sw_bd2", "า", n2);
					sw2list("b_detail_list", "sw_bd3", "น", n3);
					sw2list("b_detail_list", "sw_bd4", "ะ", n4);
					sw2list("b_detail_list", "sw_bd5", "ม", n5);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "6") {
					var n1 = parseInt(bd6.substr(0, 1));
					var n2 = parseInt(bd6.substr(1, 1));
					var n3 = parseInt(bd6.substr(2, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "ความจำระยะสั้น ของ 3 อย่าง");
					sw2list("b_detail_list", "sw_bd1", "ดอกไม้", n1, "bd6", "brn6");
					sw2list("b_detail_list", "sw_bd2", "แม่น้ำ", n2);
					sw2list("b_detail_list", "sw_bd3", "รถไฟ", n3);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "7") {
					var n1 = parseInt(bd7.substr(0, 1));
					var n2 = parseInt(bd7.substr(1, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "เรียกชื่อของ 2 อย่าง");
					sw2list("b_detail_list", "sw_bd1", "เรียก ดินสอ ถูกต้อง", n1, "bd7", "brn7");
					sw2list("b_detail_list", "sw_bd2", "เรียก นาฬิกา ถูกต้อง", n2);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "8") {
					var n1 = parseInt(bd8.substr(0, 1));
					var n2 = parseInt(bd8.substr(1, 1));
					var n3 = parseInt(bd8.substr(2, 1));
					var n4 = parseInt(bd8.substr(3, 1));
					var n5 = parseInt(bd8.substr(4, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "พูดตามได้ถูกต้อง");
					sw2list("b_detail_list", "sw_bd1", "ใคร", n1, "bd8", "brn8");
					sw2list("b_detail_list", "sw_bd2", "ใคร่", n2);
					sw2list("b_detail_list", "sw_bd3", "ขาย", n3);
					sw2list("b_detail_list", "sw_bd4", "ไข่", n4);
					sw2list("b_detail_list", "sw_bd5", "ไก่", n5);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (cval == "9") {
					var n1 = parseInt(bd9.substr(0, 1));
					var n2 = parseInt(bd9.substr(1, 1));
					var n3 = parseInt(bd9.substr(2, 1));
					clearList("b_detail_list");
					b_detail_title.set("label", "ทำตามคำบอก");
					sw2list("b_detail_list", "sw_bd1", "รับกระดาษด้วยมือขวา", n1, "bd9", "brn9");
					sw2list("b_detail_list", "sw_bd2", "พับครึ่งกระดาษ", n2);
					sw2list("b_detail_list", "sw_bd3", "วางไว้ที่โต๊ะ/เตียง", n3);
					b_score.performTransition("b_detail", 1, "slide", null);
				}
				if (csw == "sw_brn10") {
					var sw = sw_status("b_score_list", "sw_brn10");
					if (sw == "on") {brn10 = 1;}
					else {brn10 = 0;}
				}
				if (csw == "sw_brn11") {
					var sw = sw_status("b_score_list", "sw_brn11");
					if (sw == "on") {brn11 = 1;}
					else {brn11 = 0;}
				}
				if (csw == "sw_brn12") {
					var sw = sw_status("b_score_list", "sw_brn12");
					if (sw == "on") {brn12 = 1;}
					else {brn12 = 0;}
				}
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// b_detail     /////////////////
///////////////////////////////
		//////////////////
		//// Function /////
		//////////////////
		
		//////////////////
		//// Register ////
		//////////////////
		var b_detail = reg.byId("b_detail");
		var back_b_detail = reg.byId("back_b_detail");
		var save_b_detail = reg.byId("save_b_detail");
		var b_detail_title = reg.byId("b_detail_title");
		var b_detail_list = reg.byId("b_detail_list");
		//////////////////
		//// Events //////
		//////////////////
		on(b_detail_title, "click", function() {
			var issave = save_b_detail.get("focused");
			if (issave == true) {
				var cdetail = "";
				// Save brain_detail ////////////////////////////////////////////////
				var cobj = b_detail_list.getChildren();
				// ตัวแปรที่ Return รายละเอียด 100110
				var dmy = cobj[0].var1;
				// ตัวแปรที่แสดงผลรวม 1-5 คะแนน
				var cbrn = cobj[0].var2;
				// กำหนดเป็น 0 ก่อน
				var cmacro = cbrn + "=0";
				eval(cmacro);
				
				var nrec = cobj.length
				for (i = 1; i < nrec +1; i++) {
					csw = "sw_bd" + i.toString();
					var cval = sw_status("b_detail_list", csw);
					if (cval == "on") {
						cdetail = cdetail + "1";
						var cmacro1 = cbrn + "=" + cbrn + "+1";
						eval(cmacro1);}
					else {cdetail = cdetail + "0";}
				}
				var cmacro2 = dmy + "='" + cdetail + "'";
				eval(cmacro2);
				
				brain_score();
				highlight("b_score_list", "value", cbrn.replace("brn", ""));
				b_detail.performTransition("b_score", -1, "swirl", null);
				///////////////////////////////////////////////////////////
			} else {back("back_b_detail", "b_detail", "b_score", "b_detail_list");}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// PCU    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var pcu = reg.byId("pcu");
		var pcu_title = reg.byId("pcu_title");
		var back_pcu = reg.byId("back_pcu");
		var pcu_list = reg.byId("pcu_list");
		//////////////////
		//// Events //////
		//////////////////
		on(pcu_title, "click", function() {
			var isback = back_pcu.get("focused");
			if (isback == true) {
				back("back_pcu", "pcu", "main_menu");
			}
		});
		
		on(pcu_list, "click", function() {
			var cobj = selected_row("pcu_list");
			var lcpcu = cobj.hosp_id;
			list("mooban_list", "pcu_village_list.php?hosp_id=" + lcpcu);
			pcu.performTransition("mooban", 1, "slide", null);
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Mooban    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var mooban = reg.byId("mooban");
		var mooban_title = reg.byId("mooban_title");
		var back_mooban = reg.byId("back_mooban");
		var mooban_list = reg.byId("mooban_list");
		var m_store = new ifws({data:{items:[]}});
		mooban_list.store = null;
		mooban_list.setStore(m_store);
		//////////////////
		//// Events //////
		//////////////////
		on(mooban_title, "click", function() {
			var isback = back_mooban.get("focused");
			if (isback == true) {
				back("back_mooban", "mooban", "pcu");
			}
		});
		
		on(mooban_list, "click", function() {
			var cobj = selected_row("mooban_list");
			var lctown = cobj.town_id;
			var lcmooban = cobj.label;
			if (lcmenu == "8") {
				var cobj = php2obj("town_hi.php?town_id=" + lctown);
				var oldhi = cobj.hi_value;
				lcauto = cobj.auto_id;
				var newhi = "";
				if (oldhi == undefined) {oldhi = "ไม่มีข้อมูล";}
				var lcsave = 'mysave("hi_save.php?staffcid=" + lcstaffcid + "&town_id=" + lctown + "&auto_id=" + lcauto + "&hi_index=" + newhi)';
				dialog(lcmooban + " HI=" + oldhi, lcsave, "newhi", "c", "กรุณากรอก HI ที่ต้องการ");
			} else {
				list("house_list", "house_list.php?town_id=" + lctown);
				mooban.performTransition("house", 1, "slide", null);
			}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// House    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var house = reg.byId("house");
		var house_title = reg.byId("house_title");
		var back_house = reg.byId("back_house");
		var adr_search = reg.byId("adr_search");
		var house_list = reg.byId("house_list");
		var h_store = new ifws({data:{items:[]}});
		house_list.store = null;
		house_list.setStore(h_store);
		//////////////////
		//// Events //////
		//////////////////
		on(house_title, "click", function() {
			var isback = back_house.get("focused");
			if (isback == true) {
				back("back_house", "house", "mooban");
			}
		});
		
		on(adr_search, "keyup", function() {
			lcsearchtext = adr_search.get("value").trim().toUpperCase();
	    	house_list.setQuery({label:lcsearchtext + "*"});
		});
		
		on(house_list, "click", function() {
			var cobj = selected_row("house_list");
			var cadr = cobj.home_adr;
			var ctown = cobj.town_id;
			list("adr_list", "pop_list.php?home_adr=" + cadr + "&town_id=" + ctown);
			house.performTransition("adr", 1, "slide", null);
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// ADR    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var adr = reg.byId("adr");
		var adr_title = reg.byId("adr_title");
		var back_adr = reg.byId("back_adr");
		var adr_list = reg.byId("adr_list");
		var a_store = new ifws({data:{items:[]}});
		adr_list.store = null;
		adr_list.setStore(a_store);
		//////////////////
		//// Function ////
		//////////////////
		function adr_click() {
			var pop = php2obj("cid_pop.php?cid=" + lccid);
			lcage = getAge(pop.birthdate, "");
			lcname = pop.fname + " " + pop.lname;
			lcsex = pop.sex;
			lcaddress = pop.home_adr + " " + pop.ban + " " + pop.town;
			lctel1 = pop.telephone;
			ppsw = pop.psw;
			var osm = php2obj("cid_osm.php?cid=" + lccid);
			lcosm = osm.osm;
			lctel2 = osm.osm_phone;
			var cobj = php2obj("cid2brain.php?cid=" + lccid);
			if (cobj !== "") {
				lcedu = cobj.educate;
				nbrn = parseInt(cobj.nbrn);
			} else {
				nbrn = 0;
				lcedu = "";
			}
			var cobj = php2obj("cid2adl.php?cid=" + lccid);
			if (cobj !== "") {nadl = cobj.nadl;
			}  else {nadl = 0}
			nlevel = adl_brain(nadl, nbrn, parseInt(lcedu));

			person_detail();
			adr.performTransition("person", 1, "swirl", null);
			spinner.stop();
		}

		//////////////////
		//// Events //////
		//////////////////
		on(adr_title, "click", function() {
			var isback = back_adr.get("focused");
			if (isback == true) {
				back("back_adr", "adr", "house");
			}
		});
		
		on(adr_list, "click", function() {
			var cobj = selected_row("adr_list");
			lccid = cobj.cid;
			cid_box.set("value", lccid);
			spinner.spin(adr.domNode);
			setTimeout(function() {adr_click()}, 500);
		});


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