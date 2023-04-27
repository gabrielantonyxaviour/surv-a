import Header from '@/components/app/AppHeader'
import Head from 'next/head'
import React, { useState } from 'react'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function create() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [viewOptions, setViewOptions] = useState(0)
  return (
    <>
      <Head>
        <title>Your Surveys - TaxPal</title>
      </Head>
      <div className="mx-auto flex max-w-[1290px]">
        <Header />
        <main
          className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
          style={{ height: `calc(100vh - 40px)` }}
        >
          <div className="grow">
            <h1 className="ml-2 text-2xl font-bold text-indigo-900">
              Survey Builder
            </h1>
            <p className=" text-md  ml-2 font-medium text-black">
              Click the + icon to create questions!
            </p>
            {questions.map((e, index) => {
              return e.name == 'short-text' || e.name == 'long-text' ? (
                <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  {/* Input box for question */}
                  <div className="w-full">
                    <h2 className="ml-2 font-semibold">
                      {e.id} |{' '}
                      {e.name == 'short-text' ? 'Short Text' : 'Long Text'}{' '}
                      Question
                    </h2>
                    <input
                      type="text"
                      placeholder="Enter your question here"
                      value={e.value}
                      onChange={(event) => {
                        const updatedArray = questions.map((item) => {
                          if (item.id == questions[index].id)
                            return { ...item, value: event.target.value }
                          else return item
                        })
                        setQuestions(updatedArray)
                      }}
                      className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      className="rounded-xl bg-[#D22B2B] px-4 py-2 text-white"
                      onClick={() => {
                        const newQuestions = [...questions]
                        newQuestions.splice(index, 1)
                        setQuestions(newQuestions)
                        setViewOptions(0)
                        setCurrentQuestion(null)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ) : e.name == 'multiple-choice' ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  <div className="w-full">
                    <h2 className="ml-2 font-semibold">
                      Multiple Choice Question
                    </h2>
                    <input
                      type="text"
                      placeholder="Enter your question here"
                      value={e.value}
                      className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                      onChange={(event) => {
                        const updatedArray = questions.map((item) => {
                          if (item.id == questions[index].id)
                            return { ...item, value: event.target.value }
                          else return item
                        })
                        setQuestions(updatedArray)
                      }}
                    />
                    <h2 className="ml-2 font-semibold">Options</h2>
                    <div className="grid grid-cols-3 gap-4">
                      {e.options != null &&
                        e.options?.map((op, index) => {
                          return (
                            <input
                              type="text"
                              placeholder={'Option' + (index + 1)}
                              value={op.value}
                              className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                              onChange={(event) => {
                                const updatedOptions = [...e.options]
                                updatedOptions[index] = event.target.value
                                const updatedArray = questions.map((item) => {
                                  if (item.id == questions[index].id)
                                    return {
                                      ...item,
                                      options: updatedOptions,
                                    }
                                  else return item
                                })
                                setQuestions(updatedArray)
                              }}
                            />
                          )
                        })}
                      <button
                        className="my-3  rounded-xl bg-[#50C878] px-4 py-2 text-white"
                        onClick={() => {
                          const updatedOptions = [...e.options]
                          updatedOptions.push('')
                          const updatedArray = questions.map((item) => {
                            if (item.id == questions[index].id)
                              return { ...item, options: updatedOptions }
                            else return item
                          })
                          setQuestions(updatedArray)
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex w-full justify-end">
                    <button
                      className="rounded-xl bg-[#D22B2B] px-4 py-2 text-white"
                      onClick={() => {
                        const newQuestions = [...questions]
                        newQuestions.splice(index, 1)
                        setQuestions(newQuestions)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )
            })}
            {currentQuestion != null && (
              <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-gray-500 p-5 text-white">
                {/* Input box for question */}
                <div className="w-full">
                  <h2 className="ml-2 font-semibold">Question</h2>
                  <input
                    type="text"
                    placeholder="Enter your question here"
                    value={currentQuestion.value}
                    className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                    onChange={(e) => {
                      setCurrentQuestion({
                        ...currentQuestion,
                        value: e.target.value,
                      })
                      console.log(currentQuestion)
                    }}
                  />
                </div>
                <div className="flex w-full justify-end">
                  <button
                    className="mx-2 rounded-xl bg-[#50C878] px-4 py-2 text-white"
                    onClick={() => {
                      const existingQuestions = [...questions]
                      existingQuestions.push(currentQuestion)
                      console.log(existingQuestions)
                      setQuestions(existingQuestions)
                      setCurrentQuestion(null)
                      setViewOptions(0)
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className="mx-2 rounded-xl bg-[#D22B2B] px-4 py-2 text-white"
                    onClick={() => {
                      setCurrentQuestion(null)
                      setViewOptions(0)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            )}
            {viewOptions == 1 ? (
              <div className="mr-4 flex justify-around gap-4">
                <button
                  className=" mt-8  grow  rounded-xl bg-gray-500 px-4 py-2 text-white"
                  onClick={() => {
                    setCurrentQuestion({
                      name: 'short-text',
                      id: questions.length + 1,
                    })
                    setViewOptions(2)
                  }}
                >
                  Short Text Answer
                </button>
                <button
                  className="mt-8 grow rounded-xl bg-gray-500 px-4 py-2 text-white"
                  onClick={() => {
                    setCurrentQuestion({
                      name: 'long-text',
                      id: questions.length + 1,
                    })
                    setViewOptions(3)
                  }}
                >
                  Long Text Answer
                </button>
                <button
                  className="mt-8 grow rounded-xl bg-gray-500 px-4 py-2 text-white"
                  onClick={() => {
                    setCurrentQuestion({
                      name: 'multiple-choice',
                      id: questions.length + 1,
                      options: [],
                    })
                    setViewOptions(4)
                  }}
                >
                  Options Answer
                </button>
              </div>
            ) : viewOptions == 2 || viewOptions == 3 ? (
              <></>
            ) : viewOptions == 4 ? (
              <></>
            ) : (
              <div className="flex justify-center">
                <button
                  className="mt-8  rounded-xl bg-indigo-500 px-4 py-2 text-white"
                  onClick={() => {
                    setViewOptions(1)
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
