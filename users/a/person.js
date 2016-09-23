// Public Variables
var lccid = "";
var lctown = "";
var lctownname = "";
var lcname = "";
var lcsex = "";
var lcphone1 = "";
var lcpsw = "";
var lcunit = "1";
var lcmooban = "1";

function mydate(edate, withtime)
 {
 	var mday = edate.getDate();
 	var mmonth = edate.getMonth() + 1;
 	var myear = edate.getFullYear();
 	var nhour = edate.getHours();
 	var mhour = nhour.toString();
 	if(mhour.length == 1){mhour = "0" + mhour;}
 	var nmin = edate.getMinutes();
 	var mmin = nmin.toString();
 	if(mmin.length == 1){mmin = "0" + mmin;}
 	if (typeof(withtime) == 'undefined')
 	{
 	return myear.toString() + "." + mmonth.toString() + "." + mday.toString();
 	}
 	else
 	{
 	return myear.toString() + "." + mmonth.toString() + "." + mday.toString() + " " + mhour + ":" + mmin + " น.";
 	}
 }

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

		var hi_box = reg.byId("hi_box");
		var hi_list = reg.byId("hi_list");
		var hi_town = reg.byId("hi_town");
		var unit1 = reg.byId("unit1");
		var unit2 = reg.byId("unit2");
		var unit3 = reg.byId("unit3");
		var unit4 = reg.byId("unit4");
		var unit5 = reg.byId("unit5");
		var unit6 = reg.byId("unit6");
		
		on(unit1, "click", function() {
			lcunit = "1";
			unit1.domNode.style.backgroundImage = 'url("right.jpg")';
			unit2.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit3.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit4.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit5.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit6.domNode.style.backgroundImage = 'url("blank.jpg")';
			list("hi_list", "tumbon_list.php?ampur=" + lctown.substr(0, 4));
			hi_town.set("open", true);
			lcmooban = "1";
		});
		on(unit2, "click", function() {
			lcunit = "2";
			hi_box.set("value", "");
			unit1.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit2.domNode.style.backgroundImage = 'url("right.jpg")';
			unit3.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit4.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit5.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit6.domNode.style.backgroundImage = 'url("blank.jpg")';
			list("hi_list", "ci_list.php?tumbon=" + lctown.substr(0, 6) + "&type=001");
			hi_town.set("open", true);
		});
		on(unit3, "click", function() {
			lcunit = "3";
			hi_box.set("value", "");
			unit1.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit2.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit3.domNode.style.backgroundImage = 'url("right.jpg")';
			unit4.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit5.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit6.domNode.style.backgroundImage = 'url("blank.jpg")';
			list("hi_list", "ci_list.php?tumbon=" + lctown.substr(0, 6) + "&type=002");
			hi_town.set("open", true);
		});
		on(unit4, "click", function() {
			lcunit = "4";
			hi_box.set("value", "");
			unit1.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit2.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit3.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit4.domNode.style.backgroundImage = 'url("right.jpg")';
			unit5.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit6.domNode.style.backgroundImage = 'url("blank.jpg")';
			list("hi_list", "ci_list.php?tumbon=" + lctown.substr(0, 6) + "&type=003");
			hi_town.set("open", true);
		});
		on(unit5, "click", function() {
			lcunit = "5";
			hi_box.set("value", "");
			unit1.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit2.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit3.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit4.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit5.domNode.style.backgroundImage = 'url("right.jpg")';
			unit6.domNode.style.backgroundImage = 'url("blank.jpg")';
			list("hi_list", "ci_list.php?tumbon=" + lctown.substr(0, 6) + "&type=004");
			hi_town.set("open", true);
		});
		on(unit6, "click", function() {
			lcunit = "6";
			hi_box.set("value", "");
			unit1.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit2.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit3.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit4.domNode.style.backgroundImage = 'url("rblank.jpg")';
			unit5.domNode.style.backgroundImage = 'url("blank.jpg")';
			unit6.domNode.style.backgroundImage = 'url("right.jpg")';
			list("hi_list", "ci_list.php?tumbon=" + lctown.substr(0, 6) + "&type=005");
			hi_town.set("open", true);
		});
		
		search("hi_box", "hi_town", "hi_list");
		
		on(hi_list, "click", function() {
			var all_list = hi_list.getChildren();
			// เลือกหมู่บ้าน
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
			if(lcunit=="1") {
				if(lcmooban == "1") {
					lcmooban = "0";
				   	var lctumbon = all_list[s].town_id;
					list("hi_list", "mooban_list.php?tumbon=" + lctumbon.substr(0, 6));
				} else {
				   	lctown = all_list[s].town_id;
				   	lctownname = all_list[s].label;
				   	hi_box.set("value", lctownname);
					hi_town.set("open", false);
				}
			} else if(lcunit=="2") {
				lcci_id = all_list[s].ci_id;
			   	lctownname = "วัด" + all_list[s].label;
			   	hi_box.set("value", lctownname);
				hi_town.set("open", false);
			} else if(lcunit=="3") {
				lcci_id = all_list[s].ci_id;
			   	lctownname = all_list[s].label;
			   	hi_box.set("value", lctownname);
				hi_town.set("open", false);
			} else if(lcunit=="4") {
				lcci_id = all_list[s].ci_id;
			   	lctownname = "ศูนย์เด็ก" + all_list[s].label;
			   	hi_box.set("value", lctownname);
				hi_town.set("open", false);
			} else if(lcunit=="5") {
				lcci_id = all_list[s].ci_id;
			   	lctownname = "อบต." + all_list[s].label;
			   	hi_box.set("value", lctownname);
				hi_town.set("open", false);
			} else if(lcunit=="6") {
				lcci_id = all_list[s].ci_id;
			   	lctownname = all_list[s].label;
			   	hi_box.set("value", lctownname);
				hi_town.set("open", false);
			}
		});

		var dialogoverlay = document.getElementById("dialogoverlay");
		var dialogbox = document.getElementById("dialogbox");
		var dialogok = reg.byId("dialogok");
		var dialogtxt = reg.byId("dialogtxt");
		
		var person_v1 = reg.byId("person_v1");
		
		on(dialogok, "click", function() {
			dialogbox.style.display = "none";
			dialogoverlay.style.display = "none";
		});

		var back_pop = reg.byId("back_pop");
		on(back_pop, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/index.html";
		});

		var agesex = reg.byId("agesex");
		var btn_cid = reg.byId("btn_cid");
     	var btn_health = reg.byId("btn_health");
     	var btn_hi = reg.byId("btn_hi");
     	var cid = reg.byId("cid");
