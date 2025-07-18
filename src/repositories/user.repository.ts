import { dataBaseConnection } from "../config/db";
import { user } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';

export const getUserById = async (id:any):Promise<user> => {
    const [rows]:any = await (await dataBaseConnection.getConnection()).execute('SELECT * FROM users WHERE id = ?' , [id])
    return rows[0];
}


export const addUser = async (username: string, password: string): Promise<string> => {
  const id = uuidv4();
  const [result]: any = await (await dataBaseConnection.getConnection()).execute(
    'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
    [id, username, password]
  );
  return id;
};

  export const getUserByName = async (username: string): Promise<any> => {
  const conn = await dataBaseConnection.getConnection();
  const [rows]: any = await conn.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows.length ? rows[0] : null;
};


export const updateUsername = async (id:any , username:string) => {
    (await dataBaseConnection.getConnection()).execute("UPDATE users SET username = ? WHERE id = ?", [username, id])
}
export const updatePassword = async (id:any , password:string) => {
    (await dataBaseConnection.getConnection()).execute("UPDATE users SET password = ? WHERE id = ?", [password, id])
}
