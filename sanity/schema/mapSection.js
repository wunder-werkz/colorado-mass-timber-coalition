const mapSection = {
    name: "mapSection",
    type: "document",
    title: "Map Section",
    fields: [
      {
        name: "headline",
        type: "string",
        title: "Headline",
      },
      {
        name: "copy",
        type: "array",
        title: "Copy",
        hidden: true,
        of: [{ type: "block", styles: [], }],
      },
      {
        name: "maps",
        type: "array",
        title: "Map Items",
        of: [{ type: "reference", to: [{ type: "map" }] }],
      },
    ],
  };
  
  export default mapSection;
  