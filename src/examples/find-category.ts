import { config } from 'dotenv'

import { PmkinClient } from '..'

async function main() {
  config()

  const token = process.env.PMKIN_TOKEN

  if (!token) {
    throw new Error('PMKIN_TOKEN is required')
  }

  const client = new PmkinClient({ token })

  const category = await client.findCategory('673345e140869c00233ad8c9')

  console.log(category)
}

main()
