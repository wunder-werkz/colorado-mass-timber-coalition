const partner = {
  name: "partner",
  type: "document",
  title: "List Link",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Title",
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

export default partner;
