public class PublishNotificationEvent {
    @InvocableMethod(label='Publish Notification Event' description='Publishes a notification event')
    public static void publishNotification(List<NotificationEventRequest> requestList) {
        List<ares_notify__Notification__e> events = new List<ares_notify__Notification__e>();

        for (NotificationEventRequest request : requestList) {
            ares_notify__Notification__e event = new ares_notify__Notification__e(
                ares_notify__Title__c = request.title,
                ares_notify__Body__c = request.body,
                ares_notify__ContextId__c = request.contextId,
                ares_notify__RecipientId__c = String.join(request.recipientIds, ','),
                ares_notify__TargetId__c = request.targetId,
                ares_notify__IconName__c = request.iconName,
                ares_notify__TimeToLive__c = request.timeToLive,
                ares_notify__ConvertToStandardNotification__c = request.convertToStandardNotification,
                ares_notify__ConvertToChatterPost__c = request.convertToChatterPost
            );
            events.add(event);
        }

        if (!events.isEmpty()) {
            EventBus.publish(events);
        }
    }

    public class NotificationEventRequest {
        @InvocableVariable(required=true description='Title of the notification')
        public String title;

        @InvocableVariable(required=true description='Body of the notification')
        public String body;

        @InvocableVariable(required=true description='Context ID for the notification')
        public String contextId;

        @InvocableVariable(required=true description='List of recipient IDs (comma-separated)')
        public List<String> recipientIds;

        @InvocableVariable(required=true description='Target ID for the notification')
        public String targetId;

        @InvocableVariable(description='SLDS icon name for the notification')
        public String iconName;

        @InvocableVariable(description='Time to live for the notification in seconds')
        public Integer timeToLive;

        @InvocableVariable(description='Convert to standard Salesforce notification')
        public Boolean convertToStandardNotification;

        @InvocableVariable(description='Convert to Chatter post')
        public Boolean convertToChatterPost;
    }
}