import { Box, Button, Fade, FormControl, Slide, TextField } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import SendIcon from '@mui/icons-material/Send'
import LoopIcon from '@mui/icons-material/Loop'
import CircularProgress from '@mui/material/CircularProgress'
type Props = {}

export default function FormDosha({ }: Props) {
  const { register, formState: { errors, isSubmitSuccessful }, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    }
  })
  const [sending, setSending] = useState(false)
  const [emailSend, setEmailSend] = useState(false)
  const [displayForm, setdisplayForm] = useState(true)
  const [checked, setChecked] = useState(false)
  const onSubmit = async (data: any) => {
    if (checked) {
      setSending(true)
      const sendData = async (params: any) => {
        const response = await fetch('/api/form', {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
        const json = await response.json();
        return json;
      }
      const data2 = await sendData(data)
      setSending(false)
      setEmailSend(true);
      setdisplayForm(false);
      setTimeout(() => {
        setEmailSend(false)
      }, 3000);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])
  return (
    <Box maxWidth={800} mx={"auto"}>
      {
        emailSend && (
          <Fade in={emailSend} style={{ transitionDelay: emailSend ? '500ms' : '0ms' }}>
            <Box py={2}>
              <h3>Gracias por contactarnos.</h3>
              <p>Te responderemos a la brevedad</p>
            </Box>
          </Fade>
        )
      }
      <Fade in={!emailSend}>
        <Box maxWidth={"md"} width={"80%"} mx={"auto"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                maxWidth: '100%',
              }}
              pb={2}
            >
              <TextField type="email" fullWidth {...register("email", { required: "This is required.", minLength: 3 })} label="Email" id="email" />
            </Box>
            <Box pt={2} display={"flex"} justifyContent={"flex-start"}>
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={(e) => {
                  setChecked(e.target.checked)
                }} />} label="Acepto la política de privacidad" />
              </FormGroup>
            </Box>
            <Box pt={2} display={"flex"} justifyContent={"left"}>
              <Button fullWidth type="submit" variant="contained" endIcon={!sending ? <SendIcon /> : <CircularProgress sx={{ color: "white" }} size={20} />}>{
                !sending ? "Enviar" : "Enviando..."
              }</Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Box>
  )
}
