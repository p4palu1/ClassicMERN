import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from "react-redux"

import { getPosts } from "./actions/posts"
import memories from './images/0D6A0009.jpg'
import Posts from "./components/Posts/Posts"
import Form from './components/Form/Form'
import useStyles from "./styles"

const App = () => {
  const [currentId, setCurrentId ] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  })

  return (
    <Container maxWidth='lg'>
      <AppBar className={classes.appBar} position='static' color='inherit'>
          <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
          <img className={classes.image} src={memories} alt="memories" height='60px' />
      </AppBar>
          <Grow in>
            <Container>
              <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                  <Grid item xs={12} sm={7}>
                    <Posts />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                  </Grid>
              </Grid>
            </Container>
          </Grow>
      
    </Container>
  )
}

export default App