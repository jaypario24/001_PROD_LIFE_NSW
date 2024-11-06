public class SendSMSAction {
    // Define the input variables
    public class Request {
        @InvocableVariable(required=true)
        public String username;
        
        @InvocableVariable(required=true)
        public String apiKey;
        
        @InvocableVariable(required=true)
        public String messageBody;
        
        @InvocableVariable(required=true)
        public String fromNumber;
        
        @InvocableVariable(required=true)
        public String to;
        
        // Additional optional fields for logging
        @InvocableVariable
        public Id campaignId;
        
        @InvocableVariable
        public Id contactId;
        
        @InvocableVariable
        public Id leadId;
        
        @InvocableVariable
        public String messageType;
        
        @InvocableVariable
        public String objectName;
        
        @InvocableVariable
        public String recordId;
    }
    
    // Define the response variables
    public class Response {
        @InvocableVariable
        public Integer httpCode;
        
        @InvocableVariable
        public String responseCode;
        
        @InvocableVariable
        public String responseMsg;
        
        @InvocableVariable
        public String errorMessage;
    }

    @InvocableMethod(label='Send SMS' description='Sends an SMS using ClickSend API')
    public static List<Response> sendSMS(List<Request> requests) {
        List<Response> responses = new List<Response>();
        
        for (Request req : requests) {
            Response res = new Response();
            
            try {
                String username = req.username;
                String password = req.apiKey;
                
                // Base64 encode the username and password
                String authString = 'Basic ' + EncodingUtil.base64Encode(Blob.valueOf(username + ':' + password));
                
                // Create the JSON body
                String requestBody = JSON.serialize(new Map<String, Object>{
                    'messages' => new List<Object>{
                        new Map<String, Object>{
                            'body' => req.messageBody,
                            'to' => req.to,
                            'from' => req.fromNumber
                        }
                    }
                });
                
                // Setup the HTTP request
                HttpRequest httpRequest = new HttpRequest();
                httpRequest.setEndpoint('https://rest.clicksend.com/v3/sms/send');
                httpRequest.setMethod('POST');
                httpRequest.setHeader('Authorization', authString);
                httpRequest.setHeader('Content-Type', 'application/json');
                httpRequest.setBody(requestBody);
                
                // Send the HTTP request and get the response
                Http http = new Http();
                HttpResponse httpResponse = http.send(httpRequest);
                
                // Parse the response
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(httpResponse.getBody());
                
                // Populate the response
                res.httpCode = httpResponse.getStatusCode();
                res.responseCode = (String) responseMap.get('response_code');
                res.responseMsg = (String) responseMap.get('response_msg');
                
                // Debug logs
                System.debug('HTTP Status Code: ' + res.httpCode);
                System.debug('Response Code: ' + res.responseCode);
                System.debug('Response Message: ' + res.responseMsg);
                
                // If the response is successful, create a log record
                if (res.httpCode == 200) {
                    ClickSendSMS__ClickSend_SMS_Log__c log = new ClickSendSMS__ClickSend_SMS_Log__c();
                    log.ClickSendSMS__Campaign__c = req.campaignId;
                    log.ClickSendSMS__Contact__c = req.contactId;
                    log.ClickSendSMS__Lead__c = req.leadId;
                    log.ClickSendSMS__Message__c = req.messageBody;
                    log.ClickSendSMS__MessageType__c = req.messageType;
                    log.ClickSendSMS__ObjectName__c = req.objectName;
                    log.ClickSendSMS__RecordId__c = req.recordId;
                    log.ClickSendSMS__To_Number__c = req.to;
                    
                    insert log;
                }
                
            } catch (Exception e) {
                res.errorMessage = e.getMessage();
                System.debug('Error: ' + e.getMessage());
            }
            
            responses.add(res);
        }
        
        return responses;
    }
}