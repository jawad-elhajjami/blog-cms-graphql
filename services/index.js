import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        excrept  
                        title
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug: String!) {
        post(where: {slug: $slug}) {
          title
          excrept
          featuredImage {
            url
          }
          author{
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          content {
            raw
          }
          categories {
            name
            slug
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.post;
  };

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails {
            posts(
                orderBy: createdAt_DESC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    const result = await request(graphqlAPI, query);
    return result.posts;
};

export const getCategoryPost = async (slug) => {
  if (!slug) {
    console.error("getCategoryPost: slug is required but not provided.");
    return [];
  }

  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excrept
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });

    if (!result || !result.postsConnection) {
      console.error("Invalid GraphQL response:", result);
      return [];
    }

    return result.postsConnection.edges;
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return [];
  }
};


export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]){
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last:3
            )
            {
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, {categories, slug});
    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query getCategories{
            categories{
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.categories;
}

export const getPostsCountPerCategory = async (slug) => {
    const query = gql`
      query getCount($slug: String!) {
        postsConnection(where: { categories_some: { slug: $slug } }) {
          aggregate {
            count
          }
        }
      }
    `;
  
    // Pass the slug as a variable
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.aggregate.count;
  };


export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    })

    return result.json()
}

// subscribe to newsletter
export const submitEmail = async (obj) =>{
  const result = await fetch('/api/subscribers',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  
  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
      query GetComments($slug: String!){
          comments(where:{post:{slug: $slug}}, orderBy: createdAt_DESC){
              name
              createdAt
              comment
          }
      }
  `
  const result = await request(graphqlAPI, query, {slug});
  return result.comments;
}
export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};


export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts {  # ✅ Corrected query name
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  try {
    const result = await request(graphqlAPI, query);
    return result.posts;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
};