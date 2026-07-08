import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-inverse-surface border-t-4 border-secondary" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-12 py-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-headline-md italic uppercase font-bold text-2xl text-inverse-primary" aria-label="ELITE Home">
              ELITE
            </Link>
            <p className="mt-4 text-sm text-inverse-on-surface leading-relaxed max-w-xs">
              Curating exceptional goods since 2012. Providing an uncompromising retail experience for those who demand excellence.
            </p>
          </div>

          <div>
            <h4 className="font-headline-sm uppercase text-xs font-bold text-inverse-primary mb-6">Company</h4>
            <nav className="flex flex-col gap-3" aria-label="Company links">
              <span className="text-sm text-inverse-on-surface hover:text-inverse-primary transition-colors cursor-pointer">About Us</span>
              <span className="text-sm text-inverse-on-surface hover:text-inverse-primary transition-colors cursor-pointer">Journal</span>
              <span className="text-sm text-inverse-on-surface hover:text-inverse-primary transition-colors cursor-pointer">Careers</span>
            </nav>
          </div>

          <div>
            <h4 className="font-headline-sm uppercase text-xs font-bold text-inverse-primary mb-6">Support</h4>
            <nav className="flex flex-col gap-3" aria-label="Support links">
              <span className="text-sm text-inverse-on-surface hover:text-inverse-primary transition-colors cursor-pointer">Contact</span>
              <span className="text-sm text-inverse-on-surface hover:text-inverse-primary transition-colors cursor-pointer">Orders</span>
              <span className="text-sm text-inverse-on-surface hover:text-inverse-primary transition-colors cursor-pointer">Returns</span>
            </nav>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-headline-sm uppercase text-xs font-bold text-inverse-primary mb-6">Newsletter</h4>
            <div className="relative">
              <input
                className="w-full bg-inverse-surface py-3 px-4 pr-10 border-2 border-inverse-on-surface text-inverse-on-surface text-sm placeholder:text-inverse-on-surface/50 focus:outline-none focus:border-secondary-container transition-all"
                placeholder="Email Address"
                type="email"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary-container text-lg">arrow_forward</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t-2 border-inverse-on-surface/20">
          <span className="font-label-caps uppercase text-xs text-inverse-on-surface tracking-wider">© {currentYear} ELITE LUXURY RETAIL</span>
          <div className="flex gap-6 text-sm text-inverse-on-surface">
            <a className="hover:text-inverse-primary transition-colors cursor-pointer">Privacy</a>
            <a className="hover:text-inverse-primary transition-colors cursor-pointer">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
