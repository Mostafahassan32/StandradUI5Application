sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"StandradUI5Application/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("StandradUI5Application.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
	
			UIComponent.prototype.init.apply(this, arguments);
			 this.getRouter().initialize();

		
			this.setModel(models.createDeviceModel(), "device");
			 jQuery.sap.includeStyleSheet(jQuery.sap.getModulePath("StandradUI5Application.css.style", ".css"));
        
		}
	});
});