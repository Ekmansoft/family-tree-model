import { TreeBackend } from './tree-backend';
import { Profile } from './profile';

export class ProfileLink {
    constructor(link: string) {
        this.profileId = link;
    }
    isValid() : boolean {
        return (this.profileId != null) && (this.profileId.length > 0);
    }
    fetch(tree: TreeBackend) : Profile|undefined {
        return tree.findProfile(this);
    }
    profileId: string;
};
