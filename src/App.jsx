
import './App.css'
import { Forms } from './components/form/Forms'
import { FormFields } from './components/formFields/FormFields'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

 

  return (
    <>
      <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <FormFields />
        </div>

        <div className="col-span-8">
          <Forms />
        </div>
      </div>
      </DndProvider>
    </>
  )
}

export default App
