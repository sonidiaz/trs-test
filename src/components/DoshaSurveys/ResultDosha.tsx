import React from 'react'
import FormDosha from './Form'
import { Box, Button, Container, Typography } from '@mui/material'
interface Props {
  handleClick: () => void
}
export default function ResultDosha({handleClick}:Props) {
  return (
    <Container maxWidth="lg">
        <Typography variant="h2" component="h2" textAlign={'center'}>Reveal your results</Typography>
        <Typography maxWidth={700} mx={'auto'} py={2} textAlign={'center'}>Join our community to receive expert Ayurvedic advice and product suggestions best suited to your skin type and lifestyle</Typography>
        <FormDosha />
       <Box textAlign={'center'} py={2}>
        <Button  onClick={() => {
            handleClick()
          }}>Skip</Button>
       </Box>
        
    </Container>
  )
}
