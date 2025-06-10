const sliderImage = {
    name: "sliderImage",
    type: "document",
    title: "Slider Image",
    fields: [
        {
            title: "Image",
            name: "image",
            type: "image",
        },
        {
            name: "headline",
            type: "string",
            title: "Headline",
            validation: (Rule) => Rule.max(50).warning("50 characters max"),
        },
        {
            name: "link",
            type: "array",
            title: "Link",
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
  };
  
  export default sliderImage;
  