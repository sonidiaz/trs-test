import { Container, Grid, MobileStepper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { returnPath } from '../../helpers/helper'

import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface Question {
  options: [],
  question: string
}
export const DoshaSurveysContainer = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestion] = useState<Question[]>([]);
  const [maxSteps, setMaxSteps] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const responsde =  await fetch(`${returnPath()}/dosha-test-esp.json`)
      const data = await responsde.json()
      setQuestion(data.questions);
      setMaxSteps(data.questions.length);
    }
    getData()
  }, [])
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  return (
    <Container sx={{ maxWidth: 900, flexGrow: 1 }}>
      <Box sx={{ width: '100%', py: 2 }}>
        {
          questions.length && (
            <>
              <Typography py={4} textAlign={'center'} variant="h4" component="h4" >{questions[activeStep].question}</Typography>
              <Grid
                  container 
                  spacing={2} 
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="stretch">
                {
                  questions[activeStep].options.map((option:{response: string}, index:number) => (
                    <Grid item xs={4} key={index}>
                      <Card variant="outlined" sx={{height: '100%'}}>
                        <CardContent>
                          <Typography variant="h6" component="span">
                            {option.response}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                }
              </Grid>
            </>
          )
        }
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}>
            Siguiente</Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Anterior</Button>
        }
      />
    </Container>
  );
}
