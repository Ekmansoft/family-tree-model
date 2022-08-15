import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';

export function getPartners(tree: TreeBackend, profileId: ProfileLink): ProfileLink[] {
  const partners: ProfileLink[] = [];
  const profile = tree.findProfile(profileId);
  if (profile != undefined) {
    if (profile.parentInFamilies.getLinks().length > 0) {
      profile.parentInFamilies.getLinks().forEach((spouseFamily) => {
        const family = tree.findFamily(new FamilyLink(spouseFamily.itemLink));
        if (family != undefined) {
          family.parents.getLinks().forEach((spouseProfile) => {
            if (spouseProfile.itemLink != profileId.itemLink) {
              partners.push(new ProfileLink(spouseProfile.itemLink));
            }
          });
        }
      });
    }
  }
  return partners;
}
