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
        this.parentInFamilies = [];
        this.childInFamilies = [];
    }
    profileId: ProfileLink;
    name: string;
    birthDate: string;
    deathDate: string;
    birthPlace: string;
    deathPlace: string;
    parentInFamilies: FamilyLink[];
    childInFamilies: FamilyLink[];

    getProfileLink() : ProfileLink {
        return this.profileId;
    }
    getFullName() : string {
        return this.name;
    }
    getChildFamilyLinks() : FamilyLink[] {
        return this.childInFamilies;
    }
    getParentFamilyLinks() : FamilyLink[] {
        return this.parentInFamilies;
    }
    getBirthDate() : string {
        return this.birthDate;
    }
    getDeathDate() : string {
        return this.deathDate;
    }
};