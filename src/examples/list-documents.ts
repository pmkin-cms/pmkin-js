import { config } from 'dotenv'

import { PmkinClient } from '..'

async function main() {
  config()

  const token = process.env.PMKIN_TOKEN

  if (!token) {
    throw new Error('PMKIN_TOKEN is required')
  }

  const client = new PmkinClient(token)

  const documents = await client.listDocuments()

  console.log(documents)
}

main()
