export class ItemLink {
  constructor(link: string) {
    this.itemLink = link;
  }
  isValid(): boolean {
    return this.itemLink != null && this.itemLink.length > 0;
  }
  itemLink: string;
}
