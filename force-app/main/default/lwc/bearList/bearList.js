import { LightningElement, track, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
import searchBears from '@salesforce/apex/BearController.searchBears';

export default class BearList extends LightningElement {
  @track searchTerm = '';
  @wire(searchBears, { searchTerm: '$searchTerm' })bears;
  
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
}