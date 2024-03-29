import React from 'react'
import ReactDOM from 'react-dom/client'
import { ListCmp } from './Interfaces/Interfaces.ts';
import {isMobileQuery} from "./helpers/helper.ts"
import PapaGameContainer from './components/PapaGame/PapaGameContainer.tsx';
import { DoshaSurveysContainer } from './components/DoshaSurveys/DoshaSurveysContainer.tsx';


const CompList:ListCmp[] = [
  {
    id: 'DoshaSurveys',
    cmp: DoshaSurveysContainer,
    props: {}
  }
]

function renderComponentInDiv(Component:any, divId:any, props:any) {
  if(document.getElementById(divId) === null) return 
  const prop = {
    ...props,
    isMobile : isMobileQuery(),
  }
  ReactDOM.createRoot(document.getElementById(divId) as HTMLElement).render(
    <React.StrictMode>
      <Component propRef={divId} {...prop}/>
    </React.StrictMode>,
  )
}

for (let index = 0; index < CompList.length; index++) {
  const element = CompList[index];
  renderComponentInDiv(element.cmp, 'inf-'+(element.id.toLocaleLowerCase()),element.props); 
}

