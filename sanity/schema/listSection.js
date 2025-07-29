const listSection = {
    name: "listSection",
    type: "document",
    title: "List Section",
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
        name: "listItems",
        type: "array",
        title: "list Items",
        of: [{ type: "reference", to: [{ type: "listItem" }] }],
      },
    ],
  };
  
  export default listSection;
  