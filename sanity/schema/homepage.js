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
        name: "heroSlider",
        type: "array",
        title: "Hero Slider Images",
        of: [
          { 
            type: "reference",
            to: [
              {type: "sliderImage"},
            ],
          },
        ],
        validation: (Rule) => Rule.max(5).warning("5 slides max"),
      }, 
      {
        name: "mission",
        type: "string",
        title: "Mission Statment"
      },
      { name: "takeActionHeadline",
        type: "string",
        title: "Take Action Headline",
      },
      {
        name: "takeActionCopy",
        type: "array",
        title: "Take Action Copy",
        of: [{ type: "block", styles: [], }],
        style: [],
      },
      {
        name: "takeActionLink",
        type: "array",
        title: "Link",
        validation: (Rule) => Rule.max(1).warning("only one link"),
        of: [
            {
                type: "reference",
                to: [
                { type: "link" },
                ],
            },
        ],
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
  