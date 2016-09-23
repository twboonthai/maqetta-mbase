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
//// User Defined Function

		var dialogoverlay = document.getElementById("dialogoverlay");
 		var dialogcid = document.getElementById("dialogcid");
		var dialogbox = document.getElementById("dialogbox");
		var dialogok = reg.byId("dialogok");
		var dialogno = reg.byId("dialogno");
		var dialogtxt = reg.byId("dialogtxt");
		
		on(dialogok, "click", function() {
			dialogbox.style.display = "none";
			dialogcid.style.display = "none";
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
	     
	    var dialogpps = document.getElementById("dialogpps");
		var pps_dialog = document.getElementById("pps_dialog");
		var pps_no = reg.byId("pps_no");
		var pps_yes = reg.byId("pps_yes");
		var pps_text = reg.byId("pps_text");
	     
	     function dialogshow1(dialogtext) {
	     	pps_text.set("value", dialogtext);
			dialogpps.style.display = "block";
			dialogpps.style.height = "600px";
			dialogpps.style.width = "320px";
			pps_dialog.style.display = "block";
	     }
	     on(pps_no, "click", function() {
			dialogpps.style.display = "none";
			pps_dialog.style.display = "none";
		});
		
		on(pps_yes, "click", function() {
			dialogpps.style.display = "none";
			pps_dialog.style.display = "none";
			lcreturn = lnpps1.toString() + lnpps2.toString() + lnpps3.toString() + lnpps4.toString() + lnpps5.toString();
			lnppsscore = pps_score(lcreturn);
			//// บันทึกข้อมูล PPS
			xhr.get({
				url: ip_address + "pps_upd.php",
				content: {staff_cid: gcstaffid, cid: lccid, pps_date: lcadldate, pps: lcreturn, npps: lnppsscore },
				headers: { "X-Requested-With": null },
				load: function(result) 
					{
						var adl_new1 = roundrectdata("pps_cid.php", "cid=" + lccid , "pps_series", "item.cdate + '  --> ' + item.npps + '%'", "item.pps_date", "item.pps");
						//// แสดง Graph /////////////////////////////////////////////////////////////////////////////////////////////
					  	xhr.get({
							url: ip_address + "pps_cid.php",
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
									item_list[i] = parseFloat(item[i]["npps"]);
								}
								var pps_chart = Chart(dom.byId("pps_chart"));
								pps_chart.destroy();
								var pps_chart = Chart(dom.byId("pps_chart")).
							        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true  }).
							        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
							        addPlot("default", { type: Lines }).
							        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
							        addSeries("Series A", item_list, {stroke: {color: "blue", width: 4}}).
							        render();
								// จบการแสดง Graph
							},
							error: function() {
								alert("Failed PPS Graph !");
							}
					  	});
						
					},
				error: function() {alert("Failed PPS Save !");}
			});
			//////////////////////////////////////////////////////
			pps_main.performTransition("pps_person", -1, "slide", null);
		});

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
		
//// Define Object	
		var address = reg.byId("address");
		var adl_title = reg.byId("adl_title");
		var agesex = reg.byId("agesex");
		var ap_back = reg.byId("ap_back");
		var brain_person = reg.byId("brain_person");
		var brain_title = reg.byId("brain_title");
		var btn_adl = reg.byId("btn_adl");
		var btn_brain = reg.byId("btn_brain");
		var btn_pps = reg.byId("btn_pps");
		var btn_psw = reg.byId("btn_psw");
		var care_giver = reg.byId("care_giver");
		var cid = reg.byId("cid");
		var complication = reg.byId("complication");
		var device_need = reg.byId("device_need");
		var osm_id = reg.byId("osm_id");
		var osm_save = reg.byId("osm_save");
		var person_name = reg.byId("person_name");
		var phone1_btn = reg.byId("phone1_btn");
		var phone1_txt = reg.byId("phone1_txt");
		var pop_search = reg.byId("pop_search");
		var pop_pps_title = reg.byId("pop_pps_title");
		var pop_psw = reg.byId("pop_psw");
		var problem = reg.byId("problem");
		var staff_back = reg.byId("staff_back");
		var staff_v1 = reg.byId("staff_v1");
		var staff_v2 = reg.byId("staff_v2");

//// 1. Back to Staff
		on(ap_back, "click", function() {
			staff_v2.performTransition("staff_v1", -1, "slide", null);
		});
//// 2. ค้นเป้าหมายจากรหัสประชาชน
		on(cid, "keyup", function() {
     		lcuser = cid.get("value");
			lnLength = lcuser.length;
			if (lnLength == 13) {
				person_name.set("value", "");
				agesex.set("value", "");
				osm_id.set("value", "");
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
							
							if (lnlen > 16) {
								lcgiver = aresult[15];
								if (lcgiver.length > 0) {
									lcgiver = aresult[15].trim()+ "  [" + aresult[16].trim() + "]";
									lcdevice = aresult[17].trim();
									lcneed = aresult[18].trim();
									lcecon = aresult[19].trim();
									lcdisease = aresult[20].trim();
									care_giver.set("value", lcgiver);
									device_need.set("value", lcdevice + " [OK]   " + lcneed + " [Need]");
									problem.set("value", lcecon);
									complication.set("value", lcdisease);
								}
								else {}
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
						btn_adl.focus(true);
					},
					error: function() {
						var lcalert = "ไม่พบรหัสประชาชน xxx " + lccid + " \n\nกรุณาตรวจสอบ !!!";
						dialogshow(lcalert);
					}
				});
			}
		 });

