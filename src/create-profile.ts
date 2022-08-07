import { Profile, ProfileSex } from './index';

export function createProfile(
  name: string,
  sex: ProfileSex,
  birthDate: string,
  birthPlace: string,
  deathDate: string,
  deathPlace: string,
) {
  const profile = new Profile();
  profile.name = name;
  profile.sex = sex;
  profile.birthDate = birthDate;
  profile.birthPlace = birthPlace;
  profile.deathDate = deathDate;
  profile.deathPlace = deathPlace;
  return profile;
}
