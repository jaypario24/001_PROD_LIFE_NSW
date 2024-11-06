public class QueueUtility {
    @InvocableMethod
    public static void createQueues(List<QueueRequest> requests) {
        List<Group> groupsToInsert = new List<Group>();
        List<QueueSobject> queueSobjectsToInsert = new List<QueueSobject>();

        // Loop through each request
        for (QueueRequest req : requests) {
            // Create a group for each queue name provided in the request
            for (String queueName : req.queueNames) {
                Group newGroup = new Group();
                newGroup.Name = queueName;
                newGroup.Type = 'Queue';
                groupsToInsert.add(newGroup);
            }
        }

        // Insert all groups (queues)
        insert groupsToInsert;

        // Create QueueSobject entries for each group (queue)
        for (Group createdGroup : groupsToInsert) {
            for (QueueRequest req : requests) {
                for (String sObjectName : req.supportedObjects) {
                    QueueSobject newQueueSobject = new QueueSobject();
                    newQueueSobject.QueueId = createdGroup.Id;
                    newQueueSobject.SobjectType = sObjectName;
                    queueSobjectsToInsert.add(newQueueSobject);
                }
            }
        }

        // Insert all QueueSobject entries
        insert queueSobjectsToInsert;
    }

    public class QueueRequest {
        @InvocableVariable
        public List<String> queueNames;
        @InvocableVariable
        public List<String> supportedObjects;
    }
}