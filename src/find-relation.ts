import { FamilyLink } from './family-link';
import { ProfileLink } from './profile-link';
import { TreeBackend } from './tree-backend';

export enum Relation {
  None,
  Same,
  Parent,
  Child,
}

export function findRelation(tree: TreeBackend, family1: FamilyLink, family2: FamilyLink): Relation {
  if (family1.itemLink == family2.itemLink) {
    return Relation.Same;
  }
  const fam1 = tree.findFamily(family1);
  const fam2 = tree.findFamily(family2);
  if (fam1 != undefined && fam2 != undefined) {
    for (const person1 of fam1.children.getLinks()) {
      for (const person2 of fam2.parents.getLinks()) {
        if (person1 == person2) {
          return Relation.Parent;
        }
      }
    }
    for (const person1 of fam1.parents.getLinks()) {
      for (const person2 of fam2.children.getLinks()) {
        if (person1 == person2) {
          return Relation.Child;
        }
      }
    }
  } else {
    console.log('Error finding family 1 or 2', family1, family2);
  }
  return Relation.None;
}
