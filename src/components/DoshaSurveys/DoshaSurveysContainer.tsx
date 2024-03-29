import { Container, Stack, Typography } from '@mui/material'
import React from 'react'

export const DoshaSurveysContainer = () => {
  return (
    <main>
      <Container>

          <Stack direction={'row'} gap={2} justifyContent='center'>
            <Typography variant='h2' component='h1'>Dosha Test</Typography>

          </Stack>

      </Container>
    </main>
  )
}
