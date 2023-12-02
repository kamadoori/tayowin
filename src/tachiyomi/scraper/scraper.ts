export class Scraper {
  static async scrape(url: string): Promise<string[]> {
    console.log(url)
    const mangaPage = await (await fetch(url)).text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(mangaPage, 'text/html')
    console.log({ doc })
    const imgElements = doc.querySelectorAll<HTMLImageElement>(
      '.container-chapter-reader > img',
    )
    console.log({ imgElements })

    const result = [] as string[]

    for (const imgElement of imgElements) {
      const buffer = await window.ElectronAPI.fetchWithReferer(
        imgElement.src,
        'https://chapmanganato.com/',
      )
      if (!buffer) {
        result.push('')
        continue
      }

      result.push(
        URL.createObjectURL(new Blob([buffer], { type: 'image/jpeg' })),
      )
    }

    return result
  }
}
