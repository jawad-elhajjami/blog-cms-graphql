import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPHCMS_ENDPOINT;
const hygraphcms_token = process.env.GRAPH_CMS_TOKEN;

export default async function subscribers(req, res) {
    const { email } = req.body;

    // Initialize GraphQL client
    const graphQLClient = new GraphQLClient(graphqlAPI, {
        headers: {
            authorization: `Bearer ${hygraphcms_token}`,
        },
    });

    // Define mutation query with correct name (e.g., 'createSubscriber')
    const query = gql`
        mutation CreateSubscriber($email: String!) {
            createSubscriber(
                data: { email: $email }
            ){
                id
            }
        }
    `;

    try {
        // Execute the query using the graphQLClient instance
        const result = await graphQLClient.request(query, {
            email,
        });

        // Return successful response
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);

        // Return error response
        return res.status(500).json({ error: "Failed to submit email" });
    }
}
