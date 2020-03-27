sap.ui.define([
	"cristiano1/vidal/walkthrough/controller/BaseController"

], function (BaseController) {
	"use strict";
	return BaseController.extend("cristiano1.vidal.walkthrough.controller.DetalhesVenda", {
		onInit: function () {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detalheVendaPage").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var sPath = oArgs.idPath;
            // existem diferentes formas de receber o objeto, 
            //de acordo com a forma que foi chamado na view anterior

            /*1- por id do objeto             
            this.getView().bindElement({
                path: "/VendaSet('" + sPath + "')",//1- por id do objeto 
                expand: 'cliente',
                events : {
                    change: this._onBindingChange.bind(this)
                }				
            });
            */

            /*2- por path do modelo com '/' removido*/
            this.getView().bindElement({
                path: "/" + sPath,
                expand: 'cliente',
                events : {
                    change: this._onBindingChange.bind(this)
                }				
			});

            /*3- por path do modelo com '/' tratado 
            var sPath = decodeURIComponent(oEvent.getParameter("arguments").idPath);            
			this.getView().bindElement({              
                path: sPath,
                expand: 'cliente',
                events : {
                    change: this._onBindingChange.bind(this)
                }				
            });
            */
        },
        _onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}else {
                var obj = this.getView().getBindingContext().getObject();
                if (this.onDataReceived) {         // verifica se a extensão está implementada.
                    this.onDataReceived(obj); // ...e a chama
                 }
            }
			
			
		}
	});
});