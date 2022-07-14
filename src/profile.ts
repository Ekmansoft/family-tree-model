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
        this.spouseInFamilies = [];
        this.childInFamilies = [];
    }
    profileId: ProfileLink;
    name: string;
    birthDate: string;
    deathDate: string;
    birthPlace: string;
    deathPlace: string;
    spouseInFamilies: FamilyLink[];
    childInFamilies: FamilyLink[];
};