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
    {
      name: "infoGated",
      type: "boolean",
      title: "Info Gated?",
      description:
        "If enabled, visitors must submit the email form before the PDF can be downloaded.",
      initialValue: false,
      // Only relevant for downloadable resources, so hide it for plain link partners.
      hidden: ({ parent }) => !parent?.downloadPdf,
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
