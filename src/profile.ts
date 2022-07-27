import { ItemLinkArray } from './item-link-array';
import { ProfileLink } from './profile-link';

export enum ProfileSex {
  Unknown,
  Male,
  Female,
}

export class Profile {
  constructor() {
    this.profileId = new ProfileLink('');
    this.sex = ProfileSex.Unknown;
    this.name = '';
    this.birthDate = '';
    this.birthPlace = '';
    this.deathDate = '';
    this.deathPlace = '';
    this.parentInFamilies = new ItemLinkArray();
    this.childInFamilies = new ItemLinkArray();
  }
  profileId: ProfileLink;
  sex: ProfileSex;
  name: string;
  birthDate: string;
  deathDate: string;
  birthPlace: string;
  deathPlace: string;
  parentInFamilies: ItemLinkArray;
  childInFamilies: ItemLinkArray;

  getFullName(): string {
    return this.name;
  }
  getSex(): ProfileSex {
    return this.sex;
  }
  getBirthDate(): string {
    return this.birthDate;
  }
  getDeathDate(): string {
    return this.deathDate;
  }
}
