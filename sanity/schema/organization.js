const organization = {
    name: "organization",
    type: "document",
    title: "Organization",
    fields: [
      {
        name: "name",
        type: "string",
        title: "Name",
      },
      {
        name: "link",
        type: "string",
        title: "Link",
      },
    ],
    preview: {
      select: {
        title: "name",
      },
      prepare(selection) {
        const { title } = selection;
        return {
          title: title,
        };
      },
    },
  };
  
  export default organization;
  