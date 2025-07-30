const ctaSection = {
    name: "ctaSection",
    type: "document",
    title: "CTA Section",
    fields: [
      {
        name: "headline",
        type: "string",
        title: "Headline",
      },
      {
        name: "copy",
        type: "array",
        title: "Copy",
        of: [{ type: "block", styles: [], }],
      },
      {
        name: "link",
        type: "array",
        title: "Link",
        of: [{ type: "reference", to: [{ type: "link" }] }],
        validation: (Rule) => Rule.max(1),
      },
    ],
  };
  
  export default ctaSection;
  