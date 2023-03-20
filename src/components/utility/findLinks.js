import { gql, request } from 'graphql-request'

export const findLinks = async (arr) => {
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
    const res = await request(process.env.API_URL, GET_LINKS, {
        queryObject: arr,
    })
    return res
}
