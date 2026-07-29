import React from 'react';

export function GithubIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

export function LinkedinIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
    );
}

export function ReactIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
    );
}

export function LaravelIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.6 4.2-7.6 4.2-7.6-4.2L12 4.3zM4.1 9.4l6.9 3.8v7.6l-6.9-3.8V9.4zm15.8 7.6l-6.9 3.8v-7.6l6.9-3.8v7.6z" />
        </svg>
    );
}

export function TailwindIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
    );
}

export function InertiaIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M6.3 3h4.4L17.7 12l-7 9H6.3l7-9-7-9zm7 0h4.4l7 9-7 9h-4.4l7-9-7-9z" />
        </svg>
    );
}

export function NodeIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2L2 7.8v8.4l10 5.8 10-5.8V7.8L12 2zm-1 15.3l-5-2.9v-5.8l5 2.9v5.8zm2 0v-5.8l5-2.9v5.8l-5 2.9zm6-9.7l-7 4.1-7-4.1 7-4.1 7 4.1z" />
        </svg>
    );
}

export function ExpressIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4h2v4zm0-6h-2v-2h2v2z" />
        </svg>
    );
}

export function MysqlIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.5 1.5 4.7 3.8 6.1-.2.8-.8 1.9-1.8 2.7 1.2.1 2.5-.2 3.5-.8 1.4.6 3 .9 4.5.9 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
        </svg>
    );
}

export function PostgresqlIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
    );
}

export function DockerIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M13.98 11.08h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm9.54-3.18h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H10.8zm-3.18 0h2.12v2.12H7.62zm6.36-3.18h2.12v2.12h-2.12zM1.5 13.5c.5 4.5 4.5 7.5 10.5 7.5s10.5-3 10.5-7.5c-1 0-2.5.5-3.5.5-2 0-3.5-1-4.5-2-1 1-2.5 1.5-4.5 1.5s-3.5-.5-4.5-1.5c-1 1-2.5 1.5-4 1.5z" />
        </svg>
    );
}

export function GitIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L9 4.3 11.6 7c.6-.2 1.3 0 1.8.4.5.5.6 1.2.4 1.8l2.6 2.6c.6-.2 1.3 0 1.8.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.6-1.2-.4-1.8l-2.4-2.4v6.2c.2.1.4.3.5.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0-1.8-.7 0-2.5c.3-.3.7-.5 1.1-.6V8.9c-.4-.1-.8-.3-1.1-.6-.6-.6-.7-1.4-.4-2.1L7.7 3 2.4 8.3c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.5c.6-.5.6-1.4 0-1.9z" />
        </svg>
    );
}

export function FigmaIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6 6a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm6-3h3a3 3 0 1 1 0 6h-3V3z" />
        </svg>
    );
}
