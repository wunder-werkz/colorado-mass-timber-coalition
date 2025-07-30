const introSection = {
    name: "introSection",
    type: "document",
    title: "Intro Section",
    fields: [
      {
        name: "headline",
        type: "string",
        title: "Headline",
        validation: (Rule) =>
          Rule.max(56).warning("To ensure design quality, 56 max characters"),
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
            validation: (Rule) => [
              Rule.custom((value) => {
                return value && value.asset
                  ? true
                  : {
                      message: 'An Image is Required!',
                    };
              }),
            ],
          },
        ]
      },
      {
        name: "copy",
        type: "array",
        title: "Copy",
        of: [{ type: "block", styles: [], }],
      },
      {
        name: "links",
        type: "array",
        title: "Links",
        of: [{ type: "reference", to: [{ type: "link" }] }],
        validation: (Rule) => Rule.max(2),
      },
    ],
    preview: {
      select: {
        title: 'headline'
      },
      prepare(selection) {
        const {title} = selection
        return {
          title: "Intro Section: " + title
        }
      }
    }
  };
  
  export default introSection;
  