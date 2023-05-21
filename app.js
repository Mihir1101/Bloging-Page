//dev dependencies
const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const mongodb = require(`mongodb`)
//conectin to database
const DB = `mongodb+srv://mihir1101:mihir1101@cluster0.w0iczi8.mongodb.net/logindata?retryWrites=true&w=majority`
mongoose.connect(DB).then(() => {
    console.log("connected to backend");
}).catch((e) => console.log("not connected"));


//models
const Register = require("./models/registerData");
const Post = require("./models/postData");

//view engion
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', (req, res) => {
    res.render('login')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/home', (req, res) => {
    const viewData = {
        blogs: blogsData.blogs
    }
    res.render('index', viewData)
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email })

        if (useremail.password == password) {
            res.status(201).render("index")
        } else {
            res.render("invalid")
        }
    } catch (error) {
        res.status(400).send("invalid");
    }
})

app.get('/register', (req, res) => {
    res.render('register')
})

// create new user in database
app.post("/register", async (req, res) => {
    try {
        const newUserData = Register.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log(newUserData);
        res.status(201).render("login");
    } catch (error) {
        res.status(400).send(error);
    }
})
app.get('/createNewBlog', (req, res) => {
    res.render('createBlog')
})
app.post('/createBlog', async (req, res) => {
    try {
        const newUserData = Post.create({
            title: req.body.title,
            discription: req.body.discription,
            username: req.body.username,
            createdAt: new Date()
        })
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})
app.get('/api', async (req, res) => {
    try {
        async function search() {
            var dataFound = await Post.find();
            res.render('post', dataFound)
        }
        search();
    } catch (error) {
        res.status(400).send(error);
    }
})


app.listen(3000, () => {
    console.log(`server is live on 3000`);
})

