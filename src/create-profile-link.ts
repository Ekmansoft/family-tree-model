
import { ProfileLink } from'./profile-link';

export function createProfileLink(link: string)
{
    let newLink = new ProfileLink(link);

    return newLink;
};