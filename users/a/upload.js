/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/on",
 	"dojo/_base/xhr" // use xhr to make ajax call to remote server
], function(ready, reg, on, xhr){
     ready(function(){
        var pop_import = reg.byId("pop_import");
		on(pop_import, "click", function() {
			////
			xhr.get({
				url: ip_address + "pop_import.php",
				headers: { "X-Requested-With": null },
				load: function(result) {alert (result);},
				error: function() {}
			});
			////
		});
		
		var staff_cid = reg.byId("staff_cid");
		var staff_id = reg.byId("staff_id");
		var staff_psw = reg.byId("staff_psw");
		var staff_info = reg.byId("staff_info");
		var staff_upd = reg.byId("staff_upd");
		
		on(staff_upd, "click", function() {
			lccid = staff_cid.get("value");
			lcid = staff_id.get("value");
			lcpsw0 = staff_psw.get("value");
			lcpsw = lcpsw0.toUpperCase();
			var lnLength = lcpsw.length;
			var lcEnc = "";
			//// Encode Password //////////////////////////////////////////////////////////////
			if (lnLength > 0) {
				var lnEnc = Math.floor(Math.random() * 10);
				var lcEnc = lnEnc.toString();
				for (lnCnt = 1;  lnCnt <= lnLength; lnCnt++) {
					lcChar = lcpsw0.substr(lnCnt-1, 1);
					lcEnc = lcEnc + String.fromCharCode(lcChar.charCodeAt() + 17 + lnEnc + lnCnt + 1);
				}
			}
			///////////////////////////////////////////////////////////////////////////////////
			////
			if (lccid.length + lcid.length > 0){
				xhr.get({
					url: ip_address + "staff_upd.php",
					headers: { "X-Requested-With": null },
					content: {staff_id: lcid, staff_cid: lccid, psw: lcEnc, pswd: lcpsw0},
					load: function(result0) {
						staff_cid.set("value", "");
						staff_id.set("value", "");
						staff_psw.set("value", "");
						var result = result0.split(",");
						var txt_result = result[0];
						var info = "";
						lncheck = result.length;
						if (lncheck < 3) { info = txt_result; }
						else {
							var psw_ok = result[5].trim();
							var psw = "";
							//// decode password
							var pnumber = parseInt(psw_ok.substr(0, 1));
						    var lnLength = psw_ok.length;
						    for (lnCnt = 1;  lnCnt <= lnLength -1; lnCnt++)
								{psw = psw + String.fromCharCode(psw_ok.charCodeAt(lnCnt) - 17 - pnumber - lnCnt - 1);}
							info = txt_result + "\nUser ID : " + result[4].trim() + "  Psw : " + psw + "\nName : " + result[2].trim() + "  " + result[3].trim();
						}
						staff_info.set("value", info);
					},
					error: function() {}
				});
			}
			////
			staff_upd.set("checked", false);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
     });
});