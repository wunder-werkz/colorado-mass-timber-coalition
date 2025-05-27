const link = {
    name: "link",
    type: "document",
    title: "Link",
    fields: [
      {
        name: "linkTitle",
        type: "string",
        title: "Link Title",
        validation: (Rule) => Rule.max(30).warning("30 characters max"),
      },
      {
        name: "url",
        type: "string",
        title: "Url",
      },
      {
        name: "newWindow",
        type: "boolean",
        title: "New Window?",
        initialValue: false,
      },
      {
        name: "downloadPdf",
        type: "file",
        title: "Download PDF",
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
        title: 'linkTitle',
        url: 'url',
      },
      prepare(selection) {
        const {title, url} = selection
        return {
          title: "Link: " + title + " " + url
        }
      }
    }
  };
  
  export default link;
  