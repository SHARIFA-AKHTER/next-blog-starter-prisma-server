import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response)=>{
    try{
        const result = await userService.createUser(req.body)
        // console.log("Console from Controller");

        res.status(201).json(result);
    }catch(error){
         res.status(500).send(error)
    }
}
const getAllFromDB = async (req: Request, res: Response)=>{
    try{
        const result = await userService.getAllFromDB()
         res.status(201).json(result);
    }catch(error){
         res.status(500).send(error)
    }
}
const getUserById = async (req: Request, res: Response)=>{
    try{
        const result = await userService.getUserById(Number(req.params.id))
         res.status(201).json(result);
    }catch(error){
         res.status(500).send(error)
    }
}

export const UserController ={
    createUser,
    getAllFromDB,
    getUserById
}