const subcommittee = {
    name: "subcommittee",
    type: "document",
    title: "Subcommittee",
    fields: [
      {
        name: "name",
        type: "string",
        title: "Name",
      },
      {
        name: "description",
        type: "array",
        title: "Subcommittee Description",
        of: [{ type: "block", styles: [], }],
        style: [],
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
  
  export default subcommittee;
  