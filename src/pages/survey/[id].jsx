
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
registerCoreBlocks()
export default function view() {
  // const [user] = useContext(UserContext)
  const [user, setUser] = useState({ loading: true })
  const [status, setStatus] = useState('Loading...')
  const [community, setCommunity] = useState({ loading: true })
  const [location, setLocation] = useState(null)

  useEffect(() => {
    getCountry()
  }, [])


  const getCountry = async () => {
    try {
      const res = await axios.get('https://ipapi.co/json')
      setLocation(res.data.country_name)
    } catch {
      setLocation('Unknown')
    }
  }


  const imageHandler = async (quill) => {
    const input = document.createElement('input')

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files[0]
      const formData = new FormData()

      formData.append('image', file)

      // Save current cursor state
      const range = quill.getSelection(true)

      // Insert temporary loading placeholder image
      quill.insertEmbed(
        range.index,
        'image',
        `${window.location.origin}/images/loaders/placeholder.gif`
      )

      // Move cursor to right side of image (easier to continue typing)
      quill.setSelection(range.index + 1)

      const res = await apiPostNewsImage(formData) // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      quill.deleteText(range.index, 1)

      // Insert uploaded image
      quill.insertEmbed(range.index, 'image', res.body.image)
    }
  }
  useEffect(() => {
    setStatus('')

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
  }, [user])

  return (
    <>
      {user?.loading ? (
        <Loading
          onComplete={() => {
            setUser({ loading: false })
          }}
        />
      ) : (
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
                    label: 'Great, what is the name of the community you lead?',
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
                    label: 'Tell us what {{field:orgname}} is in one sentence:',
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
