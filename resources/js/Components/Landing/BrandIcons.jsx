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
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
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
            <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.2 3.6h-2.1L12 13.2l-1.7 2.4H8.2l2.8-3.9-2.6-3.7h2.1l1.5 2.2 1.5-2.2h2.1l-2.6 3.7 2.9 3.9z" />
        </svg>
    );
}

export function MysqlIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12.44 2.083c-.8 0-1.6.2-2.3.6C7.3 4.283 5.4 8.083 6.1 11.883c.4 2.2 1.6 4.1 3.3 5.4l-.8 1.9c-.2.5.1 1 .6 1.1h.2c.4 0 .7-.2.9-.6l.9-2.1c.4.1.8.2 1.2.2 5.5 0 10-4.28 10-9.5S17.94 2.083 12.44 2.083z" />
        </svg>
    );
}

export function PostgresqlIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2a10 10 0 0 0-7.3 16.8 9.9 9.9 0 0 0 13.9-13.9A9.9 9.9 0 0 0 12 2zm-1.2 5.3c1.6 0 3 .7 4 1.9 1 1.2 1.4 2.8 1.1 4.4-.3 1.6-1.5 3-3 3.6-1.5.7-3.3.4-4.5-.6-1.2-1-1.8-2.6-1.5-4.2.3-1.6 1.6-3 3.1-3.6.3-.3.5-.5.8-.5zm.2 1.5c-1 0-1.9.6-2.2 1.6-.3 1 .1 2 .8 2.7.8.7 1.8.9 2.8.5 1-.4 1.7-1.3 1.8-2.4.1-1-.4-2-1.2-2.5-.6-.4-1.3-.5-2-.5z" />
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

export function CiscoIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M1 11v2h2v-2H1zm3.6-3v8h2V8h-2zm3.6-3v14h2V5h-2zm3.6-3v20h2V2h-2zm3.6 3v14h2V5h-2zm3.6 3v8h2V8h-2zm3.6 3v2h2v-2h-2z" />
        </svg>
    );
}

export function PythonIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M11.897 2.015c-5.187 0-4.858 2.253-4.858 2.253l.006 2.333h4.922v.695H5.09s-3.09.352-3.09 4.966c0 4.614 2.698 4.79 2.698 4.79h1.615v-2.277s-.088-2.698 2.698-2.698h4.639s2.523.042 2.523-2.477V4.542s.379-2.527-4.576-2.527zm-2.628 1.488a.965.965 0 1 1 0 1.93.965.965 0 0 1 0-1.93zm9.641 5.959h-1.615v2.277s.088 2.698-2.698 2.698h-4.639s-2.523-.042-2.523 2.477v4.542s-.379 2.527 4.576 2.527c5.187 0 4.858-2.253 4.858-2.253l-.006-2.333h-4.922v-.695h6.877s3.09-.352 3.09-4.966c0-4.614-2.698-4.79-2.698-4.79zm-2.348 11.536a.965.965 0 1 1 0-1.93.965.965 0 0 1 0 1.93z" />
        </svg>
    );
}

export function JavaIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.873.187 4.968-.231 0 0 .564.387 1.156.634-3.15.776-7.253.513-8.877-.282.842-.47 2.1-.835 2.1-.835zm-1.042-3.082s-1.127.768.423.953c2.091.247 3.993.187 6.467-.282 0 0 .393.366.906.564-3.782.723-8.847.457-10.457-.354.912-.489 2.661-.881 2.661-.881zm11.396.645s.553.486.082.912c-.933.844-3.921 1.637-8.082 1.637-3.69 0-6.726-.645-7.659-1.464-.378-.332.327-.723.776-.879-.447.168-.781.428-.431.737.933.818 3.969 1.341 7.314 1.341 3.754 0 6.648-.553 7.424-1.282.261-.247.576-.972.576-.972zm-7.643-15.023s1.282 1.341-.431 3.424c-1.398 1.701-1.74 2.646-1.042 3.639.697.994 2.007.822 2.378 1.488.372.666.186 1.408-.666 2.339 0 0 1.258-1.042.842-1.921-.416-.879-1.908-1.173-1.637-2.152.271-.979 1.688-1.579 2.05-3.029.362-1.45-1.494-3.787-1.494-3.787z" />
        </svg>
    );
}

export function PhpIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4.7 13.5H5.8l.9-4.5h2.1c1.2 0 2.1.8 2.1 2.1 0 1.5-1.1 2.4-2.6 2.4zm5.8 0h-1.5l.9-4.5h1.5l-.9 4.5zm5.8 0h-1.5l.9-4.5h2.1c1.2 0 2.1.8 2.1 2.1 0 1.5-1.1 2.4-2.6 2.4z" />
        </svg>
    );
}

