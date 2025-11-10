import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Package {
  id: number;
  amount: number;
  price: number;
  bonus: number;
  popular: boolean;
}

const packages: Package[] = [
  { id: 1, amount: 400, price: 299, bonus: 0, popular: false },
  { id: 2, amount: 800, price: 549, bonus: 50, popular: false },
  { id: 3, amount: 1700, price: 999, bonus: 200, popular: true },
  { id: 4, amount: 4500, price: 2499, bonus: 500, popular: false },
  { id: 5, amount: 10000, price: 4999, bonus: 1500, popular: false },
  { id: 6, amount: 22500, price: 9999, bonus: 3500, popular: false },
];

const Index = () => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const promoCodes = {
    'START10': 10,
    'MEGA20': 20,
    'VIP50': 50,
    'STANDOFF444': 44,
  };

  const applyPromo = () => {
    const discount = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes];
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount });
      toast.success(`Промокод применён! Скидка ${discount}%`);
    } else {
      toast.error('Неверный промокод');
    }
  };

  const calculatePrice = (price: number) => {
    if (!appliedPromo) return price;
    return Math.round(price * (1 - appliedPromo.discount / 100));
  };

  const handlePurchase = (pkg: Package) => {
    setSelectedPackage(pkg);
    const finalPrice = calculatePrice(pkg.price);
    toast.success(`Покупка ${pkg.amount + pkg.bonus} робуксов за ${finalPrice}₽`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">
              🎮
            </div>
            <span className="text-2xl font-bold">ROBUX.RU</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#hero" className="hover:text-primary transition-colors">Главная</a>
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <a href="#payment" className="hover:text-primary transition-colors">Оплата</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <section id="hero" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-4 py-2">
            🔥 Мгновенная доставка
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Купить Robux
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Самые выгодные цены на робуксы с бонусами и мгновенной доставкой
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 hover-scale glow-effect">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Выбрать пакет
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 hover-scale">
              <Icon name="Gift" size={20} className="mr-2" />
              Промокоды
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: 'Zap', label: 'Моментально', desc: 'Доставка за 30 сек' },
              { icon: 'Shield', label: 'Безопасно', desc: '100% гарантия' },
              { icon: 'Percent', label: 'Скидки', desc: 'До 50% по промокоду' },
              { icon: 'Headphones', label: 'Поддержка', desc: 'Онлайн 24/7' },
            ].map((item, i) => (
              <Card key={i} className="p-6 text-center hover-scale bg-card/80 backdrop-blur border-border/40">
                <Icon name={item.icon as any} size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выбери свой пакет</h2>
            <p className="text-muted-foreground text-lg">Все пакеты с бонусными робуксами</p>
          </div>

          <div className="max-w-md mx-auto mb-12">
            <Card className="p-6 bg-card/80 backdrop-blur border-2 border-secondary/50">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Tag" size={24} className="text-secondary" />
                <h3 className="text-xl font-bold">Есть промокод?</h3>
              </div>
              {appliedPromo && (
                <div className="mb-4 p-3 bg-accent/20 rounded-lg border border-accent/40">
                  <p className="text-sm font-bold text-accent">
                    ✓ Промокод {appliedPromo.code} активирован! Скидка {appliedPromo.discount}%
                  </p>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder="Введи промокод"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-background/50"
                />
                <Button onClick={applyPromo} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Применить
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Попробуй: START10, MEGA20, VIP50, STANDOFF444
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`p-6 hover-scale relative ${
                  pkg.popular
                    ? 'border-2 border-primary glow-effect'
                    : 'border-border/40'
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    ⭐ Популярный
                  </Badge>
                )}
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">💎</div>
                  <h3 className="text-3xl font-bold mb-2">
                    {pkg.amount.toLocaleString()}
                  </h3>
                  {pkg.bonus > 0 && (
                    <Badge className="bg-secondary text-secondary-foreground mb-2">
                      +{pkg.bonus} бонус
                    </Badge>
                  )}
                  <div className="text-2xl font-bold text-primary mb-1">
                    {appliedPromo ? (
                      <>
                        <span className="line-through text-muted-foreground text-lg mr-2">
                          {pkg.price}₽
                        </span>
                        {calculatePrice(pkg.price)}₽
                      </>
                    ) : (
                      `${pkg.price}₽`
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pkg.bonus > 0 && `Итого: ${pkg.amount + pkg.bonus} робуксов`}
                  </p>
                </div>
                <Button
                  onClick={() => handlePurchase(pkg)}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы игроков</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Алексей',
                rating: 5,
                text: 'Получил робуксы моментально! Лучший сервис',
                avatar: '😎',
              },
              {
                name: 'Мария',
                rating: 5,
                text: 'Промокод MEGA20 работает! Спасибо за скидку',
                avatar: '🎀',
              },
              {
                name: 'Дмитрий',
                rating: 5,
                text: 'Покупаю здесь уже 3 раза. Всё честно и быстро',
                avatar: '🎮',
              },
            ].map((review, i) => (
              <Card key={i} className="p-6 hover-scale bg-card/80 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{review.avatar}</div>
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <div className="flex gap-1">
                      {Array(review.rating)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-secondary">⭐</span>
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Частые вопросы</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                <Icon name="HelpCircle" size={20} className="mr-3 text-primary" />
                Как быстро приходят робуксы?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Робуксы поступают на ваш аккаунт в течение 30-60 секунд после оплаты. В редких случаях доставка может занять до 5 минут.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                <Icon name="CreditCard" size={20} className="mr-3 text-primary" />
                Какие способы оплаты доступны?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки (ЮMoney, QIWI), а также оплату через СБП.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">
                <Icon name="Shield" size={20} className="mr-3 text-primary" />
                Это безопасно?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, абсолютно безопасно. Мы используем официальные методы доставки робуксов и работаем только с проверенными платёжными системами. Гарантия возврата средств 100%.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">
                <Icon name="Tag" size={20} className="mr-3 text-primary" />
                Как использовать промокод?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Введите промокод в специальное поле перед выбором пакета. Скидка применится автоматически ко всем пакетам. Один промокод можно использовать один раз.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg">
                <Icon name="Gift" size={20} className="mr-3 text-primary" />
                Что такое бонусные робуксы?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                К некоторым пакетам мы добавляем бонусные робуксы бесплатно. Например, покупая пакет 1700 + 200 бонус, вы получаете 1900 робуксов по цене 1700.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="payment" className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Готов купить робуксы?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Выбери пакет выше и получи робуксы мгновенно на свой аккаунт
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <span className="text-2xl opacity-70">💳 Visa</span>
              <span className="text-2xl opacity-70">💳 MasterCard</span>
              <span className="text-2xl opacity-70">💳 МИР</span>
              <span className="text-2xl opacity-70">💰 QIWI</span>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-12 glow-effect hover-scale">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Начать покупку
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-2xl">
                  🎮
                </div>
                <span className="text-xl font-bold">ROBUX.RU</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучший магазин робуксов с моментальной доставкой
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#catalog" className="hover:text-primary transition-colors">Все пакеты</a></li>
                <li><a href="#catalog" className="hover:text-primary transition-colors">Популярные</a></li>
                <li><a href="#catalog" className="hover:text-primary transition-colors">С бонусами</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#payment" className="hover:text-primary transition-colors">Способы оплаты</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@robux.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  Telegram: @robuxru
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border/40 text-sm text-muted-foreground">
            © 2024 ROBUX.RU. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
