const event = {
  name: "event",
  type: "document",
  title: "Events",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    { name: "startDate", type: "date", title: "Start Date" },
    { name: "endDate", type: "date", title: "End Date" },
    { name: "location", type: "string", title: "Location" },
    { name: "link", type: "string", title: "Link" },
    { name: "selfHosted", type: "boolean", title: "Self Hosted" },
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

export default event;
