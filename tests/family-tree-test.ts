import {  Profile, ProfileLink, Family, FamilyLink, TreeBackend  } from '../src/index';
import { StaticTreeBackend } from '../src/static-tree-backend';
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
    let tree = new StaticTreeBackend();

    let profile1 = undefined;
    let profile2 = undefined;
    let family1 = undefined;
    //Arrange
    it('Add first profile to tree ', () => {
        //Arrange
        let newProfile1 = createProfile("Kalle Andersson", "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        expect(newProfile1.profileId.link).to.equal("");


        let newProfileId = tree.addNewProfile(newProfile1);
        // Act
        expect(newProfileId.link).to.equal("P1");
    })
    it('Add second profile to tree ', () => {
        //Arrange
        let newProfile2 = createProfile("Karin Andersson", "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(newProfile2.profileId.link).to.equal("");


        let newProfileId = tree.addNewProfile(newProfile2);
        // Act
        expect(newProfileId.link).to.equal("P2");

        //tree.showTreeStats();

    })
    it('Find first profile ', () => {
        profile1 = tree.findProfile(new ProfileLink("P1"));

        // Assert
        expect(profile1?.profileId.link).to.equal("P1");
        expect(profile1?.name).to.equal("Kalle Andersson");

    })
    it('Find second profile ', () => {
        profile2 = tree.findProfile(new ProfileLink("P2"));

        // Assert
        expect(profile2?.profileId.link).to.equal("P2");
        expect(profile2?.name).to.equal("Karin Andersson");

    })
    it('Find invalid profile ', () => {
        let newProfile = tree.findProfile(new ProfileLink(""));

        // Assert
        expect(newProfile).to.equal(undefined);
    })
    it('Add family to tree ', () => {
        //Arrange
        let family = new Family();

        expect(family.familyId.link).to.equal("");

        let newFamilyId = tree.addNewFamily(family);

        expect(newFamilyId?.link).to.equal("F1");
    })
    it('Find family in tree ', () => {
        //Arrange
        family1 = tree.findFamily(new FamilyLink("F1"));

        expect(family1?.familyId.link).to.equal("F1");
    })
    it('Add parent 1 to family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F1"));

        expect(family?.familyId.link).to.equal("F1");

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P1"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F1"));

            expect(family2).to.not.equal(undefined);

            let profile2 = tree.findProfile(new FamilyLink("P1"));

            expect(profile2).to.not.equal(undefined);

            if (family2 != undefined) {
                
                expect(family2.parents.length).to.equal(1); 

                expect(family2.parents[0].link).to.equal("P1");
            }
            if (profile2 != undefined) {
                
                expect(profile2.parentFamilies.length).to.equal(1); 

                expect(profile2.parentFamilies[0].link).to.equal("F1");
            }
        }
    })    
    it('Add parent 2 to family ', () => {
        //Arrange
        let family = tree.findFamily(new FamilyLink("F1"));

        expect(family?.familyId.link).to.equal("F1");

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P2"));

            expect(result).to.equal(true);

            let family2 = tree.findFamily(new FamilyLink("F1"));

            expect(family2).to.not.equal(undefined);

            let profile2 = tree.findProfile(new FamilyLink("P2"));

            expect(profile2).to.not.equal(undefined);

            if (family2 != undefined) {
                
                expect(family2.parents.length).to.equal(2); 

                expect(family2.parents[0].link).to.equal("P1");

                expect(family2.parents[1].link).to.equal("P2");
            }
            if (profile2 != undefined) {
                
                expect(profile2.parentFamilies.length).to.equal(1); 

                expect(profile2.parentFamilies[0].link).to.equal("F1");
            }
        } 
    })

});