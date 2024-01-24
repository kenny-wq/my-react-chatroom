import React from 'react'
import Input from './Input'
import ChatWindow from './ChatWindow'

const ChatPanel = () => {
  return (
    <div className='chatpanel'>
      <ChatWindow/>
      <Input/>
    </div>
  )
}

export default ChatPanel