export function AwsIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.75 11.25c-.24 0-.48.06-.69.17-.42.22-.68.65-.68 1.13v3.95c0 .48.26.91.68 1.13.21.11.45.17.69.17s.48-.06.69-.17c.42-.22.68-.65.68-1.13v-3.95c0-.48-.26-.91-.68-1.13a1.44 1.44 0 0 0-.69-.17zm-13.5 0c-.24 0-.48.06-.69.17-.42.22-.68.65-.68 1.13v3.95c0 .48.26.91.68 1.13.21.11.45.17.69.17s.48-.06.69-.17c.42-.22.68-.65.68-1.13v-3.95c0-.48-.26-.91-.68-1.13a1.44 1.44 0 0 0-.69-.17zm6.75 6.75c4.14 0 7.5-1.79 7.5-4s-3.36-4-7.5-4-7.5 1.79-7.5 4 3.36 4 7.5 4z" />
        </svg>
    );
}

export function VueIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M2 3h3.2L12 15 18.8 3H22L12 21 2 3zm6.5 0h3L12 8.8 14.5 3h3L12 12.6 8.5 3z" />
        </svg>
    );
}

export function AngularIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2.5L2.5 5.8l1.4 12.3L12 21.5l8.1-3.4 1.4-12.3L12 2.5zm0 3.3l4.5 10.2h-2.1l-.9-2.2H10.5l-.9 2.2H7.5L12 5.8zm1.1 6.3h-2.2L12 9.4l1.1 2.7z" />
        </svg>
    );
}

export function TypescriptIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M3 3h18v18H3V3zm8.7 8.3H8.3v7.2H6.5v-7.2H3.1V9.8h8.6v1.5zm6.5 2.1c-.4-.3-.9-.5-1.5-.7-.4-.1-.8-.3-1.1-.4-.2-.1-.4-.3-.4-.5 0-.2.1-.4.3-.5.2-.1.5-.2.9-.2.5 0 1 .1 1.5.4l.7-1.3c-.6-.4-1.4-.6-2.2-.6-1 0-1.8.3-2.3.8-.5.5-.8 1.2-.8 2 0 .7.2 1.3.7 1.7.5.4 1.1.7 1.8.9.5.1.9.3 1.2.4.2.1.3.3.3.5 0 .3-.2.5-.5.6-.3.1-.8.2-1.3.2-.6 0-1.3-.2-1.9-.5l-.7 1.4c.7.4 1.6.7 2.6.7 1.2 0 2.1-.3 2.7-.9.6-.6.9-1.4.9-2.3 0-.8-.3-1.5-.8-1.9z" />
        </svg>
    );
}

export function JavascriptIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M3 3h18v18H3V3zm11.5 13.8c.4.3.9.5 1.5.5.6 0 1-.2 1-.6 0-.4-.4-.6-1.1-.9l-.5-.2c-1.1-.4-1.8-1-1.8-2.2 0-1.3 1-2.2 2.6-2.2 1.1 0 1.9.3 2.4.7l-.7 1.3c-.4-.3-.9-.5-1.4-.5-.5 0-.8.2-.8.5 0 .4.4.6 1.1.9l.5.2c1.3.5 1.9 1.1 1.9 2.3 0 1.4-1.1 2.3-2.8 2.3-1.2 0-2.2-.4-2.8-.9l.7-1.2zm-4.7.2c.3.2.7.4 1.1.4.6 0 1-.3 1-1.2V9.8h1.8v6.7c0 1.8-1 2.6-2.6 2.6-.9 0-1.6-.2-2-.5l.7-1.3z" />
        </svg>
    );
}

export function NextjsIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5l-6.8-9.4H8v9.4h1.5v-6.7l5.5 7.6h1.5v-.9z" />
        </svg>
    );
}

export function FlutterIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M14.3 2.5L7 9.8l3.6 3.6 7.3-7.3h-3.6zm-3.6 11l-3.6-3.6L2.5 14.5l3.6 3.6 4.6-4.6zm3.6 3.6l3.6-3.6h3.6l-3.6 3.6 3.6 3.6h-3.6l-3.6-3.6z" />
        </svg>
    );
}

export function RedisIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm7 13.5l-7 3.5-7-3.5V9.5l7-3.5 7 3.5v6z" />
        </svg>
    );
}

export function MongodbIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2.2s-5.8 4.2-5.8 10.3c0 4.2 2.9 7.3 5.8 9.3 2.9-2 5.8-5.1 5.8-9.3 0-6.1-5.8-10.3-5.8-10.3zm.7 16.3v-5.6l2.3-2.3v7.9H12.7z" />
        </svg>
    );
}

export function LinuxIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2c-2.8 0-5 2.2-5 5 0 1.2.4 2.3 1.1 3.2C6.3 11.4 5 13.5 5 16c0 3.3 3.1 6 7 6s7-2.7 7-6c0-2.5-1.3-4.6-3.1-5.8.7-.9 1.1-2 1.1-3.2 0-2.8-2.2-5-5-5zm-2 5c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm4 0c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1z" />
        </svg>
    );
}

export function NginxIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2L2 7.8v8.4l10 5.8 10-5.8V7.8L12 2zm5 12.8l-5-7.5v7.5H10V8.7l5 7.5V8.7h2v6.1z" />
        </svg>
    );
}

export function VercelIcon({ className = "w-5 h-5", ...props }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 1L24 22H0L12 1z" />
        </svg>
    );
}
