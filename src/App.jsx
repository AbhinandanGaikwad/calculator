import Headings from "./components/Headings"
import Display from "./components/Display"
import Button from "./components/Button"
import history_icon from "./assets/history-icon.svg"
import trash_icon from "./assets/trash-icon.svg"
import './App.css'
import { useState, useEffect } from "react" //AI
function App() {
  const [displayValue,setValue] = useState('')

  const [history, setHistory] = useState(() =>{
    const saved = localStorage.getItem('calculationHistory')
    return saved ? JSON.parse(saved) : []
  })//AI

  useEffect(() =>{
    localStorage.setItem('calculationHistory',JSON.stringify(history))
  },[history])//AI

  const [historyToggle, setHistoryState] = useState(false)

  const appendToDisplay = (inputValue) => {
    setValue(displayValue + inputValue)
  }

  const clearDisplay = () => setValue('')

  const erase = () => setValue(displayValue.slice(0,-1))

  const clearHistory = () => {
    setHistory([]);
  }//AI

  const calculate = () => {
    if(!displayValue) return //AI
    try {
      const result = Function(`"use strict"; return (${displayValue})`)();
      const calculationHistory = `${displayValue} = ${result}`
      setValue(result)
      setHistory([...history,calculationHistory])
    }catch {
      setValue("Error")
    }
  }

  const toggleHistoryClass = () =>{
    setHistoryState(!historyToggle)
  }

  return(
    <>
    <div className="main-wrapper" >
      <div className = "calci-info">
        <Headings/>
      </div>
      <div className = "calculator">
        <Display calculatorinput={displayValue}/>
        <div className = "keys">
          <Button label = {'AC'} button_class = {'special-buttons'} whatitdoes={() => clearDisplay()}/>
          <Button label = {'%'} button_class = {'special-buttons'} whatitdoes={() => appendToDisplay('%')} />
          <Button label = {'DEL'} button_class = {'special-buttons'} whatitdoes={() => erase()}/>
          <Button label = {'/'} button_class = {'special-buttons'} whatitdoes={() => appendToDisplay('/')} />
          <Button label = {'7'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('7')} />
          <Button label = {'8'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('8')} />
          <Button label = {'9'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('9')} />
          <Button label = {'*'} button_class = {'special-buttons'} whatitdoes={() => appendToDisplay('*')} />
          <Button label = {'4'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('4')} />
          <Button label = {'5'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('5')} />
          <Button label = {'6'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('6')} />
          <Button label = {'-'} button_class = {'special-buttons'} whatitdoes={() => appendToDisplay('-')} />
          <Button label = {'1'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('1')} />
          <Button label = {'2'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('2')} />
          <Button label = {'3'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('3')} />
          <Button label = {'+'} button_class = {'special-buttons'} whatitdoes={() => appendToDisplay('+')} />
          <Button label = {<img src = {history_icon}></img>} button_class = {'normal-buttons'} whatitdoes={toggleHistoryClass}/>
          <Button label = {'0'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('0')} />
          <Button label = {'.'} button_class = {'normal-buttons'} whatitdoes={() => appendToDisplay('.')} />
          <Button label = {'='} button_class = {'equals-button'} whatitdoes = {() => calculate()}/>
        </div>
      </div>

      <div className={`history-toggled-off ${historyToggle ? 'history-toggled-on':''}`}>
        <h3>History <img src = {trash_icon} onClick={clearHistory}></img></h3>
        <ul id = "container">
          {history.map((item,index) => (
            <li key = {index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App
