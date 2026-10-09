import { copyFile, cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(appRoot, '..')
const outputRoot = path.join(appRoot, 'dist')

await mkdir(outputRoot, { recursive: true })
await copyFile(path.join(outputRoot, 'index.html'), path.join(repoRoot, 'index.html'))
await rm(path.join(repoRoot, 'assets'), { recursive: true, force: true })
await cp(path.join(outputRoot, 'assets'), path.join(repoRoot, 'assets'), { recursive: true })

console.log('Synced the static build to the repository root.')
