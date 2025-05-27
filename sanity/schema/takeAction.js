const takeAction = {
    name: "takeAction",
    type: "document",
    title: "Take Action Page",
    fields: [
      {
        name: "pageTitle",
        type: "string",
        title: "Page Title",
      },
      {
        name: "pageMetadata",
        type: "text",
        title: "Page Metadata",
        description: "Metadata used for SEO",
      },
      {
        name: "headline",
        type: "string",
        title: "Page Headline",
      },
      { 
        name: "orgHeadline",
        type: "string",
        title: "Organizations Headline",
      },     
      {
        name: "orgGroups",
        type: "array",
        title: "Org Groups",
        of: [
          {
            type: "reference",
            to: [
              { type: "orgGroup" },
            ],
          },
        ],
      },
      { 
        name: "subHeadline",
        type: "string",
        title: "Subcommittee Headline",
      },    
      {
        name: "subcommittees",
        type: "array",
        title: "Subcommittees",
        of: [
          {
            type: "reference",
            to: [
              { type: "subcommittee" },
            ],
          },
        ],
      },
      {
        name: "stumpyText",
        type: "string",
        title: "Stumpy Text",
        validation: (Rule) => Rule.max(100).warning("100 characters max"),
      },
      {
        name: "stumpyLink",
        type: "array",
        title: "Stumpy Link",
        validation: (Rule) => Rule.max(1).warning("only one link"),
        of: [
          {
            type: "reference",
            to: [
              { type: "link"},
            ],
          },
        ],
      },
    ],
  };
  
  export default takeAction;
  