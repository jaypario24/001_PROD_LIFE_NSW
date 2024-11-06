public class QueueHelper {
    @InvocableMethod
    public static void assignSupportedObjectsToQueue(List<QueueAssignmentInput> inputList) {
        List<QueueSobject> queueSobjects = new List<QueueSobject>();

        for (QueueAssignmentInput input : inputList) {
            Group queue = [SELECT Id FROM Group WHERE DeveloperName = :input.queueName AND Type = 'Queue' LIMIT 1];
            
            if (queue != null) {
                for (String objectName : input.supportedObjects) {
                    QueueSobject queueSobject = new QueueSobject();
                    queueSobject.QueueId = queue.Id;
                    queueSobject.SobjectType = objectName;
                    queueSobjects.add(queueSobject);
                }
            }
        }
        
        if (!queueSobjects.isEmpty()) {
            insert queueSobjects;
        }
    }

    public class QueueAssignmentInput {
        @InvocableVariable
        public String queueName;
        @InvocableVariable
        public List<String> supportedObjects;
    }
}