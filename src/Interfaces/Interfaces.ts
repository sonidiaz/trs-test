

import { type Question as QuestionType } from '../Interfaces/Interfaces';
export interface ListCmp {
  id: string;
  cmp?:  React.FC<Props>,
  props?: any
}
export interface Props {
  isMobile: any
}
export interface Question {
  id: number;
  question: string;
  answers: string[];
  filterType:string;
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}

export interface State {
  questions: QuestionType[];
  currentQuestion: number;
  cardenales:[],
  cardenalesFiltered:[],
  currentTerm:[],
  terminos:[],
  terminosObj: {},
  filterObject: {},
  filterType:string,
  resetGame: ()=> void,
  fetchDataList: () => void
  fetchQuestions: (limit:number, grupo:string) => Promise<void>
  selectedAnswer: (questionId:number, answerIndex: number, value:string) => void
  goNextQuestion: () => void,
  goPreviousQuestion: () => void,
  removeFilter: (questionId:number) => void,
  removeCategory: (category:string) => void,
  _setFilter: () => void
}