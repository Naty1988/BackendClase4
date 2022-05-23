class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName() {
        console.log(`Nombre completo del usuario: ${this.nombre} ${this.apellido}`)
    }
    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota)
        console.log(this.mascotas)
    }
    countMascotas() {
        console.log(`Este usuario ${this.nombre} ${this.apellido} tiene ${this.mascotas.length} mascotas.`)
    }
    addBook(titulo, autor) {
        this.libros.push({ Titulo: titulo, Autor: autor })
        console.log(`Se gregó el libro "${titulo}" de ${autor} a la lista de libros de ${this.nombre} ${this.apellido}`)
    }
    getBookNames() {
        let titulos = []
        this.libros.forEach(libro => titulos.push(libro.Titulo));
        return console.log(`Los nombres de los libros de ${this.nombre} ${this.apellido} son :
        "${titulos}"`)
    }
}

const usuario = new Usuario("Pepe", "Gonzalez", [{ Titulo: "Romeo y Julieta", Autor: "William Shakespeare" }], ["tito", "michu"])

usuario.getFullName()
usuario.addMascota("iguana")
usuario.countMascotas()
usuario.addBook("Rebelión en la granja", "George Orwell")
usuario.getBookNames()
