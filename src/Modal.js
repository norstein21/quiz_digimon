import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {isModalOpen,closeModal, betul, questions} = useGlobalContext()

  const nilai = ((betul / questions.length) * 100).toFixed(0)

  return (
    <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'} `}>
      <div className='modal-content'>
        <h2>Congrats!</h2>
        {nilai === 100 ? <p>amazing, you answered all of questions correctly</p>: <p>You answered {nilai}% of questions correctly</p>}
        <button className='close-btn' onClick={()=>closeModal()}>
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal
