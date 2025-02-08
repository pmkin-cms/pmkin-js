import { config } from 'dotenv'

import { PmkinClient } from '..'

async function main() {
  config()

  const token = process.env.PMKIN_TOKEN

  if (!token) {
    throw new Error('PMKIN_TOKEN is required')
  }

  const client = new PmkinClient(token)

  const document = await client.findDocumentBySlug(
    'beyond-the-beaten-path:-discovering-hidden-gems-in-barcelona'
  )

  console.log(document)
}

main()
