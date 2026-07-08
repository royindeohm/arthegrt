import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="px-4 py-16 max-w-2xl mx-auto text-center">
      <div className="font-headline-lg font-bold text-[120px] leading-none text-on-surface" aria-hidden="true">
        404
      </div>
      <h1 className="font-headline-lg text-2xl font-bold text-on-surface uppercase tracking-tight mt-4" id="not-found-title">
        Page Not Found
      </h1>
      <div className="h-2 w-32 bg-secondary-container mx-auto my-4" />
      <p className="text-on-surface-variant text-sm mt-4 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="inline-block bg-primary-container text-on-primary-container border-2 border-on-surface py-3 px-6 font-headline-sm uppercase text-sm font-bold hover:bg-primary hover:text-on-primary transition-colors mt-8 pixel-button-shadow">
        Go Back Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
