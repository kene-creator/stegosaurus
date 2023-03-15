import { gql } from 'graphql-request'

export const GET_ADDRESS_TO_WIKI = gql`
    query findLinks($queryObject: [String!]!) {
        findLinks(queryObject: $queryObject) {
            word
            links {
                link
            }
        }
    }
`
export default async function apiCallForLinks(req, res) {
    const { address } = req.query

    try {
        // const ress = (await addressToWiki(address as string)) as AddressToWikiRes
        // (arg: string) =>
        const ress = await request(link, GET_ADDRESS_TO_WIKI, { address: arg })
        if (ress) {
            return res.status(200).json(ress.addressToWiki.map((w) => w.wiki))
        }
    } catch (e) {
        return res.status(500).json({ error: 'an error occurred' })
    }
}
