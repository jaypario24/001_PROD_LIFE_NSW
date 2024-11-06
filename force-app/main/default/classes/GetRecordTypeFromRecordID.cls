global class GetRecordTypeFromRecordID {
    // This class is used to pass input into the Invocable Method.
    global class RecordIdInput {
        @InvocableVariable
        public Id recordId;
    }

    // This class is used to get output from the Invocable Method.
    global class ObjectTypeOutput {
        @InvocableVariable
        public String objectApiName;
    }

    @InvocableMethod(label='Get Object API Name' description='Returns the object API name based on record ID')
    global static List<ObjectTypeOutput> getObjectAPIName(List<RecordIdInput> inputs) {
        List<ObjectTypeOutput> outputs = new List<ObjectTypeOutput>();

        for (RecordIdInput input : inputs) {
            ObjectTypeOutput output = new ObjectTypeOutput();
            output.objectApiName = input.recordId.getSObjectType().getDescribe().getName();
            outputs.add(output);
        }

        return outputs;
    }
}