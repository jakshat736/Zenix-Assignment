import React,{useEffect, useState} from "react";
import{TextField,Button,Grid} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import MaterialTable from "@material-table/core";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { postData,getData } from "./ServerServices";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Home(props){
   



  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [emailId,setEmailId] =useState('');
  const [question,setQuestion] =useState('');
  const [allQuestions,setAllQuestions]= useState([])
  const [message,setMessage]=useState('');
 const [views,setViews]=useState('')


  const handleSubmit=async()=>{
    var body={emailid:emailId,question:question}
    console.log(body)
    var response=await postData('question/addquestions',body,false)
      if(response.status)
      {
        setMessage('Question has been submitted')
        
       
      }
      else{
        setMessage('Fail to submit question')
      }
      fetchAllQuestions()
  };

  const handleClose = () => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  };

  



  const handleDialog=(rowData)=>{
   setMessage('')
    setOpen1(true)
  }

  const handleTableDialog=(rowData)=>{
    setMessage('')
     setOpen2(true)
   }
   

   const handleTrendingDialog=()=>{
    setOpen3(true)
   }

  const fetchAllQuestions=async()=>{
    const result=await getData('question/trendingquestions')
    setAllQuestions(result.data)
  }

  useEffect(function(){
    fetchAllQuestions()

  },[])


  const handleView=async(rowData)=>{
    var c=rowData.views
    c=c+1
    setViews(c)
    var body={questionid:rowData.questionid,views:c}
    console.log(body)
    var response=await postData('question/update_question_views',body,false)
    fetchAllQuestions()
    
   

  }



let viewData=allQuestions.map((item)=>{

return{viewscount:item.views}


}) 
let count=viewData.map((item)=>{

return item.viewscount

})
count.sort(function(a, b){return b - a})
console.log(count)

// console.log(views)

 

  function displayTable() {
    return (
      <MaterialTable
      title={'List of Questions'}
        data={allQuestions}
        columns={[
            {
              title: "Question Id",
              field: "questionid",
             
            },
            {
              title: "Question",
              field: "question",
            },
            {
              title: "View",
              field: "views",
            },
           
        ]}
        actions={[
          {
            icon: () => <VisibilityIcon/>,
            tooltip: "View",

            onClick: (event, rowData) => {
              handleView(rowData)
            },
          },
        ]}
       
      />
    );
  }

const trendingQuestions=allQuestions&&allQuestions.filter((item)=>(item.views==count[0]))

const trending=()=>{
  return trendingQuestions.map((citem)=>{
    return(
      
        <div style={{display:'flex',flexDirection:'row',margin:10}}>
          <div style={{marginRight:10}}>{citem.questionid}.</div>
          <div style={{marginRight:10}}>
          {citem.question}
          </div>
          <div>
            {citem.views}views
          </div>
      
        </div>
   
    )
})
  }
  



  const askQuestion=()=>{
   return(
   <div >
    <div >
        <Grid container spacing={2}>
             
             <Grid item xs={12}>
             <TextField
             onChange={(event)=>setEmailId(event.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
              />
             </Grid>
             <Grid item xs={12}>
             <TextField
             onChange={(event)=>setQuestion(event.target.value)}
            autoFocus
            margin="dense"
            id="question"
            label="Question"
            type="text"
            fullWidth
            variant="standard"
          />
             </Grid>

             <Grid item xs={12}>
                 <Button variant="contained" onClick={handleSubmit}  fullWidth>Submit</Button>

             </Grid>
             <Grid item xs={12} >
                   {message}
                 </Grid>

            </Grid>


    </div>
</div>
    
   )

  }

  const trendingDialog=()=>{
    return (
      <div style={{width:'90%'}} >
        <Dialog open={open3}  fullWidth>
          <DialogTitle>Trending Question</DialogTitle>
          <DialogContent>
          {trending()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const openDialog=()=>{
  return (
    <div style={{width:'90%'}} >
      <Dialog open={open1}  fullWidth>
        <DialogTitle>Ask your Question</DialogTitle>
        <DialogContent>
        {askQuestion()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const openAllQuestionDialog=()=>{
  return (
    <div style={{width:'90%'}} >
      <Dialog open={open2}  fullWidth>
        <DialogContent>
        {displayTable()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}







    return(
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
 <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:100,width:900,height:400,backgroundColor:'grey'}}>
        <div style={{marginRight:20}} >
            <Button variant="contained" onClick={handleDialog}>Ask a Question</Button>
            
        </div>
        
        <div style={{marginRight:20}}>
            
            <Button variant="contained" onClick={handleTableDialog}>All Question</Button>
        </div>
        <div  >
            
            <Button variant="contained" onClick={handleTrendingDialog}>Trending Question</Button>
        </div>
       
        </div>
        <div >
        {openDialog()}
        {openAllQuestionDialog()}
        {trendingDialog()}
        </div>








        </div>
    )


}