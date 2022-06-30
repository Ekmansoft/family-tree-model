export class ProfileLink {
    constructor(link: string) {
        this.link = link;
    }
    isValid() : boolean {
        return (this.link != null) && (this.link.length > 0);
    }
    link: string;
};
