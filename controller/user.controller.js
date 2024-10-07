import UserModel from "../module/user.model.js"
import JobModel from "../module/job.model.js"

export default class UserController {

        getRegister(req, res) {
            if(req.session.userEmail){
                return res.redirect('/jobs')
            }
            res.render('register')
        }

        getLogin(req, res) {  
            if(req.session.userEmail){
                return res.redirect('/jobs')
            }  
            res.render('login', {errorMessage: null})
        }

        register(req, res) {
            const {name, email, password} = req.body
            UserModel.addUser(name, email, password)
            res.render('login', {errorMessage: null})
        }

        login(req, res) {
            const {email, password} = req.body
            const user = UserModel.isValidUser(email, password)
            if(!user) {
                return res.render('login', {errorMessage: 'Invalid Credentials'})
            }
            req.session.userEmail = email
            let jobs = JobModel.getJobs()
            //res.render('jobs', {jobs, userEmail: req.session.userEmail})
            res.redirect('/')
        }

        logout(req, res) {
            req.session.destroy((err) => {
                    if(err) {
                            console.log(err)
                    }else{
                        res.redirect('/login')
                    }
            })
            res.clearCookie('lastVisit')
        }
}