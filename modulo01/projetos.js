const express = require('express');
const server = express();

server.use(express.json());

const projects = [
  {
    "id": "1",
    "title": "Projeto",
    "tasks": []
  },
  {
    "id": "2",
    "title": "Projeto",
    "tasks": []
  },
  {
    "id": "3",
    "title": "Projeto",
    "tasks": []
  }
]

// Verifica se projeto Existe
function projectExists(req, res, next) {
  const { id } = req.params;
  const projectFind = projects.find(p => p.id == id)

  if (!projectFind) {
    return res.status(400).json({error: 'projects not find'})
  }

  return next()
}


// imprime no console o numero de requisições
function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

// Listar todos projetos
server.get('/projects', (req, res) => {
  return res.json(projects)
})


// Criar novo usuario e listar
server.post('/projects/', (req, res) => {
  const { id, title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(projects);

})

//Editar projetos 
server.put('/projects/:id', projectExists, (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id)

  project.title = title

  return res.json(project)
})

//Deletar projeto
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = projects.findIndex(p => p.id == id);

  projects.splice(projects, 1)

  return res.json(projects)

})

//Adicionar tasks ao projeto
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body

  const project = projects.find(p => p.id == id)
  
  project.tasks.push(title)

  return res.json(projects)

})








server.listen(4000);