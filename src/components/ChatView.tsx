import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  reactions?: string[];
  replyTo?: number;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  type: 'personal' | 'group' | 'channel';
  online?: boolean;
};

interface ChatViewProps {
  chats: Chat[];
  selectedChat: number | null;
  setSelectedChat: (id: number | null) => void;
  messages: Message[];
  messageText: string;
  setMessageText: (text: string) => void;
  sendMessage: () => void;
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  emojis: string[];
  replyingTo: number | null;
  setReplyingTo: (id: number | null) => void;
  addReaction: (messageId: number, emoji: string) => void;
}

export const ChatView = ({
  chats,
  selectedChat,
  setSelectedChat,
  messages,
  messageText,
  setMessageText,
  sendMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  emojis,
  replyingTo,
  setReplyingTo,
  addReaction,
}: ChatViewProps) => {
  return (
    <>
      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-2xl font-bold mb-4">Speakly</h1>
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-border">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="groups">Группы</TabsTrigger>
            <TabsTrigger value="channels">Каналы</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1">
            <TabsContent value="all" className="mt-0">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-secondary/50 ${
                    selectedChat === chat.id ? 'bg-secondary' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={chat.avatar} />
                        <AvatarFallback>{chat.name[0]}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread && (
                          <Badge className="ml-2 bg-primary">{chat.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="groups" className="mt-0">
              {chats.filter(c => c.type === 'group').map(chat => (
                <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className="p-4 border-b border-border cursor-pointer hover:bg-secondary/50">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold">{chat.name}</span>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="channels" className="mt-0">
              {chats.filter(c => c.type === 'channel').map(chat => (
                <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className="p-4 border-b border-border cursor-pointer hover:bg-secondary/50">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold">{chat.name}</span>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{chats.find(c => c.id === selectedChat)?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{chats.find(c => c.id === selectedChat)?.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {chats.find(c => c.id === selectedChat)?.online ? 'онлайн' : 'был(а) недавно'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon"><Icon name="Phone" size={20} /></Button>
              <Button variant="ghost" size="icon"><Icon name="Video" size={20} /></Button>
              <Button variant="ghost" size="icon"><Icon name="MoreVertical" size={20} /></Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            {messages.map(msg => (
              <div key={msg.id} className={`mb-4 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md group relative ${msg.sender === 'me' ? 'ml-auto' : ''}`}>
                  {msg.replyTo && (
                    <div className="mb-1 px-3 py-1 bg-secondary/50 rounded-lg text-xs text-muted-foreground border-l-2 border-primary">
                      Ответ на: {messages.find(m => m.id === msg.replyTo)?.text.substring(0, 30)}...
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.sender === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                  </div>
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {msg.reactions.map((reaction, idx) => (
                        <span key={idx} className="text-sm bg-secondary px-2 py-0.5 rounded-full">
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setReplyingTo(msg.id)}
                    >
                      <Icon name="Reply" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => addReaction(msg.id, '❤️')}
                    >
                      <Icon name="Heart" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="border-t border-border p-4">
            {replyingTo && (
              <div className="mb-2 px-3 py-2 bg-secondary rounded-lg flex justify-between items-center">
                <span className="text-sm">
                  Ответ на: {messages.find(m => m.id === replyingTo)?.text.substring(0, 40)}...
                </span>
                <Button variant="ghost" size="icon" onClick={() => setReplyingTo(null)}>
                  <Icon name="X" size={16} />
                </Button>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon"><Icon name="Paperclip" size={20} /></Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Icon name="Smile" size={20} />
              </Button>
              <Input
                placeholder="Сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage}><Icon name="Send" size={20} /></Button>
            </div>
            {showEmojiPicker && (
              <div className="mt-2 p-3 bg-secondary rounded-lg">
                <div className="grid grid-cols-10 gap-2">
                  {emojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setMessageText(messageText + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="text-2xl hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-50" />
            <p>Выберите чат, чтобы начать общение</p>
          </div>
        </div>
      )}
    </>
  );
};
