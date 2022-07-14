# family-tree-model
A data model for genealogy family trees


# Purpose
Genealogy software need to use a form of tree structure to handle the structure of families and individuals in a family tree,
but using a normal tree structure is often not ideal.

This is an attempt to create such an open source, free data model that can be reused by any application that needs to show and manipulate family-trees in a frontend environment.

# Data structure

Many genealogical data structures (for examples the [GEDCOM](https://en.wikipedia.org/wiki/GEDCOM) file format and [Geni.com](http://Geni.com))
use a data structure with two types of nodes, family-nodes, and individual-nodes.

These nodes are then double-linked to each other to connect family members and related families to each other.

# Profile structure
A profile structure contains information about one individual, such as name, when and where the person was born and died, and which families he/she was part of.
```
Profile {
    profileId: string;
    name: string;
    birthDate: string;
    deathDate: string;
    childInFamilies[]: FamilyLink;
    parentInFamilies[]: FamilyLink;
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
Here is an example how it can look in a family with two parents and one child, and a link to the family where the mother of the family grew up.

``` mermaid
  graph TD;
      grandMother1(Mother's mother):::ProfileClass-->|parentInFamilies|grandParentFamily1[Family where mother grew up];
      grandFather1(Mother's father):::ProfileClass-->|parentInFamilies|grandParentFamily1(Family where mother grew up);
      grandParentFamily1:::FamilyClass-->|parents|grandMother1:::ProfileClass;
      grandParentFamily1-->|parents|grandFather1;
      grandParentFamily1-->|children|motherProfile1:::ProfileClass;
      family1(Main family):::FamilyClass-->|parents|motherProfile1;
      family1-->|parents|fatherProfile1(Father):::ProfileClass;
      family1-->|children|childProfile1(Child):::ProfileClass;
      motherProfile1(Mother)-->|childInFamilies|grandParentFamily1;
      motherProfile1-->|parentInFamilies|family1(Main family);
      fatherProfile1(Father)-->|parentInFamilies|family1;
      childProfile1(Child)-->|childInFamilies|family1;
      classDef FamilyClass fill:#f33,color:#000,stroke-width:4px,stroke-dasharray:5
      classDef ProfileClass fill:#3f3,color:#000,stroke-width:4px,stroke-dasharray:5
```

If this looks complicated to you, yes, it is a bit complicated, but family relations are
complicated, so these data structures need to be a bit complicated too... ;-)

The model is flexible enough to handle special cases such as where a child has multiple
sets of parents. This is very useful when a child has both biological parents and
foster parents for example.

Cases where parents have children with multiple partners are also handled with ease.