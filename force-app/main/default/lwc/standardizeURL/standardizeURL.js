import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class StandardizeUrl extends NavigationMixin(LightningElement) {
    connectedCallback() {
        this.standardizeUrl();
    }

    standardizeUrl() {
        const url = new URL(window.location.href);
        if (url.searchParams.has('startDate') || url.searchParams.has('view')) {
            url.searchParams.delete('startDate');
            url.searchParams.delete('view');
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: url.pathname
                }
            });
        }
    }
}