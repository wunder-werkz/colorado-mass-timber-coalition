const filterSection = {
    name: 'filterSection',
    type: 'document',
    title: 'filterSection',
    fields: [
        {
            name: "filterSectionTitle",
            type: "string",
            title: "Filter Section Button Title",
            validation: (Rule) => Rule.max(25).warning("25 characters max"),
          },
    
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
              source: 'filterSectionTitle',
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
            name: 'filterSections',
            type: 'array',
            title: 'Filter Sections',
             of: [
            {   
                type: "reference", 
                to: [
                    {type: 'partnersSection'
                    },
                    {type: 'mapSection'},
                ],
                
            },
        ],
                
        },
                 
    ],

};

export default filterSection;