@IsTest
global class GetRecordTypeFromRecordIDTest {

    @IsTest
    static void testGetObjectAPIName() {
        // Create a test Lead record
        Lead testLead = new Lead(LastName='Test Lead', Company='Test Company');
        insert testLead;

        // Prepare the input for the invocable method
        GetRecordTypeFromRecordID.RecordIdInput input = new GetRecordTypeFromRecordID.RecordIdInput();
        input.recordId = testLead.Id;

        List<GetRecordTypeFromRecordID.RecordIdInput> inputs = new List<GetRecordTypeFromRecordID.RecordIdInput>{input};

        // Invoke the method
        Test.startTest();
        List<GetRecordTypeFromRecordID.ObjectTypeOutput> outputs = GetRecordTypeFromRecordID.getObjectAPIName(inputs);
        Test.stopTest();

        // Assert that the output is correct
        System.assertEquals(1, outputs.size(), 'Expected one output');
        GetRecordTypeFromRecordID.ObjectTypeOutput output = outputs[0];
        System.assertEquals('Lead', output.objectApiName, 'The object API name should be Lead');
    }
}