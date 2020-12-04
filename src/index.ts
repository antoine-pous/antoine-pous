import {readFile, writeFile} from 'fs/promises'
import { render } from 'mustache'
import { resolve } from 'path';
import {env} from './env'
import {lastUpdateTimestamp} from "./features/last-update-timestamp";
import {getLatestMediumArticles} from "./features/get-latest-medium-articles";

const generateReadme = async (): Promise<void> => {
  let output: string = ``

  const introduction: Buffer = await readFile(`${env.MUSTACHE_DIR}/01-introduction.html`)
  output += render(introduction.toString(), {})
  output += '\n'
  console.log('Introduction generation ✓')

  const technologies: Buffer = await readFile(`${env.MUSTACHE_DIR}/02-technologies.html`)
  output += render(technologies.toString(), {})
  output += '\n'
  console.log('Technologies generation ✓')

  const networks: Buffer = await readFile(`${env.MUSTACHE_DIR}/03-networks.html`)
  output += render(networks.toString(), {})
  output += '\n'
  console.log('Networks generation ✓')

  const medium: Buffer = await readFile(`${env.MUSTACHE_DIR}/04-medium.html`)
  output += render(medium.toString(), {articles: await getLatestMediumArticles(env.ARTICLES_LIMIT)})
  output += '\n'
  console.log('Medium generation ✓')

  const loki: Buffer = await readFile(`${env.MUSTACHE_DIR}/05-loki.html`)
  output += render(loki.toString(), {})
  output += '\n'
  console.log('Loki generation ✓')

  const meta: Buffer = await readFile(`${env.MUSTACHE_DIR}/99-meta.html`)
  output += render(meta.toString(), {
    lastUpdate: lastUpdateTimestamp()
  })
  output += '\n'
  console.log('Meta generation ✓')

  try {
    const readmePath: string = resolve(__dirname, '..', 'README.md')
    await writeFile(readmePath, output)
    console.log(readmePath, 'updated! ✓')
  } catch (e) {
    throw e
  }
}

generateReadme()