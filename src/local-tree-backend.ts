import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Family } from './family';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';

export class LocalTreeBackend implements TreeBackend {
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
                if (family.children.getLinks().length > 0) {
                    thisFamily.children.setLinks(family.children.getLinks());
                }
                if (family.parents.getLinks().length > 0) {
                    thisFamily.parents.setLinks(family.parents.getLinks());
                }
                this.familyMap.set(thisId.itemLink, thisFamily);

                return true;
            }
        }
        return false;
    }

    updateProfile(profile: Profile) : boolean
    {
        if (profile.profileId.isValid()) {
            let thisId = profile.profileId;
            let thisProfile = this.findProfile(thisId);
            if (thisProfile != null) {
                if (profile.childInFamilies.getLinks().length > 0) {
                    thisProfile.childInFamilies.setLinks(profile.childInFamilies.getLinks());
                }
                if (profile.parentInFamilies.getLinks().length > 0) {
                    thisProfile.parentInFamilies.setLinks(profile.parentInFamilies.getLinks());
                }
                this.profileMap.set(thisId.itemLink, thisProfile);

                return true;
            }
        }
        return false;
    }

    addNewFamily(family: Family) : FamilyLink
    {
        if (!family.familyId.isValid()) {
            family.familyId = this.createNewFamilyLink();
        }
        this.familyMap.set(family.familyId.itemLink, family);
        return family.familyId;
    }

    addNewProfile(profile: Profile) : ProfileLink
    {
        if (!profile.profileId.isValid()) {
            profile.profileId = this.createNewProfileLink();
        }
        this.profileMap.set(profile.profileId.itemLink, profile);
        return profile.profileId;
    }

    addParentToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            profile.parentInFamilies.append(familyLink);
            family.parents.append(profileLink);
            let result1 = this.updateProfile(profile);
            let result2 = this.updateFamily(family);
            return result1 && result2;
        }
        return false;
    }
    addChildToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            profile.childInFamilies.append(familyLink);
            family.children.append(profileLink);
            let result1 = this.updateProfile(profile);
            let result2 = this.updateFamily(family);
            return result1 && result2;
        }
        return false;
    }

    removeParentFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            profile.parentInFamilies.remove(familyLink);
            family.parents.remove(profileLink);
            let result1 = this.updateProfile(profile);
            let result2 = this.updateFamily(family);
            return result1 && result2;
        }
        return false;
    }

    removeChildFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            profile.childInFamilies.remove(familyLink);
            family.children.remove(profileLink);
            let result1 = this.updateProfile(profile);
            let result2 = this.updateFamily(family);
            return result1 && result2;
        }
        return false;
    }


    findProfile(profileLink: ProfileLink) : Profile|undefined
    {
        let thisId = profileLink;
        let thisProfile = this.profileMap.get(thisId.itemLink);

        return thisProfile;
    }

    findFamily(familyLink: FamilyLink) : Family|undefined
    {
        let thisId = familyLink;
        let thisFamily = this.familyMap.get(thisId.itemLink);
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