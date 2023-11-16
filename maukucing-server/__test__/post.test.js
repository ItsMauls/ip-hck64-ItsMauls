
const server = require("../app");
const request = require('supertest')
const {User} = require('../models/index.js');
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
    await destroyDatabase()
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

    describe('Add user failed', () => {
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