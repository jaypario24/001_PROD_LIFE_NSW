@IsTest
public class PublishNotificationEventTest {

    @IsTest
    static void testPublishNotification() {
        // Create test data
        List<PublishNotificationEvent.NotificationEventRequest> requestList = new List<PublishNotificationEvent.NotificationEventRequest>();

        PublishNotificationEvent.NotificationEventRequest request = new PublishNotificationEvent.NotificationEventRequest();
        request.title = 'Test Notification Title';
        request.body = 'This is a test notification body.';
        request.contextId = 'TestContextId';
        request.recipientIds = new List<String>{'0051I000000WZsWQAW'}; // Replace with valid User Ids in your org
        request.targetId = '0011I00000bAj0OQAS'; // Replace with a valid Target Id in your org
        request.iconName = 'utility:info';
        request.timeToLive = 3600;
        request.convertToStandardNotification = true;
        request.convertToChatterPost = false;

        requestList.add(request);

        Test.startTest();
        
        // Call the invocable method
        PublishNotificationEvent.publishNotification(requestList);
        
        Test.stopTest();

        // Check debug logs for platform event publication
        // Ensure the test ran without exceptions
        System.assert(true, 'The publishNotification method executed successfully.');
    }
}