import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { UserContext } from '../../lib/UserContext'
import Loading from '../../components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Form } from '@quillforms/renderer-core'
import '@quillforms/renderer-core/build-style/style.css'
import { registerCoreBlocks } from '@quillforms/react-renderer-utils'
<<<<<<< HEAD
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
=======
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Header from '@/components/app/AppHeader'

>>>>>>> 930a77f5d78780ca731a8564c4479a07fe7b4dee
registerCoreBlocks()
import axios from 'axios'

export default function view() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const supabase = useSupabaseClient()
  const session = useSession()
  const [surveyId, setSurveyId] = useState('')
  const [survey, setSurvey] = useState({
    title: 'Work from home',
    questions: [
      {
        name: 'short-text',
        value: 'Describe your WFH Experience in short',
        answer: 'It was really so crazy!',
      },
      {
        name: 'long-text',
        value: 'Describe your WFH Experience in detail',
        answer:
          'It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!It was really so crazy!',
      },
      {
        name: 'mulitple-choice',
        value: 'Choose the time you worked the most',
        answer:
          '9:00 to 12:009:00 to 12:009:00 to 12:009:00 to 12:009:00 to 12:009:00 to 12:00',
      },
    ],
  })

  const [user, setUser] = useState({ loading: true })
  const [status, setStatus] = useState('Loading...')
  const [community, setCommunity] = useState({ loading: true })
  const supabase = useSupabaseClient()
  const [blocks, setBlocks] = useState([])
  const [data, setData] = useState()
  const [authUser, setAuthUser] = useState()
  const supaUser = useUser()
  const [location, setLocation] = useState(null)


  // const imageHandler = async (quill) => {
  //   const input = document.createElement('input')

  //   input.setAttribute('type', 'file')
  //   input.setAttribute('accept', 'image/*')
  //   input.click()

  //   input.onchange = async () => {
  //     const file = input.files[0]
  //     const formData = new FormData()

  //     formData.append('image', file)

  //     // Save current cursor state
  //     const range = quill.getSelection(true)

  //     // Insert temporary loading placeholder image
  //     quill.insertEmbed(
  //       range.index,
  //       'image',
  //       `${window.location.origin}/images/loaders/placeholder.gif`
  //     )

  //     // Move cursor to right side of image (easier to continue typing)
  //     quill.setSelection(range.index + 1)

  //     const res = await apiPostNewsImage(formData) // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

  //     // Remove placeholder image
  //     quill.deleteText(range.index, 1)

  //     // Insert uploaded image
  //     quill.insertEmbed(range.index, 'image', res.body.image)
  //   }
  // }

  // [{
  //   name: 'short-text',
  //   id: 'orgname',
  //   attributes: {
  //     required: true,
  //     placeholder: '',
  //     label: 'Great, what is the name of the community you lead?',
  //   },
  // },
  // {
  //   name: 'multiple-choice',
  //   id: 'orgtype',
  //   attributes: {
  //     required: true,
  //     multiple: false,
  //     verticalAlign: false,
  //     label:
  //       'Select the category that best fits {{field:orgname}}:',
  //     choices: [
  //       {
  //         label: 'Company',
  //         value: 'company',
  //       },
  //       {
  //         label: 'School',
  //         value: 'school',
  //       },
  //       {
  //         label: 'DAO',
  //         value: 'dao',
  //       },
  //       {
  //         label: 'Club',
  //         value: 'club',
  //       },
  //       {
  //         label: 'Online community',
  //         value: 'online community',
  //       },
  //       {
  //         label: 'Other',
  //         value: 'other',
  //       },
  //     ],
  //   },
  // }]

  useEffect(() => {
    setStatus('')
    setAuthUser(supaUser)
    // if (user?.email) {
    //   //Router.push('/profile')
    //   const checkEmail = async () => {
    //     const email = user.email
    //     const checkEma ilRes = await fetch('/api/findCommunityByEmail', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ email }),
    //     })
    //     const checkEmailData = await checkEmailRes.json()

    //     // Redirect to the dashboard if the email exists, otherwise continue to profile
    //     if (checkEmailData.objects && checkEmailData.objects.length > 0) {
    //       Router.push('/dashboard')
    //     } else {
    //       Router.push('/profile')
    //     }
    //   }
    //   checkEmail()
    // }
    fetchQuestions()
  }, [user])



  const handleData = async (data) => {
    // e.preventDefault()
    const survey_id = window.location.href.split('/')[4]
    const res = await axios.get('https://ipapi.co/json')
    // console.log(res.data)
    const location = res.data.country_name
    console.log(location)
    // console.log(data)
    data = data.answers
    const answers = Object.keys(data).map((key) => {
      let answer;
      if (data[key].blockName == 'short-text') {
        answer = data[key].value
      } else {
        answer = data[key].value[0]
      }
      return {
        user_id: authUser.id,
        question_id: key,
        answer: answer,
        response_country: location,
      }
    })
    // console.log(questions)
    const { data: response } = await supabase.from('answers').insert(answers).select()
    console.log(response)
    Router.push('/dashboard')
  }

  const fetchQuestions = async () => {
    const survey_id = window.location.href.split('/')[4]
    const { data: questions } = await supabase.from('survey').select(`
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
      `).eq('id', survey_id)
    // console.log(survey_id)
    // console.log(questions)
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
      {survey == '' ? (
        <>
          <Head>
            <title>SURV-A 📝</title>
          </Head>
          <div style={{ width: '100%', height: '100vh' }}>
            <Form
              formId="1"
              formObj={{
                blocks: [
                  {
                    name: 'short-text',
                    id: 'firstname',
                    attributes: {
                      required: true,
                      placeholder: '',
                      label: "Let's start with your first name",
                    },
                  },

                  {
                    name: 'short-text',
                    id: 'lastname',
                    attributes: {
                      required: true,
                      placeholder: '',
                      label: "Hey {{field:firstname}}! What's your last name?",
                    },
                  },
                  {
                    name: 'short-text',
                    id: 'orgname',
                    attributes: {
                      required: true,
                      placeholder: '',
                      label:
                        'Great, what is the name of the community you lead?',
                    },
                  },
                  {
                    name: 'multiple-choice',
                    id: 'orgtype',
                    attributes: {
                      required: true,
                      multiple: false,
                      verticalAlign: false,
                      label:
                        'Select the category that best fits {{field:orgname}}:',
                      choices: [
                        {
                          label: 'Company',
                          value: 'company',
                        },
                        {
                          label: 'School',
                          value: 'school',
                        },
                        {
                          label: 'DAO',
                          value: 'dao',
                        },
                        {
                          label: 'Club',
                          value: 'club',
                        },
                        {
                          label: 'Online community',
                          value: 'online community',
                        },
                        {
                          label: 'Other',
                          value: 'other',
                        },
                      ],
                    },
                  },

                  {
                    name: 'long-text',
                    id: 'oneliner',
                    attributes: {
                      required: true,
                      placeholder:
                        'A community of 1000+ founders building the future of web3',
                      label:
                        'Tell us what {{field:orgname}} is in one sentence:',
                    },
                  },
                  {
                    name: 'short-text',
                    id: 'color',
                    attributes: {
                      required: true,
                      placeholder: '#312E81',
                      label:
                        'What is the best color to represent {{field:orgname}}? Use the HEX color code',
                    },
                  },
                  {
                    id: 'addadmins',
                    name: 'group',
                    attributes: {
                      description:
                        'Any email you enter below will gain access to the admin role.',
                      label: 'Invite other admins',
                    },
                    innerBlocks: [
                      {
                        id: 'owner2',
                        name: 'email',
                        attributes: {
                          label: '',
                          required: false,
                          placeholder: 'charles@gotpomp.com',
                        },
                      },
                      {
                        id: 'owner3',
                        name: 'email',
                        attributes: {
                          label: '',
                          required: false,
                          placeholder: 'miya@gotpomp.com',
                        },
                      },
                      {
                        id: 'owner4',
                        name: 'email',
                        attributes: {
                          label: '',
                          required: false,
                          placeholder: 'liam@gotpomp.com',
                        },
                      },
                    ],
                  },
                  {
                    id: 'allowedtoaddmembers',
                    name: 'multiple-choice',
                    attributes: {
                      required: true,
                      multiple: false,
                      verticalAlign: true,
                      label: 'Who is allowed to add and remove members?',
                      choices: [
                        {
                          label: 'All admin users',
                          value: 'all',
                        },
                        {
                          label: 'Myself only',
                          value: 'myself',
                        },
                        {
                          label: 'Set up custom rules later',
                          value: 'custom',
                        },
                      ],
                    },
                  },
                  {
                    id: 'allowedtoaddadmin',
                    name: 'multiple-choice',
                    attributes: {
                      required: true,
                      multiple: false,
                      verticalAlign: true,
                      label:
                        'How will new admin users be added or removed after account set-up?',
                      choices: [
                        {
                          label: 'Receive majority approval from admin users',
                          value: 'majoritybyadmin',
                        },
                        {
                          label: 'Only decided by me',
                          value: 'myself',
                        },
                        {
                          label: 'Set up custom rules later',
                          value: 'custom',
                        },
                      ],
                    },
                  },
                  {
                    id: 'feedback',
                    name: 'short-text',
                    attributes: {
                      required: false,
                      placeholder: 'How excited are you for POMPoarding?',
                      label: "🎉 Great, you're all set! ",
                      description:
                        "Click submit and we'll work on creating {{field:orgname}}'s community dashboard ✨",
                      buttonText: 'Submit',
                    },
                  },
                ],
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
                setTimeout(() => {
                  setIsSubmitting(true)
                  var answers = data.answers
                  Object.entries(answers).forEach(([key, value]) => {
                    setCommunity((prevAnswers) => ({
                      ...prevAnswers,
                      [key]: value.value,
                    }))
                  })
                  Router.push('/dashboard')
                }, 500)
              }}
            />
          </div>
        </>
      ) : (
<<<<<<< HEAD
        <div style={{ width: '100%', height: '100vh' }}>
          <Form
            formId="1"
            formObj={{
              // blocks: [
              //   {
              //     name: 'short-text',
              //     id: 'firstname',
              //     attributes: {
              //       required: true,
              //       placeholder: '',
              //       label: "Let's start with your first name",
              //     },
              //   },

              //   {
              //     name: 'short-text',
              //     id: 'lastname',
              //     attributes: {
              //       required: true,
              //       placeholder: '',
              //       label: "Hey {{field:firstname}}! What's your last name?",
              //     },
              //   },
              //   {
              //     name: 'short-text',
              //     id: 'orgname',
              //     attributes: {
              //       required: true,
              //       placeholder: '',
              //       label: 'Great, what is the name of the community you lead?',
              //     },
              //   },
              //   {
              //     name: 'multiple-choice',
              //     id: 'orgtype',
              //     attributes: {
              //       required: true,
              //       multiple: false,
              //       verticalAlign: false,
              //       label:
              //         'Select the category that best fits {{field:orgname}}:',
              //       choices: [
              //         {
              //           label: 'Company',
              //           value: 'company',
              //         },
              //         {
              //           label: 'School',
              //           value: 'school',
              //         },
              //         {
              //           label: 'DAO',
              //           value: 'dao',
              //         },
              //         {
              //           label: 'Club',
              //           value: 'club',
              //         },
              //         {
              //           label: 'Online community',
              //           value: 'online community',
              //         },
              //         {
              //           label: 'Other',
              //           value: 'other',
              //         },
              //       ],
              //     },
              //   },

              //   {
              //     name: 'long-text',
              //     id: 'oneliner',
              //     attributes: {
              //       required: true,
              //       placeholder:
              //         'A community of 1000+ founders building the future of web3',
              //       label: 'Tell us what {{field:orgname}} is in one sentence:',
              //     },
              //   },
              //   {
              //     name: 'short-text',
              //     id: 'color',
              //     attributes: {
              //       required: true,
              //       placeholder: '#312E81',
              //       label:
              //         'What is the best color to represent {{field:orgname}}? Use the HEX color code',
              //     },
              //   },
              //   {
              //     id: 'addadmins',
              //     name: 'group',
              //     attributes: {
              //       description:
              //         'Any email you enter below will gain access to the admin role.',
              //       label: 'Invite other admins',
              //     },
              //     innerBlocks: [
              //       {
              //         id: 'owner2',
              //         name: 'email',
              //         attributes: {
              //           label: '',
              //           required: false,
              //           placeholder: 'charles@gotpomp.com',
              //         },
              //       },
              //       {
              //         id: 'owner3',
              //         name: 'email',
              //         attributes: {
              //           label: '',
              //           required: false,
              //           placeholder: 'miya@gotpomp.com',
              //         },
              //       },
              //       {
              //         id: 'owner4',
              //         name: 'email',
              //         attributes: {
              //           label: '',
              //           required: false,
              //           placeholder: 'liam@gotpomp.com',
              //         },
              //       },
              //     ],
              //   },
              //   {
              //     id: 'allowedtoaddmembers',
              //     name: 'multiple-choice',
              //     attributes: {
              //       required: true,
              //       multiple: false,
              //       verticalAlign: true,
              //       label: 'Who is allowed to add and remove members?',
              //       choices: [
              //         {
              //           label: 'All admin users',
              //           value: 'all',
              //         },
              //         {
              //           label: 'Myself only',
              //           value: 'myself',
              //         },
              //         {
              //           label: 'Set up custom rules later',
              //           value: 'custom',
              //         },
              //       ],
              //     },
              //   },
              //   {
              //     id: 'allowedtoaddadmin',
              //     name: 'multiple-choice',
              //     attributes: {
              //       required: true,
              //       multiple: false,
              //       verticalAlign: true,
              //       label:
              //         'How will new admin users be added or removed after account set-up?',
              //       choices: [
              //         {
              //           label: 'Receive majority approval from admin users',
              //           value: 'majoritybyadmin',
              //         },
              //         {
              //           label: 'Only decided by me',
              //           value: 'myself',
              //         },
              //         {
              //           label: 'Set up custom rules later',
              //           value: 'custom',
              //         },
              //       ],
              //     },
              //   },
              //   {
              //     id: 'feedback',
              //     name: 'short-text',
              //     attributes: {
              //       required: false,
              //       placeholder: 'How excited are you for POMPoarding?',
              //       label: "🎉 Great, you're all set! ",
              //       description:
              //         "Click submit and we'll work on creating {{field:orgname}}'s community dashboard ✨",
              //       buttonText: 'Submit',
              //     },
              //   },
              // ],
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
              // setTimeout(() => {
              //   setIsSubmitting(true)
              //   var answers = data.answers
              //   Object.entries(answers).forEach(([key, value]) => {
              //     setCommunity((prevAnswers) => ({
              //       ...prevAnswers,
              //       [key]: value.value,
              //     }))
              //   })
              //   Router.push('/dashboard')
              // }, 500)
              // setData(data)
              handleData(data)

            }}
          />
        </div>
=======
        <>
          <Head>
            <title>Survey Response - SURV-A</title>
          </Head>
          <div className="mx-auto flex max-w-[1290px]">
            <Header />
            <main
              className="mb-2 ml-8 mt-10 flex h-screen w-[82%] text-black"
              style={{ height: `calc(100vh - 40px)` }}
            >
              <div className="grow">
                <h1 className="ml-2 text-2xl font-bold text-indigo-900">
                  Your Response
                </h1>

                <div className="mr-4 mt-8 flex w-full flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  <h2 className="ml-2  text-2xl font-semibold">
                    {survey.title}
                  </h2>
                </div>
                <div className="mr-4 mt-8 flex flex-col items-center justify-center rounded-xl bg-indigo-500 p-6 text-white">
                  {survey.questions.map((question, index) => {
                    return (
                      <>
                        <div className="w-full">
                          <h2 className="ml-2 mt-4 font-semibold">
                            {question.value}
                          </h2>

                          {question.name == 'short-text' ? (
                            <input
                              type="text"
                              value={question.answer}
                              disabled
                              className="mb-4 mt-2 w-full rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                            />
                          ) : question.name == 'long-text' ? (
                            <textarea
                              disabled
                              class="mb-4 mt-2 w-full resize-none rounded-lg bg-white px-4 py-2 text-indigo-500 focus:outline-none"
                            >
                              {question.answer}
                            </textarea>
                          ) : (
                            <input
                              type="text"
                              className="mt-2 w-[40%] rounded-xl bg-indigo-700 px-4 py-2 text-white"
                              value={question.answer}
                              disabled
                            />
                          )}
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </main>
          </div>
        </>
>>>>>>> 930a77f5d78780ca731a8564c4479a07fe7b4dee
      )}
      {status != '' && (
        <div className="absolute bottom-4 right-8 rounded-xl bg-indigo-500 p-4 font-semibold text-white">
          <p>
            <FontAwesomeIcon icon={faSpinner} spin /> &nbsp;
            {status}
          </p>
        </div>
      )}
    </>
  )
}
