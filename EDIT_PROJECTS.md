# How to Edit Your Portfolio Projects

Your portfolio is now a simple, clean static site. All your projects are stored in one easy-to-edit file.

## Editing Projects

### Location
All your projects are in: `client/src/data/projects.ts`

### To Add a New Project

1. Open `client/src/data/projects.ts`
2. Add a new object to the `PROJECTS` array:

```typescript
{
  id: 5,  // Use the next available number
  title: "Your Project Title",
  description: "Short description that appears on the portfolio card",
  fullDescription: "Detailed description shown on the project detail page",
  challenge: "What problem did you solve?",
  solution: "How did you solve it?",
  tags: ["Tag1", "Tag2", "Tag3"],  // Skills/technologies
  results: [
    "Result 1",
    "Result 2",
    "Result 3"
  ]
}
```

### To Edit a Project

1. Open `client/src/data/projects.ts`
2. Find the project you want to edit
3. Update any of these fields:
   - `title` - Project name
   - `description` - Short description
   - `fullDescription` - Detailed description
   - `challenge` - The challenge
   - `solution` - Your solution
   - `tags` - Array of skills/technologies
   - `results` - Array of achievements

### To Delete a Project

1. Open `client/src/data/projects.ts`
2. Remove the entire project object from the `PROJECTS` array

## Example

Here's a complete example of a project:

```typescript
{
  id: 1,
  title: "E-Commerce Platform",
  description: "A modern e-commerce platform with real-time inventory management and seamless checkout experience.",
  fullDescription: "Built a complete e-commerce solution that handles thousands of products and concurrent users with excellent performance.",
  challenge: "Create a scalable platform that could handle high traffic during peak seasons while maintaining fast load times.",
  solution: "Implemented optimized database queries, caching strategies, and a responsive frontend with progressive loading.",
  tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
  results: [
    "40% faster page load times",
    "3x increase in conversion rate",
    "99.9% uptime",
    "Support for 50,000+ concurrent users"
  ]
}
```

## Tips

- **Keep descriptions concise** - Short descriptions are better for readability
- **Use meaningful tags** - Tags should represent technologies or skills used
- **List concrete results** - Use specific metrics (percentages, numbers) when possible
- **Make IDs unique** - Each project needs a unique ID number
- **Save and refresh** - After editing, save the file and refresh your browser to see changes

That's it! Your portfolio will automatically update with your changes.
