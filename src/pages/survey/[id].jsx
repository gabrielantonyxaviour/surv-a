import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import Router from 'next/router'
import { UserContext } from '../../lib/UserContext'
import Loading from '../../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Form } from '@quillforms/renderer-core'
import '@quillforms/renderer-core/build-style/style.css'
import { registerCoreBlocks } from '@quillforms/react-renderer-utils'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
registerCoreBlocks()
import axios from 'axios'
import { supabase } from '@/helpers/supabase'
import PrivateRoute from '@/routes/PrivateRoute'

export default function view() {
  // const [user] = useContext(UserContext)
  // const [user, setUser] = useState({ loading: true })
  // const [status, setStatus] = useState('Loading...')
  // const [community, setCommunity] = useState({ loading: true })
  // const supabase = useSupabaseClient()
  const [blocks, setBlocks] = useState([])
  const [data, setData] = useState()
  const [authUser, setAuthUser] = useState()
  // const supaUser = useUser()
  const [location, setLocation] = useState(null)

  // useEffect(() => {
  //   setStatus('')
  //   setAuthUser(supaUser)

  //   fetchQuestions()
  // }, [user])

  useEffect(() => {
    // setStatus('')
    fetchQuestions()
  }, [])

  const handleData = async (data) => {
    // e.preventDefault()
    const user_id = (await supabase.auth.getUser()).data.user.id
    const survey_id = window.location.href.split('/')[4]
    const res = await axios.get('https://ipapi.co/json')
    // console.log(res.data)
    const location = res.data.country_name
    // console.log(location)
    // console.log(data)
    data = data.answers
    const answers = Object.keys(data).map((key) => {
      let answer
      if (data[key].blockName == 'short-text') {
        answer = data[key].value
      } else {
        answer = data[key].value[0]
      }
      return {
        user_id: user_id,
        question_id: key,
        answer: answer,
        response_country: location,
      }
    })
    // console.log(questions)
    const { data: response, error } = await supabase
      .from('answers')
      .insert(answers)
      .select()
    console.log(response)
    if (error) {
      console.log(error)
    }
    // Router.push('/dashboard')
  }

  const fetchQuestions = async () => {
    const survey_id = window.location.href.split('/')[4]
    const { data: questions } = await supabase
      .from('survey')
      .select(
        `
      id,
      survey_title,
      questions (
        id,
        question,
        question_type,
        options (
          id,
          option
        )
      )
      `
      )
      .eq('id', survey_id)

    const blocks = questions[0].questions.map((question) => {
      if (question.question_type === 'short-text') {
        return {
          name: 'short-text',
          id: question.id,
          attributes: {
            required: true,
            placeholder: '',
            label: question.question,
          },
        }
      } else if (question.question_type === 'multiple-choice') {
        return {
          name: 'multiple-choice',
          id: question.id,
          attributes: {
            required: true,
            multiple: false,
            verticalAlign: false,
            label: question.question,
            choices: question.options.map((option) => {
              return {
                label: option.option,
                value: option.option,
              }
            }),
          },
        }
      } else if (question.question_type === 'long-text') {
        return {
          name: 'long-text',
          id: question.id,
          attributes: {
            required: true,
            placeholder: '',
            label: question.question,
          },
        }
      }
    })
    // console.log(blocks)
    setBlocks(blocks)
  }

  return (
    <>
      <PrivateRoute>
        <div style={{ width: '100%', height: '100vh' }}>
          <Form
            formId="1"
            formObj={{
              blocks: blocks,
              settings: {
                animationDirection: 'horizontal',
                disableWheelSwiping: false,
                disableNavigationArrows: false,
                disableProgressBar: false,
              },
              theme: {
                font: 'Manrope',
                buttonsBgColor: '#6366F1',
                logo: {
                  src: '',
                },
                questionsColor: '#000',
                answersColor: '#312E81',
                buttonsFontColor: '#fff',
                buttonsBorderRadius: 25,
                errorsFontColor: '#fff',
                errorsBgColor: '#f00',
                progressBarFillColor: '#6366F1',
                progressBarBgColor: '#ccc',
              },
            }}
            onSubmit={(data, { completeForm, setIsSubmitting }) => {
              handleData(data)
            }}
          />
        </div>
      </PrivateRoute>
      {/* {status != '' && (
        <div className="absolute bottom-4 right-8 rounded-xl bg-indigo-500 p-4 font-semibold text-white">
          <p>
            <FontAwesomeIcon icon={faSpinner} spin /> &nbsp;
            {status}
          </p>
        </div>
      )} */}
    </>
  )
}
