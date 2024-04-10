import fs, { readFile } from 'fs'

export const isExist = async(id,path)=>{

    const array = await readFile(path);

    const isExist = array.some(cart => cart.id === id);

    return isExist;
}