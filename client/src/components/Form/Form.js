import React,  { useState, useEffect } from 'react'
import { textGeild, Button, Typography, Paper, TextField } from "@material-ui/core"
import useStyles from './styles'
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { createPost, updatePost } from "../../actions/posts"

const Form = ({currentId, setCurrentId}) => {

  const post = useSelector((state) =>  currentId ? state.posts.find((p) => p._id === currentId) : null) 
  const [postData, setPostData] = useState({
    creator: '', title: '', message: '', tags: '', selectedFile: '' 
  })
  const classes = useStyles()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(post) setPostData(post)
  }, [post])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(currentId){
      dispatch(updatePost(currentId, postData))
    }
    else{
      dispatch(createPost(postData))
    }
  }
  const clear = () => {

  }



  return (
    <Paper className={classes.paper}>
      <form 
      autoComplete="off" 
      noValidate 
      className={`${classes.form} ${classes.root}`}
      onSubmit={handleSubmit}>
        <Typography variant="h6">
          create a memory 
          <TextField name="creator" variant="outlined" label="creator" fullWidthvalue={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
          <TextField name="title" variant="outlined" label="title" fullWidthvalue={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
          <TextField name="message" variant="outlined" label="message" fullWidthvalue={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
          <TextField name="tags" variant="outlined" label="tags" fullWidthvalue={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value})}/>
          <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
          </div>
          <Button onClick={handleSubmit} className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
          <Button onClick={clear} variant="contained" color="secondary" size="small" fullWidth>
            Clear
          </Button>
        </Typography>
      </form>
    </Paper>
  )
}

export default Form