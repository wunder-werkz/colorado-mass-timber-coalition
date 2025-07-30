const listItem = {
    name: "listItem",
    type: "document",
    title: "List Item",
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
        of: [{ type: "block", styles: [], }],
      },
      {
        name: "link",
        type: "array",
        title: "Link",
        hidden: true,
        of: [{ type: "reference", to: [{ type: "link" }] }],
        validation: (Rule) => Rule.max(1),
      },
    ],
    preview: {
      select: {
        title: 'headline'
      }
    }
  };
  
  export default listItem;
  