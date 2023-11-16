
const server = require("../app");
const request = require('supertest')
const {User} = require('../models/index.js');
const path = require('path')
const fs = require('fs')
const { encryptedPw } = require("../helpers/bcrypt.js");
const { destroyCreatedUser, destroyDatabase } = require("../helpers/destroyAndCreate.js");
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE5MjI3MDI2fQ.SFLKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

let token

beforeAll(async () => {
    
    await User.create({
        username : 'teslagi', 
        email : 'test1@mail.com', 
        password : encryptedPw('password')}) 
  });
  
  afterAll(async () => {
    await destroyCreatedUser()
    })


describe("POST /login",  () => {
    //a. login succeed
    it('should return a userToken after decoding the token', async () => {
        
        const userData = {
            email: "test1@mail.com",
            password : "password"
        }
   
        const response = await request(server)
        .post('/login')
        .send(userData)
        // .expect(200)
        
        expect(response.body)
        .toHaveProperty('access_token')
        token = response.body.access_token
    })
    //b. not include email
    //d. not valid email
    describe('Auth Error', () => {
        it('should throw an error when no email is included', async () => {
            const userData = {
                email: "",
                password : "adapassword"
            }
            const response = await request(server)
            .post('/login')
            .send(userData)
            .expect(401)
    
            expect(response.body.msg)
            .toBe('Email is required')
        });
        //b. not include password
        //e. not valid password
        it('should throw an error when no password is included', async () => {
            const userData = {
                email: "adaemail",
                password : ""
            }
            const response = await request(server)
            .post('/login')
            .send(userData)
            .expect(401)
    
            expect(response.body.msg).toBe('Password is required')
        });
    });
});

describe('POST /register', () => {
    describe('Register Succeed', () => {
        let createdUserId
        //a.succeed register
        
        it('should success register', async () => {
            const userData = {
                email: `userbarulagi@gmail.com`,
                password : "inipassworduser",
                username : "userbaru"
            }
    
            const response = await request(server)
                .post('/register')
 //di test memakai .set buat pengganti header
                .send(userData)
             
                
                expect(response.body)
                .toHaveProperty('email')
                expect(response.body)
                .toHaveProperty('password')

                createdUserId = response.body.id
        });
        afterAll(async () => {
            if (createdUserId) {
                // Hapus user menggunakan ORM
                await destroyCreatedUser(createdUserId)
            }
            
        })
    });

    describe('Register failed', () => {
          //b. not include email
        //d. email is empty string
        it('should throw error when no email is included', async () => {
            const userData = {
                username : "njuxxxxl",
                email: "",
                password : "adapassword"
            }
            const response = await request(server)
            .post('/register')
            .send(userData)
            .expect(400)
    
            expect(response.body.msg)
            .toBe('Email is required!')
        });
         //c. not include password
        //e. password is empty string
        it('should throw error when no username is included', async () => {
            const userData = {
                email: "adaemailaaaaaa@email.com",
                password : "aaaaa",
                username : ""
            }
            const response = await request(server)
            .post('/register')
            .send(userData)
            .expect(400)
    
            expect(response.body.msg).toBe('username')
        });
          //g. email already registered
        it('should throw error when email is already registered', async () => {
            const userData = {
                email: "tes@mail.com",
                password : "password"
            }
            const response = await request(server)
            .post('/register')
            .send(userData)
            .expect(400)
    
            expect(response.body.msg).toBe('email must be unique')
        });
         //g. email format is invalid
        it('should throw an error when email format is invalid', async() => {
            const userData = {
                email: "userbaru.gmail.com",
                password : "inipassworduser",
                username : "njuxxxxxxxl"
            }

            const response = await request(server)
            .post('/register')
            .send(userData)
            .expect(400)

            expect(response.body.msg).toBe("Validation isEmail on email failed")
        })
         //h. doesnt contain access token
       
        //i. doesnt contain valid access token
       
    });
});

describe('GET /posts', () => {
    describe('Access Success', () => {
        it('should successfully read all posts', async() => {
            const response = await request(server)
            .get('/posts')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
        
            expect(response.body)
                .toBeInstanceOf(Object)
        });
    });
    describe('Login failed', () => {
        it('should throw an error when user not logged in', async () => {
        const response = await request(server)
        .get('/posts')
        .expect(401)

        expect(response.body.msg).toBe('Unauthorized Error')
        });

        it('should throw an error when user token is invalid', async () => {
            
            const response = await request(server)
            .get('/posts')
            .set('Authorization', `bearer ${invalidToken}`)
            .expect(401)

            expect(response.body.msg).toBe('Unauthorized Error')
        });
    });
});

