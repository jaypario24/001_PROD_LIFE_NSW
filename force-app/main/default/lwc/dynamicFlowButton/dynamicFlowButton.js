import { LightningElement, api } from 'lwc';

export default class DynamicFlowButton extends LightningElement {
    @api buttonLabel = 'Launch Flow';
    @api flowName;
    @api modalTitle = 'Flow Modal';

    isModalOpen = false;

    handleButtonClick() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleFlowStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.isModalOpen = false;
        }
    }
}