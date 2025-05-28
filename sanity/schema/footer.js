const footer = {
    name: "footer",
    type: "document",
    title: "Footer",
    fields: [
      {
        name: "instaLink",
        type: "string",
        title: "Instagram Url",
      },
      {
        name: "email",
        type: "string",
        title: "Email",
      },
      {
        name: "linkedInUrl",
        type: "string",
        title: "Linked In Url",
      },
      {
        name: "emailSignupHeadline",
        type: "string",
        title: "Email Signup Headline",
      },
      {
        name: "emailSignupCopy",
        type: "string",
        title: "Email Signup Copy",
      },
      {
        name: "emailSignupLink",
        type: "array",
        title: "Email Signup Link",
        validation: (Rule) => Rule.max(1).warning("only one link"),
        of: [
          {
            type: "reference",
            to: [
              { type: "link"},
            ],
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'emailSignupHeadline',
      },
      prepare(selection) {
        const {title} = selection
        return {
          title: "Footer"
        }
      }
    }
  };
  
  export default footer;
  