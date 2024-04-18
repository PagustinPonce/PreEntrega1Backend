import fs, { readFile } from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const isExist = async(id,path)=>{

    const array = await readFile(path);

    const isExist = array.some(cart => cart.id === id);

    return isExist;
}

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);