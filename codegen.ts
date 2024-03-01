import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5001/graphql",
  documents: ["src/graphql/**/*.ts", "!src/gql/**/*"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      // config: {
      //   withHooks: true,
      //   withHOC: false,
      //   withComponent: false,
      // },
    },
  },
};

export default config;
