import React, {useState, useEffect} from "react";
import Display from './components/Display';
import Button from "./components/Button";

function App() {
  const [text, setText] = useState('0') 
  const [calc, setCalc] = useState([])
  const [dotDisabled, setDotDisabled] = useState(false)
  const [equalDisabled, setEqualDisabled] = useState(false)
  const [calcSign, setCalcSign] = useState('')
  
  useEffect(() => {
    if (calc[calc.length -1] === "=") {
      setText(calcReduce(calc))}
    }, [calc]);
    
    useEffect (() => {
      if (text.length === 0) setText('0')
    }, [text])
    
  function calcReduce(arr1) {
    let answer = 0 
    let arr = arr1.slice(0)
    while (arr.length > 2) {
      if (arr[1] === '/') answer = arr[0] / arr[2]
      if (arr[1] === 'x') answer = arr[0] * arr[2]
      if (arr[1] === '+') answer = Number(arr[0]) + Number(arr[2]) 
      if (arr[1] === '-') answer = arr[0] - arr[2]
      arr.splice(0, 3, answer)
    } return answer
  }
  
  function calculation (sign) {
    if (text === '-') {setText('0')}
    if (equalDisabled) {
      setCalc(text)
      setEqualDisabled(false)
      console.log(text)
    }
    (function () {
      setCalcSign(sign) 
      if (!calcSign) {
        setCalc([...calc, text, sign])
          setText('0') 
          if (dotDisabled) setDotDisabled(!dotDisabled)
        } else {
          let arr2 = calc
          arr2[arr2.length-1] = sign
          setCalc(arr2)} 
     }());
    } 
  
  function equal() { 
    setCalc([...calc, text, '=']) 
    setEqualDisabled(!equalDisabled)
  }
  
  const addNumber = (prop) => {
    let stringText = text.concat(prop)
      if (!text.endsWith('.')) {
        stringText = Number(stringText).toString()
        setText(stringText)
      } else {
        setText(text.concat(prop))
      }
      setCalcSign('')
  }
  
  const addDot = () => {
    if (text.includes('.')) return
    setText(text + '.')
    setDotDisabled(!dotDisabled)
    console.log(dotDisabled);
  }

  const handleDelete = () =>  { setText(text.slice(0,-1))}

  const handleClear = () => {
    setText('0')
    setCalc([])
    setDotDisabled(false)
    setEqualDisabled(false)
  }
  
  return (
    <div className="wrapper">
        <div className="display-wrapper" >
          <Display className="display display-upper" currenttext={calc.join(' ')}/>
          <Display className="display display-lower" currenttext={text} id="display"/>
        </div>

         <div className="grid">
          
          <Button name={'AC'} className="button clearButton" id="clear" onClick={() => handleClear()}/>
          <Button name={'С'} className="button deleteButton" id="delete" onClick={() => handleDelete()} />
          <Button name={'/'} className="button divideButton" id="divide" onClick={() => calculation('/')}/>
          
          <Button name={'7'} className="button" id="seven" onClick={() => addNumber('7')} />
          <Button name={'8'} className="button" id="eight" onClick={() => addNumber('8')} />
          <Button name={'9'} className="button" id="nine" onClick={() => addNumber('9')} />
          <Button name={'x'} className="button" id="multiply" onClick={() => calculation('x')} />

          <Button name={'4'} className="button" id="four" onClick={() => addNumber('4')} />
          <Button name={'5'} className="button" id="five" onClick={() => addNumber('5')} />
          <Button name={'6'} className="button" id="six" onClick={() => addNumber('6')} />
          <Button name={'-'} className="button" id="subtract" onClick={() =>  text === '0' ? setText('-') : calculation('-')} />

          <Button name={'1'} className="button" id="one" onClick={() => addNumber('1')} />
          <Button name={'2'} className="button" id="two" onClick={() => addNumber('2')} />
          <Button name={'3'} className="button" id="three" onClick={() => addNumber('3')} />
          <Button name={'+'} className="button" id="add" onClick={() => calculation('+')} />

          <Button name={'.'} className="button dotButton" id="decimal" onClick={() => addDot()} disabled={dotDisabled}/>
          <Button name={'0'} className="button zeroButton" id="zero" onClick={() => addNumber('0')}/>
          <Button name={'='} className="button equalButton" id="equals" onClick={equal} disabled={equalDisabled} />
        
        </div>
      </div>
    )
}

export default App