import { config } from 'dotenv'

import { PmkinClient } from '..'

async function main() {
  config()

  const token = process.env.PMKIN_TOKEN

  if (!token) {
    throw new Error('PMKIN_TOKEN is required')
  }

  const client = new PmkinClient(token)

  const document = await client.findDocument('6733460e40869c00233ad8cc')

  console.log(document)
}

main()
