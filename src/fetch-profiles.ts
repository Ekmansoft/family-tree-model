import { Profile } from './profile';
import { ProfileLink } from './profile-link';
import { ItemLinkArray } from './item-link-array';
import { TreeBackend } from './tree-backend';

export function fetchProfiles(tree: TreeBackend, links: ItemLinkArray): Profile[] {
  if (links != undefined) {
    const profiles: Profile[] = [];
    if (links.relations != undefined) {
      links.relations.forEach((element) => {
        const profileLink = new ProfileLink('');
        profileLink.itemLink = element.itemLink;
        const profile = tree.findProfile(profileLink);
        if (profile != undefined) {
          profiles.push(profile);
        } else {
          console.log('warning');
        }
      });
    }
    return profiles;
  }
  return [];
}
