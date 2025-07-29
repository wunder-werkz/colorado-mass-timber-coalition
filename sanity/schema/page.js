const page = {
    name: 'page',
    type: 'document',
    title: 'Page',
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
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
              source: 'pageTitle',
              maxLength: 200, // will be ignored if slugify is set
              slugify: (input) =>
                input
                  .toLowerCase()
                  .replace('&', 'and')
                  .replace('!', '')
                  .replace('/', '')
                  .replace("'", '')
                  .replace(/\"/g, '')
                  .trim()
                  .replace(/\s+/g, '-')
                  .slice(0, 200),
            },
            validation: (rule) => rule.required(),
        },
        {
            name: "introSection",
            type: "reference",
            title: "Intro Section",
            to: [{ type: "introSection" }],
        },
        { 
            name: 'pageSections',
            type: 'array',
            title: 'Page Sections',
             of: [
            {   
                type: "reference", 
                to: [
                    {type: 'listSection'},
                    {type: 'ctaSection'},
                ],
                
            },
        ],
                
        },
                 
    ],

};

export default page;