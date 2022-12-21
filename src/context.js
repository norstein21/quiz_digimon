import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  mythology:20,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''

const tempUrl = 'https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting,setWaiting] = useState(true)
  const [loading,setLoading] = useState(false)
  const [questions,setQuestions] = useState([])
  const [index,setIndex] = useState(0)
  const [betul,setBetul] = useState(0)
  const [error,setError] = useState(false)
  const [quiz,setQuiz] = useState({
    amount:5,category:'sports',difficulty:'easy'
  })

  const [isModalOpen,setIsModalOpen] = useState(false)

  

  const fetchQuestion = async (url)=>{
    setWaiting(false)
    setLoading(true)
    const response = await axios(url).catch((err)=>console.log(err))
    if(response){
      console.log('get from if',response)
      const data = response.data.results
      if(data.length > 0){
        setQuestions(data)
        setLoading(false)
        setError(false)
      }
      else{
        setWaiting(true)
        setError(true)
      }
    }
    else{
      setWaiting(true)
    }
  } 

  const nextQuestion = ()=>{
    setIndex((oldIndex)=>{
      const index = oldIndex + 1
      if(index > questions.length - 1){
        // open modal
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const checkAnswer = (jawaban) =>{
    if(jawaban){
      setBetul((oldValue)=> oldValue + 1)
    }
    nextQuestion()
  }

  const openModal = () =>{
    setIsModalOpen(true)
  }

  const closeModal = () =>{
    setWaiting(true)
    setBetul(0)
    setIsModalOpen(false)
  }

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setQuiz({...quiz,[name]:value})
    console.log(e)
  }

  const handleSubmit = (e) =>{
    const {amount, category, difficulty} = quiz;
    e.preventDefault()

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    fetchQuestion(url)
  }

  return <AppContext.Provider 
  value=
  {{waiting,loading,questions,index,betul,error,isModalOpen,nextQuestion,checkAnswer,closeModal,handleChange,handleSubmit,quiz}}
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
