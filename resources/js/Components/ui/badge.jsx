import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-blue-500/20 text-blue-400 border-blue-500/30',
                secondary: 'border-transparent bg-slate-800 text-slate-300',
                destructive: 'border-transparent bg-rose-500/20 text-rose-400 border-rose-500/30',
                outline: 'text-slate-300 border-slate-700',
                warning: 'border-transparent bg-amber-500/20 text-amber-400 border-amber-500/30',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
