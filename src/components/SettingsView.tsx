import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface SettingsViewProps {
  profileData: {
    name: string;
    username: string;
    bio: string;
    avatar: string;
  };
  ghostMode: boolean;
  setGhostMode: (value: boolean) => void;
  walletBalance: number;
}

export const SettingsView = ({
  profileData,
  ghostMode,
  setGhostMode,
  walletBalance,
}: SettingsViewProps) => {
  return (
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
  );
};
