const fs = require('fs')

let productos = []

class Contenedor {
    constructor(title, price, thumbnail) {
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }

    id = productos.length

    static incrementId(id) {
        id = productos.length + 1
        return id
    }

    static save = async (par1, par2, par3, id) => {

        try {
            this.incrementId(id)
            productos.push(new Contenedor(par1, par2, par3, id))
            await fs.promises.writeFile('./data.txt', JSON.stringify(productos))
        } catch (error) {
            console.log(`Ocurrió el siguiente error: ${error}`)
        }
    }

    static getAll = async () => {
        try {
            const productos = JSON.parse(await fs.promises.readFile('./data.txt', 'utf-8'))
            console.log(productos)
        } catch (error) {
            console.log(`Ocurrió el siguiente error: ${error}`)
        }
    }

    static getById = async (idRecibido) => {
        try {
            const productos = JSON.parse(await fs.promises.readFile('./data.txt', 'utf-8'))
            const encontrados = productos.find(producto => producto.id === idRecibido)
            if (encontrados) {
                console.log(encontrados)
            } else {
                console.log(null)
            }
        } catch (error) {
            console.log(`Ocurrió el siguiente error: ${error}`)
        }
    }
    static deleteAll = async () => {
        try {
            await fs.promises.unlink('./data.txt')
        } catch (error) {
            console.log(`Ocurrió el siguiente error: ${error}`)
        }
    }

    static deleteById = async (number) => {
        try {

            productos = JSON.parse(await fs.promises.readFile('./data.txt', 'utf-8'))
            
            let elementoABorrar = productos.find(producto => producto.id === number)

            let posicionElemento = productos.indexOf(elementoABorrar)

            productos.splice(posicionElemento,1)

            fs.promises.writeFile('./data.txt', JSON.stringify(productos))

        } catch (error) {
            console.log(`Ocurrió el siguiente error: ${error}`)
        }
    }
}

Contenedor.save('Kit 1', '$100', 'https://http2.mlstatic.com/D_NQ_NP_934872-MLA44257569324_122020-O.webp')
Contenedor.save('Kit 2', '$200', 'https://http2.mlstatic.com/D_NQ_NP_848425-MLA45790171513_052021-O.webp')
Contenedor.save('Kit 3', '$300', 'https://4.bp.blogspot.com/-N7RPAoLbqio/VWicsJkS9vI/AAAAAAAAArA/faY6poy1oBE/s1600/todos%2Blos%2Bproductos.PNG')
Contenedor.save('Kit 4', '$400', 'https://http2.mlstatic.com/D_NQ_NP_998796-MLA43558333219_092020-O.webp')

Contenedor.getById(1)
Contenedor.getById(8)

Contenedor.deleteAll()

Contenedor.deleteById(2)
Contenedor.getAll()