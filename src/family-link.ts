import { TreeBackend } from './tree-backend';
import { Family } from './family';

export class FamilyLink {
    constructor(link: string) {
        this.familyId = link;
    }
    isValid() : boolean {
        return (this.familyId != null) && (this.familyId.length > 0);
    }
    fetch(tree: TreeBackend) : Family|undefined {
        return tree.findFamily(this);
    }
    familyId: string;
}

