import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Family } from './family';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';
import { ItemLinkArray } from './item-link-array';

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
                if (family.children.isValid()) {
                    thisFamily.children.setLinks(family.children.getLinks());
                }
                if (family.parents.isValid()) {
                    thisFamily.parents.setLinks(family.parents.getLinks());
                }
                this.familyMap.set(thisId.itemLink, thisFamily);

                return true;
            } else {
                console.log("Error updating family, not found ", family.familyId);
            }
        } else {
            console.log("Error updating family, not valid ", family.familyId);
        }
        return false;
    }

    updateProfile(profile: Profile) : boolean
    {
        if (profile.profileId.isValid()) {
            let thisId = profile.profileId;
            let thisProfile = this.findProfile(thisId);
            if (thisProfile != null) {
                if (profile.childInFamilies.isValid()) {
                    thisProfile.childInFamilies.setLinks(profile.childInFamilies.getLinks());
                }
                if (profile.parentInFamilies.isValid()) {
                    thisProfile.parentInFamilies.setLinks(profile.parentInFamilies.getLinks());
                }
                this.profileMap.set(thisId.itemLink, thisProfile);

                return true;
            } else {
                console.log("Error updating profile, not found ", profile.profileId);
            }
        } else {
            console.log("Error updating profile, not valid ", profile.profileId);
        }
        return false;
    }

    addNewFamily(family: Family) : FamilyLink
    {
        if (!family.familyId.isValid()) {
            family.familyId = this.createNewFamilyLink();
        } else {
            let item = this.familyMap.get(family.familyId.itemLink);
            if (item != undefined) {
                console.log("Error adding new family, already exists");
                return family.familyId;
            }
        }
        this.familyMap.set(family.familyId.itemLink, family);
        return family.familyId;
    }

    addNewProfile(profile: Profile) : ProfileLink
    {
        if (!profile.profileId.isValid()) {
            profile.profileId = this.createNewProfileLink();
        } else {
            let item = this.profileMap.get(profile.profileId.itemLink);
            if (item != undefined) {
                console.log("Error adding new profile, already exists");
                return profile.profileId;
            }
        }
        this.profileMap.set(profile.profileId.itemLink, profile);
        return profile.profileId;
    }

    addProfileToFamily(profileLinkArray: ItemLinkArray, familyLinkArray: ItemLinkArray, profile: Profile, family: Family) : boolean
    {
        let profilAppendSuccess = profileLinkArray.append(family.familyId);
        let familyAppendSuccess = familyLinkArray.append(profile.profileId);
        if (profilAppendSuccess && familyAppendSuccess) {
            let result1 = this.updateProfile(profile);
            let result2 = this.updateFamily(family);
            if (!result1 || !result2) {
                console.log("Error removing parent from family ", result1, result2);
            }
            return result1 && result2;
        } else {
            console.log("Error removing parent from family ", profilAppendSuccess, familyAppendSuccess);
        }
        return false;
    }


    addParentToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            return this.addProfileToFamily(profile.parentInFamilies, family.parents, profile, family);
        }
        console.log("Error adding parent to family, not found ", profileLink, familyLink);
        return false;
    }

    addChildToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            return this.addProfileToFamily(profile.childInFamilies, family.children, profile, family);
        }
        console.log("Error adding child to family, not found ", profileLink, familyLink);
        return false;
    }

    removeProfileFromFamily(profileLinkArray: ItemLinkArray, familyLinkArray: ItemLinkArray, profile: Profile, family: Family) : boolean
    {
        let profileRemSuccess = profileLinkArray.remove(family.familyId);
        let familyRemSuccess = familyLinkArray.remove(profile.profileId);
        if (profileRemSuccess && familyRemSuccess) {
            let result1 = this.updateProfile(profile);
            let result2 = this.updateFamily(family);
            if (!result1 || !result2) {
                console.log("Error removing parent from family ", result1, result2);
            }
            return result1 && result2;
        } else {
            console.log("Error removing parent from family ", profileRemSuccess, familyRemSuccess);
        }
        return false;
    }


    removeParentFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            return this.removeProfileFromFamily(profile.parentInFamilies, family.parents, profile, family);
        }
        return false;
    }

    removeChildFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            return this.removeProfileFromFamily(profile.childInFamilies, family.children, profile, family);
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