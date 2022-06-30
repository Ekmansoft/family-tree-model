import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';

export class Family {
    constructor(id: FamilyLink, name: string, )
    {
        this.familyId = id;
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

