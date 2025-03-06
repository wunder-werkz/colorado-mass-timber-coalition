const homepage = {
    name: "homePage",
    type: "document",
    title: "Home Page",
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
        name: "partnersText",
        type: "array",
        title: "Partners Intro Text",
        of: [{ type: "block", styles: [], }],
        style: [],
      },     
      {
        name: "partners",
        type: "array",
        title: "Partners Array",
        of: [
          {
            type: "reference",
            to: [
              { type: "partner" },
            ],
          },
        ],
      },
    ],
  };
  
  export default homepage;
  