import {cleanEnv, makeValidator, num} from "envalid";
import {resolve} from "path";
import {existsSync} from "fs";

const path = makeValidator<string>((input: string): string => {
  const path: string = resolve(__dirname, input)
  if(!existsSync(path)) {
    throw Error(`The path is not valid, it's relative to /src or /build depending the environment`)
  }
  return path
})

interface Env {
  readonly MUSTACHE_DIR: string
  readonly ARTICLES_LIMIT: number
}

export const env: Env = cleanEnv(process.env, {
  MUSTACHE_DIR: path()
  , ARTICLES_LIMIT: num()
})