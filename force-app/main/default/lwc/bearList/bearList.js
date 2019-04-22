import { LightningElement, wire } from 'lwc';
import getAllBears from '@salesforce/apex/BearController.getAllBears';
import ursusResources from '@salesforce/resourceUrl/ursus_park';

export default class BearList extends LightningElement {
  @wire(getAllBears)bears;
  appResources = {
    bearSilhouette: ursusResources + '/img/standing-bear-silhouette.png'
  };
}