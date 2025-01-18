import express from "express";

const app = express();

const port = 2000;
app.use(express.json())

let teaData = [];
let teaId = 1;

//Add a new tea
app.post("/teas", (req , res) => {
    const {name , price} = req.body
    const newTea = {id: teaId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all teas
app.get("/teas", (req , res) => {
    res.status(200).send(teaData)
})


//get a tea with id
app.get("/teas/:id" , (req , res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404).send("tea not found")
    }
    res.status(200).send(tea)
})

//update tea

app.put("/teas/:id" , (req , res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        res.status(404).send("tea not found")
    }
    const {name , price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

//delete tea

app.delete('/teas/:id' , (rea , res) => {
   const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
   if(index === -1){
    return res.status(404).send("file not found")
   }teaData.splice(index , 1)
   return res.status(204).send("deleted")
})

app.listen(port , () => {
    console.log(`app is listening on port : ${port}`);
    
})