import fs from 'fs'

export class ProductManager{

    #products;

    constructor(){

        this.#products = [];

        this.path = './data.json';

        this.#createFileOrLoad()

    }

    #createFileOrLoad(){

        if(!fs.existsSync(this.path)){

            fs.writeFileSync(this.path, '[]');

        };

        const file_content = fs.readFileSync(this.path, 'utf-8');

        this.#products = JSON.parse(file_content);

    };

    async addProduct(titulo,descripcion,precio,thumbnail,stock,code){

        try{

            const product = {

                id : this.#getNextId(),

                titulo,

                descripcion,

                precio,

                thumbnail,

                stock,

                code

            }

            const codeDuplicado = this.#products.find((product)=>product.code === code);

            if(codeDuplicado){

                throw new Error('Ya existe un producto con el mismo codigo...')

            }

            this.#products.push(product);

            console.log(product);

            await fs.promises.writeFileSync('./data.json', JSON.stringify(this.#products, null, '\t'),'utf-8');

        } catch(error){
            
            console.log(error);

        };

    };

    #getNextId(){

        if(this.#products.length === 0){

            return 0;

        }

        return this.#products.at(-1).id + 1;

    }

    getProducts(){

        return this.#products;

    };

    getProductById(_id){

        const id = Number(_id);

        const product = this.#products.findIndex((product)=>product.id == id);

        if(!product){

            throw new Error(`No encontrado`);

        };

        return product;

    }

    updateProduct(id, updatedProduct){

        const index = this.#products.findIndex((product)=> product.id === id);

        if(index === -1){

            throw new Error('Este producto no esta disponible para actualizar');

        }

        this.#products[index] = {...this.#products[index],...updatedProduct};

        fs.writeFileSync(this.path, JSON.stringify(this.#products));

        return this.#products[index];

    }

    deleteProduct(id){

        const index = this.#products.findIndex((product)=>product.id === id);

        if(index === -1){

            throw new Error('El producto con este id no existe');

        }

        const deletedProduct = this.#products.slice(index,1);

        fs.writeFileSync(this.path, JSON.stringify(this.#products));

        return deletedProduct;
        
    }

}