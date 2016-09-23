//// ประกาศตัวแปร
llpcu = false;
lctown = "";
lcpcuid = "";
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
//// User Defined Functions ////
		var dialogoverlay = document.getElementById("dialogoverlay");
 		var dialogcid = document.getElementById("dialogcid");
		var dialogbox = document.getElementById("dialogbox");
		var dialogok = reg.byId("dialogok");
		var dialogno = reg.byId("dialogno");
		var dialogtxt = reg.byId("dialogtxt");
		
		on(dialogok, "click", function() {
			dialogbox.style.display = "none";
			dialogcid.style.display = "none";
			if (llpcu == true) {
				//// บันทึก cid ของผู้รับผิดชอบ ในตารางหมู่บ้าน
				xhr.get({
					url: ip_address + "pcu_save.php",
					content: {staff_id: lcpcuid, town_id: lctown},
					headers: { "X-Requested-With": null },
					load: function() {},
					error: function() {}
				});
				llpcu = false;
				pcu_cid.set("value", "");}
			else {}
		});
		on(dialogno, "click", function() {
			dialogbox.style.display = "none";
			dialogcid.style.display = "none";
			if (llpcu == true) {
				llpcu = false;
				pcu_cid.set("value", "");
			}
		});
		
		function dialogshow(dialogtext) {
	     	dialogtxt.set("value", dialogtext);
			dialogcid.style.display = "block";
			dialogcid.style.height = "600px";
			dialogcid.style.width = "320px";
			dialogcid.style.opacity = "0.8";
			dialogcid.style.zindex = "890";
			dialogbox.style.zindex = "900";
			dialogbox.style.display = "block";
	     }
	     
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
		
		function adl_data() {
			xhr.get({
				url: ip_address + "adl_score.php",
				content: {cid: lccid},
				headers: { "X-Requested-With": null },
				load: function(adl_result) {
					xhr.get({
						url: ip_address + "brain_score.php",
						content: {cid: lccid},
						headers: { "X-Requested-With": null },
						load: function(brn_result) {
							ceducation = brn_result.trim().substr(0, 1);
							nedu = parseInt(ceducation);
							cbrain = brn_result.trim().substr(2);
							nbrain = parseInt(cbrain);
							lnGrade = adl_brain(adl_result, nedu, nbrain);
							var adl_level = reg.byId("adl_level");
							adl_level.set("value", lnGrade);},
						error: function() {alert("Failed Adl Score !");}
					});},
				error: function() {alert("Failed Adl Score !");}
			});
		}
////////////////////////////////////////////////////
//// Define Object //////////////////////////////////
		var address = reg.byId("address");
		var adr_back = reg.byId("adr_back");
		var adr_search = reg.byId("adr_search");
		var agesex = reg.byId("agesex");
		var back_adr = reg.byId("back_adr");
		var care_giver = reg.byId("care_giver");
		var cid = reg.byId("cid");
		var complication = reg.byId("complication");
		var device_need = reg.byId("device_need");
		var home_adr = reg.byId("home_adr");
		var house_list = reg.byId("house_list");
		var house_title = reg.byId("house_title");
		var osm_id = reg.byId("osm_id");
		var pcu_back = reg.byId("pcu_back");
		var pcu_cid = reg.byId("pcu_cid");
		var pcu_list = reg.byId("pcu_list");
		var pcu_save = reg.byId("pcu_save");
		var person_name = reg.byId("person_name");
		var phone1_txt = reg.byId("phone1_txt");
		var pop_back = reg.byId("pop_back");
		var pop_list = reg.byId("pop_list");
		var pop_title = reg.byId("pop_title");
		var problem = reg.byId("problem");
		var staff_v1 = reg.byId("staff_v1");
		var staff_v2 = reg.byId("staff_v2");
		var staff_v3 = reg.byId("staff_v3");
		var staff_v4 = reg.byId("staff_v4");
		var staff_v5 = reg.byId("staff_v5");
		var staff_v6 = reg.byId("staff_v6");
		var village_back = reg.byId("village_back");
		var village_list = reg.byId("village_list");
		var village_title = reg.byId("village_title");
		
///////////////////////////////////////////////////
//// ปุ่ม Back ///////////////////////////////////////////////////////////////////////
		on(pcu_back, "click", function() {
			staff_v3.performTransition("staff_v1", -1, "slide", null);
		});
		on(village_back, "click", function() {
			staff_v4.performTransition("staff_v3", -1, "slide", null);
		});
		on(adr_back, "click", function() {
			staff_v5.performTransition("staff_v4", -1, "slide", null);
		});
		on(pop_back, "click", function() {
			staff_v6.performTransition("staff_v5", -1, "slide", null);
		});
		on(back_adr, "click", function() {
			staff_v2.performTransition("staff_v6", -1, "slide", null);
		});
//// เลือก PCU ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(pcu_list, "click", function() {
	     	var all_list = pcu_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break}
		   	}
		   	lcpcu = all_list[s].hosp_id;
		   	lcpcuname = all_list[s].label;
		   	list("village_list", "pcu_village_list.php?hosp_id=" + lcpcu);
		   	village_title.set("label", "PCU : " + lcpcuname);
		   	staff_v3.performTransition("staff_v4", 1, "slide", null);
		 });
