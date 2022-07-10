import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';

export class Family {
    constructor()
    {
        this.familyId = new FamilyLink("");
        this.marriageDate = "";
        this.marriagePlace = "";
        this.parents = [];
        this.children = [];
    }
    familyId: FamilyLink;
    marriageDate: string;
    marriagePlace: string;
    parents: ProfileLink[];
    children: ProfileLink[];
};

