
export default class UserModel {
        constructor(id, name, email, password) {
                this.id = id
                this.name = name
                this.email = email
                this.password = password
        }

        static addUser(name, email, password) {
                let newUser = new UserModel(
                    User.length + 1,
                    name,
                    email,
                    password
                )
                User.push(newUser)
        }
        
        static isValidUser(email, password) {
                const result = User.find((u) => u.email==email && u.password==password)
                return result
        }

}

var User = [
        new UserModel(
                1,
                'John Doe',
                'john.doe@gmail.com',
                '1234'
        )
]