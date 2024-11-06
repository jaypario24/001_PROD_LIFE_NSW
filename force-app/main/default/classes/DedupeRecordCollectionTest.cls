@IsTest
global with sharing class DedupeRecordCollectionTest {

    @TestSetup
    global static void setup() {
        // Create a dummy user to be used as the owner of the cases
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User' LIMIT 1];
        User dummyUser = new User(
            FirstName = 'Dummy',
            LastName = 'User',
            Email = 'dummy.user@example.com',
            Username = 'dummy.user@example.com',
            Alias = 'dummy',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            ProfileId = p.Id,
            LanguageLocaleKey = 'en_US'
        );
        insert dummyUser;

        // Create test Case records with the required OwnerId field
        Case case1 = new Case(Subject = 'Test Case 1', OwnerId = dummyUser.Id);
        Case case2 = new Case(Subject = 'Test Case 2', OwnerId = dummyUser.Id);
        Case case3 = new Case(Subject = 'Test Case 1', OwnerId = dummyUser.Id); // Duplicate by subject

        // Log the Case records before insertion
        System.debug('Case records to be inserted: ' + case1 + ', ' + case2 + ', ' + case3);

        insert new List<Case>{case1, case2, case3};
    }

    @IsTest
    global static void testDedupeWithDuplicates() {
        // Query the test records
        List<SObject> cases = [SELECT Id, Subject FROM Case WHERE Subject IN ('Test Case 1', 'Test Case 2')];

        System.debug('Cases queried for deduplication with duplicates: ' + cases);

        // Create the request
        DedupeRecordCollection.FlowRequest request = new DedupeRecordCollection.FlowRequest();
        request.inputRecordCollection = cases;
        request.fieldToDedupeOn = 'Subject';

        // Add the request to the list of requests
        List<DedupeRecordCollection.FlowRequest> requests = new List<DedupeRecordCollection.FlowRequest>{request};

        // Run the deduplication
        Test.startTest();
        List<DedupeRecordCollection.FlowResponse> responses = DedupeRecordCollection.dedupe(requests);
        Test.stopTest();

        System.debug('Responses from deduplication with duplicates: ' + responses);

        // Validate the results
        System.assertEquals(1, responses.size(), 'Expected one response');
        DedupeRecordCollection.FlowResponse response = responses[0];
        System.assertEquals(2, response.outputRecordCollection.size(), 'Expected two unique records in the output');

        // Validate the records in the response
        Set<String> recordSubjects = new Set<String>();
        for (SObject record : response.outputRecordCollection) {
            recordSubjects.add(((Case)record).Subject);
        }
        System.assert(recordSubjects.contains('Test Case 1'), 'Output should contain Test Case 1');
        System.assert(recordSubjects.contains('Test Case 2'), 'Output should contain Test Case 2');
    }

    @IsTest
    global static void testDedupeWithoutDuplicates() {
        // Query the test records
        List<SObject> cases = [SELECT Id, Subject FROM Case WHERE Subject = 'Test Case 2'];

        System.debug('Cases queried for deduplication without duplicates: ' + cases);

        // Create the request
        DedupeRecordCollection.FlowRequest request = new DedupeRecordCollection.FlowRequest();
        request.inputRecordCollection = cases;
        request.fieldToDedupeOn = 'Subject';

        // Add the request to the list of requests
        List<DedupeRecordCollection.FlowRequest> requests = new List<DedupeRecordCollection.FlowRequest>{request};

        // Run the deduplication
        Test.startTest();
        List<DedupeRecordCollection.FlowResponse> responses = DedupeRecordCollection.dedupe(requests);
        Test.stopTest();

        System.debug('Responses from deduplication without duplicates: ' + responses);

        // Validate the results
        System.assertEquals(1, responses.size(), 'Expected one response');
        DedupeRecordCollection.FlowResponse response = responses[0];
        System.assertEquals(1, response.outputRecordCollection.size(), 'Expected one unique record in the output');

        // Validate the records in the response
        SObject record = response.outputRecordCollection[0];
        System.assertEquals('Test Case 2', ((Case)record).Subject, 'Output should contain Test Case 2');
    }

    @IsTest
    global static void testDedupeWithEmptyInput() {
        // Create the request with empty input
        DedupeRecordCollection.FlowRequest request = new DedupeRecordCollection.FlowRequest();
        request.inputRecordCollection = new List<SObject>();
        request.fieldToDedupeOn = 'Subject';

        // Add the request to the list of requests
        List<DedupeRecordCollection.FlowRequest> requests = new List<DedupeRecordCollection.FlowRequest>{request};

        System.debug('Running deduplication with empty input');

        // Run the deduplication
        Test.startTest();
        List<DedupeRecordCollection.FlowResponse> responses = DedupeRecordCollection.dedupe(requests);
        Test.stopTest();

        System.debug('Responses from deduplication with empty input: ' + responses);

        // Validate the results
        System.assertEquals(1, responses.size(), 'Expected one response');
        DedupeRecordCollection.FlowResponse response = responses[0];
        System.assertEquals(0, response.outputRecordCollection.size(), 'Expected no records in the output');
    }

    @IsTest
    global static void testDedupeWithInvalidField() {
        // Query the test records
        List<SObject> cases = [SELECT Id, Subject FROM Case WHERE Subject = 'Test Case 1'];

        System.debug('Cases queried for deduplication with invalid field: ' + cases);

        // Create the request with an invalid field
        DedupeRecordCollection.FlowRequest request = new DedupeRecordCollection.FlowRequest();
        request.inputRecordCollection = cases;
        request.fieldToDedupeOn = 'InvalidField';

        // Add the request to the list of requests
        List<DedupeRecordCollection.FlowRequest> requests = new List<DedupeRecordCollection.FlowRequest>{request};

        System.debug('Running deduplication with invalid field');

        // Run the deduplication
        Test.startTest();
        List<DedupeRecordCollection.FlowResponse> responses = DedupeRecordCollection.dedupe(requests);
        Test.stopTest();

        System.debug('Responses from deduplication with invalid field: ' + responses);

        // Validate the results
        System.assertEquals(1, responses.size(), 'Expected one response');
        DedupeRecordCollection.FlowResponse response = responses[0];
        System.assertEquals(0, response.outputRecordCollection.size(), 'Expected no records in the output due to invalid field');
    }
}