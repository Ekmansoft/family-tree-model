import { Profile } from './profile';
import { Family } from './family';

function addProfileToFamilyAsParent(family: Family, profile: Profile)
{
    family.parents.push(profile.profileId);
}

function addProfileToFamilyAsChild(family: Family, profile: Profile)
{
    family.children.push(profile.profileId);
}