import JobModel from "../module/job.model.js";

class JobController {

        getJobs(req, res) {
            let jobs = JobModel.getJobs()
            res.render('jobs', {jobs, userEmail: req.session.userEmail})
        }

        getJobDetails(req, res) {
            const id = req.params.id
            const job = JobModel.getJobById(id)

            if(!job){
                return res.status(401).send("Job Not Found")
            }
            res.render('job_details', {job, userEmail: req.session.userEmail})
        }

        getApplyToJob(req, res) {
                const id = req.params.id
                const job = JobModel.getJobById(id)

                if(!job){
                    return res.status(401).send("Job Not Found")
                }
                res.render('apply', {job, userEmail: req.session.userEmail})
        }

        applyToJob(req, res) {
                const id = req.params.id
                const job = JobModel.getJobById(id)

                if(!job){
                    return res.status(401).send("Job Not Found")
                }
                const {name, email, contact} = req.body
                const resume = 'resume/' + req.file.filename  
                job.applicants.push({name, email, contact, resume})
                res.redirect('/')
        }

        getApplicantDetails(req, res) {
                const id = req.params.id
                const job = JobModel.getJobById(id)

                if(!job || job.recruiter != req.session.userEmail){
                    return res.status(401).send("Job Not Found")
                }
                const applicants = job.applicants
                res.render('applicants', {applicants, userEmail: req.session.userEmail})
        }

        getPostJobForm(req, res) {
                res.render('new_job', {errorMessage: null, userEmail: req.session.userEmail})
        }

        postJob(req, res) {
            const {jobCategory, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpenings} = req.body
            const recruiter = req.session.userEmail
            JobModel.addJobs(jobCategory, recruiter, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpenings)
            let jobs = JobModel.getJobs()
            res.render('jobs', {jobs, userEmail: req.session.userEmail})
        }
        getUpdateJobForm(req, res) {
            const id = req.params.id
            const job = JobModel.getJobById(id)
            
            if(job && job.recruiter == req.session.userEmail){
                return res.render('update_job', {job, errorMessage: null, userEmail: req.session.userEmail})
            }else{
                res.status(401).send("Job Not Found")
            }
            
        }
        updateJob(req, res) {
                JobModel.update(req.body)
                let jobs = JobModel.getJobs()
                res.render('jobs', {jobs, userEmail: req.session.userEmail})
        }

        deleteJob(req, res){
            const id = req.params.id
            const jobFound = JobModel.getJobById(id)

            if(jobFound && jobFound.recruiter == req.session.userEmail){
                JobModel.delete(id)
                let jobs = JobModel.getJobs()
                return res.render('jobs', {jobs, userEmail: req.session.userEmail})
            }
            res.status(401).send("Job Not Found")
        }


}

export default JobController