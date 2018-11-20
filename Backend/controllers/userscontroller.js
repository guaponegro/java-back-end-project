const express = require ('express');
const router = express.Router();
const User = require('../models/user')

router.post('/', async (res, req)=>{
    try{
        console.log(req.body, " is this it?")
        const createUser = await User.create(req.body)

        res.json({
            status: 200,
            data: createUser
        })

    }catch(err){
        console.log(err);
        res.send(err);
    }
});

 //delete user
 router.delete('/:id', async (req, res) =>{
    try{
        console.log("Delete User");
        const deletedUser = await User.findByIdAndRemove(req.params.id);
        console.log(deletedUser);
        res.json({
            status: 200,
            data: deletedUser
        })
        }catch(err){
            res.send(err)
            // res.json({
            //     status: 500,
            //     data: err
            // })
        }
    })

// router.get('/:id', async (res, req)=>{
//     try{
//         const findUser = await User.findById(req.params.id);
//         res.json({
//             status: 200,
//             data: findUser
//         })
//     }catch(err){
//         res.send(err)
//     }

//  });
 
 
 router.put('/:id', async (req, res)=>{
     try{
         const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.json({
            status: 200,
            data: updateUser
        })
     }catch(err){
         res.json({
             status: 500,
             data: err
         })
     };
 });


    //edit user
    // router.get('/:id/edit', async (req, res)=>{
    //     try {
    //       const foundUser = await Users.findById(req.params.id);
    //       //const foundUser = await User.findById(req.session.username);
    //       console.log(foundUser);
    //       res.json({
    //           status: 200,
    //           data: foundUser
    //       });
      
    //     } catch (err){
    //         res.send(err)
    //     }
    //   });
      
      router.put('/:id', async (req, res)=>{
          
       try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body); //req.session.userId, 
        res.json({
            status: 200,
            data: updatedUser
        });
        //req.session.userId = updatedUser._id;
        //console.log(req.session.username);
        res.redirect("/user/edit");
       } catch(err) {
           console.log("ERROR", err)
        res.send(err)
       }
      });

 
 



module.exports = router;