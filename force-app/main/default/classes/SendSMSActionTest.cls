@IsTest
public class SendSMSActionTest {
    
    @IsTest
    static void testSendSMS() {
        // Setup test data
        SendSMSAction.Request request = new SendSMSAction.Request();
        request.username = 'test_username';
        request.apiKey = 'test_apiKey';
        request.messageBody = 'This is a test message';
        request.fromNumber = '1234567890';
        request.to = '0987654321';
        request.campaignId = null; // Add actual ID if needed
        request.contactId = null;  // Add actual ID if needed
        request.leadId = null;     // Add actual ID if needed
        request.messageType = 'Inbound';
        request.objectName = 'TestObject';
        request.recordId = null;   // Add actual ID if needed

        List<SendSMSAction.Request> requests = new List<SendSMSAction.Request>{request};
        
        // Create a mock HTTP response
        HttpResponse mockResponse = new HttpResponse();
        mockResponse.setHeader('Content-Type', 'application/json');
        mockResponse.setBody('{"response_code": "SUCCESS", "response_msg": "Message sent successfully"}');
        mockResponse.setStatusCode(200);
        
        // Mock the HTTP callout
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator(mockResponse));
        
        // Call the method
        List<SendSMSAction.Response> responses = SendSMSAction.sendSMS(requests);
        
        // Validate the response
        System.assertEquals(1, responses.size());
        SendSMSAction.Response response = responses[0];
        System.assertEquals(200, response.httpCode);
        System.assertEquals('SUCCESS', response.responseCode);
        System.assertEquals('Message sent successfully', response.responseMsg);
        System.assertEquals(null, response.errorMessage);
    }
    
    // Mock class to generate mock HTTP responses
    private class MockHttpResponseGenerator implements HttpCalloutMock {
        private HttpResponse mockResponse;
        
        public MockHttpResponseGenerator(HttpResponse mockResponse) {
            this.mockResponse = mockResponse;
        }
        
        public HttpResponse respond(HttpRequest req) {
            return mockResponse;
        }
    }
}