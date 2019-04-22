import { LightningElement, track } from 'lwc';
import getAllBears from '@salesforce/apex/BearController.getAllBears';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearList extends LightningElement {
  @track bears = {};
  
  appResources = {
    bearSilhouette: ursusResources + '/img/standing-bear-silhouette.png'
  };

  connectedCallback() {
    this.loadBears();
  }

  loadBears() {
    getAllBears()
      .then(result => { this.bears.data = result })
      .catch(error => { this.bears.error = error });
  }
}