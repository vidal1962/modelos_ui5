sap.ui.define([], function () {
	"use strict";
	return {
		idText: function (sId) {
            //operação booleana em string verifica se tem valor preenchido
            if(sId) {// mesmo se 'if id = true'. 
                var newId = parseInt(sId);
                return newId;
            }
        },

        userText: function (sUser) {
            switch (sUser) {
                case "ADSUSER":
                    return 'Caetano Veloso';
                default:
                    return "Usuário " + sUser;
            }
        }

	};
}); 