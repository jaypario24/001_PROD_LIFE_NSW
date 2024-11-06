import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class FlowRefreshComponent extends NavigationMixin(LightningElement) {
    @api recordId;

    handleNextButtonClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Cycle__c',
                actionName: 'view'
            }
        }, true);
    }
}