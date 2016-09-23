/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 lcmemid = "";
 lcmemname = "";
 lcaddress = "";
 lccid = "";
 lcbirthdate = "";
 lcappdate = "";
 lcmanager = "";
 lcmngrelation = "";
 ln58 = 0.00;
 lnin = 0.00;
 lnout = 0.00;
 lcuser = "";
 lcpsw = "";
 lcpsx = "";
 lss = 0;
 require([
 	"dojo/ready",
 	"dojo/dom",
 	"dijit/registry",
 	"dojo/on",
 	"dojo/_base/xhr" 
], function(ready, dom, reg, on, xhr){
     ready(function(){
     	var barcode = dom.byId("barcode");
     	
     	var last_update = reg.byId("last_update");
     	var ssdate = php2obj("ss_upddate.php");
     	last_update.set("value", "ปรับปรุงข้อมูลครั้งสุดท้าย วันที่ " + ssdate);
         // logic that requires that Dojo is fully initialized should go here
         var menu_list = reg.byId("menu_list");
         var cm_login = reg.byId("cm_login");
         var cm_menu = reg.byId("cm_menu");
         var menu1 = reg.byId("menu1");
         var menu2 = reg.byId("menu2");
         var menu3 = reg.byId("menu3");
         var menu4 = reg.byId("menu4");
         var menu5 = reg.byId("menu5");
         var view_graph = reg.byId("view_graph");
         var user = reg.byId("user");
         var psw = reg.byId("psw");
         var btn_ok = reg.byId("btn_ok");
         var death_txt = reg.byId("death_txt");
         
         // รายละเอียดสมาชิก
         var memid = reg.byId("memid");
         var memname = reg.byId("memname");
         var birthdate = reg.byId("birthdate");
         var appdate = reg.byId("appdate");
         var address = reg.byId("address");
         var prepaid = reg.byId("prepaid");
         
         // ผู้รับผลประโยชน์
         var manager = reg.byId("manager");
         var mngrelation = reg.byId("mngrelation");
         var inheritance = reg.byId("inheritance");
         
         // ชำระเงินสงเคราะห์
         var pp_list = reg.byId("pp_list");
         var total_in = reg.byId("total_in");
         // จ่ายสงเคราะห์
         var cr_list = reg.byId("cr_list");
         var total_out = reg.byId("total_out");
         // สถานะสมาคม
         var ss_paid = reg.byId("ss_paid");
         var ss_pp = reg.byId("ss_pp");
         var detail = reg.byId("detail");
         var back_list = reg.byId("back_list");
         var paid_list = reg.byId("paid_list");
         
// Log In ////////////////////////////////////////////////////////
		on(user, "keyup", function() {
     		lcuser = user.get("value");
			lnLength = lcuser.length;
			lcuser = user.get("value");
			psw.set("value", "");
			if (lnLength == 13) {
				btn_ok.focus(true);
	         	lcuser = user.get("value");
	         	// ค้นรหัสประชาชน
	         	var member = php2obj("mem_search.php?cid=" + lcuser);
	         	lccid = member.cid;
	         	lcmemid = member.member_id;
	         	if (lcuser == lccid) {
	         		// Barcode ///////////////////////////////////////
	         		JsBarcode("#barcode", lccid, {format: "CODE39"});
	         		//////////////////////////////////////////////////
					lcmemname = member.fname + " " + member.lname;
					lcbirthdate = member.birthdate;
					lcappdate = member.apv_date;
					ln58 = parseFloat(member.balance58);
					lcaddress = member.address;
					lcmanager = member.manager;
					lcmngrelation = member.mng_relate;
					lnin = parseFloat(member.in_amount);
					lnout = parseFloat(member.out_amount);
					memid.set("value", lcmemid);
					memname.set("value", lcmemname);
					lcdeath = member.death_date;
					if (lcdeath.trim() > "") {
						death_txt.set("value", "** เสียชีวิตแล้วเมื่อ " + lcdeath + " **");}
					else {death_txt.set("value", "");}
					address.set("value", lcaddress);
					birthdate.set("value", lcbirthdate);
					appdate.set("value", lcappdate);
					prepaid.set("value", s1000(ln58+lnin-lnout));
					if (ln58+lnin-lnout > 0) {prepaid.domNode.style.color = "blue";}
					else {prepaid.domNode.style.color = "red";}
					lnnet = ln58 + lnin;
					total_in.set("value", s1000(lnnet));
					total_out.set("value", s1000(lnout));
					cm_login.performTransition("cm_menu", 1, "slide", null);
					manager.set("value", lcmanager);
					mngrelation.set("value", lcmngrelation);
					list("inheritance", "memid_inherit.php?member_id=" + lcmemid);
					list("pp_list", "mem_prepaid.php?member_id="+lcmemid);
					list("ss_pp", "mon_prepaid.php");
					list("ss_paid", "ss_credit.php");
				}
					/////////////////////////////////////////////////////
				else {alert ("ไม่พบรหัสประชาชน " + lcuser + " ...");}
			}
         });
/////////////////////////////////////////////////////////////////       
         on(user, "keyup", function() {
     		lcuser = user.get("value");
			lnLength = lcuser.length;
			lcuser = user.get("value");
			psw.set("value", "");
			lcpsx = "";
			lcpsw = "";
			if (lnLength == 13) {
				psw.focus(true);}
		});
// เลือกเดือน แสดงรายละเอียดผู้เสียชีวิต		
		on(ss_paid, "click", function() {
			lss = 1;
			obj = selected_row("ss_paid");
		   	var lnmonth = obj.mdeath;
		   	var lnyear = obj.ydeath;
		   	list("detail", "credit_detail.php?cmonth=" + lnmonth.toString() + "&cyear=" + lnyear.toString());
		   	menu5.performTransition("paid_list", 1, "slide", null);
		});
////////////////////////////////////////////////////////////////////////
// เลือกเดือน แสดงรายละเอียดผู้เสียชีวิต		
		on(cr_list, "click", function() {
			lss = 0;
			obj = selected_row("cr_list");
		   	var lnmonth = obj.mdeath;
		   	var lnyear = obj.ydeath;
			if(lnmonth > 0) {
		   	list("detail", "credit_detail.php?cmonth=" + lnmonth.toString() + "&cyear=" + lnyear.toString());
		   	menu4.performTransition("paid_list", 1, "slide", null);}
		});
//// เลือกรายการเมนู //////////////////////////////////////////////////////
		on(menu_list, "click", function() {
			s = selected_row("menu_list", 1);
		   	if (s==0) {
		   		cm_menu.performTransition("menu1", 1, "slide", null);
		   	}
		   	if (s==1) {
		   		cm_menu.performTransition("menu2", 1, "slide", null);
		   	}
		   	if (s==2) {
		   		cm_menu.performTransition("menu3", 1, "slide", null);
		   	}
		   	if (s==3) {
		   		list("cr_list", "mon_credit.php?member_id="+lcmemid);
		   		cm_menu.performTransition("menu4", 1, "slide", null);
		   	}
		   	if (s==4) {
		   		list("cr_list", "year_credit.php?member_id="+lcmemid);
		   		cm_menu.performTransition("menu4", 1, "slide", null);
		   	}
		   	if (s==5) {
		   		//cm_menu.performTransition("menu5", 1, "slide", null);
		   	}
		   	if (s==6) {
		   		user.set("value", "");
		   		psw.set("value", "");
		   		lcpsw = "";
		   		lcpswx = "";
		   		lcuser = "";
		   		cm_menu.performTransition("cm_login", -1, "slide", null);
		   	}
         });
/////////////////////////////////////////////////////////////////////////
//// Back จากเมนูที่เลือก //////////////////////////////////
         var back_menu1 = reg.byId("back_menu1");
         on(back_menu1, "click", function() {
         	menu1.performTransition("cm_menu", -1, "slide", null);
         });
         
         var back_menu2 = reg.byId("back_menu2");
         on(back_menu2, "click", function() {
         	menu2.performTransition("cm_menu", -1, "slide", null);
         });
         
         var back_menu3 = reg.byId("back_menu3");
         on(back_menu3, "click", function() {
         	menu3.performTransition("cm_menu", -1, "slide", null);
         });
         
         var back_menu4 = reg.byId("back_menu4");
         on(back_menu4, "click", function() {
         	menu4.performTransition("cm_menu", -1, "slide", null);
         });
         
         var back_menu5 = reg.byId("back_menu5");
         on(back_menu5, "click", function() {
         	menu5.performTransition("cm_menu", -1, "slide", null);
         });
         
         var btn_graph = reg.byId("btn_graph");
         on(btn_graph, "click", function() {
         	graph("ss_paid", "mon_case", "ss_chart", "Lines", 6);
         	menu5.performTransition("view_graph", 1, "slide", null);
         });
         
         var back_graph = reg.byId("back_graph");
         on(back_graph, "click", function() {
         	view_graph.performTransition("menu5", -1, "slide", null);
         });
         
         var back_list = reg.byId("back_list");
         on(back_list, "click", function() {
         	if (lss == 1) {paid_list.performTransition("menu5", -1, "slide", null);}
         	else {paid_list.performTransition("menu4", -1, "slide", null);}
         });
///////////////////////////////////////////////////////
     });
});
