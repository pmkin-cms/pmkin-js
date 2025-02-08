import { describe, it, expect, vi } from 'vitest'

import { PmkinClient } from './client'

vi.mock('./api-client', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    request: vi.fn()
  }))
}))

describe('PmkinClient', () => {
  describe('findCategory', () => {
    it('should return a category.', async () => {
      const mockCategory = {
        id: 'c58b1646-94b7-4baf-b9cb-1c40d47284ac',
        name: 'Category 1',
        description: 'Desc 1',
        slug: 'category-1'
      }

      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue({ category: mockCategory })

      const result = await client.findCategory(
        'f13bb360-5c34-4685-afd1-1021783183fd'
      )

      expect(result).toEqual(mockCategory)
    })

    it('should return undefined when category is not found.', async () => {
      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue({ category: null })

      const result = await client.findCategory(
        'f13bb360-5c34-4685-afd1-1021783183fd'
      )

      expect(result).toBeUndefined()
    })
  })

  describe('findDocument', () => {
    it('should return a document.', async () => {
      const mockDocument = {
        coverImage: {
          url: 'https://i.imgur.com/CoFbsRz.png'
        },
        html: '<p>There&#39;s no better way to experience a culture than through its festivals. These vibrant celebrations offer a window into local traditions, bringing communities together in spectacular music, food, art, and ritual displays. Here are some of the world&#39;s most extraordinary festivals that deserve a spot on your travel bucket list.</p>\n<h2 id="songkran-water-festival---thailand">Songkran Water Festival - Thailand</h2>\n<p>Every April, Thailand transforms into the world&#39;s biggest water fight. What began as a gentle ceremonial washing to symbolize purification has evolved into a nationwide celebration where everyone—locals and tourists alike—takes to the streets with water guns and buckets. In Chiang Mai, the festivities are particularly memorable, with the ancient moat surrounding the Old City serving as a natural water source for three days of aquatic revelry.</p>\n<h2 id="dia-de-los-muertos---mexico">Dia de los Muertos - Mexico</h2>\n<p>Far from somber, Mexico&#39;s Day of the Dead is a vibrant celebration of life and remembrance. In late October and early November, cities like Oaxaca and San Miguel de Allende burst with color as streets fill with elaborate altars, sugar skulls, and marigold petals. Families gather in cemeteries to share stories and meals with departed loved ones while parades featuring intricate Catrina costumes wind through historic centers.</p>\n<h2 id="holi-festival---india">Holi Festival - India</h2>\n<p>Spring in India explodes in a rainbow of colors during Holi. This ancient Hindu festival begins with evening bonfires symbolizing the triumph of good over evil, but the next day brings the famous color play. Communities gather to throw vibrantly colored powder and water, breaking down social barriers as everyone becomes equally colorful. While celebrated nationwide, experiencing Holi in Mathura and Vrindavan, Lord Krishna&#39;s birthplace, offers an especially authentic celebration.</p>\n<h2 id="up-helly-aa---scotland">Up Helly Aa - Scotland</h2>\n<p>The Shetland Islands light up every January with Europe&#39;s largest fire festival. Up Helly Aa culminates in a torchlight procession of nearly 1,000 guizers (costumed participants) led by the Guizer Jarl squad dressed as Vikings. The procession ends with the dramatic burning of a full-sized replica Viking longship, followed by all-night celebrations in halls across Lerwick.</p>\n<h2 id="carnival---brazil">Carnival - Brazil</h2>\n<p>While many cities celebrate Carnival, Rio de Janeiro&#39;s version sets the global standard for exuberance. The five-day festival before Lent features spectacular parades at the Sambadrome, where competing samba schools dazzle with elaborate floats and costumes. Beyond the main event, the city pulses with street parties called blocos, where locals and visitors dance to samba rhythms well into the night.</p>\n<h2 id="la-tomatina---spain">La Tomatina - Spain</h2>\n<p>On the last Wednesday of August, the small town of Buñol becomes the scene of the world&#39;s largest food fight. For one hour, participants pelt each other with overripe tomatoes in a good-natured battle that leaves everyone—and everything—covered in red pulp. What started as a spontaneous food fight in 1945 has evolved into a major tourist attraction, though the town wisely limits participation to ensure safety and enjoyment.</p>\n<h2 id="lantern-festival---taiwan">Lantern Festival - Taiwan</h2>\n<p>The final day of Chinese New Year celebrations illuminates Taiwan&#39;s sky with thousands of paper lanterns. In Pingxi, visitors write wishes on lanterns before releasing them into the night sky, creating a mesmerizing display of floating lights. Meanwhile, the Taipei Lantern Festival features enormous illuminated art installations that transform the city into an outdoor gallery.</p>\n<h2 id="tips-for-festival-goers">Tips for Festival-Goers:</h2>\n<ul>\n<li>Book accommodations well in advance—festivals draw huge crowds</li>\n<li>Research local customs and dress codes to participate respectfully</li>\n<li>Consider visiting a day before the main events to experience preparation activities</li>\n<li>Pack appropriate clothing and protection (water-resistant gear for Songkran, old clothes for Holi)</li>\n<li>Learn a few local phrases to better connect with fellow celebrants</li>\n</ul>\n<p>These festivals offer more than just entertainment—they provide unique insights into how different cultures celebrate, commemorate, and come together. While the pandemic temporarily paused many of these celebrations, their gradual return reminds us of the universal human desire to gather, celebrate, and create moments of collective joy.</p>\n<p>Remember that festival dates may vary annually, especially for celebrations following lunar calendars. Always verify current dates and any attendance restrictions before planning your trip. Whether you&#39;re throwing colors in India, releasing lanterns in Taiwan, or dancing samba in Brazil, these festivals promise unforgettable experiences that will enrich your understanding of the world&#39;s diverse cultures.</p>\n',
        id: '6733466740869c00233ad8dd',
        isPublished: true,
        markdown:
          "There's no better way to experience a culture than through its festivals. These vibrant celebrations offer a window into local traditions, bringing communities together in spectacular music, food, art, and ritual displays. Here are some of the world's most extraordinary festivals that deserve a spot on your travel bucket list.\n\n## Songkran Water Festival - Thailand \nEvery April, Thailand transforms into the world's biggest water fight. What began as a gentle ceremonial washing to symbolize purification has evolved into a nationwide celebration where everyone—locals and tourists alike—takes to the streets with water guns and buckets. In Chiang Mai, the festivities are particularly memorable, with the ancient moat surrounding the Old City serving as a natural water source for three days of aquatic revelry.\n\n## Dia de los Muertos - Mexico\nFar from somber, Mexico's Day of the Dead is a vibrant celebration of life and remembrance. In late October and early November, cities like Oaxaca and San Miguel de Allende burst with color as streets fill with elaborate altars, sugar skulls, and marigold petals. Families gather in cemeteries to share stories and meals with departed loved ones while parades featuring intricate Catrina costumes wind through historic centers.\n\n## Holi Festival - India\nSpring in India explodes in a rainbow of colors during Holi. This ancient Hindu festival begins with evening bonfires symbolizing the triumph of good over evil, but the next day brings the famous color play. Communities gather to throw vibrantly colored powder and water, breaking down social barriers as everyone becomes equally colorful. While celebrated nationwide, experiencing Holi in Mathura and Vrindavan, Lord Krishna's birthplace, offers an especially authentic celebration.\n\n## Up Helly Aa - Scotland\nThe Shetland Islands light up every January with Europe's largest fire festival. Up Helly Aa culminates in a torchlight procession of nearly 1,000 guizers (costumed participants) led by the Guizer Jarl squad dressed as Vikings. The procession ends with the dramatic burning of a full-sized replica Viking longship, followed by all-night celebrations in halls across Lerwick.\n\n## Carnival - Brazil\nWhile many cities celebrate Carnival, Rio de Janeiro's version sets the global standard for exuberance. The five-day festival before Lent features spectacular parades at the Sambadrome, where competing samba schools dazzle with elaborate floats and costumes. Beyond the main event, the city pulses with street parties called blocos, where locals and visitors dance to samba rhythms well into the night.\n\n## La Tomatina - Spain\nOn the last Wednesday of August, the small town of Buñol becomes the scene of the world's largest food fight. For one hour, participants pelt each other with overripe tomatoes in a good-natured battle that leaves everyone—and everything—covered in red pulp. What started as a spontaneous food fight in 1945 has evolved into a major tourist attraction, though the town wisely limits participation to ensure safety and enjoyment.\n\n## Lantern Festival - Taiwan\nThe final day of Chinese New Year celebrations illuminates Taiwan's sky with thousands of paper lanterns. In Pingxi, visitors write wishes on lanterns before releasing them into the night sky, creating a mesmerizing display of floating lights. Meanwhile, the Taipei Lantern Festival features enormous illuminated art installations that transform the city into an outdoor gallery.\n\n## Tips for Festival-Goers:\n- Book accommodations well in advance—festivals draw huge crowds\n- Research local customs and dress codes to participate respectfully\n- Consider visiting a day before the main events to experience preparation activities\n- Pack appropriate clothing and protection (water-resistant gear for Songkran, old clothes for Holi)\n- Learn a few local phrases to better connect with fellow celebrants\n\nThese festivals offer more than just entertainment—they provide unique insights into how different cultures celebrate, commemorate, and come together. While the pandemic temporarily paused many of these celebrations, their gradual return reminds us of the universal human desire to gather, celebrate, and create moments of collective joy.\n\nRemember that festival dates may vary annually, especially for celebrations following lunar calendars. Always verify current dates and any attendance restrictions before planning your trip. Whether you're throwing colors in India, releasing lanterns in Taiwan, or dancing samba in Brazil, these festivals promise unforgettable experiences that will enrich your understanding of the world's diverse cultures.\n\n",
        metaDescription:
          "Experience vibrant local culture through the world's most unique festivals. From Thailand's Songkran to Spain's La Tomatina, discover when to go, what to expect, and insider tips for 12 unforgettable celebrations",
        metaTitle: null,
        publishedAt: '2024-11-24T15:05:08.874Z',
        slug: "local-festivals-around-the-world-you-can't-miss",
        subtitle: null,
        title: 'Local Festivals Around the World You Can’t Miss'
      }

      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue({ document: mockDocument })

      const result = await client.findDocument('6733466740869c00233ad8dd')

      expect(result).toEqual(mockDocument)
    })
  })

  describe('findDocumentBySlug', () => {
    it('should return a document.', async () => {
      const mockDocument = {
        coverImage: {
          url: 'https://i.imgur.com/CoFbsRz.png'
        },
        html: '<p>There&#39;s no better way to experience a culture than through its festivals. These vibrant celebrations offer a window into local traditions, bringing communities together in spectacular music, food, art, and ritual displays. Here are some of the world&#39;s most extraordinary festivals that deserve a spot on your travel bucket list.</p>\n<h2 id="songkran-water-festival---thailand">Songkran Water Festival - Thailand</h2>\n<p>Every April, Thailand transforms into the world&#39;s biggest water fight. What began as a gentle ceremonial washing to symbolize purification has evolved into a nationwide celebration where everyone—locals and tourists alike—takes to the streets with water guns and buckets. In Chiang Mai, the festivities are particularly memorable, with the ancient moat surrounding the Old City serving as a natural water source for three days of aquatic revelry.</p>\n<h2 id="dia-de-los-muertos---mexico">Dia de los Muertos - Mexico</h2>\n<p>Far from somber, Mexico&#39;s Day of the Dead is a vibrant celebration of life and remembrance. In late October and early November, cities like Oaxaca and San Miguel de Allende burst with color as streets fill with elaborate altars, sugar skulls, and marigold petals. Families gather in cemeteries to share stories and meals with departed loved ones while parades featuring intricate Catrina costumes wind through historic centers.</p>\n<h2 id="holi-festival---india">Holi Festival - India</h2>\n<p>Spring in India explodes in a rainbow of colors during Holi. This ancient Hindu festival begins with evening bonfires symbolizing the triumph of good over evil, but the next day brings the famous color play. Communities gather to throw vibrantly colored powder and water, breaking down social barriers as everyone becomes equally colorful. While celebrated nationwide, experiencing Holi in Mathura and Vrindavan, Lord Krishna&#39;s birthplace, offers an especially authentic celebration.</p>\n<h2 id="up-helly-aa---scotland">Up Helly Aa - Scotland</h2>\n<p>The Shetland Islands light up every January with Europe&#39;s largest fire festival. Up Helly Aa culminates in a torchlight procession of nearly 1,000 guizers (costumed participants) led by the Guizer Jarl squad dressed as Vikings. The procession ends with the dramatic burning of a full-sized replica Viking longship, followed by all-night celebrations in halls across Lerwick.</p>\n<h2 id="carnival---brazil">Carnival - Brazil</h2>\n<p>While many cities celebrate Carnival, Rio de Janeiro&#39;s version sets the global standard for exuberance. The five-day festival before Lent features spectacular parades at the Sambadrome, where competing samba schools dazzle with elaborate floats and costumes. Beyond the main event, the city pulses with street parties called blocos, where locals and visitors dance to samba rhythms well into the night.</p>\n<h2 id="la-tomatina---spain">La Tomatina - Spain</h2>\n<p>On the last Wednesday of August, the small town of Buñol becomes the scene of the world&#39;s largest food fight. For one hour, participants pelt each other with overripe tomatoes in a good-natured battle that leaves everyone—and everything—covered in red pulp. What started as a spontaneous food fight in 1945 has evolved into a major tourist attraction, though the town wisely limits participation to ensure safety and enjoyment.</p>\n<h2 id="lantern-festival---taiwan">Lantern Festival - Taiwan</h2>\n<p>The final day of Chinese New Year celebrations illuminates Taiwan&#39;s sky with thousands of paper lanterns. In Pingxi, visitors write wishes on lanterns before releasing them into the night sky, creating a mesmerizing display of floating lights. Meanwhile, the Taipei Lantern Festival features enormous illuminated art installations that transform the city into an outdoor gallery.</p>\n<h2 id="tips-for-festival-goers">Tips for Festival-Goers:</h2>\n<ul>\n<li>Book accommodations well in advance—festivals draw huge crowds</li>\n<li>Research local customs and dress codes to participate respectfully</li>\n<li>Consider visiting a day before the main events to experience preparation activities</li>\n<li>Pack appropriate clothing and protection (water-resistant gear for Songkran, old clothes for Holi)</li>\n<li>Learn a few local phrases to better connect with fellow celebrants</li>\n</ul>\n<p>These festivals offer more than just entertainment—they provide unique insights into how different cultures celebrate, commemorate, and come together. While the pandemic temporarily paused many of these celebrations, their gradual return reminds us of the universal human desire to gather, celebrate, and create moments of collective joy.</p>\n<p>Remember that festival dates may vary annually, especially for celebrations following lunar calendars. Always verify current dates and any attendance restrictions before planning your trip. Whether you&#39;re throwing colors in India, releasing lanterns in Taiwan, or dancing samba in Brazil, these festivals promise unforgettable experiences that will enrich your understanding of the world&#39;s diverse cultures.</p>\n',
        id: '6733466740869c00233ad8dd',
        isPublished: true,
        markdown:
          "There's no better way to experience a culture than through its festivals. These vibrant celebrations offer a window into local traditions, bringing communities together in spectacular music, food, art, and ritual displays. Here are some of the world's most extraordinary festivals that deserve a spot on your travel bucket list.\n\n## Songkran Water Festival - Thailand \nEvery April, Thailand transforms into the world's biggest water fight. What began as a gentle ceremonial washing to symbolize purification has evolved into a nationwide celebration where everyone—locals and tourists alike—takes to the streets with water guns and buckets. In Chiang Mai, the festivities are particularly memorable, with the ancient moat surrounding the Old City serving as a natural water source for three days of aquatic revelry.\n\n## Dia de los Muertos - Mexico\nFar from somber, Mexico's Day of the Dead is a vibrant celebration of life and remembrance. In late October and early November, cities like Oaxaca and San Miguel de Allende burst with color as streets fill with elaborate altars, sugar skulls, and marigold petals. Families gather in cemeteries to share stories and meals with departed loved ones while parades featuring intricate Catrina costumes wind through historic centers.\n\n## Holi Festival - India\nSpring in India explodes in a rainbow of colors during Holi. This ancient Hindu festival begins with evening bonfires symbolizing the triumph of good over evil, but the next day brings the famous color play. Communities gather to throw vibrantly colored powder and water, breaking down social barriers as everyone becomes equally colorful. While celebrated nationwide, experiencing Holi in Mathura and Vrindavan, Lord Krishna's birthplace, offers an especially authentic celebration.\n\n## Up Helly Aa - Scotland\nThe Shetland Islands light up every January with Europe's largest fire festival. Up Helly Aa culminates in a torchlight procession of nearly 1,000 guizers (costumed participants) led by the Guizer Jarl squad dressed as Vikings. The procession ends with the dramatic burning of a full-sized replica Viking longship, followed by all-night celebrations in halls across Lerwick.\n\n## Carnival - Brazil\nWhile many cities celebrate Carnival, Rio de Janeiro's version sets the global standard for exuberance. The five-day festival before Lent features spectacular parades at the Sambadrome, where competing samba schools dazzle with elaborate floats and costumes. Beyond the main event, the city pulses with street parties called blocos, where locals and visitors dance to samba rhythms well into the night.\n\n## La Tomatina - Spain\nOn the last Wednesday of August, the small town of Buñol becomes the scene of the world's largest food fight. For one hour, participants pelt each other with overripe tomatoes in a good-natured battle that leaves everyone—and everything—covered in red pulp. What started as a spontaneous food fight in 1945 has evolved into a major tourist attraction, though the town wisely limits participation to ensure safety and enjoyment.\n\n## Lantern Festival - Taiwan\nThe final day of Chinese New Year celebrations illuminates Taiwan's sky with thousands of paper lanterns. In Pingxi, visitors write wishes on lanterns before releasing them into the night sky, creating a mesmerizing display of floating lights. Meanwhile, the Taipei Lantern Festival features enormous illuminated art installations that transform the city into an outdoor gallery.\n\n## Tips for Festival-Goers:\n- Book accommodations well in advance—festivals draw huge crowds\n- Research local customs and dress codes to participate respectfully\n- Consider visiting a day before the main events to experience preparation activities\n- Pack appropriate clothing and protection (water-resistant gear for Songkran, old clothes for Holi)\n- Learn a few local phrases to better connect with fellow celebrants\n\nThese festivals offer more than just entertainment—they provide unique insights into how different cultures celebrate, commemorate, and come together. While the pandemic temporarily paused many of these celebrations, their gradual return reminds us of the universal human desire to gather, celebrate, and create moments of collective joy.\n\nRemember that festival dates may vary annually, especially for celebrations following lunar calendars. Always verify current dates and any attendance restrictions before planning your trip. Whether you're throwing colors in India, releasing lanterns in Taiwan, or dancing samba in Brazil, these festivals promise unforgettable experiences that will enrich your understanding of the world's diverse cultures.\n\n",
        metaDescription:
          "Experience vibrant local culture through the world's most unique festivals. From Thailand's Songkran to Spain's La Tomatina, discover when to go, what to expect, and insider tips for 12 unforgettable celebrations",
        metaTitle: null,
        publishedAt: '2024-11-24T15:05:08.874Z',
        slug: "local-festivals-around-the-world-you-can't-miss",
        subtitle: null,
        title: 'Local Festivals Around the World You Can’t Miss'
      }

      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue({
        documentBySlug: mockDocument
      })

      const result = await client.findDocumentBySlug(
        `local-festivals-around-the-world-you-can't-miss`
      )

      expect(result).toEqual(mockDocument)
    })
  })

  describe('listCategories', () => {
    it('should return a list of categories.', async () => {
      const mockCategories = [
        {
          id: '9c362aac-38a5-4988-8c35-a8b9a03e534d',
          name: 'Category 1',
          description: 'Desc 1',
          slug: 'category-1'
        },
        {
          id: '35b5d294-608e-42c6-91fa-849e140df8ce',
          name: 'Category 2',
          description: 'Desc 2',
          slug: 'category-2'
        }
      ]

      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue({ categories: mockCategories })

      const result = await client.listCategories()

      expect(result).toEqual(mockCategories)
    })

    it('should throw error when response is invalid.', async () => {
      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue(null)

      await expect(client.listCategories()).rejects.toThrow(
        'The response is undefined or empty.'
      )
    })
  })

  describe('listDocuments', () => {
    it('should return a list of documents.', async () => {
      const mockDocuments = [
        {
          coverImage: {
            url: 'https://i.imgur.com/CoFbsRz.png'
          },
          id: '6733466740869c00233ad8dd',
          isPublished: true,
          metaDescription:
            "Experience vibrant local culture through the world's most unique festivals. From Thailand's Songkran to Spain's La Tomatina, discover when to go, what to expect, and insider tips for 12 unforgettable celebrations",
          metaTitle: null,
          publishedAt: '2024-11-24T15:05:08.874Z',
          slug: "local-festivals-around-the-world-you-can't-miss",
          subtitle: null,
          title: 'Local Festivals Around the World You Can’t Miss'
        },
        {
          coverImage: {
            url: 'https://i.imgur.com/JeXYgsd.png'
          },
          id: '6733465a40869c00233ad8d9',
          isPublished: true,
          metaDescription:
            "Discover 2024's safest and most exciting solo travel spots, from bustling Asian cities to serene European retreats. Expert tips on accommodations, local experiences, and meeting fellow travelers included.",
          metaTitle: null,
          publishedAt: '2024-11-12T12:13:21.762Z',
          slug: 'top-10-solo-travel-destinations-for-2024',
          subtitle: null,
          title: 'Top 10 Solo Travel Destinations for 2024'
        }
      ]

      const client = new PmkinClient({
        token: 'cdab90b977514c4ea3e66a054b4a7c65'
      })

      // @ts-ignore - Accessing private property for testing
      client.apiClient.request.mockResolvedValue({ documents: mockDocuments })

      const result = await client.listDocuments()

      expect(result).toEqual(mockDocuments)
    })
  })
})
