var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.post('/addquestions', function(req, res, next) {
  console.log(req.body)
pool.query("insert into questions set ?",[req.body],function(error,result)
{
   if(error)
   { return res.status(500).json({status:false,error:error})
  }
  else
  {
      return res.status(200).json({status:true})
  }

})
});

router.post('/update_question_views', function(req, res, next) {
  console.log(req.body)
pool.query("update questions set views=? where questionid=?",[req.body.views,req.body.questionid],function(error,result)
{
   if(error)
   { return res.status(500).json({status:false,error:error})
  }
  else
  {
      return res.status(200).json({status:true})
  }

})
});

router.get('/trendingquestions',function(req,res,next){

 pool.query("select * from questions",function(error,result){

  if(error)
  {
    return res.status(500).json({status:false,error:error})
  }
  else
  {
    return res.status(200).json({ data: result })
  }


 })



})

module.exports = router;
