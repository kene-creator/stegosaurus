// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export default async function apiCallForLinks(req, res) {
    const { address } = req.query

  try {
    const ress = (await addressToWiki(address as string)) as AddressToWikiRes
    if (ress) {
      return res.status(200).json(ress.addressToWiki.map(w => w.wiki))
    }
  } catch (e) {
    return res.status(500).json({ error: 'an error occurred' })
  }
}
