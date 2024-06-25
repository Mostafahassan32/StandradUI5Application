sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("StandradUI5Application.controller.App", {
        onInit: function () {
            this.getOwnerComponent().getRouter().initialize();
        }
    });
});
