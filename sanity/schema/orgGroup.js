const orgGroup = {
    name: "orgGroup",
    type: "document",
    title: "Org Group",
    fields: [
      { 
        name: "groupTitle",
        type: "string",
        title: "Group Title",
      },     
      {
        name: "organizations",
        type: "array",
        title: "Organizations",
        of: [
          {
            type: "reference",
            to: [
              { type: "organization" },
            ],
          },
        ],
      },
    ],
  };
  
  export default orgGroup;
  