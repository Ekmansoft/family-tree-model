import { ItemLink } from './item-link';

export class ItemLinkArray {
    constructor() {
        this.relations = [];
    }
    relations: ItemLink[];

    append(link : ItemLink) {
        this.relations.push(link);
    }
    setLinks(links : ItemLink[]) {
        this.relations = links;
    }
    find(link: ItemLink) : number {
        let profileLinkIx = -1;
        let ix = 0;
        this.relations.forEach(element => {
            if (element.itemLink == link.itemLink) {
                profileLinkIx = ix;
            }
            ix++;
        });
        return profileLinkIx;
    }
    remove(link : ItemLink) {
        if (this.relations.length > 0) {
            let profileLinkIx = this.find(link);
            if (profileLinkIx >= 0) {
                this.relations.splice(profileLinkIx);
                return true;
            }
        }
        return false;
    }
    getLinks() : ItemLink[] {
        return this.relations;
    }

}