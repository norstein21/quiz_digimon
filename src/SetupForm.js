import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {quiz,handleChange, handleSubmit, error} = useGlobalContext()

  return (
    <main>
      <section className='quiz quiz-small'>
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>Setup Quiz</h2>
          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input 
            type='number'
            name='amount'
            id='amount'
            value={quiz.amount}
            className='form-input'
            onChange={handleChange}
            min={1}
            max={50}
            />
            
          </div>
          {/* category */}
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select 
            name='category' 
            id='category' 
            className='form-input'
            value={quiz.category}
            onChange={handleChange}
            >
              <option value='sports'>Sports</option>
              <option value='politics'>Politics</option>
              <option value='mythology'>Mythology</option>
            </select>
          </div>
          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select 
            name="difficulty"
            id="difficulty"
            className='form-input'
            value={quiz.difficulty}
            onChange={handleChange}
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          {error && (
              <p className="error">
                can't generate questions, please try different options
              </p>
            )}
          <button className='submit-btn'>Start</button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm
