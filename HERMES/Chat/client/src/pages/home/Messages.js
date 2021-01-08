import React, { useEffect, Fragment, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Col, Form } from 'react-bootstrap'

import { useMessageDispatch, useMessageState } from '../../context/message'

import Message from './Message'

const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!){
    sendMessage(to: $to, content: $content){
    uuid from to content createdAt
    }
  }
`

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`

export default function Messages () {
  const { users } = useMessageState()
  const dispatch = useMessageDispatch()
  const [content, setContent] = useState('')

  const selectedUser = users?.find((u) => u.selected === true)
  const messages = selectedUser?.messages
  
  const [getMessages, { loading: messagesLoading, data: messagesData },] = useLazyQuery(GET_MESSAGES)

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => 
      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: {
          username: selectedUser.username,
          message: data.sendMessage
        },
      }),
    onError: (err) => console.log(err),
  })

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } })
    }
  }, [selectedUser])

  useEffect(() => {
      if(messagesData){
          dispatch({ type: 'SET_USER_MESSAGES', payload: { 
              username: selectedUser.username, 
              messages: messagesData.getMessages
          } })
      }
  }, [messagesData])

  const submitMessage = (e) => {
    e.preventDefault()
    if(content.trim() === '' || !selectedUser) return

    setContent('')

    // Mutation for sending the message
    sendMessage({ variables: { to: selectedUser.username, content } })
  }

  let selectedChatMarkup
  if(!messages && !messagesLoading){
    selectedChatMarkup = <p className='info-text'>Selectionnez un contact</p>
  } else if(messagesLoading) {
    selectedChatMarkup = <p className='info-text'>Loading</p>
  } else if(messages.length > 0) {
    selectedChatMarkup = messages.map((message, index) => (
        <Fragment key={message.uuid}>
            <Message message={message} />
            {index === messages.length - 1 && (
                <div className="invisible">
                    <hr  className='m-0'/>
                </div>
            )}
        </Fragment>
    ))
  } else if(messages.length ===0){
    selectedChatMarkup = <p>Vous êtes connecté(e), envoyer un message .. </p>
  }

  return (
    <Col xs={10} md={8}>
      <div className='messages-box d-flex flex-column-reverse'>
        {selectedChatMarkup}
      </div>
      <div>
        <Form onSubmit={submitMessage}>
          <Form.Group className="d-flex align-items-center">
            <Form.Control
              type='formtext'
              className='message-intput rounded-pill p-4 bg-secondary border-0'
              placeholder='Entrer un message ..'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <i className="fas fa-paper-plane fa-2x text-primary ml-2" onClick={submitMessage}> </i>
          </Form.Group>
        </Form>
      </div>
    </Col>
  )
}
