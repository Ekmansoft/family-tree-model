import {  Profile, ProfileLink, Family, FamilyLink, TreeBackend  } from '../src/index';
import { StaticTreeBackend } from '../src/static-tree-backend';
import { expect } from 'chai';
import 'mocha';

function createProfile(tree: TreeBackend, 
    name: string,
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
    it('Add profile to tree ', () => {
        //Arrange
        let tree = new StaticTreeBackend();
        let profile1 = createProfile(tree,  "Kalle Andersson", "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        expect(profile1.profileId.link).to.equal("");


        let newProfileId = tree.addNewProfile(profile1);
        // Act
        expect(newProfileId.link).to.equal("P1");

        let profile2 = createProfile(tree,  "Bertil Andersson", "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(profile2.profileId.link).to.equal("");


        newProfileId = tree.addNewProfile(profile2);
        // Act
        expect(newProfileId.link).to.equal("P2");

        //tree.showTreeStats();

        let newProfile = tree.findProfile(newProfileId);

        // Assert
        expect(newProfile?.profileId.link).to.equal("P2");
        expect(newProfile?.name).to.equal("Bertil Andersson");
    })

});