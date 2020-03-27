sap.ui.define([
    "sap/ui/core/UIComponent"
 ], function (UIComponent) {
    "use strict";
    return UIComponent.extend("cristiano1.vidal.walkthrough.Component", {
        metadata : {
         manifest: "json"
      },

       init : function () {
          // chama função init da super classe
          UIComponent.prototype.init.apply(this, arguments);
          
          // cria as views baseado na url/hash
          this.getRouter().initialize();
       }
    });
 });