import { Request, Response } from "express";
import { generateToken } from "../services/generatetoken";
import { addUser, getUserById, getUserByName, updateUsername , updatePassword } from "../repositories/user.repository";
import { isVerfied } from "../services/auth.service";

export const login_handle = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { id } = req.params;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await isVerfied(username, password, id);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: String(user.id), username: user.username });

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user.id,
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




export const register_handle = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  

  try {
    const existingUser = await getUserByName(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    const userID = await addUser(username, password);
    return res.status(201).json({
      message: 'Register successful',
      userID,
    });

   
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const resteusername = async (req:Request , res:Response) =>{
  const{username , newusername , currentpassword} = req.body;
  if(!username || !newusername || !currentpassword){
    return res.status(401).json({error:'all fields are required'})
  }

  try{
    const user = await getUserByName(username);
    if(!user){
       return res.status(404).json({ error: "User not found" });
    }

    if(user.password !== currentpassword){
      return res.status(401).json({ error: "Incorrect old password" });
    }

    await updateUsername(user.id , newusername)
    return res.status(200).json({ message: "username updated successfully" });
  }

  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
} 




export const restepassword = async (req:Request , res:Response) =>{
  const{username ,  currentpassword , newpassword} = req.body;
  if(!username || !newpassword || !currentpassword){
    return res.status(401).json({error:'all fields are required'})
  }

  try{
    const user = await getUserByName(username);
    if(!user){
       return res.status(404).json({ error: "User not found" });
    }

    if(user.password !== currentpassword){
      return res.status(401).json({ error: "Incorrect old password" });
    }


    await updatePassword(user.id , newpassword)
    return res.status(200).json({ message: "password updated successfully" });
  }

  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
} 