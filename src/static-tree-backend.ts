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
                this.familyMap.set(thisId.familyId, thisFamily);

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
                if (thisProfile.childInFamilies != null) {
                    thisProfile.childInFamilies = profile.childInFamilies;
                }
                if (thisProfile.spouseInFamilies != null) {
                    thisProfile.spouseInFamilies = profile.spouseInFamilies;
                }
                this.profileMap.set(thisId.profileId, thisProfile);

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
        this.familyMap.set(family.familyId.familyId, family);
        return family.familyId;
    }

    addNewProfile(profile: Profile) : ProfileLink
    {
        if (!profile.profileId.isValid()) {
            profile.profileId = this.createNewProfileLink();
        }
        this.profileMap.set(profile.profileId.profileId, profile);
        return profile.profileId;
    }

    addParentToFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            if (profile.spouseInFamilies.length > 0) {
                profile.spouseInFamilies.forEach(element => {
                    if (element.familyId == familyLink.familyId) {
                        return false;
                    }
                });
            }
            if (family.parents.length > 0) {
                family.parents.forEach(element => {
                    if (element.profileId == profileLink.profileId) {
                        return false;
                    }
                });
            }
            profile.spouseInFamilies.push(familyLink);
            family.parents.push(profileLink);
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
            if (profile.childInFamilies.length > 0) {
                profile.childInFamilies.forEach(element => {
                    if (element.familyId == familyLink.familyId) {
                        return false;
                    }
                });
            }
            if (family.children.length > 0) {
                family.children.forEach(element => {
                    if (element.profileId == profileLink.profileId) {
                        return false;
                    }
                });
            }
            profile.childInFamilies.push(familyLink);
            family.children.push(profileLink);
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
            let profileLinkIx = -1;
            let familyLinkIx = -1;
            if (profile.spouseInFamilies.length > 0) {
                let ix = 0;
                profile.spouseInFamilies.forEach(element => {
                    if (element.familyId == familyLink.familyId) {
                        profileLinkIx = ix;
                    }
                    ix++;
                });
            }
            if (family.parents.length > 0) {
                let ix = 0;
                family.parents.forEach(element => {
                    if (element.profileId == profileLink.profileId) {
                        familyLinkIx = ix;
                    }
                    ix++;
                });
            }
            if ((profileLinkIx >= 0) && (familyLinkIx >= 0)) {
                profile.spouseInFamilies.splice(profileLinkIx, 1);
                family.parents.splice(familyLinkIx, 1);
                let result1 = this.updateProfile(profile);
                let result2 = this.updateFamily(family);
                return result1 && result2;
                }
        }
        return false;
    }

    removeChildFromFamily(familyLink: FamilyLink, profileLink: ProfileLink) : boolean
    {
        let profile = this.findProfile(profileLink);
        let family = this.findFamily(familyLink);

        if ((profile != undefined) && (family != undefined))  {
            let profileLinkIx = -1;
            let familyLinkIx = -1;
            if (profile.childInFamilies.length > 0) {
                let ix = 0;
                profile.childInFamilies.forEach(element => {
                    if (element.familyId == familyLink.familyId) {
                        profileLinkIx = ix;
                    }
                    ix++;
                });
            }
            if (family.children.length > 0) {
                let ix = 0;
                family.children.forEach(element => {
                    if (element.profileId == profileLink.profileId) {
                        familyLinkIx = ix;
                    }
                    ix++;
                });
            }
            if ((profileLinkIx >= 0) && (familyLinkIx >= 0)) {
                profile.childInFamilies.splice(profileLinkIx, 1);
                family.children.splice(familyLinkIx, 1);
                let result1 = this.updateProfile(profile);
                let result2 = this.updateFamily(family);
                return result1 && result2;
                }
        }
        return false;
    }


    findProfile(profileLink: ProfileLink) : Profile|undefined
    {
        let thisId = profileLink;
        let thisProfile = this.profileMap.get(thisId.profileId);

        return thisProfile;
    }

    findFamily(familyLink: FamilyLink) : Family|undefined
    {
        let thisId = familyLink;
        let thisFamily = this.familyMap.get(thisId.familyId);
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