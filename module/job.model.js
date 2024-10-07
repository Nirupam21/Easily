
export default class JobModel {
        constructor(id, recruiter, jobCategory, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpenings, jobPosted, applicants) {
                        this.id = id
                        this.recruiter = recruiter
                        this.jobCategory = jobCategory
                        this.jobDesignation = jobDesignation
                        this.jobLocation = jobLocation
                        this.companyName = companyName
                        this.salary = salary
                        this.applyBy = applyBy
                        this.skillsRequired = skillsRequired
                        this.numberOfOpenings = numberOfOpenings
                        this.jobPosted = jobPosted
                        this.applicants = applicants
        }

        static getJobs(){
            return Jobs
        }

        static addJobs(jobCategory, recruiter, jobDesignation, jobLocation, companyName, salary, applyBy, skillsRequired, numberOfOpenings) {
                let newJob = new JobModel(
                        Jobs.length + 1,
                        recruiter,
                        jobCategory,
                        jobDesignation,
                        jobLocation,
                        companyName,
                        salary,
                        applyBy,
                        skillsRequired,
                        numberOfOpenings,
                        new Date().toISOString(),
                        []  
                )

                Jobs.push(newJob)
        }

        static update(job) {
                const index = Jobs.findIndex(
                    (j) => j.id == job.id
                )
                Jobs[index] = job
        }

        static delete(id) {
                const index = Jobs.findIndex(
                    (j) => j.id == id
                )

                Jobs.splice(index,1)
        }

        static getJobById(id) {
                return Jobs.find((j) => j.id == id)
        }

}

var Jobs = [
        new JobModel(
                1,
                'john.doe@gmail.com',
                'Tech',
                'SDE1',
                'Hyderabad',
                'Microsoft',
                '15-20LPA',
                '2024-09-25',
                'java, springboot, system design, react, dsa',
                2,
                '2024-08-25',
                []
        )
] 