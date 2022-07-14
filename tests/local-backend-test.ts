import {  Profile, ProfileLink, Family, FamilyLink, TreeBackend  } from '../src/index';
import { LocalTreeBackend } from '../src/local-tree-backend';
import { expect } from 'chai';
import 'mocha';

function createProfile(name: string,
    birthDate: string,
    birthPlace: string,
    deathDate: string,
    deathPlace: string) : Profile {

    let profile = new Profile();
    profile.name = name;
    profile.birthDate = birthDate;
    profile.birthPlace = birthPlace;
    profile.deathDate = deathDate;
    profile.deathPlace = deathPlace;
    return profile;
}

describe('verify tree', () => {
    let tree = new LocalTreeBackend();

    let profile1 = undefined;
    let profile2 = undefined;
    let family1 = undefined;
    //Arrange
    it('Add first profile to tree ', () => {
        //Arrange
        let newProfile1 = createProfile("Kalle Andersson", "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        expect(newProfile1.profileId.profileId).to.equal("");


        let newProfileId = tree.addNewProfile(newProfile1);
        // Act
        expect(newProfileId.profileId).to.equal("P1");
    })
    it('Add second profile to tree ', () => {
        //Arrange
        let newProfile2 = createProfile("Karin Andersson", "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(newProfile2.profileId.profileId).to.equal("");


        let newProfileId = tree.addNewProfile(newProfile2);
        // Act
        expect(newProfileId.profileId).to.equal("P2");

        //tree.showTreeStats();

    })
    it('Find first profile ', () => {
        profile1 = tree.findProfile(new ProfileLink("P1"));

        // Assert
        expect(profile1?.profileId.profileId).to.equal("P1");
        expect(profile1?.name).to.equal("Kalle Andersson");

    })
    it('Find second profile ', () => {
        profile2 = tree.findProfile(new ProfileLink("P2"));

        // Assert
        expect(profile2?.profileId.profileId).to.equal("P2");
        expect(profile2?.name).to.equal("Karin Andersson");

    })
    it('Find invalid profile ', () => {
        let newProfile = tree.findProfile(new ProfileLink(""));

        // Assert
        expect(newProfile).to.equal(undefined);
    })
    it('Add first family to tree ', () => {
        //Arrange
        let family = new Family();

        expect(family.familyId.familyId).to.equal("");

        let newFamilyId = tree.addNewFamily(family);

        expect(newFamilyId?.familyId).to.equal("F1");
    })
    it('Find family in tree ', () => {
        //Arrange
        family1 = tree.findFamily(new FamilyLink("F1"));

        expect(family1?.familyId.familyId).to.equal("F1");
    })
    it('Add parent 1 to family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F1"));

        expect(family?.familyId.familyId).to.equal("F1");

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P1"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F1"));

            expect(family2).to.not.equal(undefined);

            let profile2 = tree.findProfile(new ProfileLink("P1"));

            expect(profile2).to.not.equal(undefined);

            if (family2 != undefined) {

                expect(family2.parents.length).to.equal(1);

                expect(family2.parents[0].profileId).to.equal("P1");
            }
            if (profile2 != undefined) {

                expect(profile2.parentInFamilies.length).to.equal(1);

                expect(profile2.parentInFamilies[0].familyId).to.equal("F1");
            }
        }
    })
    it('Add parent 2 to family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F1"));

        expect(family?.familyId.familyId).to.equal("F1");

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P2"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F1"));

            expect(family2).to.not.equal(undefined);

            let profile2 = tree.findProfile(new ProfileLink("P2"));

            expect(profile2).to.not.equal(undefined);

            if (family2 != undefined) {

                expect(family2.parents.length).to.equal(2);

                expect(family2.parents[0].profileId).to.equal("P1");

                expect(family2.parents[1].profileId).to.equal("P2");
            }
            if (profile2 != undefined) {

                expect(profile2.parentInFamilies.length).to.equal(1);

                expect(profile2.parentInFamilies[0].familyId).to.equal("F1");
            }
        }
    })
    it('Add second family to tree and set P1 as a child ', () => {
        //Arrange
        let family = new Family();

        expect(family.familyId.familyId).to.equal("");

        let newFamilyId = tree.addNewFamily(family);

        expect(newFamilyId?.familyId).to.equal("F2");

        let result = tree.addChildToFamily(new FamilyLink("F2"), new ProfileLink("P1"));

        expect(result).to.equal(true);

        let profile1 = tree.findProfile(new ProfileLink("P1"));

        expect(profile1).to.not.equal(undefined);

        if (profile1 != undefined) {

            expect(profile1.childInFamilies.length).to.equal(1);

            expect(profile1.childInFamilies[0].familyId).to.equal("F2");
        }

    })

});