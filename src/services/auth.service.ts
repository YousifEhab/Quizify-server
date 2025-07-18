import { getUserById } from "../repositories/user.repository";
export const isVerfied = async (username:string , password:string , id:any)=> {
    try{
        const user = await getUserById(id);
        if(!user) return false; 
        if(username!==user.username) return false; 
        if(password !== user.password) return false;
        return true;
    }

    catch (err) {
        console.log('Error in VerifyUser:', err);
        console.log(err);
        return false;
    }
}  