@isTest
public class QueueHelperTest {
    @isTest
    static void testAssignSupportedObjectsToQueue() {
        // Create a queue
        Group queue = new Group();
        queue.Name = 'Test Queue';
        queue.DeveloperName = 'Test_Queue';
        queue.Type = 'Queue';
        insert queue;
        
        // Create test data for QueueAssignmentInput
        QueueHelper.QueueAssignmentInput input = new QueueHelper.QueueAssignmentInput();
        input.queueName = 'Test_Queue';
        input.supportedObjects = new List<String>{'Case', 'Lead'};
        
        // Create a list of inputs
        List<QueueHelper.QueueAssignmentInput> inputs = new List<QueueHelper.QueueAssignmentInput>{input};
        
        // Call the method
        Test.startTest();
        QueueHelper.assignSupportedObjectsToQueue(inputs);
        Test.stopTest();
        
        // Verify the results
        List<QueueSobject> assignedObjects = [SELECT QueueId, SobjectType FROM QueueSobject WHERE QueueId = :queue.Id];
        
        System.assertEquals(2, assignedObjects.size(), 'Two supported objects should be assigned to the queue.');
        System.assertEquals('Case', assignedObjects[0].SobjectType, 'First supported object should be Case.');
        System.assertEquals('Lead', assignedObjects[1].SobjectType, 'Second supported object should be Lead.');
    }
}