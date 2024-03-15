## Code Generator Package

This code generator package automates creating essential files (resolvers, schema, and GraphQL type definitions) based on user input provided in a JSON format. It simplifies the setup process for Node.js projects, especially those utilizing Mongoose and GraphQL.

**Features:**

-   Generates postResolvers.js, postSchema.js, and postTypeDefs.graphql files in the app/codeGen directory.
-   Employs the provided JSON model to construct GraphQL queries, mutations, resolvers, and Mongoose schema definitions.

**Installation**

1. Install the package using npm:

```
npm install https://github.com/frangdelsolar/generator.git
```

2. Add to your package json scripts

    "gen:init": "node node_modules/generator/index.js",
    "gen:run": "node codeGen/main.js"

    with this you're gonna be able to run from terminal.

**Usage**

1. Create a JSON Configuration File:

    - Name it `post.json` (or any suitable name) and place it within the `app/codeGen/input` directory.
    - No need to have id, createdBy, createdAt, updatedBy, updatedAt, those will be automatically generated
    - Provide the following structure:

```
{
    "model": "post",
    "fields": [
        {
            "name": "title",
            "type": "string",
            "required": true
        },
        {
            "name": "content",
            "type": "string"
        },
        {
            "name": "author",
            "type": "string",
            "required": true
        },
        {
            "name": "date",
            "type": "Date"
        }
    ]
}
```

2. Run the Generator:

    - Execute the following command in your terminal, replacing server/hanzi with the correct root path to your project:

```
npm run generate --root=server/hanzi
```

Usa el código con precaución.

**Generated Files**

The package will create the following files within app/codeGen/output:

-   `postResolvers.js`: Contains GraphQL resolvers for managing posts.
-   `postSchema.js`: Defines the Mongoose schema for the Post model.
-   `postTypeDefs.graphql`: Provides GraphQL type definitions for the post model.

**Integration**

1. Move the Generated Files:

    - Manually move the generated files from app/codeGen/output to their appropriate locations within your project structure. For instance:
        - `postResolvers.js`: Move it to your resolvers directory.
        - `postSchema.js`: Move it to your Mongoose schema files.
        - `postTypeDefs.graphql`: Move it to your file containing GraphQL schema definitions.

**Additional Notes:**

-   Ensure you have the necessary dependencies (mongoose and graphql) installed in your project.
-   You might need to adjust the code depending on your specific project setup and requirements.

**Cleaning Up (Optional):**

Once you've moved and integrated the generated files, you can optionally delete the input and output directories:

```
rm -rf app/codeGen/input app/codeGen/output
```

**Disclaimer:**

While the command provided attempts to remove the directories and files, exercise caution and double-check the paths before executing the rm command.
