import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Info,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import Button from '../ui/Button';
import { Drawer } from '../ui/Modal';
import SmartImage from '../ui/SmartImage';
import { Field, TextArea, TextInput } from '../ui/Field';
import { useBasket } from '../../context/BasketContext';
import { demoReference, formatNaira, scrollToId } from '../../lib/utils';
import { restaurant } from '../../data/restaurant';

const EMPTY_FORM = { name: '', phone: '', type: 'pickup', note: '' };
const phoneRe = /^(\+?234|0)[\s-]?\d{2,3}[\s-]?\d{3}[\s-]?\d{4}$/;

export default function BasketDrawer() {
  const { open, closeBasket, items, count, subtotal, inc, dec, remove, clear } = useBasket();
  const [step, setStep] = useState('basket');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [receipt, setReceipt] = useState(null);

  const close = () => {
    closeBasket();
    window.setTimeout(() => {
      setStep('basket');
      setForm(EMPTY_FORM);
      setErrors({});
    }, 280);
  };

  const complete = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please add your name.';
    if (!phoneRe.test(form.phone.trim())) next.phone = 'Enter a valid phone number.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setReceipt({
      reference: demoReference('ORD'),
      name: form.name.trim(),
      type: form.type,
      note: form.note.trim(),
      total: subtotal,
      items,
    });
    setStep('done');
    clear();
  };

  const goToMenu = () => {
    close();
    window.setTimeout(() => scrollToId('menu'), 320);
  };

  const title =
    step === 'details' ? 'Order details' : step === 'done' ? 'Order staged' : 'Your order';

  return (
    <Drawer open={open} onClose={close} label="Your order basket">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
        <div>
          <p className="text-[9px] font-bold tracking-[0.2em] text-ink-mute uppercase">
            SAVORA · demonstration order
          </p>
          <h2 className="mt-1 font-display text-[20px] leading-tight font-semibold">
            {title}
            {step === 'basket' && count > 0 && (
              <span className="ml-1.5 text-ink-mute">
                ({count} {count === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close basket"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink transition hover:border-ink/30"
        >
          <X className="size-4" />
        </button>
      </div>

      {step === 'done' && receipt ? (
        <div className="flex-1 overflow-y-auto px-5 py-7">
          <div className="anim-scale flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-full bg-olive-soft text-olive">
              <CheckCircle2 className="size-7" />
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold">Order enquiry staged</h3>
            <p className="mt-2 max-w-xs text-[12.5px] leading-relaxed text-ink-soft">
              Thanks, {receipt.name.split(' ')[0]}. On a live site this order would go straight to
              the SAVORA kitchen, and someone would call to confirm.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-cream/60 p-4 text-[12px]">
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <span className="text-ink-mute">Reference</span>
              <span className="font-semibold text-ink">{receipt.reference}</span>
            </div>
            <div className="flex items-center justify-between border-b border-line py-2.5">
              <span className="text-ink-mute">Fulfilment</span>
              <span className="font-semibold text-ink capitalize">{receipt.type}</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-ink-mute">{receipt.items.length} dishes</span>
              <span className="font-display text-base font-semibold">{formatNaira(receipt.total)}</span>
            </div>
            {receipt.note && <p className="border-t border-line pt-2.5 text-[11px] text-ink-soft">{receipt.note}</p>}
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-2xl bg-terracotta-soft/60 p-3 text-[11px] leading-relaxed text-terracotta-deep">
            <Info className="mt-px size-4 shrink-0" />
            <p>
              This is a checkout demonstration. No payment was taken, no order was placed and
              nothing was sent to a kitchen.
            </p>
          </div>

          <Button className="mt-5 w-full" onClick={goToMenu}>
            Back to the menu <ArrowRight className="size-4" />
          </Button>
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-cream-deep text-ink-mute">
            <ShoppingBag className="size-7" />
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold">Your basket is empty</h3>
          <p className="mt-2 max-w-[15rem] text-[12.5px] leading-relaxed text-ink-soft">
            Add a dish from the menu and it will appear here — along with the running subtotal.
          </p>
          <Button className="mt-5" onClick={goToMenu}>
            Browse the menu <ArrowRight className="size-4" />
          </Button>
          <p className="mt-4 text-[10px] text-ink-mute">Demonstration basket · no payment</p>
        </div>
      ) : step === 'basket' ? (
        <>
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5">
            <ul className="divide-y divide-line-soft">
              {items.map(({ id, qty, dish }) => (
                <li key={id} className="flex gap-3 py-4">
                  <SmartImage src={dish.image} alt={dish.name} className="size-16 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[12.5px] leading-snug font-semibold">{dish.name}</p>
                      <button
                        type="button"
                        onClick={() => remove(id)}
                        aria-label={`Remove ${dish.name}`}
                        className="grid size-6 shrink-0 place-items-center rounded-full text-ink-mute transition hover:bg-terracotta-soft hover:text-terracotta"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-[10.5px] text-ink-mute">{formatNaira(dish.price)} each</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border border-line bg-paper">
                        <button
                          type="button"
                          onClick={() => dec(id)}
                          aria-label={`Decrease ${dish.name}`}
                          className="grid size-7 place-items-center rounded-full text-ink transition hover:bg-cream-deep"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-6 text-center text-[11.5px] font-semibold" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => inc(id)}
                          aria-label={`Increase ${dish.name}`}
                          className="grid size-7 place-items-center rounded-full text-ink transition hover:bg-cream-deep"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="font-display text-[13.5px] font-semibold">
                        {formatNaira(dish.price * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-4 flex items-center gap-2 rounded-xl bg-cream/70 p-3 text-[10.5px] leading-relaxed text-ink-soft">
              <Info className="size-3.5 shrink-0 text-olive" />
              Demo basket — items stay on this device and are never sent anywhere.
            </div>
          </div>

          <div className="border-t border-line bg-cream/60 px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-ink-soft">Subtotal</span>
              <span className="font-display text-xl font-semibold">{formatNaira(subtotal)}</span>
            </div>
            <p className="mt-1 text-[10.5px] text-ink-mute">
              Pickup from {restaurant.address.split(',')[0]} · delivery confirmed by phone
            </p>
            <Button className="mt-3 w-full" onClick={() => setStep('details')}>
              Continue order <ArrowRight className="size-4" />
            </Button>
            <p className="mt-2 text-center text-[9.5px] text-ink-mute">
              No payment is taken in this demonstration
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
            <button
              type="button"
              onClick={() => setStep('basket')}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-soft transition hover:text-ink"
            >
              <ArrowLeft className="size-3.5" /> Back to basket
            </button>

            <div className="mt-4">
              <p className="text-[10px] font-bold tracking-[0.14em] text-ink-mute uppercase">
                How would you like it?
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  ['pickup', 'Pickup', 'Collect from GRA'],
                  ['delivery', 'Delivery', 'Confirmed by phone'],
                ].map(([value, label, hint]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, type: value }))}
                    aria-pressed={form.type === value}
                    className={`rounded-xl border p-3 text-left transition ${
                      form.type === value
                        ? 'border-terracotta bg-terracotta-soft/50'
                        : 'border-line bg-paper hover:border-ink/20'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-[12.5px] font-semibold">{label}</span>
                      {form.type === value && <Check className="size-3.5 text-terracotta" strokeWidth={3} />}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-ink-mute">{hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3.5">
              <Field id="order-name" label="Full name" required error={errors.name}>
                <TextInput
                  id="order-name"
                  autoComplete="name"
                  placeholder="Name for the order"
                  value={form.name}
                  onChange={(event) => {
                    setForm((prev) => ({ ...prev, name: event.target.value }));
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={errors.name}
                />
              </Field>
              <Field id="order-phone" label="Phone number" required error={errors.phone}>
                <TextInput
                  id="order-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="0803 123 4567"
                  value={form.phone}
                  onChange={(event) => {
                    setForm((prev) => ({ ...prev, phone: event.target.value }));
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  error={errors.phone}
                />
              </Field>
              <Field
                id="order-note"
                label="Notes for the kitchen"
                hint="Optional — allergies, spice level, packaging"
              >
                <TextArea
                  id="order-note"
                  rows={2}
                  placeholder="Extra pepper on the side, please."
                  value={form.note}
                  onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                />
              </Field>
            </div>

            <div className="mt-4 rounded-2xl border border-line bg-cream/60 p-3.5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-ink-soft">
                  {count} {count === 1 ? 'item' : 'items'} · {form.type}
                </span>
                <span className="font-display text-lg font-semibold">{formatNaira(subtotal)}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-line bg-cream/60 px-4 py-4 sm:px-5">
            <Button className="w-full" onClick={complete}>
              Send order enquiry (demo) <ArrowRight className="size-4" />
            </Button>
            <p className="mt-2 text-center text-[9.5px] leading-relaxed text-ink-mute">
              Demonstration checkout · no payment, no kitchen order
            </p>
          </div>
        </>
      )}
    </Drawer>
  );
}