///////////////////////////////////////////////////////////////////////////////////
//// เลือก หมู่บ้าน ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(village_list, "click", function() {
	     	var all_list = village_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break}
		   	}
		   	lctown = all_list[s].town_id;
		   	lctownname = all_list[s].label;
		   	list("house_list", "house_list.php?town_id=" + lctown);
		   	staff_v4.performTransition("staff_v5", 1, "slide", null);
		   	house_title.set("label", lctownname);
		 });
///////////////////////////////////////////////////////////////////////////////////
//// กรอกบ้านเลขที่ //////////////////////////////////////////////////////////////////
		on(adr_search, "click", function() {
		   	lchouse = home_adr.get("value").trim();
		   	lchousename = lchouse + "  " + house_title.label;
		   	list("pop_list", "pop_list.php?town_id=" + lctown+ "&home_adr=" + lchouse);
		   	pop_title.set("label", lchousename);
		   	staff_v5.performTransition("staff_v6", 1, "slide", null);
		 });
		 
//// เลือกบ้านเลขที่ จาก List //////////////////////////////////////////////////////////////////////////////////////////////
		on(house_list, "click", function() {
	     	var all_list = house_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break}
		   	}
		   	lchouse = all_list[s].home_adr;
		   	lchousename = all_list[s].label;
		   	list("pop_list", "pop_list.php?town_id=" + lctown+ "&home_adr=" + lchouse);
		   	pop_title.set("label", lchousename);
		   	staff_v5.performTransition("staff_v6", 1, "slide", null);
		 });
///////////////////////////////////////////////////////////////////////////////////
//// เลือกบุคคล ////////////////////////////////////////////////////////////////////////////////////////////////////////
		on(pop_list, "click", function() {
	     	var all_list = pop_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break}
		   	}
		   	lccid = all_list[s].cid;
		   	cid.set("value", lccid);
		   	//// btn_cid Click ////
		   	person_name.set("value", "");
			agesex.set("value", "");
			phone1_txt.set("value", "");
			address.set("value", "")
			lccid = cid.get("value");
			care_giver.set("value", "");
			device_need.set("value", "");
			problem.set("value", "");
			complication.set("value", "");
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
						lnlen = aresult.length;
						lcname = aresult[1].trim() + "  " + aresult[2].trim();
						lcsex = "เพศ" + aresult[5] + "  อายุ " + aresult[4] + " ปี";
						lcphone1 = aresult[6];
						phone1_txt.set("value", lcphone1);
						person_name.set("value", lcname);
						agesex.set("value", lcsex);
						lcadr = aresult[9].trim() + "  " + aresult[8].trim() + " " + aresult[7].trim();
						address.set("value", lcadr);
						
						// หาคะแนน ADL
						adl_data();
	
						if (lnlen > 15) {
							lcgiver = aresult[14];
							if (lcgiver.length > 0) {
								lcgiver = aresult[14].trim()+ "  [" + aresult[15].trim() + "]";
								lcdevice = aresult[16].trim();
								lcneed = aresult[18].trim();
								lcecon = aresult[17].trim();
								lcdisease = aresult[19].trim();
								care_giver.set("value", lcgiver);
								device_need.set("value", lcdevice + " [OK]   " + lcneed + " [Need]");
								problem.set("value", lcecon);
								complication.set("value", lcdisease);
							}
							else {alert ("Here");}
						}
						//// อสม
						xhr.get({
							url: ip_address + "cid2osm.php",
							content: {cid: lccid},
							headers: { "X-Requested-With": null },
							load: function(resultosm) {
								var aresultosm = resultosm.split(",");
								lcosmphone = aresultosm[2].trim();
								lcosm = aresultosm[1].trim();
								osm_id.set("value", lcosm);
								//phone0_txt.set("value", lcosmphone);
							},
							error: function() {}
						});
						
					}
				},
				error: function() {
					var lcalert = "ไม่พบรหัสประชาชน xxx " + lccid + " \n\nกรุณาตรวจสอบ !!!";
					dialogshow(lcalert);
				}
			});
		   	/////////////////////
		   	staff_v6.performTransition("staff_v2", 1, "slide", null);
		 });
///////////////////////////////////////////////////////////////////////////////////
//// บันทึก รพ.สต. ประจำหมู่บ้าน
		on(pcu_save, "click", function() {
			var lcalert = "";
			var village = house_title.get("label");
			lcpcuid = pcu_cid.get("value");
			xhr.get({
				url: ip_address + "cid2txt.php",
				content: {cid: lcpcuid},
				headers: { "X-Requested-With": null },
				load: function(result) {
					if (result.trim().length == 0) {
						lcalert = "ไม่พบรหัสประชาชน " + lcpcuid + "\n กรุณาตรวจสอบ";
					}
					else {
						var aresult = result.split(",");
						lcpcu = aresult[1].trim() + "  " + aresult[2].trim();
						lcalert = "ต้องการบันทึก รพ.สต.ผู้ดูแล\n " + village + " เป็น \n" + lcpcu;
						pcu_cid.set("value", lcpcu);
						llpcu = true;
					}
					dialogshow(lcalert);
				},
				error: function() {
					var lcalert = "ไม่พบรหัสประชาชน xxx " + lcpcuid + " \n\nกรุณาตรวจสอบ !!!";
				}
			});
		});
		
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});