import Parser from "rss-parser";

export const getLatestMediumArticles = async (limit: number): Promise<string> => {
  const rssFeedURI: string = 'https://medium.com/feed/@antoine-pous'
  const parser: Parser = new Parser()
  const feed: Parser.Output = await parser.parseURL(rssFeedURI)

  let items: string = ``
  let l: number = limit
  for (const i of feed.items || []) {
    // If not content it's not a story
    if (!i.content) {
      continue
    }

    // If we miss a parameter, we skip
    if (!i.title || !i.link || !i.content) {
      continue
    }

    if (l <= 0) {
      break
    }

    items += `- <a href="${i.link}">${i.title}</a><br />`
    l--
  }

  console.log(items)
  return items
}