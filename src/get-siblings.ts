import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';

export function getSiblings(tree: TreeBackend, profileId: ProfileLink): ProfileLink[] {
  const siblings: ProfileLink[] = [];
  const profile = tree.findProfile(profileId);
  if (profile != undefined) {
    if (profile.childInFamilies.getLinks().length > 0) {
      profile.childInFamilies.getLinks().forEach((childFamily) => {
        const family = tree.findFamily(new FamilyLink(childFamily.itemLink));
        if (family != undefined) {
          family.children.getLinks().forEach((childProfile) => {
            if (childProfile.itemLink != profileId.itemLink) {
              siblings.push(new ProfileLink(childProfile.itemLink));
            }
          });
        }
      });
    }
  }
  return siblings;
}
