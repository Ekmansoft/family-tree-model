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

    findProfile(profileLink: ProfileLink) : Profile|undefined;
    findFamily(familyLink: FamilyLink) : Family|undefined;

    showTreeStats() : void;
}