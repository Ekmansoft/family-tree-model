export class FamilyLink {
    constructor(link: string) {
        this.familyId = link;
    }
    isValid() : boolean {
        return (this.familyId != null) && (this.familyId.length > 0);
    }
    familyId: string;
}

