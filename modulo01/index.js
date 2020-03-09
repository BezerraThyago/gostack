const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?teste=1
// Route params = /user/1
// Request body = {"name": "thyago", "email": "thyago@site.com.br" }
// CRUD - Create, Read, Update, Delete

//localhost:3000/teste
server.get('/teste/', (req, res) => {
  const nome = req.query.nome
  
  return res.json({message: `${nome}`})
});


const users = ['Diego', 'thyago', 'Jayce'];

server.get('/users', (req, res) => {
  return res.json(users)
})

server.use((req,res,next) => {
  console.time('Request')
  console.log(`Metodo: ${req.method}; URL: ${req.url}`)

  next();

  console.timeEnd('Request')
})

function checkUusersExists(req, res, next){
  if (!req.body.name) {
    return res.status(400).json({error: 'Error'})
    
  }

  return next();

}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index]
  if (!user) {
    return res.status(400).json({error: 'dont exist'});
  }

  req.user = user

  return next();
}

//localhost:3000/user/1111
server.get('/users/:index', checkUserInArray , (req, res) => {
  const { index } = req.params
  
  return res.json(users[index])
});

server.post('/users', checkUusersExists, (req, res) => {
  const { name } = req.body;

  users.push(name)

  return res.json(users)

})

server.put('/users/:index', checkUusersExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);

});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();

});

server.listen(3000);