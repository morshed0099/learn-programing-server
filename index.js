const express=require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


app.use(cors())
app.use(express.json())

// const coursesCategory = require('./data/courses-category.json')
// const course = require('./data/course.json')

console.log(process.env.DB_USER);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1m4kiwj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const courseCollection =client.db('learnProgramming').collection('courses')
const categoryCollection=client.db('learnProgramming').collection('coursesCategory')

async function run(){
    try{
        app.get('/category',async (req, res) => {
            const query={}
            const coursesCategory=await categoryCollection.find(query).toArray()
            res.send(coursesCategory);
            console.log(coursesCategory);
        });
        
        app.get('/courses', async(req, res) => {
            const query={}
            const course=await courseCollection.find(query).toArray()
            res.send(course)
        })
        
        app.get('/', (req, res) => {
            res.send('woow api running');
        });
        
        app.get('/category/:id',async (req, res) => {
            const id = req.params.id;
            const course=await courseCollection.find({}).toArray()
            if (id == 07) {               
               res.send(course)
            } else {        
                const select = course.find(ct => ct.id == id)
                res.send(select) 
            }
        })
        
        app.get('/course/:id',async(req,res)=>{
            const id=req.params.id;
            const course=await courseCollection.find({}).toArray()
            const single=course.find(sc=>sc.id===id)
            res.send(single)
        })
    }
    finally{

    }
}run().catch(error=>console.error(error))

app.listen(port, () => {
    console.log(`woow ser is work on port ${port}`);
})