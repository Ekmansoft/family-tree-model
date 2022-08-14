import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { TreeBackend } from './tree-backend';

export enum Relation {
  None,
  Parent,
  Child,
}

export function findRelation(tree: TreeBackend, family: FamilyLink, profile: ProfileLink): Relation {
  const fam1 = tree.findFamily(family);
  if (fam1 != undefined) {
    for (const fam1profile of fam1.children.getLinks()) {
      if (fam1profile.itemLink == profile.itemLink) {
        return Relation.Child;
      }
    }
    for (const fam1profile of fam1.parents.getLinks()) {
      if (fam1profile.itemLink == profile.itemLink) {
        return Relation.Parent;
      }
    }
  } else {
    console.log('Error finding family', family);
  }
  return Relation.None;
}
