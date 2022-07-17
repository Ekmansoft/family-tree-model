import { FamilyLink } from './family-link';
import { ItemLinkArray } from './item-link-array';

export class Family {
  constructor() {
    this.familyId = new FamilyLink('');
    this.marriageDate = '';
    this.marriagePlace = '';
    this.parents = new ItemLinkArray();
    this.children = new ItemLinkArray();
  }
  familyId: FamilyLink;
  marriageDate: string;
  marriagePlace: string;
  parents: ItemLinkArray;
  children: ItemLinkArray;
}
