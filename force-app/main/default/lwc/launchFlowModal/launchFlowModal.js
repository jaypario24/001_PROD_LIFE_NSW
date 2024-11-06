import { LightningElement, api } from 'lwc';

export default class FlowLauncher extends LightningElement {
    @api recordId;  // This will get the Record ID of the page where the component is used
    @api flowName;  // This will be used to specify the Flow API name
    @api buttonLabel = 'Open Flow'; // This will be used to specify the button label, default is 'Open Flow'
    isModalOpen = false;  // This will control the visibility of the modal

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleFlowStatusChange(event) {
        if (event.detail.status === "FINISHED") {
            this.closeModal();
        }
    }
}