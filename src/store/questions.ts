import {create } from 'zustand'
import { State } from '../Interfaces/Interfaces'
import { filterArray, returnPath } from '../helpers/helper'

export const useQuestionsStore = create<State>((set, get) => ({
  questions: [],
  filterType:'',
  currentQuestion: 0,
  currentTerm: [],
  cardenales:[],
  cardenalesFiltered: [],
  terminos:[],
  terminosObj: {
    'continente': [],
    'tipo de cardenal': [],
    'nombrado por': [],
    'anyos de cardenal': [],
    'curia': [],
    'nacionalidad': [],
    'cargo': [],
  },
  filterObject:{
    
  },
  resetGame: () => {
    set({
      questions:[], 
      terminos:[],
      cardenalesFiltered:[], 
      currentQuestion:0,
      filterType: '',
      terminosObj: {
        'continente': [],
        'tipo de cardenal': [],
        'nombrado por': [],
        'anyos de cardenal': [],
        'curia': [],
        'nacionalidad': [],
        'cargo': [],
      },
      filterObject:{
        
      },
    })
  },
  fetchDataList: async() => {
    const response  = await fetch(returnPath() + '/cardenales.json')
    const cardenales = await response.json()
    set({cardenales})

  },
  fetchQuestions: async (_limit:number, grupo:string) => {
    const response  = await fetch(returnPath() + '/data.json')
    const data = await response.json()
    // const questions = data[grupo].sort(() => Math.random() - 0.5)
    const questions = data[grupo]
    set({questions})
  },
  _setFilter: () => {
    let _termsObject = {}
    const {filterObject, cardenales} = get()
    for (const key in filterObject) {
      _termsObject = {
        ..._termsObject,
        [key]: (data:any) => {          
          if(key === 'anyos de cardenal') {
          //@ts-ignore
            return filterObject[key].some(d => {
              const numeros = d.split(',').map(Number);
              return numeros.includes(data)
            })
          }
          if(key === 'curia') {
            const isCuria = structuredClone(filterObject)
          //@ts-ignore
            const newArray = isCuria['curia'].map((str:string) => str.replace('Sí', 'Si'));
            return newArray.includes(data);
          }
          //@ts-ignore
          return filterObject[key].includes(data);
        }
      }
    }
    const filterArrayNew = filterArray(cardenales, _termsObject)
    set({
      filterObject:filterObject,
      cardenalesFiltered: filterArrayNew
    })

  },
  selectedAnswer: (questionId:number, answerIndex: number, value: string = '') => {
    const {questions, terminosObj, filterObject, currentTerm} = get()
    let term:string = value
    let termFilter:[] = []

    const rangosEdades = {
      "Menos de 5 años": '1,2,3,4',
      "Entre 5 y 10 años": '5,6,7,8,9,10',
      "Más de 10 años": '10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25',
    }
    console.log(answerIndex);
    
    const newQuestion = structuredClone(questions)
    const questionIndex = newQuestion.findIndex(question => question.id === questionId)
    const questionInfo = newQuestion[questionIndex]
    //@ts-ignore
    if(terminosObj[questionInfo.filterType].includes(term)){
      //@ts-ignore
      termFilter = terminosObj[questionInfo.filterType].filter((elemento) => elemento !== term)
    } else {
      //@ts-ignore
      termFilter.push(...terminosObj[questionInfo.filterType], term)
    }
   
    const termFilterArray = termFilter.map((elemento) => {
      return rangosEdades[elemento];
    })

    const obj = {
      [questionInfo.filterType]: (questionInfo.filterType !== 'anyos de cardenal') ? termFilter :termFilterArray
    }
    const setTermsAnyos = (_term:any) => {
      //@ts-ignore
      if(currentTerm.includes(_term)){
        set({
          //@ts-ignore
          currentTerm: currentTerm.filter((elemento) => elemento !== _term)
        })
        
      }else{
        set({
          //@ts-ignore
          currentTerm: [...currentTerm, _term]
        })
      }
   }
   if(questionInfo.filterType === 'anyos de cardenal') {
     setTermsAnyos(term)
   }
    set({
      filterObject: {
        ...filterObject,
        ...obj,
      },
    })

    set({
      terminosObj: {
        ...terminosObj,
        [questionInfo.filterType]: termFilter
      },
      terminos: termFilter, 
    })
  },
  removeFilter: (questionId:number) => {
    const {questions, filterObject} = get()
    
    const newQuestion = structuredClone(questions)
    const questionIndex = newQuestion.findIndex(question => question.id === questionId)
    const questionInfo = newQuestion[questionIndex]

    const category = questionInfo.filterType
    const newFilterObject = structuredClone(filterObject)

    //@ts-ignore
    if(newFilterObject[category].length <= 0) {
      //@ts-ignore
      delete newFilterObject[category]
    }
    set({
      filterObject: newFilterObject
    })
  },
  removeCategory: (category: string) => {
    const {filterObject} = get()
    const newFilterObject = structuredClone(filterObject)
    //@ts-ignore
      //@ts-ignore
      delete newFilterObject[category]


    set({
      filterObject: newFilterObject
    })
    // _setFilter()
  },
  goToQuestion: (question:number) => {
    set({
      currentQuestion: question
    })
  },
  goNextQuestion: () => {
    const {currentQuestion, questions} = get()
    const nextQuestion = currentQuestion + 1
    if(nextQuestion <= questions.length - 1){
      set({currentQuestion: currentQuestion + 1})
    }
  },
  goPreviousQuestion: () => {
    const {currentQuestion} = get()
    const previusQuestion = currentQuestion - 1
    if(previusQuestion >= 0){
      set({currentQuestion: previusQuestion})
    }
  },
}))