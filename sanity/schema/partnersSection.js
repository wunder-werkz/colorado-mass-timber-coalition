const partnersSection = {
    name: "partnersSection",
    type: "document",
    title: "List Link Section",
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
            name: "partners",
            type: "array",
            title: "Link List Items",
            of: [{ type: "reference", to: [{ type: "partner" }] }],
          },
    ],
    preview: {
      select: {
        title: "headline",
      },
      prepare(selection) {
        const { title } = selection;
        return {
          title: title,
        };
      },
    },
  };
  
  export default partnersSection;
  