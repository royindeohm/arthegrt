import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CATEGORIES, CATEGORY_META } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import SkeletonCard from '../components/common/SkeletonCard';

const HomePage = () => {
  const { products, loading, toggleCategory } = useContext(ProductContext);

  const featuredProducts = products
    .filter((p) => p.rating >= 4.7)
    .slice(0, 4);

  const categoryCards = CATEGORIES.map((category) => {
    const count = products.filter((p) => p.category === category).length;
    const icon = CATEGORY_META[category]?.icon || 'storefront';
    return { category, count, icon };
  });

  return (
    <main>
      <section className="relative w-full h-[640px] flex items-center overflow-hidden bg-inverse-surface" aria-labelledby="hero-title">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            className="w-full h-full object-cover opacity-80"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
            alt="Hero"
          />
        </div>
        <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-16 w-full">
          <div className="max-w-3xl space-y-8 text-white">
            <span className="inline-block font-headline-sm uppercase text-xs tracking-[0.3em] opacity-80">Season 2024</span>
            <h1 id="hero-title" className="font-headline-lg text-[48px] md:text-[72px] leading-[1.1] font-bold tracking-tight">
              Quiet Luxury<br />Defined.
            </h1>
            <p className="font-body-lg opacity-70 max-w-lg font-light leading-relaxed">
              Meticulously engineered essentials for the modern professional. Experience the convergence of heritage craft and forward performance.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/products" className="bg-primary-container text-on-primary-container border-2 border-on-surface px-12 py-5 font-headline-sm uppercase text-sm font-bold hover:bg-primary hover:text-on-primary transition-all pixel-button-shadow">
                Shop Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:px-16 max-w-[1440px] mx-auto px-4" aria-labelledby="categories-title">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 gap-4">
          <div className="space-y-1">
            <h2 id="categories-title" className="font-headline-md text-2xl font-bold text-on-surface uppercase">Curated Selection</h2>
            <div className="h-2 w-32 bg-secondary-container" />
            <p className="text-on-surface-variant font-light">The core essentials for a refined lifestyle.</p>
          </div>
          <Link to="/products" className="font-headline-sm uppercase text-primary text-sm font-bold border-b-2 border-primary pb-1 hover:border-secondary-container transition-all">
            View All Pieces
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar custom-scrollbar" role="list">
          {categoryCards.map(({ category, count, icon }) => (
            <Link
              key={category}
              to="/products"
              className="group flex-shrink-0 w-48 cursor-pointer"
              onClick={() => toggleCategory(category)}
              role="listitem"
              aria-label={`Shop ${category} category, ${count} products available`}
            >
              <div className="relative bg-surface-container-lowest border-4 border-on-surface p-6 flex flex-col items-center gap-4 transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0px_0px_rgba(38,24,28,1)] shadow-[6px_6px_0px_0px_rgba(38,24,28,1)]">
                <div className="w-16 h-16 bg-surface-container border-2 border-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[32px]">{icon}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-headline-sm uppercase text-sm font-bold text-on-surface">{category}</h3>
                  <p className="text-xs text-on-surface-variant font-light">{count} products</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-lg group-hover:text-primary transition-colors">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 md:px-16 max-w-[1440px] mx-auto px-4" aria-labelledby="featured-title">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <div className="space-y-1">
            <h2 id="featured-title" className="font-headline-md text-2xl font-bold text-on-surface uppercase">Trending Now</h2>
            <div className="h-2 w-32 bg-secondary-container" />
            <p className="text-on-surface-variant font-light">Top rated products highly recommended by customers</p>
          </div>
          <Link to="/products" className="font-headline-sm uppercase text-primary text-sm font-bold border-b-2 border-primary pb-1 hover:border-secondary-container transition-all">
            View All Pieces
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" aria-busy="true" aria-label="Loading featured products">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="py-16 md:px-16 max-w-[1440px] mx-auto px-4" aria-labelledby="newsletter-title">
        <div className="relative bg-primary-container border-4 border-on-surface p-12 text-center shadow-[8px_8px_0px_0px_rgba(38,24,28,1)]">
          <h2 id="newsletter-title" className="font-headline-md text-2xl font-bold text-on-primary-container uppercase">Stay in the Loop</h2>
          <div className="h-2 w-32 bg-secondary-container mx-auto my-4" />
          <p className="text-on-primary-container/70 mb-8 max-w-md mx-auto">Subscribe to our newsletter for exclusive drops, restocks, and member-only deals.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-surface-container-lowest border-2 border-on-surface px-4 py-3 text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary-container transition-all"
            />
            <button className="bg-secondary-container text-on-secondary-container border-2 border-on-surface px-6 py-3 font-headline-sm uppercase text-sm font-bold hover:bg-secondary-fixed transition-all pixel-button-shadow">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;