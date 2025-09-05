import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, Wrench, Zap } from 'lucide-react'
import Button from './Button'
import Input from './Input'
import Card from './Card'

const AgentChat = ({ 
  variant = 'withTools',
  className = '',
  onSendMessage,
  messages = [],
  isLoading = false,
  tools = [],
  placeholder = 'Type your message...'
}) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const variants = {
    withTools: {
      container: 'flex flex-col h-96 border border-border rounded-lg bg-surface',
      header: 'p-4 border-b border-border bg-accent/5',
      messages: 'flex-1 overflow-y-auto p-4 space-y-4',
      input: 'p-4 border-t border-border'
    },
    compact: {
      container: 'flex flex-col h-64 border border-border rounded-md bg-surface',
      header: 'p-3 border-b border-border bg-accent/5',
      messages: 'flex-1 overflow-y-auto p-3 space-y-3',
      input: 'p-3 border-t border-border'
    }
  }

  const currentVariant = variants[variant]

  const MessageBubble = ({ message, isUser }) => (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary text-white' : 'bg-accent text-primary'
        }`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        <div className={`px-3 py-2 rounded-lg ${
          isUser 
            ? 'bg-primary text-white' 
            : 'bg-accent/10 text-foreground border border-border'
        }`}>
          <p className="text-sm">{message.content}</p>
          {message.timestamp && (
            <p className={`text-xs mt-1 ${isUser ? 'text-white/70' : 'text-muted'}`}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  const ToolCard = ({ tool }) => (
    <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Wrench size={16} className="text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-foreground">{tool.name}</h4>
          <p className="text-xs text-muted">{tool.description}</p>
        </div>
        {tool.isActive && (
          <Zap size={14} className="text-success" />
        )}
      </div>
    </Card>
  )

  return (
    <div className={`${currentVariant.container} ${className}`}>
      {/* Header */}
      <div className={currentVariant.header}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">AI Assistant</h3>
          </div>
          {variant === 'withTools' && tools.length > 0 && (
            <div className="flex items-center space-x-1">
              <Wrench size={16} className="text-muted" />
              <span className="text-sm text-muted">{tools.length} tools</span>
            </div>
          )}
        </div>
      </div>

      {/* Tools Section (only for withTools variant) */}
      {variant === 'withTools' && tools.length > 0 && (
        <div className="p-4 border-b border-border bg-accent/5">
          <h4 className="text-sm font-medium text-foreground mb-2">Available Tools</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className={currentVariant.messages}>
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted">
            <div className="text-center">
              <Bot size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start a conversation with the AI assistant</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble 
              key={index} 
              message={message} 
              isUser={message.role === 'user'} 
            />
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="px-3 py-2 rounded-lg bg-accent/10 border border-border">
                <div className="flex items-center space-x-2">
                  <Loader size={16} className="animate-spin text-primary" />
                  <span className="text-sm text-muted">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={currentVariant.input}>
        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="px-3"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AgentChat
