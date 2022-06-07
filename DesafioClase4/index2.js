const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        fs.promises.writeFile(`./${fileName}`, '')
    }

    async save(objeto) {
        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')

        if (!data) {
            objeto.id = 1
            const arr = [objeto]
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr))
            return objeto.id
        } else {
            data = JSON.parse(data);
            objeto.id = data.length + 1
            data.push(objeto)
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
            return objeto.id
        }
    }
    async getAll() {

        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')

        if (data) {

            data = JSON.parse(data);
            console.log("Mostrando todos los productos", data)

        } else {
            console.log("No hay data")

        }

    }

    async getById(number) {
        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')

        if (data) {

            data = JSON.parse(data);
            let encontrado = data.find(elemento => elemento.id === number)
            if (encontrado) {

                console.log(`Producto encontrado con el id: ${number}`, encontrado)
            } else {
                console.log(`No se encontraton productos con el id ${number}`, null)
            }

        } else {
            console.log("No hay data")

        }

    }
    async deleteAll() {
        fs.promises.unlink(`./${this.fileName}`)
        console.log("contenido borrado")
    }


    async deleteById(number) {
        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')


        if (data) {

            data = JSON.parse(data);
            let encontradoParaBorrar = data.find(elemento => elemento.id === number)

            if (encontradoParaBorrar) {

                console.log(encontradoParaBorrar)
                let posicionElemento = data.indexOf(encontradoParaBorrar)
                console.log("Se borrará el elemento en posición: ", posicionElemento)

                data.splice(posicionElemento, 1)
                await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
                console.log("Luego de la eliminación quedaron: ", data)
            } else {
                console.log("No se encontraton elementos para borrar")
            }


        } else {
            console.log("No hay data")

        }

    }

}
const productos = new Contenedor('datos.txt')

productos.save({ name: 'Kit 1', price: '$100', url: 'https://...' }).then(id => {
    console.log("Se creó producto id: ", id)
    productos.save({ name: 'Kit 2', price: '$200', url: 'https://...' }).then(id2 => {
        console.log("Se creó producto id: ", id2),
            productos.save({ name: 'Kit 3', price: '$300', url: 'https://...' }).then(id3 => {
                console.log("Se creó producto id: ", id3),
                    productos.getAll().then(data => {
                        console.log("Se ejecutó getAll"),
                            productos.getById(2).then(data => {
                                console.log("Se ejecutó getById"),
                                    productos.deleteById(1).then(data => {
                                        console.log("Se ejecutó deleteById"),
                                            productos.deleteAll().then(data => {
                                                console.log("Se ejecutó deleteAll")
                                            })
                                    })

                            })

                    })

            })
    })

})

