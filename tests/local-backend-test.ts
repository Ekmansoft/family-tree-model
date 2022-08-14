import {  Profile,
        ProfileSex,
        ProfileLink,
        Family,
        FamilyLink,
        createProfile,
        TreeBackend,
        Relation,
        findRelation  } from '../src/index';
import { LocalTreeBackend } from '../src/local-tree-backend';
import { expect } from 'chai';
import 'mocha';

describe('verify tree', () => {
    let tree = new LocalTreeBackend();

    let profile1 = undefined;
    let profile2 = undefined;
    let family1 = undefined;
    //Arrange
    it('Add first profile to tree ', () => {
        //Arrange
        let newProfile1 = createProfile("Kalle Andersson", ProfileSex.Male, "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        expect(newProfile1.profileId.itemLink).to.equal("");


        let newProfileId = tree.addNewProfile(newProfile1);
        // Act
        expect(newProfileId?.itemLink).to.equal("P1");
    })
    it('Add second profile to tree ', () => {
        //Arrange
        let newProfile2 = createProfile("Karin Andersson", ProfileSex.Female, "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(newProfile2.profileId.itemLink).to.equal("");


        let newProfileId = tree.addNewProfile(newProfile2);
        // Act
        expect(newProfileId?.itemLink).to.equal("P2");

        //tree.showTreeStats();

    })
    it('Find first profile ', () => {
        profile1 = tree.findProfile(new ProfileLink("P1"));

        // Assert
        expect(profile1?.profileId.itemLink).to.equal("P1");
        expect(profile1?.getFullName()).to.equal("Kalle Andersson");

    })
    it('Find second profile ', () => {
        profile2 = tree.findProfile(new ProfileLink("P2"));

        // Assert
        expect(profile2?.profileId.itemLink).to.equal("P2");
        expect(profile2?.getFullName()).to.equal("Karin Andersson");

    })
    it('Find invalid profile ', () => {
        let newProfile = tree.findProfile(new ProfileLink(""));

        // Assert
        expect(newProfile).to.equal(undefined);
    })
    it('Add first family to tree ', () => {
        //Arrange
        let family = new Family();

        expect(family.familyId.itemLink).to.equal("");

        let newFamilyId = tree.addNewFamily(family);

        expect(newFamilyId?.itemLink).to.equal("F1");
    })
    it('Find family in tree ', () => {
        //Arrange
        family1 = tree.findFamily(new FamilyLink("F1"));

        expect(family1?.familyId.itemLink).to.equal("F1");
    })
    it('Add parent 1 to family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F1"));

        expect(family?.familyId.itemLink).to.equal("F1");

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P1"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F1"));

            expect(family2).to.not.equal(undefined);

            let profile2 = tree.findProfile(new ProfileLink("P1"));

            expect(profile2).to.not.equal(undefined);

            if (family2 != undefined) {

                expect(family2.parents.getLinks().length).to.equal(1);

                expect(family2.parents.getLinks()[0].itemLink).to.equal("P1");
            }
            if (profile2 != undefined) {

                expect(profile2.parentInFamilies.getLinks().length).to.equal(1);

                expect(profile2.parentInFamilies.getLinks()[0].itemLink).to.equal("F1");
            }
        }
    })
    it('Add parent 2 to family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F1"));

        expect(family?.familyId.itemLink).to.equal("F1");

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P2"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F1"));

            expect(family2).to.not.equal(undefined);

            if (family2 != undefined) {

                expect(family2.parents.getLinks().length).to.equal(2);

                expect(family2.parents.getLinks()[0].itemLink).to.equal("P1");

                expect(family2.parents.getLinks()[1].itemLink).to.equal("P2");
            }

            let profile2 = tree.findProfile(new ProfileLink("P2"));

            expect(profile2).to.not.equal(undefined);

            if (profile2 != undefined) {

                expect(profile2.parentInFamilies.getLinks().length).to.equal(1);

                expect(profile2.parentInFamilies.getLinks()[0].itemLink).to.equal("F1");
            }
        }
    })
    it('Add second family to tree and set P1 as a child ', () => {
        //Arrange
        let family = new Family();

        expect(family.familyId.itemLink).to.equal("");

        let newFamilyId = tree.addNewFamily(family);

        expect(newFamilyId?.itemLink).to.equal("F2");

        let result = tree.addChildToFamily(new FamilyLink("F2"), new ProfileLink("P1"));

        expect(result).to.equal(true);

        let profile1 = tree.findProfile(new ProfileLink("P1"));

        expect(profile1).to.not.equal(undefined);

        if (profile1 != undefined) {

            expect(profile1.childInFamilies.getLinks().length).to.equal(1);

            expect(profile1.childInFamilies.getLinks()[0].itemLink).to.equal("F2");
        }

    })
    it('Add grandparent 1 to second family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F2"));

        expect(family?.familyId.itemLink).to.equal("F2");

        if (family?.familyId != undefined) {

            let newProfile3 = createProfile("Thelma Andersson", ProfileSex.Female, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

            let newProfileId = tree.addNewProfile(newProfile3);
            // Act
            expect(newProfileId?.itemLink).to.equal("P3");

            let result = tree.addParentToFamily(new FamilyLink("F2"), new ProfileLink("P3"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F2"));

            expect(family2).to.not.equal(undefined);

            let profile2 = tree.findProfile(new ProfileLink("P3"));

            expect(profile2).to.not.equal(undefined);

            if (family2 != undefined) {

                expect(family2.parents.getLinks().length).to.equal(1);

                expect(family2.parents.getLinks()[0].itemLink).to.equal("P3");
            }
            if (profile2 != undefined) {

                expect(profile2.parentInFamilies.getLinks().length).to.equal(1);

                expect(profile2.parentInFamilies.getLinks()[0].itemLink).to.equal("F2");
            }
        }
    })

    it('Find relation between families ', () => {
        //Arrange
        let relation = findRelation(tree, new FamilyLink("F1"), new FamilyLink("F2"));

        expect(relation).to.equal(Relation.Child);

        let relation2 = findRelation(tree, new FamilyLink("F2"), new FamilyLink("F1"));

        expect(relation2).to.equal(Relation.Parent);
        let relation3 = findRelation(tree, new FamilyLink("F1"), new FamilyLink("F1"));

        expect(relation3).to.equal(Relation.Same);
    })



    it('Search for name Thelma ', () => {
        //Arrange
        let matches = tree.search("Thelma");

        expect(matches.length).to.equal(1);

        expect(matches[0].name).to.equal("Thelma Andersson");

        expect(matches[0].profileId.itemLink).to.equal("P3");
    })
    it('Search for name Ruben', () => {
        //Arrange
        let matches = tree.search("Ruben");

        expect(matches.length).to.equal(0);

    })
});