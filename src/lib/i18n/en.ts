import type { fr } from './fr';

export const en: typeof fr = {
	meta: {
		siteName: 'Meme-Pas-Dev',
		homeTitle: 'Meme-Pas-Dev — free software, built with AI',
		homeDescription:
			'Useful apps, or apps missing on some platforms, built by vibe coding with AI and shared freely. No tracking.',
		downloadsTitle: 'Downloads',
		downloadsDescription: 'All Meme-Pas-Dev apps to download, with their signed checksums.',
		legalTitle: 'Legal information',
		legalDescription: 'Legal notice, privacy, cookies, accessibility and credits for memepas.dev.',
		notFoundTitle: 'Page not found'
	},
	nav: {
		label: 'Main navigation',
		skip: 'Skip to content',
		home: 'Home',
		apps: 'Apps',
		downloads: 'Downloads',
		about: 'About',
		otherLang: 'Français',
		otherLangShort: 'FR',
		otherLangLabel: 'Version française',
		themeToDark: 'Switch to dark theme',
		themeToLight: 'Switch to light theme'
	},
	footer: {
		tagline: 'Useful apps that are free and respect your privacy.',
		links: 'Footer links',
		noTracking: 'This site sets no cookies and does not track its visitors.',
		legal: 'Legal notice',
		privacy: 'Privacy',
		accessibility: 'Accessibility',
		github: 'GitHub'
	},
	home: {
		badge: 'Free software, built with AI',
		title: 'The apps I was missing. Built, then shared.',
		intro:
			'I build apps by vibe coding: tools I need, or that don’t exist on some platforms. Here they are, free to download.',
		ctaApps: 'Discover the apps',
		ctaDownloads: 'All downloads',
		principlesLabel: 'Principles',
		principles: [
			{
				title: 'Useful first',
				text: 'Each app meets a real need, or fills a gap on a platform.'
			},
			{
				title: 'Free and open',
				text: 'Public source code on GitHub, releases built and signed by continuous integration.'
			},
			{
				title: 'Security and privacy',
				text: 'No telemetry in the apps. No cookies or tracking on this site.'
			}
		],
		catalogEyebrow: 'Apps',
		catalogTitle: 'The catalogue',
		seeAllDownloads: 'See all downloads',
		discover: 'Discover',
		nextTitle: 'Next app',
		nextText: 'Under construction. It will join the catalogue once it has proven itself.',
		githubTitle: 'Everything is on GitHub',
		githubText: 'Source code, releases and release notes:',
		whyEyebrow: 'Why this site',
		whyTitle: 'Not even a developer? And yet.',
		why: [
			'With AI, a precise idea can become working software: describe, try, fix, until you get exactly the tool you wanted. That is vibe coding.',
			'I started by filling my own gaps. Some of these apps are now part of my daily routine; it would have been a shame to keep them to myself.'
		],
		disclaimer:
			'These apps are free software, provided without warranty. Feedback and bug reports go to GitHub, in each app’s repository.'
	},
	app: {
		breadcrumb: 'Breadcrumb',
		inBrief: 'At a glance',
		forYourSystem: 'For your system',
		chooseSystem: 'Choose your system',
		version: 'Version',
		publishedOn: 'released on',
		download: 'Download',
		downloadFor: 'Download for',
		otherSystems: 'Other systems and checksums',
		releaseNotes: 'Release notes',
		recommendedCopr: 'Recommended: COPR repository',
		coprNote: 'Packages signed by COPR, Fedora’s build service, updated with',
		manualNote: 'RPM package and Flatpak: no automatic updates, the COPR repository is recommended.',
		copy: 'Copy',
		copied: 'Copied',
		copyCommands: 'Copy the commands',
		screenshotsLabel: 'Screenshots',
		previous: 'Previous screenshot',
		next: 'Next screenshot',
		showScreenshot: 'Show screenshot',
		featuresEyebrow: 'Features',
		securityEyebrow: 'Security',
		installEyebrow: 'Install',
		installTitle: 'Step-by-step installation',
		systemTabs: 'System',
		privacy: 'Privacy',
		license: 'Free software',
		sourceCode: 'Source code on GitHub'
	},
	downloads: {
		title: 'Downloads',
		intro:
			'The latest version of each app. Files are published on GitHub, with their signed checksums, release notes and full history.',
		filterLabel: 'Filter by system',
		all: 'All',
		system: 'System',
		file: 'File',
		verification: 'Verification',
		size: 'Size',
		download: 'Download',
		presentation: 'About the app',
		releaseNotes: 'Release notes',
		previousVersions: 'Previous versions',
		versionOf: 'version',
		of: 'of',
		coprHint: 'On Fedora, prefer the COPR repository (automatic updates):',
		verifyTitle: 'Verify a file',
		verifyText:
			'Checksums of the Linux and Windows packages are signed with the project’s GPG key. The macOS app is signed and notarized by Apple.',
		publicKey: 'Project public key',
		howTo: 'How to',
		smartscreenTitle: 'Windows: SmartScreen warning',
		smartscreenText: 'The installer is not signed yet. Click “More info”, then “Run anyway”.',
		githubTitle: 'Hosted on GitHub',
		githubText:
			'The buttons point to the files of the GitHub release: downloads are served by GitHub’s servers.',
		appleSignature: 'Apple signature'
	},
	legal: {
		title: 'Legal information',
		updated: 'Last updated:',
		toc: 'Contents',
		sections: {
			mentions: 'Legal notice',
			privacy: 'Privacy',
			cookies: 'Cookies and trackers',
			accessibility: 'Accessibility',
			credits: 'Credits and licences'
		},
		publisherLabel: 'Publisher',
		publisher:
			'Meme-Pas-Dev, non-professional publisher. In accordance with article 6 of the French law on confidence in the digital economy (LCEN), the publisher’s identity has been provided to the host.',
		contactLabel: 'Contact',
		hostLabel: 'Host',
		sourceLabel: 'Source code',
		privacyTitle: 'Privacy policy',
		privacySummary: 'In short: this site asks you nothing, does not track you and loads no external resources.',
		privacy: [
			'No account, no form, no audience measurement. Fonts, images and scripts are served by the site itself.',
			'Like any host, Cloudflare processes technical connection data (including the IP address) to deliver pages and protect the service against abuse. The publisher only has access to the aggregate statistics Cloudflare derives from it (number of requests, crawlers…), with no individual tracking of visitors; request logging is disabled.',
			'Cloudflare also adds two things by default that the publisher does not control: “NEL” (Network Error Logging) headers, which ask your browser to report failed connections to the site to Cloudflare, never successful visits, in order to detect network outages; and a bot-detection script, which the site’s security policy prevents from running.',
			'Download buttons lead to files published on GitHub (GitHub, Inc.): by clicking, you leave this site and GitHub’s privacy policy applies.',
			'If you write by email, your message is only used to reply to you. You have the rights provided by the GDPR and may lodge a complaint with the CNIL (French data protection authority).'
		],
		cookiesText:
			'This site sets no cookies and uses no trackers, so no consent banner is needed. The light or dark theme follows your system settings; if you change it, the choice is kept in your browser only and never sent anywhere.',
		accessibilityText:
			'This site aims for WCAG 2.2 level AA: keyboard navigation, sufficient contrast in both themes, text alternatives. Found a barrier?',
		accessibilityLink: 'Report it on GitHub',
		credits: [
			'Fonts: Bricolage Grotesque, Geist and Inter — SIL Open Font License',
			'Icons: Lucide — ISC licence',
			'Apps: each app has its own licence (Quayline: GNU GPL version 3 or later)'
		]
	},
	notFound: {
		title: 'Page not found',
		text: 'This page does not exist or has moved.',
		back: 'Back to home'
	},
	os: {
		linux: 'Linux',
		macos: 'macOS',
		windows: 'Windows'
	}
};
