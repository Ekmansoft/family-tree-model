import { FamilyLink } from './family-link';
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
        this.parentFamilies = [];
        this.childFamilies = [];
    }
    profileId: ProfileLink;
    name: string;
    birthDate: string;
    deathDate: string;
    birthPlace: string;
    deathPlace: string;
    parentFamilies: FamilyLink[];
    childFamilies: FamilyLink[];
};