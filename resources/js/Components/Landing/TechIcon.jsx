import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import {
    ReactIcon,
    LaravelIcon,
    TailwindIcon,
    InertiaIcon,
    NodeIcon,
    ExpressIcon,
    MysqlIcon,
    PostgresqlIcon,
    DockerIcon,
    GitIcon,
    FigmaIcon,
    CiscoIcon,
    PythonIcon,
    JavaIcon,
    PhpIcon,
    AwsIcon,
    VueIcon,
    AngularIcon,
    TypescriptIcon,
    JavascriptIcon,
    NextjsIcon,
    FlutterIcon,
    RedisIcon,
    MongodbIcon,
    LinuxIcon,
    NginxIcon,
    VercelIcon
} from './BrandIcons';

export const localIconMap = {
    react: ReactIcon,
    laravel: LaravelIcon,
    tailwind: TailwindIcon, 'tailwind css': TailwindIcon, 'tailwindcss': TailwindIcon,
    inertia: InertiaIcon, 'inertia.js': InertiaIcon, 'inertiajs': InertiaIcon,
    node: NodeIcon, 'node.js': NodeIcon, 'nodejs': NodeIcon,
    express: ExpressIcon, 'express.js': ExpressIcon, 'expressjs': ExpressIcon,
    mysql: MysqlIcon,
    postgresql: PostgresqlIcon, postgres: PostgresqlIcon,
    docker: DockerIcon,
    git: GitIcon, github: GitIcon,
    figma: FigmaIcon,
    cisco: CiscoIcon,
    python: PythonIcon,
    java: JavaIcon,
    php: PhpIcon,
    aws: AwsIcon,
    vue: VueIcon, 'vue.js': VueIcon, 'vuejs': VueIcon,
    angular: AngularIcon,
    typescript: TypescriptIcon, ts: TypescriptIcon,
    javascript: JavascriptIcon, js: JavascriptIcon,
    nextjs: NextjsIcon, 'next.js': NextjsIcon,
    flutter: FlutterIcon,
    redis: RedisIcon,
    mongodb: MongodbIcon, mongo: MongodbIcon,
    linux: LinuxIcon,
    nginx: NginxIcon,
    vercel: VercelIcon,
};

export default function TechIcon({ iconName, name, className = "w-5 h-5" }) {
    const [status, setStatus] = useState('TRY_LOCAL'); // TRY_LOCAL -> TRY_URL -> TRY_CDN -> FALLBACK

    const normalizedName = (name || '').toLowerCase().trim();
    const normalizedId = (iconName || normalizedName).toLowerCase().trim();

    // 1. Local Icon Component
    const IconComponent = localIconMap[normalizedId] || localIconMap[normalizedName];
    if (IconComponent && status === 'TRY_LOCAL') {
        return <IconComponent className={className} />;
    }

    // 2. Direct Image URL / Path (http, https, data:, /storage)
    const isUrl = normalizedId.startsWith('http://') ||
                  normalizedId.startsWith('https://') ||
                  normalizedId.startsWith('/') ||
                  normalizedId.startsWith('data:');

    if (isUrl && status !== 'FALLBACK') {
        return (
            <img
                src={iconName}
                alt={name || iconName}
                className={`${className} object-contain`}
                onError={() => setStatus('FALLBACK')}
            />
        );
    }

    // 3. Dynamic SimpleIcons / Devicon CDN Fallback
    if (normalizedId && status !== 'FALLBACK') {
        const cdnUrl = `https://cdn.simpleicons.org/${encodeURIComponent(normalizedId)}`;
        return (
            <img
                src={cdnUrl}
                alt={name || iconName}
                className={`${className} object-contain dark:invert-0`}
                onError={() => setStatus('FALLBACK')}
            />
        );
    }

    // 4. Fallback Lucide Icon
    return <Layers className={`${className} text-gray-400`} />;
}
