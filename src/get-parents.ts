import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';

export function getParents(tree: TreeBackend, profileId: ProfileLink): ProfileLink[] {
  const parents: ProfileLink[] = [];
  const profile = tree.findProfile(profileId);
  if (profile != undefined) {
    if (profile.childInFamilies.getLinks().length > 0) {
      profile.childInFamilies.getLinks().forEach((childFamily) => {
        const family = tree.findFamily(new FamilyLink(childFamily.itemLink));
        if (family != undefined) {
          family.parents.getLinks().forEach((spouseProfile) => {
            parents.push(new ProfileLink(spouseProfile.itemLink));
          });
        }
      });
    }
  }
  return parents;
}
