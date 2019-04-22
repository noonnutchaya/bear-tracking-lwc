import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResource from '@salesforce/resourceUrl/ursus_park';
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends NavigationMixin(LightningElement) {
  @track searchTerm = '';
  @track bears;
  @wire(CurrentPageReference) pageRef;
  @wire(searchBears, { searchTerm: '$searchTerm' })
  loadBears(result) {
    this.bears = result;
    if (result.data) {
      fireEvent(this.pageRef, 'bearListUpdate', result.data);
    }
  }
  connectedCallback() {
    loadStyle(this, ursusResource + '/style.css');
  }
	
  handleSearchTermChange(event) {
    window.clearTimeout(this.deplayTimeout);
    const searchTerm = event.target.value;
    // eslint-disable-next-line
    this.deplayTimeout = setTimeout(() => { this.searchTerm = searchTerm }, 300);
  }
  get hasResults() {
    return this.bears.data.length > 0;
  }
  handleBearView(event) {
    const bearId = event.detail;
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: bearId,
        objectApiName: 'Bear__c',
        actionName: 'view'
      }
    });
  }
}