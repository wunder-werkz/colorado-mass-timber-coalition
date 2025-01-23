const general = {
  name: "general",
  type: "document",
  title: "General Info",
  fields: [
    {
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "General Info",
      };
    },
  },
};

export default general;
