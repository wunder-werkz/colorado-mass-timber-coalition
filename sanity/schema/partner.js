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
    {
      name: "downloadPdf",
      type: "file",
      title: "Download PDF",
      description: "If a file is uploaded, then the link in the link field is not needed",
      fields: [
        {
          title: "Description",
          name: "description",
          type: "string",
        },
      ],
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
