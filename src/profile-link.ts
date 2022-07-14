export class ProfileLink {
    constructor(link: string) {
        this.profileId = link;
    }
    isValid() : boolean {
        return (this.profileId != null) && (this.profileId.length > 0);
    }
    profileId: string;
};
