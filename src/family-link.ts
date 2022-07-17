import { TreeBackend } from './tree-backend';
import { ItemLink } from './item-link';
import { Family } from './family';

export class FamilyLink extends ItemLink {
  getFamily(tree: TreeBackend): Family | undefined {
    return tree.findFamily(this);
  }
}
