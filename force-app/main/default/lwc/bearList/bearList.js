import { LightningElement, track, wire } from 'lwc';
import searchBears from '@salesforce/apex/BearController.searchBears';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearList extends LightningElement {
  @track searchTerm = '';
  @wire(searchBears, { searchTerm: '$searchTerm' })bears;
  appResources = {
    bearSilhouette: ursusResources + '/img/standing-bear-silhouette.png'
  };
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