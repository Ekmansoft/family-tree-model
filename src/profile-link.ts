import { TreeBackend } from './tree-backend';
import { ItemLink } from './item-link';
import { Profile } from './profile';

export class ProfileLink extends ItemLink {
    getProfile(tree: TreeBackend) : Profile|undefined {
        return tree.findProfile(this);
    }
};
