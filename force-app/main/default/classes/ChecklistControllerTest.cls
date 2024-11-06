@isTest
private class ChecklistControllerTest {

    @isTest static void testGetChecklistItems() {
        // Setup test data
        Checklist__c testChecklist = new Checklist__c(Name='Test Checklist', Related_Record_Id__c='a00123456789');
        insert testChecklist;

        // Test getChecklistItems method
        Test.startTest();
        List<Checklist__c> checklistItems = ChecklistController.getChecklistItems(testChecklist.Related_Record_Id__c);
        Test.stopTest();

        // Assertions
        System.assertEquals(1, checklistItems.size());
        System.assertEquals(testChecklist.Id, checklistItems[0].Id);
    }

    @isTest static void testDeleteChecklistItems() {
        // Setup test data
        Checklist__c testChecklist = new Checklist__c(Name='Test Checklist', Related_Record_Id__c='a00123456789');
        insert testChecklist;

        // Test deleteChecklistItems method
        Test.startTest();
        ChecklistController.deleteChecklistItems(new List<Id>{testChecklist.Id});
        Test.stopTest();

        // Assertions
        List<Checklist__c> checklistItems = [SELECT Id FROM Checklist__c WHERE Id = :testChecklist.Id];
        System.assertEquals(0, checklistItems.size());
    }

    @isTest static void testUpdateChecklistItems() {
        // Setup test data
        Checklist__c testChecklist = new Checklist__c(Name='Test Checklist', Yes__c=false, No__c=false, NA__c=false, Related_Record_Id__c='a00123456789');
        insert testChecklist;

        // Prepare for update
        testChecklist.Yes__c = true;

        // Test updateChecklistItems method
        Test.startTest();
        ChecklistController.updateChecklistItems(new List<Checklist__c>{testChecklist});
        Test.stopTest();

        // Assertions
        Checklist__c updatedChecklist = [SELECT Yes__c FROM Checklist__c WHERE Id = :testChecklist.Id];
        System.assertEquals(true, updatedChecklist.Yes__c);
    }
    // Test method for getChecklistItems with no matching records
    @isTest static void testGetChecklistItemsWithNoMatch() {
        // Setup test data
        Checklist__c testChecklist = new Checklist__c(Name='Test Checklist', Related_Record_Id__c='a00123456789');
        insert testChecklist;

        // Test getChecklistItems method with no matching records
        Test.startTest();
        List<Checklist__c> checklistItems = ChecklistController.getChecklistItems('nonexistent');
        Test.stopTest();

        // Assertions
        System.assertEquals(0, checklistItems.size(), 'No items should be returned for non-matching record ID');
    }

    // Test method for deleteChecklistItems with empty list
    @isTest static void testDeleteChecklistItemsEmptyList() {
        // Test deleteChecklistItems method with empty list
        Test.startTest();
        ChecklistController.deleteChecklistItems(new List<Id>());
        Test.stopTest();

        // No assertions needed, just testing that no exception is thrown
    }

    // Test method for updateChecklistItems with multiple records
    @isTest static void testUpdateChecklistItemsMultiple() {
        // Setup test data with multiple records
        List<Checklist__c> testChecklists = new List<Checklist__c>{
            new Checklist__c(Name='Test Checklist 1', Yes__c=false, No__c=false, NA__c=false, Related_Record_Id__c='a00123456789'),
            new Checklist__c(Name='Test Checklist 2', Yes__c=false, No__c=false, NA__c=false, Related_Record_Id__c='a00123456789')
        };
        insert testChecklists;

        // Prepare for update
        for (Checklist__c item : testChecklists) {
            item.Yes__c = true;
        }

        // Test updateChecklistItems method with multiple records
        Test.startTest();
        ChecklistController.updateChecklistItems(testChecklists);
        Test.stopTest();

        // Assertions
        List<Checklist__c> updatedChecklists = [SELECT Yes__c FROM Checklist__c WHERE Id IN :testChecklists];
        for (Checklist__c updatedItem : updatedChecklists) {
            System.assertEquals(true, updatedItem.Yes__c, 'Checklist item should be updated to Yes');
        }
    }

    // Additional test methods as needed...
}