import React from 'react';
import { useQuestionsStore } from '../../store/questions';

type Props = {
  handleTitle: (title:string) => void
}

const PapaGameStart = ({handleTitle}: Props) => {
  const fetchQuestion = useQuestionsStore(state => state.fetchQuestions);
  const HandleClick = (e:any) => {
    fetchQuestion(5, e.target.textContent);
    handleTitle(e.target.textContent)
  }

  return (
    <div className='in__start_nav'>
        <button onClick={HandleClick}>Nacionalidad y Tipo de Cargo</button>
        <button onClick={HandleClick} disabled>Antigüedad y Pertinencia a la Curia Romana</button>
       <button onClick={HandleClick} disabled>Edad y Condiciones Especiales</button>
    </div>
  )
}
export default PapaGameStart