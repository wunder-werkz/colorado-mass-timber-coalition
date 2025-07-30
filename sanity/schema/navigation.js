const navigation = {
    name: "navigation",
    type: "document",
    title: "Navigation",
    fields: [
      {
        name: "navItems",
        type: "array",
        title: "Nav Items",
        validation: (Rule) =>
          Rule.max(6).warning("Only 6 primary navigation items are allowed."),
        of: [
          {
            type: "reference",
            to: [
              { type: "page" },
              { type: "link" },
            ],
          },
        ],
      },
    ],
    preview: {
      prepare(selection) {
        const {title} = selection
        return {
          title: "Header Navigation"
        }
      }
    }
  };
  
  export default navigation;
  