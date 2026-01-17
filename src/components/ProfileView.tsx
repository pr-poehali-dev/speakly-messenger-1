import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Gift = {
  id: number;
  name: string;
  price: number;
  emoji: string;
};

interface ProfileViewProps {
  profileData: {
    name: string;
    username: string;
    bio: string;
    avatar: string;
  };
  racoonCoins: number;
  walletBalance: number;
  myGifts: Gift[];
}

export const ProfileView = ({
  profileData,
  racoonCoins,
  walletBalance,
  myGifts,
}: ProfileViewProps) => {
  return (
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
  );
};
