import express from "express"
import ejsLayout from "express-ejs-layouts"
import path from "path"
import JobController from "./controller/job.controller.js"
import UserController from "./controller/user.controller.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import { auth } from "./middleware/auth.middleware.js"
import { setLastVisit  } from "./middleware/lastVisit.middleware.js"
import { uploadFile } from "./middleware/file-upload.middleware.js"


const app = express()

app.use(express.urlencoded({ extended : true }))
app.use(ejsLayout)
app.use(express.static('public'))
app.use(express.static('view'))
app.use(cookieParser())
app.use(session({
        secret: 'SecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
)

const jobController = new JobController()
const userController = new UserController()

app.set("view engine", "ejs")
app.set("views", path.join(path.resolve(), "view"))

app.get('/login', userController.getLogin)
app.get('/register', userController.getRegister)
app.get('/logout', userController.logout)
app.get('/', (req, res) => {
        res.render('home', {userEmail: req.session.userEmail})
})
app.get('/jobs', 
    setLastVisit,
    jobController.getJobs
)
app.get('/jobs/:id', 
    jobController.getJobDetails
)
app.get('/jobs/:id/applicants',
    auth,
    jobController.getApplicantDetails
    )
app.get('/apply/:id',
    jobController.getApplyToJob
)
app.get('/new', 
    auth,
    jobController.getPostJobForm
)
app.get('/update/:id',
    auth, 
    jobController.getUpdateJobForm
)


app.post('/login', userController.login)
app.post('/register', userController.register)
app.post('/', 
    auth,
    jobController.postJob
)
app.post('/apply/:id',
    uploadFile.single('resume'),
    jobController.applyToJob
)
app.post('/update',
    auth,
    jobController.updateJob
)
app.post('/delete/:id',
    auth, 
    jobController.deleteJob
)

app.listen('3000', () => {
    console.log('Server is listening to port 3000')
})

