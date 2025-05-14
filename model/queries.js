const pool =require("./pool");

const insertUser = async(username,pwd,name,surname,status,admin)=>{
    const {rows}=await pool.query("select id from users where username = $1",[username]);
    if(rows.id)
        throw new Error("Username already exists, try a new one");
    else
        await pool.query("insert into users(username,password,name,surname,membership_status,is_admin) values ($1,$2,$3,$4,$5,$6)",[username,pwd,name,surname,status,admin])
}

const getUserByUname = async(username)=>{
    const {rows}= await pool.query("select * from users where username = $1",[username]);
    return rows[0];
}

const getUserById= async(id)=>{
    const {rows}= await pool.query("select * from users where id = $1",[id]);
    return rows[0];
}

const allPosts = async()=>{
    const {rows}=await pool.query("select posts.id,username as author,title,to_char(timestamp, 'Dy DD Month YYYY') as timestamp,content from users join posts on users.id=posts.user_id order by posts.timestamp desc");
    return rows;
}

const newMemeber = async(id)=>{
    await pool.query("update users set membership_status = 'member' where id = $1",[id]);
}

const insertPost = async(user_id,title,content,timestamp)=>{
    await pool.query("insert into posts(user_id,title,content,timestamp) values ($1,$2,$3,$4)",[user_id,title,content,timestamp]);
}

const deletePost = async(id)=>{
    await pool.query("delete from posts where id=$1",[id]);
}
module.exports={insertUser,getUserByUname,getUserById,allPosts,newMemeber,insertPost,deletePost}