sap.ui.define([
    "cristiano1/vidal/walkthrough/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "cristiano1/vidal/walkthrough/model/formatter"

 ], function (BaseController, MessageToast, JSONModel, formatter) {
    "use strict";
    return BaseController.extend("cristiano1.vidal.walkthrough.controller.Home", {
		
		formatter: formatter,
		
        onInit: function(){
        	var oMsgModel = new JSONModel({
            	MsgInicial: "Seja bem vindo!"
        	});
         // Atribui o objeto do modelo à view
         this.getView().setModel(oMsgModel, "messages");
         
         //exemplo property binding
         var oPessoaModel = new JSONModel({
            nome: "Steven",
            sobrenome: "Job",
            habilitado: true,
            endereco: {
               rua: "Avenida Victor Hugo 156",
               cidade: "Paris",
               cep: "12345",
               pais: "França"
            }
            });

         this.getView().setModel(oPessoaModel, "pessoa");    
         
         var oViewModel = new JSONModel({
            moeda: "BRL",
            moedaEstrangeira: "JPY"
			});
			this.getView().setModel(oViewModel, "view");
        },
        
        onShowHello : function () {
            //MessageToast.show("Hello World!");
            var oModel = this.getView().getModel("messages");
        	var oDados = oModel.getData();
        	//MessageToast.show(oDados.MsgInicial);
        	
        	var nome = this.getView().getModel("pessoa").getProperty("/nome");
	        var sobrenome = this.getView().getModel("pessoa").getProperty("/sobrenome");
	        var oBundle = this.getView().getModel("i18n").getResourceBundle();
	        var sMsg = oBundle.getText("msgInicialPopup",[nome, sobrenome]);
	        MessageToast.show(sMsg);
         },
         
         onVendaSelected: function(oEvent) {
         var oSelectedItem = oEvent.getSource();
         //se não for modelo default, informar nome do modelo. Ex: getBindingContext("pessoa");
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			/*
			var oProductDetailPanel = this.byId("vendaDetailsPanel");
			oProductDetailPanel.bindElement({ 
            path: sPath,
            //opcional. se não for modelo default, preencher nome do modelo
            // model: "pessoa" 
            expand: 'cliente'
            });
            */
            var obj = oContext.getObject();

        //existem 3 formas de passar os parametros de navegação
        this.getRouter().navTo("detalheVendaPage",{        
         //   idPath : obj.IDVenda /*1- por id do objeto */
            idPath : sPath.substr(1) /*2- por path do modelo, removendo caracter '/' */
        //    idPath : encodeURIComponent(sPath) /*3-por path do modelo, tratando o caracter '/' */
         }
        );

		},
		
		onAtualizarVendasMonit: function (){
         var oModel = this.getView().getModel();                 
         // existem duas formas de atualizar dados:         
         //1 monitorando alterações no modelo       

         if ( oModel.hasPendingChanges() ){                        
            oModel.submitChanges(
               {
               success: function(oData, oResponse){
                  MessageToast.show("Dados Atualizados");
               },
               error: function(oError){
                  MessageToast.show("Erro ao gravar Dados");
               }
            }
            );
         }else{
            MessageToast.show("Não há mudanças para gravar");
         }


      },

      onAtualizarVendas: function (){
         var oModel = this.getView().getModel();       
         if ( !oModel.hasPendingChanges() ){
            MessageToast.show("Não há mudanças para gravar");
            return;            
         }
         // existem duas formas de atualizar dados:
         //2 obtendo dados e chamando serviço manualmente

      var oVendaDetailsPanel = this.byId("vendaDetailsPanel");
      var bc = oVendaDetailsPanel.getBindingContext();
      var obj = bc.getObject();      
      var path = bc.getPath();

      var oNewData = {
         IDVenda : obj.IDVenda,
         Descricao : obj.Descricao
      };

      oModel.update(
         path, 
         oNewData,
         {
         success: function(oEvent){
            MessageToast.show("Dados Gravados");
         },
         error: function(oError){
            MessageToast.show("Erro ao gravar Dados");
         }
         });

      },
      
      productListFactory: function(sId, oContext){
         var olistItem;
         if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {

             olistItem = new sap.m.ObjectListItem({
               title: "Descontinuado",
               icon: "sap-icon://warning",
               number: {path: "produtos>UnitsInStock"} ,
               numberState: "Error"
            });

         } else {

            olistItem = new sap.m.ObjectListItem({
               title: {path: "produtos>ProductName"},
               number: {path: "produtos>UnitsInStock"} ,
               numberState: "Success"
            });

            olistItem.addAttribute(
               new sap.m.ObjectAttribute({
                  text:{path: "produtos>QuantityPerUnit"}
               })
            );

         }

         return olistItem;

      },
      
      onShowDetails: function(oEvent){
         //this.getRouter().navTo("detailPage");
         this.getRouter().navTo("detailPage");

      }

    });
 });