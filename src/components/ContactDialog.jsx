import { useState } from 'react';
import { Check, Copy, MessageCircle, Phone, ShieldCheck, Send } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { useToast } from '../context/ToastContext';
import { site } from '../data/site';
import { formatNaira } from '../lib/utils';

/**
 * WhatsApp / call enquiries are demonstrations only. This dialog makes the
 * limitation obvious while still showing how the real interaction would feel.
 */
export default function ContactDialog({ open, onClose, shop, product }) {
  const { toast } = useToast();
  const [mode, setMode] = useState('choose');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const defaultMessage = product
    ? `Hello ${shop.name}, I'd like to ask about ${product.name} (${formatNaira(product.price)}). Is it available?`
    : `Hello ${shop.name}, I'd like to make an enquiry about your shop.`;

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(shop.phone);
      setCopied(true);
      toast({ title: 'Number copied', description: `${shop.phone} — sample demo line.` });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Copy not available',
        description: 'Your browser blocked clipboard access. The sample number is shown above.',
        tone: 'info',
      });
    }
  };

  const sendPreview = () => {
    toast({
      title: 'Enquiry preview sent',
      description: 'Demo only — no message leaves this page.',
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setMode('choose');
        onClose();
      }}
      title={`Contact ${shop.name}`}
      description="A real storefront would hand this enquiry to the shop owner. In this demonstration nothing is sent."
      icon={MessageCircle}
    >
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-200/70 bg-amber-50 px-3 py-2.5 text-[11.5px] leading-relaxed text-amber-900">
        <ShieldCheck className="size-4 shrink-0" />
        Sample contact details. {site.phoneDemoNote}
      </div>

      {mode === 'choose' ? (
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => setMode('whatsapp')}
            className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-3.5 text-left transition hover:border-brand/30 hover:bg-brand-mist"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-[#25D366]/12 text-[#128C4B]">
              <MessageCircle className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-ink">Message on WhatsApp</span>
              <span className="block text-xs text-ink-soft">Preview a pre-filled enquiry</span>
            </span>
            <Send className="size-4 text-ink-mute" />
          </button>

          <div className="flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-3.5">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
              <Phone className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-ink">{shop.phone}</span>
              <span className="block text-xs text-ink-soft">Sample shop line · demo only</span>
            </span>
            <Button size="sm" variant="outline" onClick={copyNumber} Icon={copied ? Check : Copy}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          {product && (
            <div className="flex items-center gap-3 rounded-2xl bg-canvas-deep p-3">
              <img
                src={product.image}
                alt=""
                className="size-12 rounded-lg object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-semibold text-ink">{product.name}</p>
                <p className="text-[11.5px] text-ink-soft">
                  {formatNaira(product.price)} {product.unit}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="rounded-2xl border border-line bg-[#ECE5DD] p-3">
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-[#075E54] px-3 py-2 text-white">
              <span className="grid size-7 place-items-center rounded-full bg-white/15 text-[10px] font-bold">
                {shop.monogram}
              </span>
              <div>
                <p className="text-[12px] leading-tight font-semibold">{shop.name}</p>
                <p className="text-[10px] text-white/70">Demo conversation preview</p>
              </div>
            </div>
            <div className="space-y-2 py-1">
              <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3 py-2 text-[12px] leading-relaxed text-ink shadow-sm">
                {message.trim() || defaultMessage}
                <span className="mt-1 block text-right text-[9px] text-ink-mute">Now · demo</span>
              </div>
              <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12px] leading-relaxed text-ink shadow-sm">
                Thank you for reaching out. This is a sample reply — the shop would confirm availability and
                pickup or delivery details here.
              </div>
            </div>
          </div>

          <label className="mt-4 block text-[11px] font-semibold tracking-wide text-ink-soft uppercase">
            Enquiry message
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              placeholder={defaultMessage}
              className="mt-1.5 w-full resize-none rounded-xl border border-line bg-canvas px-3 py-2.5 text-[13px] font-normal tracking-normal text-ink normal-case outline-none transition focus:border-brand/40 focus:bg-white"
            />
          </label>

          <p className="mt-2 text-[11px] text-ink-mute">
            This message is not transmitted. WhatsApp is shown as a preview of the future enquiry flow.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="ghost" onClick={() => setMode('choose')} className="sm:flex-1">
              Back
            </Button>
            <Button onClick={sendPreview} className="sm:flex-[1.4]" Icon={Send}>
              Send demo enquiry
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
