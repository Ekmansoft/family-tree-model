import { Profile } from './profile';
import { Relation } from './relation';
import { createProfileLink } from './create-profile-link.js';

function addRelativeToProfile(profile: Profile, relative: Profile, type: Relation)
{
    if (type == Relation.Parent)
    {
      profile.parentFamilies.push(createProfileLink("1234"));
    }

}