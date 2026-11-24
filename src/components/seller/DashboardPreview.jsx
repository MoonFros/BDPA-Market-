import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  Eye,
  ImagePlus,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Plus,
  Search,
  Settings2,
  ShoppingBag,
  Store,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import ShopLogo from '../ui/ShopLogo';
import SmartImage from '../ui/SmartImage';
import { useToast } from '../../context/ToastContext';
import { shopBySlug } from '../../data/shops';
import { formatNaira } from '../../lib/utils';
import { cn } from '../../lib/utils';

const shop = shopBySlug('technest-electronics');

const initialProducts = [
  { ...shop.products[0], stock: 3, status: 'Live' },
  { ...shop.products[1], stock: 7, status: 'Live' },
  { ...shop.products[2], stock: 24, status: 'Live' },
  { ...shop.products[3], stock: 2, status: 'Low stock' },
  { ...shop.products[4], stock: 0, status: 'Hidden' },
];

const enquiriesSeed = [
  {
    id: 'e1',
    name: 'Adesuwa O.',
    initials: 'AO',
    message: 'Do you have the iPhone 15 in blue? Can I come and see it today?',
    time: '22 min ago',
    unread: true,
    replied: false,
    product: 'iPhone 15 · 128GB',
  },
  {
    id: 'e2',
    name: 'Kelvin E.',
    initials: 'KE',
    message: 'How much is the 43 inch TV with delivery to GRA?',
    time: '1 hr ago',
    unread: true,
    replied: false,
    product: '43" 4K Smart TV',
  },
  {
    id: 'e3',
    name: 'Fatima S.',
    initials: 'FS',
    message: 'Do you sell cases for the Galaxy A55? I need one before Friday.',
    time: '3 hrs ago',
    unread: false,
    replied: true,
    product: 'Samsung Galaxy A55',
  },
  {
    id: 'e4',
    name: 'Osaze I.',
    initials: 'OI',
    message: 'Is the power bank sealed? I want two of them.',
    time: 'Yesterday',
    unread: false,
    replied: true,
    product: 'Oraimo 20,000mAh Power Bank',
  },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'profile', label: 'Store profile', icon: Store },
  { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: 2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const views = [
  { day: 'Mon', value: 132 },
  { day: 'Tue', value: 168 },
  { day: 'Wed', value: 151 },
  { day: 'Thu', value: 204 },
  { day: 'Fri', value: 236 },
  { day: 'Sat', value: 268 },
  { day: 'Sun', value: 125 },
];

function StatCard({ icon: Icon, label, value, hint, trend }) {
  return (
    <div className="rounded-xl border border-line bg-white p-3.5 shadow-[0_1px_2px_rgba(21,33,27,0.03)]">
      <div className="flex items-center justify-between gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-canvas-deep text-ink-soft">
          <Icon className="size-4" strokeWidth={1.9} />
        </span>
        {trend && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
            <TrendingUp className="size-2.5" /> {trend}
          </span>
        )}
      </div>
      <p className="mt-2.5 font-display text-xl leading-none font-semibold text-ink">{value}</p>
      <p className="mt-1 text-[10px] font-medium text-ink-mute">{label}</p>
      {hint && <p className="mt-0.5 text-[9.5px] text-ink-mute">{hint}</p>}
    </div>
  );
}