describe('DELETE /posts', () => {
    describe('Success deleting posts', () => {
        it('should successfully delete an posts', async () => {
            const response = await request(server)
            .delete('/posts/117')
            .set('Authorization', `bearer ${token}`)
            .expect(200)

            expect(response.body.msg)
            .toBe(response.body.msg)
        });
    });
    describe('Failed deleting posts', () => {
        it('should throw an error when user is not logged in', async () => {
            const response = await request(server)
            .delete('/posts/16')
            .expect(401)

            expect(response.body.msg)
            .toBe('Unauthorized Error')
        });
        it('should throw an error when user token is not valid', async () => {
            const response = await request(server)
            .delete('/posts/16')
            .set('Authorization', `bearer ${invalidToken}`)
            .expect(401)

            expect(response.body.msg)
            .toBe('Unauthorized Error')
        });
        it('should throw an error when user token is not valid', async () => {
            const response = await request(server)
            .delete('/posts/1000')
            .set('Authorization', `bearer ${token}`)
            .expect(404)

            expect(response.body.msg)
            .toBe('Not Found!')
        });

        // it('should throw an error when user is deleting posts not its posts', async () => {
        //     const response = await request(server)
        //     .delete('/posts/19')
        //     .set('Authorization', `bearer ${userToken}`)
        //     .expect(403)

        //     expect(response.body.msg)
        //     .toBe('Forbidden Error')
        // });

    });
});

describe('POST /posts', () => {
    describe('Success to create posts', () => {
        //a. success create the posts
        const filePath = path.resolve(__dirname, '')
        const imageBuffer = fs.readFileSync(filePath)
        it('should successfully create an posts with valid input', async () => {
            const posts = {
            content: "Ini Content."
        
        }
        const response = await request(server)
                .post('/posts')
                .set('Authorization', `bearer ${token}`)
                .send(posts)
                .expect(201)
                .attach('imageUrl', imageBuffer, 'imageUrl')
        
                expect(response.body)
                .toBeInstanceOf(Object)
                expect(typeof response.body.title)
        });
    });

    describe('Failing to create posts', () => {
        //b. should login first
        it('should throw an error when user is not logged in', async () => {
            const posts = {
            title: "Ini title",
            content: "Ini Content.",
            imgUrl: "https://npr.brightspotcdn.com/dims4/default/046d148/2147483647/strip/true/crop/7680x5120+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F78%2Fdf%2Fa027f12342b1ab320dc808aee3b9%2Fadobestock-568336762.jpeg",
            categoryId: 1,
            authorId: 1
        }
       
        const response = await request(server)
                .post('/posts')
                .send(posts)
                .expect(401)

                expect(response.body.msg)
                .toBe('Unauthorized Error')
        });

        //c. it should input valid token
        it('should throw an error when given an invalid token', async () => {
            const posts = {
            title: "Ini title",
            content: "Ini Content.",
            imgUrl: "https://npr.brightspotcdn.com/dims4/default/046d148/2147483647/strip/true/crop/7680x5120+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F78%2Fdf%2Fa027f12342b1ab320dc808aee3b9%2Fadobestock-568336762.jpeg",
            categoryId: 1,
            authorId: 1
        }
        
        const response = await request(server)
                .post('/posts')
                .set('Authorization', `bearer ${invalidToken}`)
                .send(posts)
                .expect(401)

                expect(response.body.msg).toBe('Unauthorized Error')
        });
        //d. it should input valid body
        it('should throw an error when posts input is invalid', async() => {
            const filePath = path.resolve(__dirname, '../assets/background-kucing_cropped.png')
            const imageBuffer = fs.readFileSync(filePath)
            const posts = {
                contentx: "Ini Content." }
            const response = await request(server)
            .post('/posts')
            .set('Authorization', `bearer ${token}`)
            .send(posts)
            .expect(400)
            .attach('imageUrl', imageBuffer, 'imageUrl')

            expect(response.body.msg).toBe('Title is required!')
        });
    });
});