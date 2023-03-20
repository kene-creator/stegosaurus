import { gql, request } from 'graphql-request'

const findLinks = async (arr) => {
    const GET_LINKS = gql`
        query findLinks($queryObject: [String!]!) {
            findLinks(queryObject: $queryObject) {
                word
                links {
                    link
                }
            }
        }
    `
    const res = await request(
        'https://3c8e-102-88-62-126.ngrok.io/graphql',
        GET_LINKS,
        {
            queryObject: arr,
        },
    )
    return res
}

export default findLinks
