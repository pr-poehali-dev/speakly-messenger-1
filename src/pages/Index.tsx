import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

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

type Gift = {
  id: number;
  name: string;
  price: number;
  emoji: string;
};

const Index = () => {
  const [activeView, setActiveView] = useState<'chats' | 'profile' | 'shop' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [racoonCoins, setRacoonCoins] = useState(1500);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [myGifts, setMyGifts] = useState<Gift[]>([]);
  const [profileData, setProfileData] = useState({
    name: 'Пользователь',
    username: '@user123',
    bio: 'Привет! Я в Speakly 👋',
    avatar: '',
  });
  const [ghostMode, setGhostMode] = useState(false);

  const emojis = ['😀', '😂', '❤️', '👍', '🔥', '🎉', '😍', '🤔', '👏', '🚀', '💜', '✨', '🎮', '🎵', '⭐', '💎', '🦝', '🎁', '💰', '🌟'];

  const [chats] = useState<Chat[]>([
    { id: 1, name: 'Алиса', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, type: 'personal', online: true },
    { id: 2, name: 'Рабочая группа', avatar: '', lastMessage: 'Встреча в 15:00', time: '13:15', unread: 5, type: 'group' },
    { id: 3, name: 'Новости Speakly', avatar: '', lastMessage: 'Новое обновление!', time: '12:00', type: 'channel' },
    { id: 4, name: 'Борис', avatar: '', lastMessage: 'Отправил подарок 🎁', time: '11:45', type: 'personal', online: false },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', sender: 'other', timestamp: '14:30' },
    { id: 2, text: 'Отлично! Смотрю новый Speakly', sender: 'me', timestamp: '14:31' },
    { id: 3, text: 'Круто! 🚀', sender: 'other', timestamp: '14:32', reactions: ['🔥', '👍'] },
  ]);

  const [gifts] = useState<Gift[]>([
    { id: 1, name: 'Роза', price: 100, emoji: '🌹' },
    { id: 2, name: 'Торт', price: 150, emoji: '🎂' },
    { id: 3, name: 'Звезда', price: 200, emoji: '⭐' },
    { id: 4, name: 'Корона', price: 500, emoji: '👑' },
    { id: 5, name: 'Бриллант', price: 1000, emoji: '💎' },
    { id: 6, name: 'Ракета', price: 250, emoji: '🚀' },
    { id: 7, name: 'Сердце', price: 300, emoji: '💜' },
    { id: 8, name: 'Единорог', price: 800, emoji: '🦄' },
  ]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        replyTo: replyingTo || undefined,
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
      setReplyingTo(null);
    }
  };

  const addReaction = (messageId: number, emoji: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
        : msg
    ));
  };

  const buyGift = (gift: Gift) => {
    if (racoonCoins >= gift.price) {
      setRacoonCoins(racoonCoins - gift.price);
      setMyGifts([...myGifts, gift]);
    }
  };

  const buyRacoonCoins = (amount: number, cost: number) => {
    if (walletBalance >= cost) {
      setWalletBalance(walletBalance - cost);
      setRacoonCoins(racoonCoins + amount);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-6">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center font-bold text-2xl">
            S
          </div>
          
          <nav className="flex-1 flex flex-col gap-4">
            <button
              onClick={() => setActiveView('chats')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeView === 'chats' ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent'
              }`}
            >
              <Icon name="MessageSquare" size={24} />
            </button>
            <button
              onClick={() => setActiveView('profile')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeView === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent'
              }`}
            >
              <Icon name="User" size={24} />
            </button>
            <button
              onClick={() => setActiveView('shop')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeView === 'shop' ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent'
              }`}
            >
              <Icon name="Gift" size={24} />
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeView === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-sidebar-accent'
              }`}
            >
              <Icon name="Settings" size={24} />
            </button>
          </nav>
        </div>

        {/* Main Content */}
        {activeView === 'chats' && (
          <>
            {/* Chat List */}
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

            {/* Chat Window */}
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
        )}

        {activeView === 'profile' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto p-8">
              <h1 className="text-3xl font-bold mb-8">Профиль</h1>
              
              <div className="bg-card rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-6 mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-3xl">{profileData.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-muted-foreground">{profileData.username}</p>
                  </div>
                  <Button>
                    <Icon name="Edit" size={18} className="mr-2" />
                    Редактировать
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">О себе</Label>
                    <p className="mt-1">{profileData.bio}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-secondary rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          🦝
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Енотики</p>
                          <p className="text-2xl font-bold">{racoonCoins}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          💰
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Кошелёк</p>
                          <p className="text-2xl font-bold">{walletBalance} ₽</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Мои подарки ({myGifts.length})</h3>
                {myGifts.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
                    {myGifts.map((gift, idx) => (
                      <div key={idx} className="bg-secondary rounded-xl p-4 text-center">
                        <div className="text-4xl mb-2">{gift.emoji}</div>
                        <p className="text-sm">{gift.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">У вас пока нет подарков</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeView === 'shop' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Магазин подарков</h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🦝</span>
                    <span className="font-bold text-xl">{racoonCoins}</span>
                  </div>
                  <Button onClick={() => buyRacoonCoins(1000, 100)}>
                    Купить енотики
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {gifts.map(gift => (
                  <div
                    key={gift.id}
                    className="bg-card rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className="text-6xl mb-4">{gift.emoji}</div>
                    <h3 className="font-semibold mb-2">{gift.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-4">
                      <span className="text-lg">🦝</span>
                      <span>{gift.price}</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => buyGift(gift)}
                      disabled={racoonCoins < gift.price}
                    >
                      Купить
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="my-8" />

              <div className="bg-card rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-6">Купить енотики</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { coins: 500, price: 50 },
                    { coins: 1000, price: 100 },
                    { coins: 2500, price: 200 },
                    { coins: 5000, price: 400 },
                    { coins: 10000, price: 700 },
                    { coins: 25000, price: 1500 },
                  ].map((pack, idx) => (
                    <div
                      key={idx}
                      className="bg-secondary rounded-xl p-6 text-center cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => buyRacoonCoins(pack.coins, pack.price)}
                    >
                      <div className="text-4xl mb-2">🦝</div>
                      <p className="font-bold text-xl mb-1">{pack.coins}</p>
                      <p className="text-sm text-muted-foreground">{pack.price} ₽</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto p-8">
              <h1 className="text-3xl font-bold mb-8">Настройки</h1>

              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Профиль</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Изменить имя</p>
                        <p className="text-sm text-muted-foreground">Текущее: {profileData.name}</p>
                      </div>
                      <Button variant="outline">Изменить</Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Изменить username</p>
                        <p className="text-sm text-muted-foreground">{profileData.username}</p>
                      </div>
                      <Button variant="outline">Изменить</Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Фото профиля</p>
                        <p className="text-sm text-muted-foreground">Загрузить новое фото</p>
                      </div>
                      <Button variant="outline">Загрузить</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Конфиденциальность</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Режим призрака</p>
                        <p className="text-sm text-muted-foreground">Скрывает ваш статус "онлайн"</p>
                      </div>
                      <Switch checked={ghostMode} onCheckedChange={setGhostMode} />
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Черный список</p>
                        <p className="text-sm text-muted-foreground">Управление заблокированными</p>
                      </div>
                      <Button variant="outline">Открыть</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Кошелёк</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Баланс</p>
                      <p className="text-3xl font-bold">{walletBalance} ₽</p>
                    </div>
                    <Button className="w-full">Пополнить баланс</Button>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Другое</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Music" size={18} className="mr-2" />
                      Музыка
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Globe" size={18} className="mr-2" />
                      Язык
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Palette" size={18} className="mr-2" />
                      Темы
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" size={18} className="mr-2" />
                      Служба поддержки
                    </Button>
                    <Separator />
                    <Button variant="destructive" className="w-full">
                      Выйти из аккаунта
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
