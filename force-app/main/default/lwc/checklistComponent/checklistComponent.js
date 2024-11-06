import { LightningElement, wire, track, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getChecklistItems from '@salesforce/apex/ChecklistController.getChecklistItems';
import updateChecklistItems from '@salesforce/apex/ChecklistController.updateChecklistItems';
import deleteChecklistItems from '@salesforce/apex/ChecklistController.deleteChecklistItems';

export default class ChecklistComponent extends LightningElement {
    @api recordId;
    @api flowApiName = 'Add_Checklist_Items';
    @track checklistItems = [];
    showCheckboxes = false;
    showRowNumbers = false;
    wiredResult;

    get columns() {
        return [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Yes', type: 'button', initialWidth: 90, 
              typeAttributes: { 
                  label: 'Yes', name: 'yes', 
                  variant: { fieldName: 'YesButtonVariant' }
              }},
            { label: 'No', type: 'button', initialWidth: 90, 
              typeAttributes: { 
                  label: 'No', name: 'no', 
                  variant: { fieldName: 'NoButtonVariant' }
              }},
            { label: 'N/A', type: 'button', initialWidth: 90, 
              typeAttributes: { 
                  label: 'N/A', name: 'na', 
                  variant: { fieldName: 'NAButtonVariant' }
              }}
        ];
    }

    @wire(getChecklistItems, { recordId: '$recordId' })
    wiredChecklistItems(result) {
        this.wiredResult = result; // Store the wire service result
        if (result.data) {
            this.checklistItems = this.transformChecklistItems(result.data);
        } else if (result.error) {
            // Handle error
        }
    }

    transformChecklistItems(data) {
        return data.map(item => ({
            ...item,
            YesButtonVariant: item.Yes__c ? 'success' : 'neutral',
            NoButtonVariant: item.No__c ? 'destructive' : 'neutral',
            NAButtonVariant: item.NA__c ? 'brand' : 'neutral'
        }));
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.checklistItems = this.checklistItems.map(item => {
            if (item.Id === row.Id) {
                let updatedItem = {...item, Yes__c: false, No__c: false, NA__c: false};
                if (actionName === 'yes') updatedItem.Yes__c = true;
                else if (actionName === 'no') updatedItem.No__c = true;
                else if (actionName === 'na') updatedItem.NA__c = true;

                return updatedItem;
            }
            return item;
        });
    }

    saveChecklist() {
        updateChecklistItems({ checklistItems: this.checklistItems })
            .then(() => {
                return refreshApex(this.wiredResult); // Refresh the checklist items
            })
            .catch(error => {
                // Handle error
            });
    }

    deleteSelected() {
        const selectedIds = this.template.querySelector('lightning-datatable').getSelectedRows().map(row => row.Id);
        if (selectedIds.length > 0) {
            deleteChecklistItems({ checklistIds: selectedIds })
                .then(() => {
                    // Perform post-deletion actions like refreshing the list
                    return refreshApex(this.wiredResult);
                })
                .catch(error => {
                    // Handle error
                });
        }
    }

    startFlow() {
        if (this.flowApiName && this.recordId) {
            let inputVariables = [
                { name: 'recordId', type: 'String', value: this.recordId }
            ];
            this.template.querySelector("lightning-flow").startFlow(this.flowApiName, inputVariables);
        } else {
            console.error('Flow API Name or Record ID is not specified.');
        }
    }
}