//// กรอกรหัสประชาชน /////////////////////////////
		on(cid, "keyup", function() {
     		lcuser = cid.get("value");
			lnLength = lcuser.length;
			if (lnLength == 13) {
				///////////////////////////////
				person_name.set("value", "");
				agesex.set("value", "");
				osm.set("value", "");
				phone0_txt.set("value", "");
				phone1_txt.set("value", "");
				phone2_txt.set("value", "");
				staff1.set("value", "");
				staff2.set("value", "");
				lccid = cid.get("value");
				
				xhr.get({
					url: ip_address + "cid2txt.php",
					content: {cid: lccid},
					headers: { "X-Requested-With": null },
					load: function(result) {
						if (result.length == 0) {
							var lcalert = "ไม่พบรหัสประชาชน " + lccid + "\n กรุณาตรวจสอบ";
							dialogshow(lcalert);
						}
						else {
							var aresult = result.split(",");
							lcname = aresult[1].trim() + "  " + aresult[2].trim();
							lcsex = "เพศ" + aresult[5] + "  อายุ " + aresult[4] + " ปี";
							person_name.set("value", lcname);
							agesex.set("value", lcsex);
							lctownname = aresult[8].trim();
							lctown = aresult[10].trim();
							lcpsw = aresult[11].trim();
							lcstaff1 = aresult[12].trim();
							lcphone1 = aresult[13];
							lcstaff2 = aresult[14].trim();
							lcphone2 = aresult[15];
							staff1.set("value", lcstaff1);
							staff2.set("value", lcstaff2);
							phone1_txt.set("value", lcphone1);
							phone2_txt.set("value", lcphone2);
							hi_box.set("value", lctownname);
							list("hi_list", "tumbon_list.php?ampur=" + lctown.substr(0, 4));
						}
						//// รายละเอียด อสม.
						xhr.get({
							url: ip_address + "cid2osm.php",
							content: {cid: lccid},
							headers: { "X-Requested-With": null },
							load: function(resultosm) {
								var aresultosm = resultosm.split(",");
								lcosmphone = aresultosm[2].trim();
								lcosm = aresultosm[1].trim();
								osm.set("value", lcosm);
								phone0_txt.set("value", lcosmphone);
							},
							error: function() {}
						});
					},
					error: function() {
						var lcalert = "ไม่พบรหัสประชาชน " + lccid + " \n\nกรุณาตรวจสอบ !!!";
						dialogshow(lcalert);
					}
				});
				btn_cid.focus(true);
				//////////////////////////////
			}
		});
