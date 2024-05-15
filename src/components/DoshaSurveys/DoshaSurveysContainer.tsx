import { Container, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, MobileStepper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { returnPath } from '../../helpers/helper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from "@mui/material/styles/createTheme";
import CssBaseline from '@mui/material/CssBaseline';
import '../../commons/css/global.scss'
import ResultDosha from './ResultDosha';
import { SuccessPage } from './SuccessPage';

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
  const [completed] = useState<{[k: number]: boolean;}>({});
  const [doshaTypes, setDoshaTypes] = useState<any>()
  const [currentDoshaTypes, setcurrentDoshaTypes] = useState('')
  const [displayPopup, setdisplayPopup] = useState(false)

  const [desabledButton, setDesabledButton] = useState(false)

  const [, setLoadingTest] = useState(false)
  const [useStateSuccess, setSuccessPageDisplay] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoadingTest(true)
      const response = await fetch(`${returnPath()}/dosha-test-en.json`);
      const doshaTypes = await fetch(`${returnPath()}/dosha-test-details.json`);
      const data = await response.json();
      const dataDosha = await doshaTypes.json();
      setQuestions(data.questions);
      setMaxSteps(data.questions.length);
      setDoshaTypes(dataDosha)
      setLoadingTest(false)
      setdisplayPopup(true)
      setDoshaWinner('pitta')
      setcurrentDoshaTypes(`<h3>Diet:</h3> People with a Pitta constitution should prefer cool, moderately heavy, and less oily foods. Consume more green leafy vegetables, sweet fruits, and avoid spicy, sour, and salty foods. Fresh dairy products like yogurt can be beneficial. - <h3>Lifestyle and Exercise:</h3> Cooling and relaxing activities are best. Exercise should be performed during the cooler parts of the day. Water sports or walking in nature are ideal. Yoga poses like Moon salutation (Chandra Namaskar) are recommended. - <h3>Stress Management:</h3> Meditation and breathing techniques like Shitali Pranayama can help cool the body and mind. Taking time to relax and enjoy nature promotes Pitta balance. - <h3>Daily Routines:</h3> Avoid extreme heat and seek shade during summer. Use cooling essential oils like sandalwood and rose on the skin.'`)
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
    setDesabledButton(false)
    isLastStep() && !allStepsCompleted()
        ? questions.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setDesabledButton(false)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOptionClick = (dosha: string) => {
    setDesabledButton(true)
    setSelectedDoshas((prevDoshas) => {
      const updatedDoshas = [...prevDoshas];
      updatedDoshas[activeStep] = dosha; 
      return updatedDoshas;
    });
    if(activeStep < maxSteps - 1) {
      setTimeout(() => {
        handleNext();
        setDesabledButton(false)
      }, 600)
    }
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
  const handleFinishTest2 = () =>{
    setSuccessPageDisplay(true)
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
                  setSuccessPageDisplay(false)
                  setDesabledButton(false)
                }} aria-label="delete" size="small">
                  <CloseIcon fontSize="inherit" />
                </IconButton>
                {
                  !useStateSuccess && (
                    <ResultDosha handleClick={handleFinishTest2}/>
                  )
                }
              </Box>
              {
                useStateSuccess && (
                  <SuccessPage 
                    name={name}
                    doshaWinnerProp={doshaWinner}
                    currentDoshaTypes={currentDoshaTypes}
                  />
                )
              }
            </Container>
          </div>
        )
      }
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <div className='trs-bg-image' style={{backgroundImage: `url(https://thairoomspa.com/wp-content/uploads/2020/07/Imagen-destacada_tratamiento.jpg)`}}></div>
        {
          start ? (
            <>
              <Box>
                <div className="trs-hero">
                  <h2>What is your dosha?</h2>
                  <p>
                    Ayurveda believes our bodies are governed by three doshas or energies that define your physical, mental & emotional characteristics. Knowing your dosha type helps you find your personalised skin care and lifestyle routine for a healthier, balanced life.
                  </p>
                </div>
                <Box sx={{ maxWidth: '60%', py: 2, mx:'auto' }}>
                  <form onSubmit={handleSubmit}> 
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <TextField
                        label="Name"
                        id="standard-adornment-amount"
                        variant="filled" 
                        onChange={(e:React.ChangeEvent) => {
                          handleChange(e)
                        }}
                      />
                      <Button type='submit'> Take the Quiz</Button>
                    </FormControl>
                  </form>
                </Box>
              </Box>
            </>
          ) : (
            <>
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
                              height: '168px'
                            }}
                            onClick={() => handleOptionClick(option.dosha)}
                            className={`trs-action-button ${selectedDoshas[activeStep] === option.dosha ? 'active' : '' } ${desabledButton ? 'disabled' : ''}`}
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
            </>
          )
        }
      </Container>
    </ThemeProvider>
  );
};
