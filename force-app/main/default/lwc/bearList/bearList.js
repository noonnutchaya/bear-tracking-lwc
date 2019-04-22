import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import searchBears from '@salesforce/apex/BearController.searchBears';
import { fireEvent } from 'c/pubsub';

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
    loadStyle(this, ursusResources + '/style.css');
  }

  handleSearchTermChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchTerm = event.target.value;
    // eslint-disable-next-line
    this.delayTimeout = setTimeout(() => { this.searchTerm = searchTerm }, 300);
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