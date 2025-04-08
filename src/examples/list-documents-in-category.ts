import { config } from 'dotenv'

import { PmkinClient } from '..'

async function main() {
  config()

  const token = process.env.PMKIN_TOKEN

  if (!token) {
    throw new Error('PMKIN_TOKEN is required')
  }

  const client = new PmkinClient({ token })

  // First, fetch all categories to find one to use
  const categories = await client.listCategories()
  
  if (categories.length === 0) {
    console.log('No categories found')
    return
  }

  // Use the first category's ID
  const categoryId = categories[0].id
  const categoryName = categories[0].name
  
  console.log(`Fetching documents in category: ${categoryName} (${categoryId})`)

  // Now fetch all documents in this category
  const documents = await client.listDocumentsInCategory(categoryId)

  console.log(`Found ${documents.length} documents:`)
  documents.forEach(doc => {
    console.log(`- ${doc.title} (${doc.slug})`)
  })
}

main().catch(error => {
  console.error('Error:', error)
  process.exit(1)
})