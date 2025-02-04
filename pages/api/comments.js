import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPHCMS_ENDPOINT;
const hygraphcms_token = process.env.GRAPH_CMS_TOKEN;

export default async function comments(req, res) {
    const { name, email, comment, slug } = req.body;

    // Initialize GraphQL client
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${hygraphcms_token}`,
        },
    });

    // Define mutation query
    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(
                data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }
            ) {
                id
            }
        }
    `;

    try {
        // Execute the query using the graphQLClient instance
        const result = await graphQLClient.request(query, {
            name,
            email,
            comment,
            slug,
        });
        
        // Return successful response
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        
        // Return error response
        return res.status(500).json({ error: "Failed to submit comment" });
    }
}