//// 3. โทรศัพท์ หาเป้าหมาย
		on(phone1_btn, "click", function() {
			var phone = phone1_txt.get("value");
			if (phone.length < 9) {
				var lcalert = "หมายเลขโทรศัพท์ไม่ถูกต้อง \n\nกรุณาตรวจสอบ !!!";
				dialogshow(lcalert);
			}
			else {
				if (phone.length == 10) {
					if (phone.substr(0, 1) == "0") {phone = phone.substr(1, 9);}
				}
				window.location.href = "tel:+66" + phone;
			}
		});
//// 4. ระบุ อสม.ประจำตัวเป้าหมาย
		on(osm_save, "click", function() {
			var lcosmid = osm_id.get("value");
			xhr.get({
				url: ip_address + "osm_save.php",
				content: {cid: lccid, osm_id: lcosmid},
				headers: { "X-Requested-With": null },
				load: function() {
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
				},
				error: function() {}
			});
		});

//// 5. ADL
		on(btn_adl, "click", function() {
			adl_title.set("label", "ADL : " + lcname);
			btn_adl.set("checked", false);
			btn_pps.set("checked", false);
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
			staff_v2.performTransition("adl_person", 1, "slide", null);
		 });

//// 6. Brain
		on(btn_brain, "click", function() {
			brain_title.set("label", "สมอง : " + lcname);
			btn_adl.set("checked", false);
			btn_pps.set("checked", false);
			btn_brain.set("checked", false);
			list("brain_series", "brain_cid.php?cid=" + lccid);
			//// แสดง Graph  Brain /////////////////////////////////////////////////////////////////////////////////////////////
		  	xhr.get({
				url: ip_address + "brain_cid.php",
				content: { cid: lccid, ord: "1" },
				headers: { "X-Requested-With": null },
				load: function(result) {
					// กำจัด chr(10) chr(13)
				   	var json1 = result.replace(/[\n\r]*/g,'');
				   	var myData = eval("(" + json1 + ")");
				   	// ผล Brain แสดงเป็น Graph
				   	var item = myData.items;
				   	var item_list = [];
				   	var item_cnt = item.length;
					for (i = 0; i < item_cnt; i++)
					{
						item_list[i] = parseFloat(item[i]["rightText"]);
					}
					var brain_chart = Chart(dom.byId("brain_chart"));
					brain_chart.destroy();
					var brain_chart = Chart(dom.byId("brain_chart")).
				        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true  }).
				        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
				        addPlot("default", { type: Lines }).
				        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
				        addSeries("Series A", item_list, {stroke: {color: "blue", width: 4}}).
				        render();
					// จบการแสดง Graph
				},
				error: function() {
					alert("Failed Brain Graph !");
				}
		  	});
		   	staff_v2.performTransition("brain_person", 1, "slide", null);
		 });

//// 7. PPS
		on(btn_pps, "click", function() {
			pop_pps_title.set("label", "PPS : " + lcname);
			btn_adl.set("checked", false);
			btn_pps.set("checked", false);
			btn_brain.set("checked", false);
			list("pps_series", "pps_cid.php?cid=" + lccid);
			//// แสดง Graph  PPS/////////////////////////////////////////////////////////////////////////////////////////////
		  	xhr.get({
				url: ip_address + "pps_cid.php",
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
						item_list[i] = parseFloat(item[i]["npps"]);
					}
					var pps_chart = Chart(dom.byId("pps_chart"));
					pps_chart.destroy();
					var pps_chart = Chart(dom.byId("pps_chart")).
				        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true  }).
				        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
				        addPlot("default", { type: Lines }).
				        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
				        addSeries("Series A", item_list, {stroke: {color: "blue", width: 4}}).
				        render();
					// จบการแสดง Graph
				},
				error: function() {
					alert("Failed PPS Graph !");
				}
		  	});
		  	staff_v2.performTransition("pps_person", 1, "slide", null);
		});
		
		//// 8. กำหนด Password ให้ ผู้กรอกข้อมูล HI/CI
		on(btn_psw, "click", function() {
			var lcpsw = pop_psw.get("value");
			xhr.get({
				url: ip_address + "psw_save.php",
				content: {cid: lccid, psw: lcpsw},
				headers: { "X-Requested-With": null },
				load: function() {alert ("บันทึกรหัสผ่าน เรียบร้อยแล้ว ...");},
				error: function() {alert("Failed Password Save!");}
			});
		});

     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});