/////////////////////////////////////////////////
     	var emergency = reg.byId("emergency");
     	var h_lab = reg.byId("h_lab");
     	var store_hlab = new ifws({data:{items:[]}});
		h_lab.store = null;
		h_lab.setStore(store_hlab);
		
     	var h_list = reg.byId("h_list");
     	var store_hlist = new ifws({data:{items:[]}});
		h_list.store = null;
		h_list.setStore(store_hlist);
     	var health_bmi = reg.byId("health_bmi");
     	var health_bp = reg.byId("health_bp");
     	var health_data = reg.byId("health_data");
     	var health_lab = reg.byId("health_lab");
     	var health_main = reg.byId("health_main");
     	var health_xray = reg.byId("health_xray");
     	var health_us = reg.byId("health_us");
     	var health_ekg = reg.byId("health_ekg");
     	var health_breast = reg.byId("health_breast");
     	var health_cervix = reg.byId("health_cervix");
     	var health_conclusion = reg.byId("health_conclusion");
     	var hb_back = reg.byId("hb_back");
     	var hc_back = reg.byId("hc_back");
     	var hcb_back = reg.byId("hcb_back");
     	var hcx_back = reg.byId("hcx_back");
     	var hd_back = reg.byId("hd_back");
     	var he_back = reg.byId("he_back");
     	var hi_back = reg.byId("hi_back");
     	var hi_index = reg.byId("hi_index");
     	var hi_save = reg.byId("hi_save");
     	var hi_town = reg.byId("hi_town");
     	var hi_value = reg.byId("hi_value");
	 	var hl_back = reg.byId("hl_back");
	 	var hm_back = reg.byId("hm_back");
	 	var hp_back = reg.byId("hp_back");
	 	var hu_back = reg.byId("hu_back");
	 	var hx_back = reg.byId("hx_back");
	 	var l1_back = reg.byId("l1_back");
	 	var l2_back = reg.byId("l2_back");
	 	var l3_back = reg.byId("l3_back");
	 	var l4_back = reg.byId("l4_back");
	 	var l5_back = reg.byId("l5_back");
	 	var l6_back = reg.byId("l6_back");
	 	var l7_back = reg.byId("l7_back");
	 	var l8_back = reg.byId("l8_back");
	 	var l9_back = reg.byId("l9_back");
	 	var l10_back = reg.byId("l10_back");
	 	var lab_cbc = reg.byId("lab_cbc");
	 	var lab_fbs = reg.byId("lab_fbs");
	 	var lab_lipid = reg.byId("lab_lipid");
	 	var lab_kidney = reg.byId("lab_kidney");
	 	var lab_liver = reg.byId("lab_liver");
	 	var lab_ua = reg.byId("lab_ua");
	 	var lab_stool = reg.byId("lab_stool");
	 	var lab_tumor = reg.byId("lab_tumor");
	 	var lab_hep = reg.byId("lab_hep");
	 	var lab_uric = reg.byId("lab_uric");
	 	var osm = reg.byId("osm");
     	var person_name = reg.byId("person_name");
     	var person_v1 = reg.byId("person_v1");
     	var phone0_txt = reg.byId("phone0_txt");
     	var phone0_btn = reg.byId("phone0_btn");
     	var phone1_txt = reg.byId("phone1_txt");
     	var phone1_btn = reg.byId("phone1_btn");
     	var phone2_txt = reg.byId("phone2_txt");
     	var phone2_btn = reg.byId("phone2_btn");
     	var pop_psw = reg.byId("pop_psw");
     	var staff1 = reg.byId("staff1");
     	var staff2 = reg.byId("staff2");

     function dialogshow(dialogtext) {
     	dialogtxt.set("value", dialogtext);
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height = "600px";
		dialogoverlay.style.width = "320px";
		dialogbox.style.display = "block";
     }
