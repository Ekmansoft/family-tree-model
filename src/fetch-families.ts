import { Family } from './family';
import { FamilyLink } from './family-link';
import { ItemLinkArray } from './item-link-array';
import { TreeBackend } from './tree-backend';

export function fetchFamilies(tree: TreeBackend, links: ItemLinkArray) : Family[] {
    if (links != undefined) {
        let families: Family[] = []
        if (links.relations != undefined) {
            links.relations.forEach(element => {
                let familyLink = new FamilyLink("");
                familyLink.itemLink = element.itemLink;
                let family = tree.findFamily(familyLink)
                if (family != undefined) {
                    families.push(family);
                } else {
                    console.log("warning");
                }
            });
        }
        return families;
    }
    return [];
}
