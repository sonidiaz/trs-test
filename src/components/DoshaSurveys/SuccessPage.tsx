import { Box, Container } from '@mui/material'
import React from 'react'
interface Props {
    name: string
    doshaWinnerProp: string | undefined
    currentDoshaTypes: string
}

export const SuccessPage = ({name, doshaWinnerProp, currentDoshaTypes}: Props) => {
  return (
    <Container>
        <Box display="flex" alignItems={'center'} flexDirection={"column"}>
            <h2>¡Thanks {name} for complete our test! </h2>
            <h3>Your Dosha type is: {doshaWinnerProp}</h3>
            <p dangerouslySetInnerHTML={{__html: currentDoshaTypes}}></p>
        </Box>
    </Container>
  )
}
