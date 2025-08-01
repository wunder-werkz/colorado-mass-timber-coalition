const modal = {
    name: "modal",
    type: "document",
    title: "Modal",
    description: "A modal (pop-up) window that appears on all pages if turned on",
    fields: [
      {
        name: "headline",
        type: "string",
        title: "Headline",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "shortCopy",
        type: "array",
        title: "Short Copy",
        hidden: true,
        description: "Keep characters to 130 characters or less.",
        of: [
          {
            type: "block",
            styles: [],
          },
        ],
      },
      {
        name: "image",
        type: "document",
        title: "Image",
        hidden: true,
        fields: [
          {
            title: "Image Title/Alt Text",
            name: "title",
            type: "string",
          },
          {
            title: "Image",
            name: "image",
            type: "image",
          },
        ],
      },
      {
        name: "isVisible",
        type: "boolean",
        title: "Is Visible",
        initialValue: false,
      },
      {
        name: "emailSignup",
        type: "boolean",
        hidden: true,
        title: "Show Email Signup",
        initialValue: false,
        description: "If Email signup is shown it will not show a link",
      },
      {
        name: "link",
        type: "array",
        title: "Link",
        description: "If email signup is true, this link will not be displayed.",
        of: [{ type: "reference", to: [{ type: "link" }] }],
        validation: (Rule) => Rule.max(1),
      },
    ],
  };
  
  export default modal;
  