import { useState } from 'react';
import { CalendarCheck, CheckCircle2, Info, Send, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import { Field, Select, TextArea, TextInput } from '../ui/Field';
import { demoReference, pluralise, todayISO } from '../../lib/utils';
import { reservationTimes, restaurant } from '../../data/restaurant';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^(\+?234|0)[\s-]?\d{2,3}[\s-]?\d{3}[\s-]?\d{4}$/;

function SuccessPanel({ title, children, onReset, resetLabel = 'Send another message' }) {
  return (
    <div className="anim-scale rounded-2xl border border-olive/25 bg-olive-soft/60 p-5 sm:p-6">
      <span className="grid size-11 place-items-center rounded-full bg-olive text-cream">
        <CheckCircle2 className="size-5" />
      </span>
      <h3 className="mt-3.5 font-display text-xl font-semibold">{title}</h3>
      <div className="mt-2 space-y-2 text-[12.5px] leading-relaxed text-ink-soft">{children}</div>
      <p className="mt-3 flex items-start gap-1.5 rounded-xl bg-paper/70 p-2.5 text-[11px] leading-relaxed text-ink-soft">
        <Info className="mt-px size-3.5 shrink-0 text-olive" />
        This is a demonstration form. Nothing was sent, stored or emailed.
      </p>
      <Button variant="outline" size="sm" className="mt-4" onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}

export function ContactForm({ heading = true }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const update = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Please tell us your name.';
    if (!emailRe.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (values.phone.trim() && !phoneRe.test(values.phone.trim()))
      next.phone = 'Use a Nigerian number, e.g. 0803 123 4567.';
    if (values.message.trim().length < 10) next.message = 'A little more detail, please (10+ characters).';
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent({ reference: demoReference('MSG'), name: values.name.trim() });
  };

  if (sent) {
    return (
      <SuccessPanel
        title="Enquiry staged"
        onReset={() => {
          setSent(null);
          setValues({ name: '', email: '', phone: '', message: '' });
        }}
      >
        <p>
          Thanks, {sent.name.split(' ')[0]}. On a live website this would reach the SAVORA team at{' '}
          {restaurant.email}, usually within one working day.
        </p>
        <p className="text-ink-mute">Demo reference: {sent.reference}</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
      {heading && (
        <div className="mb-1">
          <h3 className="font-display text-xl font-semibold sm:text-2xl">Send us a message</h3>
          <p className="mt-1 text-[12px] text-ink-soft">
            Questions, private dining or feedback — we read everything.
          </p>
        </div>
      )}

      <Field id="contact-name" label="Full name" required error={errors.name}>
        <TextInput
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Amaka Ojo"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
        />
      </Field>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field id="contact-email" label="Email address" required error={errors.email}>
          <TextInput
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={update('email')}
            error={errors.email}
          />
        </Field>
        <Field id="contact-phone" label="Phone number" error={errors.phone} hint="Optional">
          <TextInput
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0803 123 4567"
            value={values.phone}
            onChange={update('phone')}
            error={errors.phone}
          />
        </Field>
      </div>

      <Field id="contact-message" label="Message" required error={errors.message}>
        <TextArea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell us what you have in mind…"
          value={values.message}
          onChange={update('message')}
          error={errors.message}
        />
      </Field>

      <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-[10.5px] text-ink-mute">
          <ShieldCheck className="size-3.5 text-olive" /> Demo form — no data leaves this page
        </p>
        <Button type="submit" size="md" className="w-full sm:w-auto">
          Send enquiry <Send className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}

export function ReservationForm() {
  const empty = {
    name: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2',
    message: '',
  };
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [booked, setBooked] = useState(null);

  const update = (key) => (event) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (values.name.trim().length < 2) next.name = 'Please add the name for the table.';
    if (!phoneRe.test(values.phone.trim())) next.phone = 'Enter a valid phone number for confirmation.';
    if (!values.date) next.date = 'Choose a date.';
    else if (values.date < todayISO()) next.date = 'Please choose today or a future date.';
    if (!values.time) next.time = 'Choose a time.';
    if (!values.guests) next.guests = 'How many guests?';
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setBooked({ ...values, reference: demoReference('RSV') });
  };

  if (booked) {
    return (
      <SuccessPanel
        title="Reservation enquiry staged"
        resetLabel="Make another reservation"
        onReset={() => {
          setBooked(null);
          setValues(empty);
        }}
      >
        <p>
          A table for <strong>{pluralise(Number(booked.guests), 'guest')}</strong> on{' '}
          <strong>
            {new Date(`${booked.date}T12:00:00`).toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </strong>{' '}
          at <strong>{booked.time}</strong>, under {booked.name}.
        </p>
        <p>
          On a live restaurant site this would reach the reservations team at {restaurant.phone},
          who would confirm by phone within a few hours.
        </p>
        <p className="text-ink-mute">Demo reference: {booked.reference}</p>
      </SuccessPanel>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field id="res-name" label="Full name" required error={errors.name}>
          <TextInput
            id="res-name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={update('name')}
            error={errors.name}
          />
        </Field>
        <Field id="res-phone" label="Phone number" required error={errors.phone}>
          <TextInput
            id="res-phone"
            type="tel"
            autoComplete="tel"
            placeholder="0803 123 4567"
            value={values.phone}
            onChange={update('phone')}
            error={errors.phone}
          />
        </Field>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-3">
        <Field id="res-date" label="Preferred date" required error={errors.date}>
          <TextInput
            id="res-date"
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={update('date')}
            error={errors.date}
          />
        </Field>
        <Field id="res-time" label="Preferred time" required error={errors.time}>
          <Select id="res-time" value={values.time} onChange={update('time')} error={errors.time}>
            {reservationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="res-guests" label="Guests" required error={errors.guests}>
          <Select id="res-guests" value={values.guests} onChange={update('guests')} error={errors.guests}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'guest' : 'guests'}
              </option>
            ))}
            <option value="13">13+ (private dining)</option>
          </Select>
        </Field>
      </div>

      <Field id="res-message" label="Anything we should know?" hint="Optional — allergies, celebrations, seating">
        <TextArea
          id="res-message"
          rows={3}
          placeholder="Birthday dinner, quiet corner, one high chair…"
          value={values.message}
          onChange={update('message')}
        />
      </Field>

      <div className="mt-1 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-1.5 text-[10.5px] text-ink-mute">
          <Info className="size-3.5 text-olive" /> Enquiry only — the team confirms by phone
        </p>
        <Button type="submit" size="md" className="w-full sm:w-auto">
          <CalendarCheck className="size-4" /> Request a table
        </Button>
      </div>
    </form>
  );
}
