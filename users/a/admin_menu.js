/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/dom",
 	"dojo/on"
], function(ready, reg, dom, on){
     ready(function(){
         // logic that requires that Dojo is fully initialized should go here
		var menu_adl = dom.byId("menu_adl");
		var menu_pps = dom.byId("menu_pps");
		var menu_hi = dom.byId("menu_hi");
		var menu_ci = dom.byId("menu_ci");
		var admin_back = dom.byId("admin_back");
		
		on(admin_back, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/index.html";
		});
		
		on(menu_adl, "click", function() {			
			var val = menu_adl.get("checked");
			if (val == true) {
				menu_pps.set("checked", false);
				menu_hi.set("checked", false);
				menu_ci.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/adl_brain.html";
			}
		});
		
		on(menu_pps, "click", function() {
			var val = menu_pps.get("checked");
			if (val == true) {
				menu_adl.set("checked", false);
				menu_hi.set("checked", false);
				menu_ci.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/admin.html";
			}
		});
		
		on(menu_hi, "click", function() {
			var val = menu_hi.get("checked");
			if (val == true) {
				menu_pps.set("checked", false);
				menu_adl.set("checked", false);
				menu_ci.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/hi.html";
			}
		});
		
		on(menu_ci, "click", function() {
			var val = menu_ci.get("checked");
			if (val == true) {
				menu_pps.set("checked", false);
				menu_hi.set("checked", false);
				menu_adl.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/ci.html";
			}
		});
     });
});
