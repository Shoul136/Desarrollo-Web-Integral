import express from 'express';
import bodyParser from 'body-parser';
import Autor from './Models/Autor.js';
import Categoria from './Models/Categorias.js';
import Subcategoria from './Models/Subcategorias.js';
import Titulo from './Models/Titulos.js';
import TitulosAutores from './Models/TitulosAutores.js';
import cors from 'cors'

const app = express();
const port = 8089;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));


// Autores inicio 

app.get('/api/autores', async (req, res) => {
  try {
    const autores = await Autor.findAll();
    res.json(autores);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/api/autores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await Autor.findByPk(id);
    if (autor) {
      res.status(200).json(autor);
    } else {
      res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/api/autores', async (req, res) => {
  const { nombre, nacionalidad, correoElectronico } = req.body;
  try {
    const nuevoAutor = await Autor.create({ nombre, nacionalidad, correoElectronico });
    res.status(201).json(nuevoAutor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/api/autores/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad, correoElectronico } = req.body;
  try {
    const autor = await Autor.findByPk(id);
    if (autor) {
      autor.nombre = nombre;
      autor.nacionalidad = nacionalidad;
      autor.correoElectronico = correoElectronico;
      await autor.save();
      res.status(200).json(autor);
    } else {
      res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.delete('/api/autores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await Autor.findByPk(id);
    if (autor) {
      await autor.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Fin autores

// Titulo Autores Inicio

app.get('/api/tituloAutor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const titulosAutor = await TitulosAutores.findAll({
      where: { idAutor: id },
      include: [Titulo]
    });
    res.json(titulosAutor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Agregar un título a un autor
app.post('/api/tituloAutor/autores/titulos', async (req, res) => {
  const { idAutor, idTitulo } = req.body;
  try {
    const nuevoTituloAutor = await TitulosAutores.create({ idAutor, idTitulo });
    res.status(201).json(nuevoTituloAutor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Eliminar un título de un autor por su ID
app.delete('/api/tituloAutor/autores/:idAutor/titulos/:idTitulo', async (req, res) => {
  const { idAutor, idTitulo } = req.params;
  try {
    const tituloAutor = await TitulosAutores.findOne({ where: { idAutor, idTitulo } });
    if (tituloAutor) {
      await tituloAutor.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ mensaje: 'Título no encontrado para este autor' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener todos los registros de la relación TitulosAutores
app.get('/api/tituloAutor', async (req, res) => {
  try {
    const titulosAutores = await TitulosAutores.findAll();
    res.json(titulosAutores);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});




// Fin Titulo Autores

// Categorias Inicio ---------------------------------------

// Obtener todas las categorías
app.get('/api/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener una categoría por su ID
app.get('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear una nueva categoría
app.post('/api/categorias', async (req, res) => {
  const { categoria } = req.body;
  try {
    const nuevaCategoria = await Categoria.create({ categoria });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una categoría por su ID
app.put('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { categoria } = req.body;
  try {
    const categoriaActualizada = await Categoria.findByPk(id);
    if (categoriaActualizada) {
      categoriaActualizada.categoria = categoria;
      await categoriaActualizada.save();
      res.status(200).json(categoriaActualizada);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar una categoría por su ID
app.delete('/api/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      await categoria.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Fin categorias -----------------------------------

// Subcategorias Inicio

// Obtener todas las subcategorías
app.get('/api/subcategorias', async (req, res) => {
  try {
    const subcategorias = await Subcategoria.findAll();
    res.json(subcategorias);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener una subcategoría por su ID
app.get('/api/subcategorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoria = await Subcategoria.findByPk(id);
    if (subcategoria) {
      res.status(200).json(subcategoria);
    } else {
      res.status(404).json({ mensaje: 'Subcategoría no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear una nueva subcategoría
app.post('/api/subcategorias', async (req, res) => {
  const { subcategoria, idCategoria } = req.body;
  try {
    const nuevaSubcategoria = await Subcategoria.create({ subcategoria, idCategoria });
    res.status(201).json(nuevaSubcategoria);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una subcategoría por su ID
app.put('/api/subcategorias/:id', async (req, res) => {
  const { id } = req.params;
  const { subcategoria, idCategoria } = req.body;
  try {
    const subcategoriaActualizada = await Subcategoria.findByPk(id);
    if (subcategoriaActualizada) {
      subcategoriaActualizada.subcategoria = subcategoria;
      subcategoriaActualizada.idCategoria = idCategoria;
      await subcategoriaActualizada.save();
      res.status(200).json(subcategoriaActualizada);
    } else {
      res.status(404).json({ mensaje: 'Subcategoría no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar una subcategoría por su ID
app.delete('/api/subcategorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoria = await Subcategoria.findByPk(id);
    if (subcategoria) {
      await subcategoria.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ mensaje: 'Subcategoría no encontrada' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Fin Subcategorias

// Titulos Inicio

// Obtener titulos
app.get('/api/titulos', async (req, res) => {
  const { id } = req.params;
  try {
    const titulo = await Titulo.findAll();
    if (titulo) {
      res.status(200).json(titulo);
    } else {
      res.status(404).json({ mensaje: 'Título no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener un título por su ID
app.get('/api/titulos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const titulo = await Titulo.findByPk(id);
    if (titulo) {
      res.status(200).json(titulo);
    } else {
      res.status(404).json({ mensaje: 'Título no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo título
app.post('/api/titulos', async (req, res) => {
  const { titulo, editorial, isbn, fechaPublicacion, noEjemplares, idSubcategoria } = req.body;
  try {
    const nuevoTitulo = await Titulo.create({ titulo, editorial, isbn, fechaPublicacion, noEjemplares, idSubcategoria });
    res.status(201).json(nuevoTitulo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un título por su ID
app.put('/api/titulos/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, editorial, isbn, fechaPublicacion, noEjemplares, idSubcategoria } = req.body;
  try {
    const tituloActualizado = await Titulo.findByPk(id);
    if (tituloActualizado) {
      tituloActualizado.titulo = titulo;
      tituloActualizado.editorial = editorial;
      tituloActualizado.isbn = isbn;
      tituloActualizado.fechaPublicacion = fechaPublicacion;
      tituloActualizado.noEjemplares = noEjemplares;
      tituloActualizado.idSubcategoria = idSubcategoria;
      await tituloActualizado.save();
      res.status(200).json(tituloActualizado);
    } else {
      res.status(404).json({ mensaje: 'Título no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar un título por su ID
app.delete('/api/titulos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const titulo = await Titulo.findByPk(id);
    if (titulo) {
      await titulo.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ mensaje: 'Título no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Fin Titulos

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
