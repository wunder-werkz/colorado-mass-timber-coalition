const resourcesPage = {
    name: 'resourcesPage',
    type: 'document',
    title: 'Resources Page',
    fields: [
        {
            name: "pageTitle",
            type: "string",
            title: "Page Title",
            validation: (Rule) => Rule.max(25).warning("25 characters max"),
          },
          {
            name: "pageMetadata",
            type: "text",
            title: "Page Metadata",
            description: "Metadata used for SEO",
          },
        { 
            name: 'resourcesPageSections',
            type: 'array',
            title: 'Page Sections',
             of: [
            {   
                type: "reference", 
                to: [
                    {type: 'filterSection'},
                ],
                
            },
        ],
                
        },
                 
    ],

};

export default resourcesPage;