//// Fill List h_list ////
		var list_add = h_list.store.newItem({label: "เส้นรอบเอว", value : "health_data"});
		var list_add = h_list.store.newItem({label: "ดัชนีมวลกาย" , value : "health_bmi"});
		var list_add = h_list.store.newItem({label: "ความดันโลหิต", value : "health_bp"});;
		var list_add = h_list.store.newItem({label: "ผลการตรวจชันสูตร" , value : "health_lab"});
		var list_add = h_list.store.newItem({label: "ภาพถ่ายรังสี", value : "health_xray"});
		var list_add = h_list.store.newItem({label: "อัลตราซาวนด์", value : "health_us"});
		var list_add = h_list.store.newItem({label: "คลื่นไฟฟ้าหัวใจ" , value : "health_ekg"});
		var list_add = h_list.store.newItem({label: "มะเร็งเต้านม (สตรี)", value : "health_breast"});;
		var list_add = h_list.store.newItem({label: "มะเร็งปากมดลูก (สตรี)" , value : "health_cervix"});
		var list_add = h_list.store.newItem({label: "สรุปผล/คำแนะนำ", value : "health_conclusion"});
//// เลือก h_list ทีละข้อ
		on(h_list, "click", function() {	
			//// ระบุรายการที่เลือก
			lcorder = "";
			var all_list = h_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcpage = all_list[s].value;
			//// แสดงรายละเอียด h_list รายข้อ
			health_main.performTransition(lcpage, 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////		
//// Fill List h_lab
		var list_add = h_lab.store.newItem({label: "ความสมบูรณ์เม็ดเลือด", value : "lab_cbc"});
		var list_add = h_lab.store.newItem({label: "ระดับน้ำตาล" , value : "lab_fbs"});
		var list_add = h_lab.store.newItem({label: "ระดับไขมัน", value : "lab_lipid"});;
		var list_add = h_lab.store.newItem({label: "การทำงานของไต" , value : "lab_kidney"});
		var list_add = h_lab.store.newItem({label: "การทำงานของตับ", value : "lab_liver"});
		var list_add = h_lab.store.newItem({label: "การตรวจปัสสาวะ", value : "lab_ua"});
		var list_add = h_lab.store.newItem({label: "การตรวจอุจจาระ" , value : "lab_stool"});
		var list_add = h_lab.store.newItem({label: "สารบ่งชี้มะเร็ง", value : "lab_tumor"});;
		var list_add = h_lab.store.newItem({label: "ไวรัสตับอักเสบ" , value : "lab_hep"});
		var list_add = h_lab.store.newItem({label: "ระดับกรดยูริค (โรคเก้าท์)", value : "lab_uric"});
//// เลือก h_lab ทีละข้อ
		on(h_lab, "click", function() {	
			//// ระบุรายการที่เลือก
			lcorder = "";
			var all_list = h_lab.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcpage = all_list[s].value;
			//// แสดงรายละเอียด h_list รายข้อ
			health_lab.performTransition(lcpage, 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////		

//////////////////////////////////////
//// Back   
//// กด HM_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hm_back, "click", function() {
			health_main.performTransition("person_v1", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HD_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hd_back, "click", function() {
			health_data.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HL_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hl_back, "click", function() {
			health_lab.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HB_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hb_back, "click", function() {
			health_bmi.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HP_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hp_back, "click", function() {
			health_bp.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HX_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hx_back, "click", function() {
			health_xray.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด Hu_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hu_back, "click", function() {
			health_us.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด He_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(he_back, "click", function() {
			health_ekg.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด Hcb_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hcb_back, "click", function() {
			health_breast.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HcX_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hcx_back, "click", function() {
			health_cervix.performTransition("health_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด Hc_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hc_back, "click", function() {
			health_conclusion.performTransition("health_main", -1, "slide", null);
		});
		
//// กด L1-10_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(l1_back, "click", function() {
			lab_cbc.performTransition("health_lab", -1, "slide", null);
		});

		on(l2_back, "click", function() {
			lab_fbs.performTransition("health_lab", -1, "slide", null);
		});

		on(l3_back, "click", function() {
			lab_lipid.performTransition("health_lab", -1, "slide", null);
		});

		on(l4_back, "click", function() {
			lab_kidney.performTransition("health_lab", -1, "slide", null);
		});

		on(l5_back, "click", function() {
			lab_liver.performTransition("health_lab", -1, "slide", null);
		});

		on(l6_back, "click", function() {
			lab_ua.performTransition("health_lab", -1, "slide", null);
		});

		on(l7_back, "click", function() {
			lab_stool.performTransition("health_lab", -1, "slide", null);
		});

		on(l8_back, "click", function() {
			lab_tumor.performTransition("health_lab", -1, "slide", null);
		});

		on(l9_back, "click", function() {
			lab_hep.performTransition("health_lab", -1, "slide", null);
		});

		on(l10_back, "click", function() {
			lab_uric.performTransition("health_lab", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กดปุ่ม CID Search ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(btn_cid, "click", function() {
			person_name.set("value", "");
			agesex.set("value", "");
			osm.set("value", "");
			phone0_txt.set("value", "");
			phone1_txt.set("value", "");
			phone2_txt.set("value", "");
			staff1.set("value", "");
			staff2.set("value", "");
			lccid = cid.get("value");
			
			xhr.get({
				url: ip_address + "cid2txt.php",
				content: {cid: lccid},
				headers: { "X-Requested-With": null },
				load: function(result) {
					if (result.length == 0) {
						var lcalert = "ไม่พบรหัสประชาชน " + lccid + "\n กรุณาตรวจสอบ";
						dialogshow(lcalert);
					}
					else {
						var aresult = result.split(",");
						lcname = aresult[1].trim() + "  " + aresult[2].trim();
						lcsex = "เพศ" + aresult[5] + "  อายุ " + aresult[4] + " ปี";
						person_name.set("value", lcname);
						agesex.set("value", lcsex);
						lctownname = aresult[8].trim();
						lctown = aresult[10].trim();
						lcpsw = aresult[11].trim();
						lcstaff1 = aresult[12].trim();
						lcphone1 = aresult[13];
						lcstaff2 = aresult[14].trim();
						lcphone2 = aresult[15];
						staff1.set("value", lcstaff1);
						staff2.set("value", lcstaff2);
						phone1_txt.set("value", lcphone1);
						phone2_txt.set("value", lcphone2);
						hi_box.set("value", lctownname);
						list("hi_list", "tumbon_list.php?ampur=" + lctown.substr(0, 4));
					}
					//// รายละเอียด อสม.
					xhr.get({
						url: ip_address + "cid2osm.php",
						content: {cid: lccid},
						headers: { "X-Requested-With": null },
						load: function(resultosm) {
							var aresultosm = resultosm.split(",");
							lcosmphone = aresultosm[2].trim();
							lcosm = aresultosm[1].trim();
							osm.set("value", lcosm);
							phone0_txt.set("value", lcosmphone);
						},
						error: function() {}
					});
				},
				error: function() {
					var lcalert = "ไม่พบรหัสประชาชน " + lccid + " \n\nกรุณาตรวจสอบ !!!";
					dialogshow(lcalert);
				}
			});
		});
//// กด Phone0 ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(phone0_btn, "click", function() {
			var phone = phone0_txt.get("value");
			if (phone.length < 9) {
				var lcalert = "หมายเลขโทรศัพท์ไม่ถูกต้อง \n\nกรุณาตรวจสอบ !!!";
				dialogshow(lcalert);
			}
			else {
				//if (phone.length == 10) {
					if (phone.substr(0, 1) == "0") {phone = phone.substr(1);}
				//}
				window.location.href = "tel:+66" + phone;
			}
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	 
//// กด Phone1 ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(phone1_btn, "click", function() {
			var phone = phone1_txt.get("value");
			if (phone.length < 9) {
				var lcalert = "หมายเลขโทรศัพท์ไม่ถูกต้อง \n\nกรุณาตรวจสอบ !!!";
				dialogshow(lcalert);
			}
			else {
				//if (phone.length == 10) {
					if (phone.substr(0, 1) == "0") {phone = phone.substr(1);}
				//}
				window.location.href = "tel:+66" + phone;
			}
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด Phone2 ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(phone2_btn, "click", function() {
			var phone = phone2_txt.get("value");
			if (phone.length < 9) {
				var lcalert = "หมายเลขโทรศัพท์ไม่ถูกต้อง \n\nกรุณาตรวจสอบ !!!";
				dialogshow(lcalert);
			}
			else {
				//if (phone.length == 10) {
					if (phone.substr(0, 1) == "0") {phone = phone.substr(1);}
				//}
				window.location.href = "tel:+66" + phone;
			}
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด Emergency Call ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(emergency, "click", function() {
			window.location.href = "tel:1669";
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด Health ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(btn_health, "click", function() {
			person_v1.performTransition("health_main", 1, "slide", null);
		});
		
//// เลือก Health ทีละข้อ
		on(h_list, "click", function() {	
			//// ระบุรายการที่เลือก
			lcpage = "";
			var all_list = h_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	lcpage = all_list[s].value;
			health_main.performTransition(lcpage, 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////	
//// กรอก HI //////////////////////////////////////////////////////////
		on(btn_hi, "click", function() {
			lcpsw0 = pop_psw.get("value").trim();
			//alert (lctown + " " + lctownname + " " + lcpsw0 + "  " + lcpsw);
			if (lcpsw0 == lcpsw && lcpsw > "") {
				hi_town.set("value", lctownname);
				person_v1.performTransition("hi_index", 1, "slide", null);
			}
			else {alert ("รหัสผ่านไม่ถูกต้อง !!!");}
		});
//// กด HI_back ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hi_back, "click", function() {
			hi_index.performTransition("person_v1", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//// กด HI_save ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(hi_save, "click", function() {
			lnindex = hi_value.get("value");
			var r = confirm("ต้องการบันทึกดัชนีลูกน้ำยุงลาย " + lctownname + " = " + lnindex.toString() + " ?");
			if (r == true) {
				if (lcunit=="1") {
				    xhr.get({
						url: ip_address + "hi_save.php",
						content: {staffcid: lccid, town_id: lctown, hi_index: lnindex},
						headers: { "X-Requested-With": null },
						load: function(result) {
							hi_index.performTransition("person_v1", -1, "slide", null);},
						error: function() {echo ("บันทึกค่าดัชนี ไม่สำเร็จ !!!");}
					});
				}
				else {
					xhr.get({
						url: ip_address + "ci_save.php",
						content: {staffcid: lccid, ci_id: lcci_id, ci_index: lnindex},
						headers: { "X-Requested-With": null },
						load: function(result) {
							hi_index.performTransition("person_v1", -1, "slide", null);},
						error: function() {echo ("บันทึกค่าดัชนี ไม่สำเร็จ !!!");}
					});
				}
				hi_value.set("value", "");
			}
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});