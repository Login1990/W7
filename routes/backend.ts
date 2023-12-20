import express, {Express, NextFunction, Router, Request, Response} from "express"
import bycript, {genSalt, hash} from "bcryptjs"

const router = Router()

type User = {
    id: number,
    username: string,
    password: string,
}

let users: {[key: string]: User}= {}

let user_id : number = 0

function getAllValues(obj: any) {
    const values = [];
  
    // Iterate through each key in the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Add the value to the values array
        values.push(obj[key]);
      }
    }
  
    return values;
  }

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello from TS!")
});

router.post("/api/user/register", (req: Request, res: Response, next: NextFunction) => {
    if(users.hasOwnProperty(req.body.username)){
        return res.status(400).send("Username already used")
    } else {
        bycript.genSalt(10, (err, salt) => {
            bycript.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                let user: User = {
                    id: user_id,
                    username: req.body.username,
                    password: hash
                }
                users[req.body.username] = user
                user_id += 1
                return res.send(user)
            })
        })
    }
})

router.get("/api/user/list", (req: Request, res: Response, next: NextFunction) => {
    let obj = getAllValues(users)
    console.log(obj)
    res.send(obj)
})

export default router