({
    doInit : function(component, event, helper) {
        component.set('v.isOpen', true);
        var flow = component.find('flow');
        var inputVariables = [
            {
                name : "recordId",
                type : "String",
                value : component.get("v.recordId")
            }
        ];
        flow.startFlow('Add_Patient_History', inputVariables);
    },

    closeFlowModal : function(component, event, helper) {
        component.set("v.isOpen", false);
    },

    closeModalOnFinish : function(component, event, helper) {
        if(event.getParam('status') === "FINISHED") {
            component.set("v.isOpen", false);
        }
    }
})