function Overview({ products, onNavigate }) {
  const totals = views.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...views.map((item) => item.value));

  return (
    <div className="animate-fade-in space-y-4">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <StatCard icon={Package} label="Products live" value={products.filter((p) => p.status !== 'Hidden').length} hint={`${products.length} total listings`} />
        <StatCard icon={Eye} label="Storefront views" value={totals.toLocaleString()} trend="+12%" hint="Last 7 days" />
        <StatCard icon={MessageSquare} label="New enquiries" value="8" trend="+3" hint="2 unread" />
        <StatCard icon={Users} label="Shoppers who saved" value="46" trend="+5" hint="Sample figure" />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-ink">Storefront views</p>
              <p className="text-[9.5px] text-ink-mute">Illustrative analytics · not live data</p>
            </div>
            <span className="rounded-full bg-canvas-deep px-2 py-0.5 text-[9px] font-semibold text-ink-soft">
              This week
            </span>
          </div>
          <div className="mt-4 flex items-end gap-2">
            {views.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex h-24 w-full items-end sm:h-28">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand/70 to-brand transition-all duration-500 hover:from-brand hover:to-brand"
                    style={{ height: `${Math.max(8, (item.value / max) * 100)}%` }}
                    title={`${item.value} views`}
                  />
                </div>
                <span className="text-[8.5px] text-ink-mute">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-ink">Recent enquiries</p>
            <button
              type="button"
              onClick={() => onNavigate('enquiries')}
              className="inline-flex items-center gap-0.5 text-[9.5px] font-semibold text-brand"
            >
              View all <ChevronRight className="size-3" />
            </button>
          </div>
          <div className="mt-2.5 divide-y divide-line-soft">
            {enquiriesSeed.slice(0, 3).map((enquiry) => (
              <div key={enquiry.id} className="flex items-start gap-2.5 py-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-[9px] font-bold text-brand-dark">
                  {enquiry.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center justify-between gap-2 text-[10.5px] font-semibold text-ink">
                    {enquiry.name}
                    <span className="text-[8.5px] font-medium text-ink-mute">{enquiry.time}</span>
                  </p>
                  <p className="mt-0.5 truncate text-[9.5px] text-ink-soft">{enquiry.message}</p>
                </div>
                {enquiry.unread && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
            <Store className="size-4" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-ink">Your storefront is live</p>
            <p className="mt-0.5 text-[9.5px] leading-relaxed text-ink-soft">
              Two listings need attention — one is low on stock and one is hidden from shoppers.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('products')}
          className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-full bg-ink px-3 text-[10px] font-semibold text-white"
        >
          Review products <ArrowUpRight className="size-3" />
        </button>
      </div>
    </div>
  );
}

function ProductsPanel({ products, setProducts, onAdd }) {
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const filtered = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(query.trim().toLowerCase())),
    [products, query],
  );

  const remove = (product) => {
    setProducts((current) => current.filter((item) => item.id !== product.id));
    toast({
      title: 'Listing removed',
      description: `“${product.name}” was removed from this preview only.`,
      tone: 'info',
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-ink-mute" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products…"
            className="h-9 w-full rounded-full border border-line bg-white pr-3 pl-8.5 text-[11px] outline-none transition focus:border-brand/40"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] text-ink-mute">{products.length} listings</span>
          <Button size="sm" Icon={Plus} onClick={onAdd} className="h-9 px-3.5 text-[11px]">
            Add Product
          </Button>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-line bg-white">
        <div className="hidden grid-cols-[1fr_88px_92px_80px_32px] gap-3 border-b border-line bg-canvas/70 px-3 py-2 text-[8.5px] font-semibold tracking-wide text-ink-mute uppercase sm:grid">
          <span>Product</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-line-soft">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-canvas/60 sm:grid sm:grid-cols-[1fr_88px_92px_80px_32px]"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2.5">
                <SmartImage
                  src={product.image}
                  alt={product.name}
                  icon={ShoppingBag}
                  className="size-9 shrink-0 rounded-lg"
                />
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-ink">{product.name}</p>
                  <p className="truncate text-[9px] text-ink-mute">{product.section}</p>
                </div>
              </div>
              <span className="hidden text-[10.5px] font-medium text-ink sm:block">{formatNaira(product.price)}</span>
              <span className="hidden text-[10px] text-ink-soft sm:block">{product.stock} in shop</span>
              <span className="hidden sm:block">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-semibold',
                    product.status === 'Live' && 'bg-emerald-50 text-emerald-700',
                    product.status === 'Low stock' && 'bg-amber-50 text-amber-700',
                    product.status === 'Hidden' && 'bg-canvas-deep text-ink-mute',
                  )}
                >
                  <span
                    className={cn(
                      'size-1 rounded-full',
                      product.status === 'Live' && 'bg-emerald-500',
                      product.status === 'Low stock' && 'bg-amber-500',
                      product.status === 'Hidden' && 'bg-ink-mute',
                    )}
                  />
                  {product.status}
                </span>
              </span>
              <div className="ml-auto flex items-center gap-2 sm:ml-0">
                <span className="text-[10px] font-semibold text-ink sm:hidden">{formatNaira(product.price)}</span>
                <button
                  type="button"
                  onClick={() => remove(product)}
                  className="grid size-7 place-items-center rounded-md text-ink-mute transition hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-[11px] font-semibold text-ink">No products match “{query}”</p>
              <p className="mt-1 text-[10px] text-ink-soft">Try a different search or add a new listing.</p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-2.5 flex items-center gap-1.5 text-[9px] text-ink-mute">
        <Settings2 className="size-3" /> Preview behaviour — changes live in this browser tab only and reset on reload.
      </p>
    </div>
  );
}

function ProfilePanel({ profile, setProfile }) {
  const { toast } = useToast();
  const fields = [
    { key: 'name', label: 'Business name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'phone', label: 'Phone number (demo)' },
    { key: 'whatsapp', label: 'WhatsApp line (demo)' },
    { key: 'unit', label: 'Unit within complex' },
    { key: 'hours', label: 'Opening hours' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[11px] font-semibold text-ink">Store profile</p>
          <p className="text-[9.5px] text-ink-mute">Shown on your public storefront.</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-[9px] font-semibold tracking-wide text-ink-mute uppercase">{field.label}</span>
                <input
                  value={profile[field.key]}
                  onChange={(event) => setProfile({ ...profile, [field.key]: event.target.value })}
                  className="mt-1 h-9 w-full rounded-lg border border-line bg-canvas px-2.5 text-[11px] text-ink outline-none transition focus:border-brand/40 focus:bg-white"
                />
              </label>
            ))}
          </div>
          <div className="mt-3">
            <span className="text-[9px] font-semibold tracking-wide text-ink-mute uppercase">About your shop</span>
            <textarea
              value={profile.about}
              onChange={(event) => setProfile({ ...profile, about: event.target.value })}
              rows={3}
              className="mt-1 w-full resize-none rounded-lg border border-line bg-canvas px-2.5 py-2 text-[11px] text-ink outline-none transition focus:border-brand/40 focus:bg-white"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-3">
            <span className="text-[9px] text-ink-mute">Demo edit — nothing is published.</span>
            <Button
              size="sm"
              className="h-8 px-3 text-[10px]"
              Icon={Check}
              onClick={() =>
                toast({ title: 'Profile saved (demo)', description: 'In a live portal this would update your public storefront instantly.' })
              }
            >
              Save changes
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-line bg-white p-3">
            <p className="text-[9px] font-semibold tracking-wide text-ink-mute uppercase">Cover photo</p>
            <SmartImage
              src={shop.cover}
              alt="Storefront cover"
              className="mt-2 aspect-[16/10] w-full rounded-lg"
            />
            <button
              type="button"
              onClick={() => toast({ title: 'Upload preview', description: 'Image uploads would be handled by the seller portal backend.', tone: 'info' })}
              className="mt-2 inline-flex h-7 w-full items-center justify-center gap-1.5 rounded-md border border-line text-[9.5px] font-semibold text-ink-soft transition hover:border-brand/30 hover:text-ink"
            >
              <ImagePlus className="size-3" /> Change cover
            </button>
          </div>
          <div className="rounded-xl border border-line bg-white p-3">
            <p className="text-[9px] font-semibold tracking-wide text-ink-mute uppercase">Logo</p>
            <div className="mt-2 flex items-center gap-2.5">
              <ShopLogo shop={shop} size="md" />
              <p className="text-[9px] leading-relaxed text-ink-soft">
                Monogram identity used until a logo is uploaded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiriesPanel({ enquiries, setEnquiries }) {
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState('');
  const { toast } = useToast();

  const sendReply = (enquiry) => {
    setEnquiries((current) =>
      current.map((item) => (item.id === enquiry.id ? { ...item, replied: true, unread: false } : item)),
    );
    setOpenId(null);
    setReply('');
    toast({
      title: 'Reply preview',
      description: `Your reply to ${enquiry.name} was sent in this preview only.`,
      tone: 'info',
    });
  };

  return (
    <div className="animate-fade-in space-y-2.5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-ink">Customer enquiries</p>
        <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[9px] font-semibold text-brand-dark">
          {enquiries.filter((item) => item.unread).length} unread
        </span>
      </div>

      {enquiries.map((enquiry) => (
        <div key={enquiry.id} className="rounded-xl border border-line bg-white p-3.5">
          <div className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[10px] font-bold text-brand-dark">
              {enquiry.initials}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-semibold text-ink">{enquiry.name}</p>
                {enquiry.unread && <span className="size-1.5 rounded-full bg-brand" />}
                <span className="ml-auto text-[8.5px] text-ink-mute">{enquiry.time}</span>
              </div>
              <p className="mt-1 text-[10.5px] leading-relaxed text-ink-soft">{enquiry.message}</p>
              <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-canvas px-2 py-0.5 text-[8.5px] text-ink-mute">
                <ShoppingBag className="size-2.5" /> {enquiry.product}
              </p>

              {openId === enquiry.id ? (
                <div className="mt-2.5">
                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    rows={2}
                    placeholder={`Reply to ${enquiry.name}…`}
                    className="w-full resize-none rounded-lg border border-line bg-canvas px-2.5 py-2 text-[10.5px] outline-none transition focus:border-brand/40 focus:bg-white"
                  />
                  <div className="mt-1.5 flex items-center gap-2">
                    <Button size="sm" className="h-7 px-3 text-[9.5px]" onClick={() => sendReply(enquiry)}>
                      Send reply
                    </Button>
                    <button
                      type="button"
                      onClick={() => setOpenId(null)}
                      className="text-[9.5px] font-semibold text-ink-mute hover:text-ink"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenId(enquiry.id);
                      setReply('');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[9px] font-semibold text-white transition hover:bg-brand-deep"
                  >
                    <Mail className="size-2.5" /> Reply
                  </button>
                  <span className={cn('text-[8.5px] font-medium', enquiry.replied ? 'text-emerald-600' : 'text-amber-600')}>
                    {enquiry.replied ? 'Replied' : 'Awaiting reply'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <p className="flex items-center gap-1.5 text-[9px] text-ink-mute">
        <Settings2 className="size-3" /> Sample messages. Replies are not delivered anywhere.
      </p>
    </div>
  );
}

function AnalyticsPanel({ products }) {
  const max = Math.max(...views.map((item) => item.value));
  const top = products.slice(0, 4);
  return (
    <div className="animate-fade-in space-y-3">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <StatCard icon={Eye} label="Views" value="1,284" trend="+12%" />
        <StatCard icon={ShoppingBag} label="Product taps" value="389" trend="+8%" />
        <StatCard icon={MessageSquare} label="Enquiries" value="8" trend="+3" />
        <StatCard icon={Users} label="Returning" value="31%" hint="Illustrative" />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[11px] font-semibold text-ink">Views this week</p>
          <p className="text-[9.5px] text-ink-mute">Illustrative demo analytics</p>
          <div className="mt-4 flex items-end gap-2">
            {views.map((item) => (
              <div key={item.day} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[8px] text-ink-mute">{item.value}</span>
                <div className="flex h-28 w-full items-end">
                  <div
                    className="w-full rounded-t bg-brand/20 transition-all hover:bg-brand/35"
                    style={{ height: `${Math.max(8, (item.value / max) * 100)}%` }}
                  />
                </div>
                <span className="text-[8.5px] text-ink-mute">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-4">
          <p className="text-[11px] font-semibold text-ink">Most viewed listings</p>
          <div className="mt-3 space-y-3">
            {top.map((product, index) => (
              <div key={product.id}>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[9.5px] font-medium text-ink">{product.name}</p>
                  <span className="text-[8.5px] text-ink-mute">{[268, 194, 121, 76][index]} views</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-deep">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: `${[82, 64, 48, 32][index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-[9px] text-ink-mute">
        <Settings2 className="size-3" /> All figures are static sample values included for illustration.
      </p>
    </div>
  );
}

export default function DashboardPreview() {
  const [panel, setPanel] = useState('overview');
  const [products, setProducts] = useState(initialProducts);
  const [enquiries, setEnquiries] = useState(enquiriesSeed);
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState({ name: '', price: '', section: 'Smartphones', description: '' });
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: shop.name,
    tagline: shop.tagline,
    phone: shop.phone,
    whatsapp: '+234 800 000 0103',
    unit: `${shop.location.block} · ${shop.location.unit}`,
    hours: '9:00 AM – 7:00 PM',
    about: shop.story,
  });

  const current = navItems.find((item) => item.id === panel);
  const unread = enquiries.filter((item) => item.unread).length;

  const addProduct = (event) => {
    event.preventDefault();
    const price = Number(String(draft.price).replace(/[^\d]/g, ''));
    if (!draft.name.trim() || !price) {
      toast({ title: 'Add a name and price', description: 'Both are required before a listing can be published.', tone: 'info' });
      return;
    }
    setProducts((items) => [
      {
        id: `demo-${Date.now()}`,
        name: draft.name.trim(),
        price,
        unit: 'per unit',
        section: draft.section,
        description: draft.description || 'Sample listing added inside the seller portal preview.',
        specs: [
          { label: 'Added', value: 'This preview session' },
          { label: 'Status', value: 'Draft' },
        ],
        image: '/img/categories/cat-electronics.webp',
        stock: 1,
        status: 'Live',
      },
      ...items,
    ]);
    setDraft({ name: '', price: '', section: 'Smartphones', description: '' });
    setAddOpen(false);
    setPanel('products');
    toast({
      title: 'Product added to preview',
      description: 'This listing exists in the browser tab only — a live portal would publish it.',
      tone: 'info',
    });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-800 uppercase ring-1 ring-amber-200">
            <span className="size-1.5 rounded-full bg-amber-500" /> Seller portal preview
          </span>
          <span className="text-[11px] text-ink-mute">Interactive demo · sample data only</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10.5px] text-ink-mute">
          <span className="size-1.5 rounded-full bg-emerald-500" /> Click around the dashboard
        </span>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-float">
        <div className="flex items-center gap-2.5 border-b border-line bg-canvas/80 px-3 py-2.5 sm:px-4">
          <div className="flex gap-1.5">
            <span className="size-2 rounded-full bg-red-300" />
            <span className="size-2 rounded-full bg-amber-300" />
            <span className="size-2 rounded-full bg-emerald-300" />
          </div>
          <div className="mx-auto hidden w-full max-w-xs items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[9.5px] text-ink-mute sm:flex">
            <Store className="size-3" />
            seller.bdpamarket.demo / dashboard
          </div>
          <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[8.5px] font-semibold tracking-wide text-ink-mute uppercase ring-1 ring-line sm:ml-0">
            Coming soon
          </span>
        </div>

        <div className="grid lg:grid-cols-[15rem_1fr]">
          {/* Sidebar */}
          <aside className="hidden flex-col bg-ink px-3 py-4 lg:flex">
            <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.06] px-2.5 py-2">
              <ShopLogo shop={shop} size="sm" ring={false} />
              <div className="min-w-0">
                <p className="truncate text-[10.5px] font-semibold text-white">{profile.name}</p>
                <p className="text-[8.5px] text-white/45">Seller account · demo</p>
              </div>
            </div>

            <nav className="mt-4 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPanel(item.id)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[11px] font-medium transition',
                    panel === item.id ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white/85',
                  )}
                >
                  <item.icon className="size-3.5" strokeWidth={1.9} />
                  {item.label}
                  {item.id === 'enquiries' && unread > 0 && (
                    <span className="ml-auto grid size-4 place-items-center rounded-full bg-emerald-400 text-[8px] font-bold text-ink">
                      {unread}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-auto rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="text-[9px] leading-relaxed text-white/50">
                This sidebar is part of a concept preview. No account, login or backend exists.
              </p>
              <button
                type="button"
                onClick={() => toast({ title: 'Login is not available', description: 'Authentication is outside the scope of this demonstration.', tone: 'info' })}
                className="mt-2 inline-flex h-7 w-full items-center justify-center rounded-md bg-white/10 text-[9.5px] font-semibold text-white/85 transition hover:bg-white/15"
              >
                Seller login (demo)
              </button>
            </div>
          </aside>

          {/* Main */}
          <div className="min-w-0 bg-canvas/70">
            <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-3 py-2.5 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-ink">{current?.label}</p>
                <p className="truncate text-[9px] text-ink-mute">
                  {profile.name} · {profile.unit}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toast({ title: 'No new alerts', description: 'Notifications are part of the illustrative dashboard.', tone: 'info' })}
                className="relative grid size-8 place-items-center rounded-full border border-line bg-white text-ink-soft transition hover:text-ink"
                aria-label="Notifications"
              >
                <Bell className="size-3.5" />
                {unread > 0 && <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-brand" />}
              </button>
              <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-[9px] font-bold text-brand-dark">
                {shop.monogram}
              </span>
            </div>

            {/* Mobile panel tabs */}
            <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line bg-white px-2 py-2 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPanel(item.id)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9.5px] font-semibold transition',
                    panel === item.id ? 'bg-ink text-white' : 'bg-canvas text-ink-soft',
                  )}
                >
                  <item.icon className="size-3" /> {item.label}
                </button>
              ))}
            </div>

            <div className="p-3 sm:p-5">
              {panel === 'overview' && <Overview products={products} onNavigate={setPanel} />}
              {panel === 'products' && (
                <ProductsPanel products={products} setProducts={setProducts} onAdd={() => setAddOpen(true)} />
              )}
              {panel === 'profile' && <ProfilePanel profile={profile} setProfile={setProfile} />}
              {panel === 'enquiries' && <EnquiriesPanel enquiries={enquiries} setEnquiries={setEnquiries} />}
              {panel === 'analytics' && <AnalyticsPanel products={products} />}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add a product"
        description="A preview of the listing form. The product will appear in the dashboard table only."
        icon={Package}
      >
        <form onSubmit={addProduct} className="space-y-3">
          <label className="block">
            <span className="text-[10.5px] font-semibold tracking-wide text-ink-soft uppercase">Product name</span>
            <input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              placeholder="e.g. Anker 30W fast charger"
              className="mt-1 h-10 w-full rounded-xl border border-line bg-canvas px-3 text-[13px] outline-none transition focus:border-brand/40 focus:bg-white"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[10.5px] font-semibold tracking-wide text-ink-soft uppercase">Price (₦)</span>
              <input
                value={draft.price}
                onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                inputMode="numeric"
                placeholder="15000"
                className="mt-1 h-10 w-full rounded-xl border border-line bg-canvas px-3 text-[13px] outline-none transition focus:border-brand/40 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-[10.5px] font-semibold tracking-wide text-ink-soft uppercase">Section</span>
              <select
                value={draft.section}
                onChange={(event) => setDraft({ ...draft, section: event.target.value })}
                className="mt-1 h-10 w-full rounded-xl border border-line bg-canvas px-3 text-[13px] outline-none transition focus:border-brand/40 focus:bg-white"
              >
                {shop.sections.map((section) => (
                  <option key={section}>{section}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[10.5px] font-semibold tracking-wide text-ink-soft uppercase">Short description</span>
            <textarea
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              rows={3}
              placeholder="What should customers know about this item?"
              className="mt-1 w-full resize-none rounded-xl border border-line bg-canvas px-3 py-2.5 text-[13px] outline-none transition focus:border-brand/40 focus:bg-white"
            />
          </label>
          <div className="flex items-start gap-2 rounded-xl border border-line bg-canvas px-3 py-2.5">
            <ImagePlus className="mt-0.5 size-4 shrink-0 text-ink-mute" />
            <p className="text-[10.5px] leading-relaxed text-ink-soft">
              Photo upload is disabled in the preview. In the real portal you would take a photo or pick one
              from your gallery.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-1 sm:flex-row">
            <Button type="button" variant="ghost" className="sm:flex-1" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="sm:flex-[1.4]" Icon={Plus}>
              Add to preview
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
