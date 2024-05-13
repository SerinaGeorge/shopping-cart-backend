const express = require('express')
 const app = express();
 const Port = 3000;
   
app.use(express.json());

 const users=[
    { username:'user1',
     password:'password1'},
    { usernmae:'user2',
      password:'password2'
    }
 ]

 app.post('/login',(req,res)  => {
    const{username,password} = req.body;

    const user = users.find(u => u.username === username);
    if(!user){
      return  res.status(401).send ('sorry  user not found')

    } 

    const passwordmatch = users.find(u => u.password === password && u.username === username );
    if(!passwordmatch)
    return res.status(401).send('password incorrect');
 


 res.status(200).send(' Login sucessfull');
}
);
 app.listen(Port);
