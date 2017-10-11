const path = require('path');
var User=require(path.join(__dirname,'..','/models/Users.js'));

module.exports = function(req,res,nev,next){
  var email=req.body.email;
  var pw=req.body.password;
  var newUser=new User({email:email,password:pw});
  nev.createTempUser(newUser, function(err, existingUser,newTempUser){
    if(err){
      return next(err)
    }
    if(existingUser){
      return res.json({
        message: "A user exists for this email"
      })
    }
    if(newTempUser){
      var URL= newTempUser[nev.options.URLFieldName];
      nev.sendVerificationEmail(email,URL,function(err,info){
        if (err){
          return res.status(404).send("ERROR: sending email failed")
        }
        res.json({
          message:"A verification email has been sent to you.",
          info:info
        })
      })
    }

    else{
      nev.resendVerificationEmail(email,function(err,userFound){
        if(err){
          return next(err)
        }
        if(userFound){
          res.json({message:"another verification email has just been sent"})
        }
        else{
          res.json({message:"verification code expired, please sign up again"})
        }
      })
    }

  })
};
