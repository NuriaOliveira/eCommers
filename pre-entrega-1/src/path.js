import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url) //consulta path del archivo local
export const __dirname = dirname(__filename) //path de este archivo 