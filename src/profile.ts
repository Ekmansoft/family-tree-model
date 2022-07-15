import { ItemLinkArray } from './item-link-array';
import { ProfileLink } from './profile-link';

export class Profile {
    constructor()
    {
        this.profileId = new ProfileLink("");
        this.name = "";
        this.birthDate = "";
        this.birthPlace = "";
        this.deathDate = "";
        this.deathPlace = "";
        this.parentInFamilies = new ItemLinkArray();
        this.childInFamilies = new ItemLinkArray();
    }
    profileId: ProfileLink;
    name: string;
    birthDate: string;
    deathDate: string;
    birthPlace: string;
    deathPlace: string;
    parentInFamilies: ItemLinkArray;
    childInFamilies: ItemLinkArray;

    getFullName() : string {
        return this.name;
    }
    getBirthDate() : string {
        return this.birthDate;
    }
    getDeathDate() : string {
        return this.deathDate;
    }

};
