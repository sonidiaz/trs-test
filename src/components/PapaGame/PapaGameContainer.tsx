import PapaGame from './PapaGame';
import { useQuestionsStore } from '../../store/questions';

import './PapaGame.scss'
import PapaGameStart from './PapaGameStart';
import React, { useEffect, useState } from 'react';

export default function PapaGameContainer() {
  const [titleGroup, setTitleGroup] = useState('')
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestions = useQuestionsStore(state => state.currentQuestion)
  const filterObject = useQuestionsStore(state => state.filterObject)
  const cardenalesFiltered = useQuestionsStore(state => state.cardenalesFiltered)
  const currentTerm = useQuestionsStore(state => state.currentTerm)
  // const removeCategory = useQuestionsStore(state => state.removeCategory)
  const {goPreviousQuestion, goNextQuestion} = useQuestionsStore(state => state)
  const fetchCardenales = useQuestionsStore(state => state.fetchDataList);
 
  const resumen = () => {
    const resumen:any = []
    for (const key in filterObject) {
      if (Object.prototype.hasOwnProperty.call(filterObject, key)) {
        //@ts-ignore
        const element = filterObject[key];
        resumen.push({
          key,
          value: element.join(' - ')
        });
      }
    }
    // const handleClose = (item:any) => () => {
    //   removeCategory(item.key);
    // }
    const labels:any = {
      "continente": 'Continente',
      'tipo de cardenal': 'Tipo de Cardenal',
      'nombrado por': 'Nombrado por:',
      'anyos de cardenal': 'Años de cardenal',
      'curia': 'Pertenece a la Curia',
      'nacionalidad': 'Nacionalidad',
      'cargo': 'Cargo',
    }
    const valueAnyos = {
      
    }

    return (
      <>
        <div className='in__resumen'>
            {
              resumen.map((item:any, indx:any) => (
                <div key={indx}>
                  {/* <button  onClick={handleClose(item)}>X</button> */}
                  <span> {labels[item.key]}</span>
                  <span>
                    {item.key === 'anyos de cardenal' ? (
                      <div>
                        {
                          currentTerm.map((term:any) => (
                            <strong key={term}>{term} -</strong>
                          ))
                        }
                      </div>
                    ) : (
                      <strong> {item.value} </strong>
                    )}
                  </span>
                </div>
              ))
            }
            
        </div>
        <p className='total'>Total: {cardenalesFiltered.length}</p>
      </>
    )
  }
  useEffect(() => {fetchCardenales()},[])
  return (
    <div className='in__container'>
      {
      (questions.length < 1) ? (
        <PapaGameStart handleTitle={(title) => {setTitleGroup(title)}}/>
      ) : (
        <>
          <h2>{titleGroup}</h2>
          {
            resumen()
          }
          <div className="in__controls">
            <button onClick={goPreviousQuestion}>Previeus</button>
            <span>{`${currentQuestions+1} / ${questions.length}`}</span>
            <button onClick={goNextQuestion}>Next</button>
          </div>
          <PapaGame/>
        </>
      )
    }
    </div>
  )
}