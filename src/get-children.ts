import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { Profile } from './profile';
import { TreeBackend } from './tree-backend';

export function getChildren(tree: TreeBackend, profileId: ProfileLink): ProfileLink[] {
  const children: ProfileLink[] = [];
  const profile = tree.findProfile(profileId);
  if (profile != undefined) {
    if (profile.parentInFamilies.getLinks().length > 0) {
      profile.parentInFamilies.getLinks().forEach((childFamily) => {
        const family = tree.findFamily(new FamilyLink(childFamily.itemLink));
        if (family != undefined) {
          family.children.getLinks().forEach((childProfile) => {
            children.push(new ProfileLink(childProfile.itemLink));
          });
        }
      });
    }
  }
  return children;
}
