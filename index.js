const express = require('express'); // Importing express module
const todosData = require('./todos.json');  // Importing todos data from a JSON file
const todos = todosData.todos;    // Extracting the todos array from the imported data
          

const app = express(); 
const PORT = 3500;  

app.use(express.json());

// Root endpoint

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the To-Do List API</h1> <a href="/todos " style="text-decoration: none; color: black; background-color: #a1e0e7ff; padding: 10px 20px; border-radius: 5px;">TODOS</a>');
});

// Get all todos
/** Method: GET
 * Endpoint: /todos
 * Description: Get all to-do items
 * Access: Public
 * Parameters: None
 */
app.get('/todos', (req, res) => {
  res.status(200).json({
    success: true,
    data: todos
  });
});

// Get todo by ID
/** Method: GET
 * Endpoint: /todos/:id
 * Description: Get to-do items by their id
 * Access: Public
 * Parameters: id
 */
app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  const todo = todos.find(each => each.id === todoId);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: `Todo not found with id: ${id}`
    });
  }

  res.status(200).json({
    success: true,
    data: todo
  });
});

// Create a new todo
/** Method: POST
 * Endpoint: /todos
 * Description: Create a new to-do item
 * Access: Public
 * Parameters: None
 */
app.post('/todos', (req, res) => {
  const {id, title, description, status } = req.body;
  if(!id || !title || !description || !status){
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields'
    });
  }
  const todo = todos.find((each) => each.id === id);
  if (todo) {
    return res.status(400).json({
      success: false,
      message: 'Todo already exists'
    });
  }

  // Add new todo to the list
  todos.push({ id, title, description, status });

  res.status(201).json({
    success: true,
    message: 'Todo created successfully',
  });
});


/** Method: PUT
 * Endpoint: /todos/:id
 * Description: Update a to-do item by their id
 * Access: Public
 * Parameters: id
 */
app.put('/todos/:id', (req, res) => {
const todoId = parseInt(req.params.id);
 const {data} = req.body;
 //Check if todo exists
 const todo = todos.find(each => each.id === todoId);
 if (!todo) {
   return res.status(404).json({
     success: false,
     message: `Todo not found with id: ${todoId}`
   });
 }

const updateTodo = todos.map((each) => {
  if(each.id === todoId){
    return {
      ...each,
      ...data,
    };
  }
  return each;
});

res.status(200).json({
  success: true,
  data: updateTodo,
  message: 'Todo updated successfully',
 
  
});


});


/** Method: DELETE
 * Endpoint: /todos/:id
 * Description: Delete a to-do item by their id
 * Access: Public
 * Parameters: id
 */
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(each => each.id === todoId);
  if (!todo){
    return res.status(404).json({
      success: false,
      message: `Todo not found with id: ${todoId}`
    });
  }

  const updatedTodos = todos.filter((each) => each.id !== todoId);

  res.status(200).json({
    success: true,
    data: updatedTodos,
    message: 'Todo deleted successfully',
   
  });
});

app.listen(PORT, () => {
  console.log(`Runs at http://localhost:${PORT}`);
})
