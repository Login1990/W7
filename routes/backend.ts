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

export default router