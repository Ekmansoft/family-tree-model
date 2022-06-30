import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Family } from './family';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';

export class StaticTreeBackend implements TreeBackend {
    constructor() {
        this.backendName = "static";
        this.nextProfileId = 0;
        this.nextFamilyId = 0;
        this.profileMap = new Map();
        this.familyMap = new Map();
    }

    createNewProfileLink() : ProfileLink {
        this.nextProfileId++
        let linkId = "P" + this.nextProfileId.toString(10);
        return new ProfileLink(linkId);

    }

    createNewFamilyLink() : FamilyLink {
        this.nextFamilyId++
        let linkId = "F" + this.nextFamilyId.toString(10);
        return new FamilyLink(linkId);
    }

    updateFamily(family: Family) : boolean
    {
        if (family.familyId.isValid()) {
            let thisId = family.familyId;
            let thisFamily = this.findFamily(thisId);
            if (thisFamily != null) {
                if (family.children != null) {
                    thisFamily.children = family.children;
                }
                if (family.parents != null) {
                    thisFamily.parents = family.parents;
                }
                this.familyMap.set(thisId.link, thisFamily);

                return true;
            }
        }
        return false;
    }

    updateProfile(profile: Profile) : boolean
    {
        return false;
    }

    addNewFamily(family: Family) : FamilyLink
    {
        if (!family.familyId.isValid()) {
            family.familyId = this.createNewFamilyLink();
        }
        this.familyMap.set(family.familyId.link, family);
        return family.familyId;
    }

    addNewProfile(profile: Profile) : ProfileLink
    {
        if (!profile.profileId.isValid()) {
            profile.profileId = this.createNewProfileLink();
        }
        this.profileMap.set(profile.profileId.link, profile);
        return profile.profileId;
    }

    findProfile(profileLink: ProfileLink) : Profile|undefined
    {
        let thisId = profileLink;
        let thisProfile = this.profileMap.get(thisId.link);

        return thisProfile;
    }

    findFamily(familyLink: FamilyLink) : Family|undefined
    {
        let thisId = familyLink;
        let thisFamily = this.familyMap.get(thisId.link);
        return thisFamily;
    }

    showTreeStats() : void
    {
    }

    backendName: string;
    nextProfileId: number;
    nextFamilyId: number;
    profileMap: Map<string,Profile>;
    familyMap: Map<string,Family>;
}