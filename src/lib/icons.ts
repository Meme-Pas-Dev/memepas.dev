// Pictos du site : icônes Lucide désignées par leur nom, et teintes des pastilles.
import Accessibility from '@lucide/svelte/icons/accessibility';
import AppWindow from '@lucide/svelte/icons/app-window';
import Award from '@lucide/svelte/icons/award';
import BadgeCheck from '@lucide/svelte/icons/badge-check';
import Box from '@lucide/svelte/icons/box';
import Clock from '@lucide/svelte/icons/clock';
import CodeXml from '@lucide/svelte/icons/code-xml';
import Cookie from '@lucide/svelte/icons/cookie';
import Cpu from '@lucide/svelte/icons/cpu';
import EyeOff from '@lucide/svelte/icons/eye-off';
import FileCheck from '@lucide/svelte/icons/file-check';
import Files from '@lucide/svelte/icons/files';
import FolderGit2 from '@lucide/svelte/icons/folder-git-2';
import Gift from '@lucide/svelte/icons/gift';
import Hash from '@lucide/svelte/icons/hash';
import Info from '@lucide/svelte/icons/info';
import KeyRound from '@lucide/svelte/icons/key-round';
import Landmark from '@lucide/svelte/icons/landmark';
import Laptop from '@lucide/svelte/icons/laptop';
import Lock from '@lucide/svelte/icons/lock';
import Mail from '@lucide/svelte/icons/mail';
import Monitor from '@lucide/svelte/icons/monitor';
import Package from '@lucide/svelte/icons/package';
import Pencil from '@lucide/svelte/icons/pencil';
import Plus from '@lucide/svelte/icons/plus';
import RectangleEllipsis from '@lucide/svelte/icons/rectangle-ellipsis';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import Scale from '@lucide/svelte/icons/scale';
import Server from '@lucide/svelte/icons/server';
import ShieldCheck from '@lucide/svelte/icons/shield-check';
import Shuffle from '@lucide/svelte/icons/shuffle';
import Sparkles from '@lucide/svelte/icons/sparkles';
import Target from '@lucide/svelte/icons/target';
import Terminal from '@lucide/svelte/icons/terminal';
import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
import User from '@lucide/svelte/icons/user';
import type { Platform } from '$lib/apps/types';

export const icons = {
	accessibility: Accessibility,
	'app-window': AppWindow,
	award: Award,
	'badge-check': BadgeCheck,
	box: Box,
	clock: Clock,
	'code-xml': CodeXml,
	cookie: Cookie,
	cpu: Cpu,
	'eye-off': EyeOff,
	'file-check': FileCheck,
	files: Files,
	'folder-git': FolderGit2,
	gift: Gift,
	hash: Hash,
	info: Info,
	key: KeyRound,
	landmark: Landmark,
	laptop: Laptop,
	lock: Lock,
	mail: Mail,
	monitor: Monitor,
	package: Package,
	pencil: Pencil,
	plus: Plus,
	'rectangle-ellipsis': RectangleEllipsis,
	refresh: RefreshCw,
	scale: Scale,
	server: Server,
	'shield-check': ShieldCheck,
	shuffle: Shuffle,
	sparkles: Sparkles,
	target: Target,
	terminal: Terminal,
	'triangle-alert': TriangleAlert,
	user: User
};

export type IconName = keyof typeof icons;

/** Teintes des pastilles (couleurs définies dans app.css pour chaque thème). */
export type Tint = 'mint' | 'lilac' | 'sand' | 'sky';

export interface Picto {
	icon: IconName;
	tint: Tint;
}

/** Picto de chaque système (carte de téléchargement, filtre des téléchargements). */
export const platformPicto: Record<Platform, Picto> = {
	linux: { icon: 'package', tint: 'sand' },
	macos: { icon: 'laptop', tint: 'lilac' },
	windows: { icon: 'monitor', tint: 'sky' }
};
