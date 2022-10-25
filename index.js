const express=require('express')
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())

const coursesCategory = require('./data/courses-category.json')
const course = require('./data/course.json')



app.get('/category', (req, res) => {
    res.send(coursesCategory);
});

app.get('/courses', (req, res) => {
    res.send(course)
})

app.get('/', (req, res) => {
    res.send('woow api running');
});

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    if (id == 07) {
       res.send(course)
    } else {
        const select = course.find(ct => ct.id == id)
        res.send(select) 
    }
})

app.get('/course/:id',(req,res)=>{
    const id=req.params.id;
    const single=course.find(sc=>sc.id===id)
    res.send(single)
})

app.listen(port, () => {
    console.log('server work on port', port);
})