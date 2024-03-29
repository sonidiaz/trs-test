import React, { useEffect, useState } from "react";
import { type Question as QuestionType } from '../../Interfaces/Interfaces';
import { useQuestionsStore } from "../../store/questions"

type Props = {}


const Questions = ({info}:{info:QuestionType}) => {
  const selectAnswer = useQuestionsStore(state => state.selectedAnswer)
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestionIndex = useQuestionsStore(state => state.currentQuestion)
  const filterObject = useQuestionsStore(state => state.filterObject)
  const currentQuestion = questions[currentQuestionIndex]
  const removeFilter = useQuestionsStore(state => state.removeFilter)
  const _setFilter = useQuestionsStore(state => state._setFilter)
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const handleCreate = (index:number, answer:string) => () => {
    if (activeItems.includes(currentQuestion.answers[index])) {
      selectAnswer(info.id, index, answer);
      removeFilter(info.id)
      setActiveItems(activeItems.filter((activeItem) => activeItem !== currentQuestion.answers[index]));
    } else {
      selectAnswer(info.id, index, answer);
      setActiveItems([...activeItems, currentQuestion.answers[index]]);
    }
    _setFilter()
  }

  useEffect(() => {
    // console.log(filterObject);
  }, [filterObject])

  return (
    <>
      <h3>{info.question}</h3>
      <div className="in__container_list">
        {
          info.answers.map((answer:any, index:number) => (
            <div 
            className={`list ${activeItems.includes(answer) ? 'active' : ''}`} 
            key={index} 
            onClick={handleCreate(index, answer)}>
              {answer}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default function PapaGame({}: Props) {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const resetGame = useQuestionsStore(state => state.resetGame)
  const cardenalesFiltered = useQuestionsStore(state => state.cardenalesFiltered)
  const questionInfo = questions[currentQuestion]

  return (
    <div className='in__box'>
      <button onClick={resetGame}>Inicio</button>
      <Questions info={questionInfo}/>
      <div className="papas">
        {
        cardenalesFiltered.map((papa:any, index:number) => (
          <div className="in__item" key={index}>
            <span data-nacio={papa.nacionalidad} key={index}>
              {papa.nombre}
            </span>
            <span>Años de Cadenal <b>{papa['anyos de cardenal']}</b> años</span>
            <span><i>{papa['tipo de cardenal']}</i></span>
          </div>
        ))
      }
      </div>
    </div>
  )
}