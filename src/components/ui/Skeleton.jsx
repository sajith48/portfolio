import { cn } from '../../utils/cn';

export const Skeleton = ({ className, variant = 'rectangular', ...props }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--color-text)]/5',
        variant === 'rectangular' ? 'rounded-2xl' : 'rounded-full',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-[var(--color-text)]/10 to-transparent" />
    </div>
  );
};
