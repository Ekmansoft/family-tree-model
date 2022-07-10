import { FamilyLink } from'./family-link';
import { ProfileLink } from'./profile-link';
import { Family } from'./family';
import { Profile } from'./profile';

export interface TreeBackend {
    createNewProfileLink() : ProfileLink;
    createNewFamilyLink() : FamilyLink;
    updateFamily(family: Family) : boolean;
    updateProfile(profile: Profile) : boolean;
    addNewFamily(family: Family) : FamilyLink;
    addNewProfile(profile: Profile) : ProfileLink;

    addParentToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean;
    addChildToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean;
    removeParentFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean;
    removeChildFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean;

    findProfile(profileLink: ProfileLink) : Profile|undefined;
    findFamily(familyLink: FamilyLink) : Family|undefined;

    showTreeStats() : void;
}