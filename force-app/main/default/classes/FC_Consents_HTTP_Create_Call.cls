public with sharing class FC_Consents_HTTP_Create_Call {
    @InvocableMethod(label='Send HTTP Request' description='Send an HTTP request with Basic Authentication')
    public static List<ResponseWrapper> sendHttpRequest(List<RequestWrapper> requests) {
        List<ResponseWrapper> responses = new List<ResponseWrapper>();
        
        for (RequestWrapper request : requests) {
            HttpRequest req = new HttpRequest();
            req.setEndpoint(request.endpoint);
            req.setMethod(request.method);
            req.setHeader('Content-Type', 'application/json');
            req.setTimeout(30000); // Set timeout to 30,000 milliseconds
            
            // Combine username and password and encode in Base64
            String authString = request.username + ':' + request.password;
            String authHeader = 'Basic ' + EncodingUtil.base64Encode(Blob.valueOf(authString));
            req.setHeader('Authorization', authHeader);
            
            // Set the body of the request
            if (request.body != null) {
                req.setBody(request.body);
            }
            
            // Send HTTP request
            Http http = new Http();
            HttpResponse res;
            try {
                res = http.send(req);
                responses.add(new ResponseWrapper(res.getStatusCode(), res.getBody()));
            } catch (Exception e) {
                responses.add(new ResponseWrapper(500, e.getMessage()));
            }
        }
        
        return responses;
    }
    
    public class RequestWrapper {
        @InvocableVariable(label='Endpoint' description='The endpoint URL' required=true)
        public String endpoint;
        
        @InvocableVariable(label='Method' description='The HTTP method (GET, POST, etc.)' required=true)
        public String method;
        
        @InvocableVariable(label='Username' description='The username for Basic Authentication' required=true)
        public String username;
        
        @InvocableVariable(label='Password' description='The password for Basic Authentication' required=true)
        public String password;
        
        @InvocableVariable(label='Body' description='The body of the request' required=false)
        public String body;
    }
    
    public class ResponseWrapper {
        @InvocableVariable(label='Status Code' description='The HTTP status code')
        public Integer statusCode;
        
        @InvocableVariable(label='Response Body' description='The body of the HTTP response')
        public String responseBody;
        
        public ResponseWrapper(Integer statusCode, String responseBody) {
            this.statusCode = statusCode;
            this.responseBody = responseBody;
        }
    }
}