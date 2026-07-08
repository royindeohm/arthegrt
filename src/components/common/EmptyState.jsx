import { Link } from 'react-router-dom';

const EmptyState = ({ icon, title, description, actionText, actionTo }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center" role="status">
      {icon && (
        <div className="text-surface-container-highest mb-6" aria-hidden="true">
          <span className="material-symbols-outlined text-[72px]">{icon}</span>
        </div>
      )}
      <h2 className="font-headline-sm text-xl font-bold text-on-surface mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-on-surface-variant max-w-md mb-8">{description}</p>
      )}
      {actionText && actionTo && (
        <Link to={actionTo} className="inline-flex items-center justify-center px-6 py-3 bg-primary-container text-on-primary-container border-2 border-on-surface font-headline-sm uppercase text-sm font-bold hover:bg-primary hover:text-on-primary transition-colors pixel-button-shadow">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
