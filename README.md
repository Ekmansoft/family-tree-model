# family-tree-model
A data model for genealogy family trees


# Purpose
Genealogy software need to use a form of tree structure to handle the structure of families and individuals in a family tree,
but using a normal tree structure is often not ideal.

Many genealogical data structures (for examples the [GEDCOM](https://en.wikipedia.org/wiki/GEDCOM) file format and [Geni.com](http://Geni.com))
use two types of nodes, family-nodes, and individual-nodes.

These are then double-linked to each other to connect family members and related famililies to each other.

This is an attempt to create such an open source, free data model that can be reused by any application that needs to show and manipulate family-trees in a frontend environment.

# Profile structure
A profile structure contains information about one individual, such as name, when and where the person was born and died, and which families he/she was part of.
```
Profile {
    profileId: string;
    name: string;
    birthDate: string;
    deathDate: string;
    childInFamilies[]: FamilyLink;
    childInFamilies[]: FamilyLink;
}
```

# Family structure
A family stucture lists the members of one family and the relations between family members.
```
Family {
    familyId: string;
    marriageDate: string;
    children[]: ProfileLink;
    parents[]: ProfileLink;
}
```

# Link structures
In addition it's helpful to create link structures to make it clear what we expect to find at the end of our links.
```
FamilyLink {
    familyId: string;
}

ProfileLink {
    profileId: string;
}
```

# Simple example
Here is an example of one family with two parents and one child.

``` mermaid
  graph TD;
      family1-->|parents|motherProfile1;
      family1-->|parents|fatherProfile1;
      family1-->|children|childProfile1;
```

``` mermaid
  graph TD;
      motherProfile1-->|spouseInFamilies|family1;
      fatherProfile1-->|spouseInFamilies|family1;
      childProfile1-->|childInFamilies|family1;
```