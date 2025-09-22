const map = {
    name: "map",
    type: "document",
    title: "Map",
    fields: [
      {
        name: "title",
        type: "string",
        title: "Map Title",
      },
      {
        name: "embedUrl",
        type: "string",
        title: "Embed Url",
      },
      {
        name: "link",
        type: "array",
        title: "Download Link",
        of: [{ type: "reference", to: [{ type: "link" }] }],
      },
    ],
  };
  
  export default map;
  