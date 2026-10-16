import type { AppDefinition } from '$lib/apps';
import type { ResolvedFile, ResolvedRelease } from '$lib/apps/types';

// Les versions sont lues dans l'API GitHub au moment de la construction du site,
// jamais depuis le navigateur des visiteurs.

interface GitHubAsset {
	name: string;
	size: number;
	browser_download_url: string;
}

interface GitHubRelease {
	tag_name: string;
	published_at: string | null;
	html_url: string;
	assets: GitHubAsset[];
}

const cache = new Map<string, Promise<GitHubRelease | null>>();

async function fetchLatest(repo: string): Promise<GitHubRelease | null> {
	const headers: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'memepas.dev-build'
	};
	// Jeton facultatif, fourni automatiquement par GitHub Actions, pour éviter la limite d'appels.
	const token = process.env.GITHUB_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;

	try {
		const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
		if (!response.ok) {
			console.warn(`[releases] ${repo} : réponse ${response.status}, liens génériques utilisés.`);
			return null;
		}
		return (await response.json()) as GitHubRelease;
	} catch (error) {
		console.warn(`[releases] ${repo} : ${String(error)}, liens génériques utilisés.`);
		return null;
	}
}

function getLatest(repo: string): Promise<GitHubRelease | null> {
	let pending = cache.get(repo);
	if (!pending) {
		pending = fetchLatest(repo);
		cache.set(repo, pending);
	}
	return pending;
}

export async function resolveRelease(app: AppDefinition): Promise<ResolvedRelease> {
	const base = `https://github.com/${app.repo}/releases`;
	const release = await getLatest(app.repo);

	// Sans release lisible : liens vers la dernière release, qui restent valables.
	const latestDownload = (name: string) => `${base}/latest/download/${name}`;

	const files = app.files.map((spec): ResolvedFile => {
		const asset = release?.assets.find((a) => spec.pattern.test(a.name));
		const checksums = spec.checksums.map((name) => {
			const sum = release?.assets.find((a) => a.name === name);
			return { name, url: sum ? sum.browser_download_url : latestDownload(name) };
		});
		if (asset) {
			return {
				id: spec.id,
				platform: spec.platform,
				name: asset.name,
				url: asset.browser_download_url,
				size: asset.size,
				checksums
			};
		}
		const stableName = !/X\.Y\.Z/.test(spec.example);
		return {
			id: spec.id,
			platform: spec.platform,
			name: spec.example,
			url: stableName ? latestDownload(spec.example) : `${base}/latest`,
			size: null,
			checksums
		};
	});

	return {
		version: release ? release.tag_name.replace(/^v/, '') : null,
		date: release?.published_at ?? null,
		notesUrl: release?.html_url ?? `${base}/latest`,
		allUrl: base,
		files
	};
}
