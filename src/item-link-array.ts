import { ItemLink } from './item-link';

export class ItemLinkArray {
    constructor() {
        this.relations = undefined;
    }
    relations: ItemLink[]|undefined;

    isValid()  : boolean {
        return (this.relations != undefined);
    }
    init() {
        this.relations = [];
    }

    append(link : ItemLink) {
        if (!this.isValid()) {
            this.init();
        }
        if (this.relations != undefined) {
            let oldIx = this.find(link);
            if (oldIx >= 0) {
                console.log("Error adding already present ", link.itemLink, oldIx)
                return;
            }
            this.relations.push(link);
        }
    }

    setLinks(links : ItemLink[]) {
        this.relations = links;
    }
    find(link: ItemLink) : number {
        if (this.relations != undefined) {
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
        return -1;
    }
    remove(link : ItemLink) {
        if (this.relations != undefined && this.relations.length > 0) {
            let profileLinkIx = this.find(link);
            if (profileLinkIx >= 0) {
                this.relations.splice(profileLinkIx);
                return true;
            }
        }
        console.log("Error removing, not present ", link.itemLink)
        return false;
    }
    getLinks() : ItemLink[] {
        if (this.relations != undefined) {
            return this.relations;
        }
        return [];
    }

}