public with sharing class ChecklistController {
    @AuraEnabled(cacheable=true)
    public static List<Checklist__c> getChecklistItems(String recordId) {
        return [SELECT Id, Name, Yes__c, No__c, NA__c, Related_Record_Id__c FROM Checklist__c WHERE Related_Record_Id__c = :recordId];
    }
   
    @AuraEnabled
    public static void deleteChecklistItems(List<Id> checklistIds) {
        // Perform deletion logic
        List<Checklist__c> itemsToDelete = [SELECT Id FROM Checklist__c WHERE Id IN :checklistIds];
        delete itemsToDelete;
    }
    
    @AuraEnabled
    public static void updateChecklistItems(List<Checklist__c> checklistItems) {
        update checklistItems;
    }
}