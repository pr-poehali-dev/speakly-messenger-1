import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ChatView } from '@/components/ChatView';
import { ProfileView } from '@/components/ProfileView';
import { ShopView } from '@/components/ShopView';
import { SettingsView } from '@/components/SettingsView';

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

        {activeView === 'chats' && (
          <ChatView
            chats={chats}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            messages={messages}
            messageText={messageText}
            setMessageText={setMessageText}
            sendMessage={sendMessage}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            emojis={emojis}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
            addReaction={addReaction}
          />
        )}

        {activeView === 'profile' && (
          <ProfileView
            profileData={profileData}
            racoonCoins={racoonCoins}
            walletBalance={walletBalance}
            myGifts={myGifts}
          />
        )}

        {activeView === 'shop' && (
          <ShopView
            gifts={gifts}
            racoonCoins={racoonCoins}
            buyGift={buyGift}
            buyRacoonCoins={buyRacoonCoins}
          />
        )}

        {activeView === 'settings' && (
          <SettingsView
            profileData={profileData}
            ghostMode={ghostMode}
            setGhostMode={setGhostMode}
            walletBalance={walletBalance}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
