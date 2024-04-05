import { Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MobileStepper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { returnPath } from '../../helpers/helper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../../commons/css/global.scss'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface Question {
  options: { response: string; dosha: string }[];
  question: string;
}

export const DoshaSurveysContainer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [maxSteps, setMaxSteps] = useState(0);
  const [selectedDoshas, setSelectedDoshas] = useState<string[]>([]);
  const [start, setStart] = useState(true)
  const [name, setname] = useState('')
  const [doshaWinner, setDoshaWinner] = useState<string | undefined>('')
  const [completed] = useState<{
    [k: number]: boolean;
  }>({});
  const [doshaTypes, setDoshaTypes] = useState<any>()
  const [currentDoshaTypes, setcurrentDoshaTypes] = useState('')
  const [displayPopup, setdisplayPopup] = useState(false)

  const [, setLoadingTest] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoadingTest(true)
      const response = await fetch(`${returnPath()}/dosha-test-esp.json`);
      const doshaTypes = await fetch(`${returnPath()}/dosha-test-details.json`);
      const data = await response.json();
      const dataDosha = await doshaTypes.json();
      setQuestions(data.questions);
      setMaxSteps(data.questions.length);
      setDoshaTypes(dataDosha)
      setLoadingTest(false)
    };
    getData();
  }, []);

  const totalSteps = () => {
    return questions.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          questions.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOptionClick = (dosha: string) => {
    setSelectedDoshas((prevDoshas) => {
      const updatedDoshas = [...prevDoshas];
      updatedDoshas[activeStep] = dosha; // Guardamos la selección para este paso
      return updatedDoshas;
    });
    // handleNext();
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()
    setStart(false)
  }

  const handleChange = (e:any) => {
    setname(e.target.value)
  }

  const handleFinishTest = () =>{
    const countDoshas = selectedDoshas.reduce((acc:any, dosha) => {
      acc[dosha] = (acc[dosha] || 0) + 1;
      return acc;
    }, {});
    
    let mostRepeatedDosha:string = 'Vit';
    let highestFrequency = 0;
    
    for (const dosha in countDoshas) {
      if (countDoshas[dosha] > highestFrequency) {
        mostRepeatedDosha = dosha;
        highestFrequency = countDoshas[dosha];
      }
    }
    setDoshaWinner(mostRepeatedDosha)
    setcurrentDoshaTypes(doshaTypes[mostRepeatedDosha])
    setdisplayPopup(true)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {
        displayPopup && (
          <div className="trs-wrapper-popup">
            <Container>
              <Box pt={5} display="flex" alignItems="end" flexDirection={'column'}>
                <IconButton onClick={() => {
                  setdisplayPopup(false)
                  setSelectedDoshas([])
                  setDoshaWinner('')
                  setActiveStep(0)
                }} aria-label="delete" size="small">
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Box display="flex" alignItems={'center'} flexDirection={"column"}>
                <h2>¡Thanks {name} for complete our test! </h2>
                <h3>Your Dosha type is: {doshaWinner}</h3>
                <p dangerouslySetInnerHTML={{__html: currentDoshaTypes}}></p>
              </Box>
            </Container>
          </div>
        )
      }
      <Container sx={{padding: '20px 0'}}>
        {
          start ? (
            <Container maxWidth="sm">
              <Box>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Your Name</InputLabel>
                    <Input
                      value={name}
                      id="standard-adornment-amount"
                      onChange={(e:React.ChangeEvent) => {
                        handleChange(e)
                      }}
                    />
                    <Button type='submit'> Take the Quiz</Button>
                  </FormControl>
                </form>
              </Box>
            </Container>
          ) : (
            <Container sx={{ maxWidth: 900, flexGrow: 1, display: displayPopup ? 'none' : 'block' }} >
              <Box sx={{ width: '100%', py: 2 }}>
                {questions.length && (
                  <>
                    <Typography py={4} textAlign={'center'} variant="h4" component="h4">
                      {questions[activeStep].question}
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="stretch"
                    >
                      {questions[activeStep].options.map((option, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <Card
                            variant="outlined"
                            sx={{
                              height: '168px',
                              backgroundColor: selectedDoshas[activeStep] === option.dosha ? '#424141' : 'inherit' // Aplicamos un fondo diferente si esta opción está seleccionada
                            }}
                            onClick={() => handleOptionClick(option.dosha)}
                            className='trs-action-button'
                          >
                            <CardContent>
                              <Typography variant="h6" component="span">
                                {option.response}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
              <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  (activeStep === maxSteps - 1 && selectedDoshas.length > 1) ? (
                    <Button color="primary" size="small" onClick={handleFinishTest}>
                      Finish Test
                    </Button>
                  ) : (
                    <Button color="secondary" size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                      Next
                    </Button>
                  )
                }
                backButton={
                  <Button size="small" color="secondary"  onClick={handleBack} disabled={activeStep === 0}>
                    Prev
                  </Button>
                }
              />
            </Container>
          )
        }
      </Container>
    </ThemeProvider>
  );
};
