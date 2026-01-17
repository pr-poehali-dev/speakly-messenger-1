import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Gift = {
  id: number;
  name: string;
  price: number;
  emoji: string;
};

interface ShopViewProps {
  gifts: Gift[];
  racoonCoins: number;
  buyGift: (gift: Gift) => void;
  buyRacoonCoins: (amount: number, cost: number) => void;
}

export const ShopView = ({
  gifts,
  racoonCoins,
  buyGift,
  buyRacoonCoins,
}: ShopViewProps) => {
  return (
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
  );
};
