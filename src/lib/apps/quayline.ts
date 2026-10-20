import type { AppDefinition } from './types';

// Textes repris du README public du dépôt Quayline.

const coprCommands = 'sudo dnf copr enable matt-mpd/quayline\nsudo dnf install quayline';

const rpmCommands = [
	'curl -fsSLO https://raw.githubusercontent.com/Meme-Pas-Dev/Quayline/main/packaging/signing-key.asc',
	'gpg --dearmor < signing-key.asc > quayline.gpg',
	'gpgv --keyring ./quayline.gpg SHA256SUMS.asc SHA256SUMS',
	'sha256sum -c --ignore-missing SHA256SUMS',
	'sudo dnf install ./Quayline-*.x86_64.rpm'
].join('\n');

export const quayline: AppDefinition = {
	slug: 'quayline',
	name: 'Quayline',
	repo: 'Meme-Pas-Dev/Quayline',
	copr: 'matt-mpd/quayline',
	category: 'DeveloperApplication',
	operatingSystem: 'Linux, macOS, Windows 11',
	license: { name: 'GPL-3.0-or-later', url: 'https://www.gnu.org/licenses/gpl-3.0.html' },
	files: [
		{
			id: 'rpm',
			platform: 'linux',
			pattern: /^Quayline-.+\.x86_64\.rpm$/,
			example: 'Quayline-X.Y.Z-N.x86_64.rpm',
			checksums: ['SHA256SUMS', 'SHA256SUMS.asc'],
			picto: { icon: 'package', tint: 'sand' }
		},
		{
			id: 'flatpak',
			platform: 'linux',
			pattern: /^quayline\.flatpak$/,
			example: 'quayline.flatpak',
			checksums: ['SHA256SUMS.flatpak', 'SHA256SUMS.flatpak.asc'],
			picto: { icon: 'box', tint: 'mint' }
		},
		{
			id: 'dmg',
			platform: 'macos',
			pattern: /^Quayline-.+-macos-arm64\.dmg$/,
			example: 'Quayline-X.Y.Z-macos-arm64.dmg',
			checksums: [],
			picto: { icon: 'laptop', tint: 'lilac' }
		},
		{
			id: 'exe',
			platform: 'windows',
			pattern: /^Quayline-.+-windows-x64-setup\.exe$/,
			example: 'Quayline-X.Y.Z-windows-x64-setup.exe',
			checksums: ['SHA256SUMS.windows', 'SHA256SUMS.windows.asc'],
			picto: { icon: 'monitor', tint: 'sky' }
		}
	],
	// Nom écrit comme dans la barre latérale de l'application : Inter Variable, 700, −0,01 em.
	nameClass: 'app-name-inter',
	icon: '/apps/quayline/icon.svg',
	// Captures du dépôt de développement (docs/medias), interface 1.10.0, données fictives.
	screenshots: [
		{ name: '01-hotes', width: 2560, height: 1600 },
		{ name: '02-terminal', width: 2560, height: 1600 },
		{ name: '03-sftp', width: 2560, height: 1600 },
		{ name: '04-editeur', width: 2560, height: 1600 },
		{ name: '05-verrouillage', width: 2560, height: 1600 },
		{ name: '08-reglages', width: 2560, height: 1600 },
		{ name: '09-reglages-securite', width: 2560, height: 1600 },
		{ name: '10-reglages-deverrouillage', width: 2560, height: 1600 }
	],
	heroScreenshot: { light: '01-hotes', dark: '06-hotes-sombre' },
	content: {
		fr: {
			tagline: 'Client SSH et SFTP pour Linux, macOS et Windows 11, pensé pour la sécurité.',
			summary:
				'Serveurs, identifiants et clés sont rangés dans un coffre chiffré, sur votre machine uniquement. L’interface est en français et en anglais.',
			card: 'Client SSH et SFTP pensé pour la sécurité. Serveurs, identifiants et clés sont rangés dans un coffre chiffré, sur votre machine uniquement.',
			highlights: [
				{ icon: 'lock', tint: 'mint', label: 'Coffre chiffré' },
				{ icon: 'eye-off', tint: 'sky', label: 'Aucune télémétrie' },
				{ icon: 'scale', tint: 'lilac', label: 'GPL-3.0' }
			],
			platforms: 'Linux · macOS · Windows 11',
			badges: [
				{ label: 'Logiciel libre · GPL-3.0', icon: 'scale' },
				{ label: 'Aucune télémétrie', icon: 'eye-off' },
				{ label: 'Paquets signés', icon: 'badge-check' },
				{ label: 'FIDO2 · OpenID Connect', icon: 'key' }
			],
			files: {
				rpm: { label: 'Fedora (RPM)', note: 'KDE Plasma et GNOME · x86_64 · sans mise à jour automatique' },
				flatpak: { label: 'Flatpak', note: 'Runtime GNOME de Flathub · sans mise à jour automatique' },
				dmg: { label: 'macOS', note: 'Apple Silicon · signée et notarisée par Apple' },
				exe: { label: 'Windows 11', note: 'x64 · préversion' }
			},
			smartscreen:
				'Installateur pas encore signé : SmartScreen affichera une alerte. Cliquez sur « Informations complémentaires », puis « Exécuter quand même ».',
			featuresTitle: 'Tout le nécessaire pour administrer vos serveurs, rien qui ne quitte votre machine.',
			features: [
				{
					icon: 'terminal',
					tint: 'lilac',
					title: 'Terminal et SFTP',
					text: 'Terminal SSH à onglets et explorateur SFTP en double panneau (glisser-déposer, transferts en arrière-plan, permissions), ouverture de l’un depuis l’autre. Terminal local dans un onglet, à côté des sessions SSH (`Ctrl+Maj+T`, `Cmd+T` sous macOS), sauf dans le Flatpak qui reste isolé du système.'
				},
				{
					icon: 'pencil',
					tint: 'sky',
					title: 'Édition à distance',
					text: 'Les fichiers distants se modifient dans un éditeur intégré ou dans l’application par défaut du système, les changements étant renvoyés au serveur.'
				},
				{
					icon: 'lock',
					tint: 'mint',
					title: 'Coffre chiffré',
					text: 'Serveurs, mots de passe et clés SSH, avec export et import chiffrés pour la sauvegarde ou le passage à un autre ordinateur.'
				},
				{
					icon: 'key',
					tint: 'sand',
					title: 'Déverrouillage au choix',
					text: 'Mot de passe maître, clé de sécurité FIDO2 (YubiKey, Nitrokey…) ou fournisseur d’identité OpenID Connect (Pocket ID ; Authentik, Authelia, Keycloak, Microsoft Entra ID et Google en bêta), y compris depuis un téléphone par QR code.'
				},
				{
					icon: 'clock',
					tint: 'lilac',
					title: 'Verrouillage automatique',
					text: 'Après inactivité, au verrouillage de la session ou de l’écran, et avant la mise en veille.'
				},
				{
					icon: 'shield-check',
					tint: 'mint',
					title: 'Vérifications et hygiène',
					text: 'Vérification des clés d’hôte (alerte bloquante si elle change), copie des mots de passe avec effacement automatique du presse-papiers, mises à jour signalées par l’application (installées en un clic sous macOS), thème clair ou sombre.'
				}
			],
			security: {
				title: 'Un coffre entièrement chiffré',
				intro: 'Tout est chiffré, y compris la liste des serveurs ; toute altération du fichier est détectée.',
				chain: [
					{ label: 'Mot de passe maître', icon: 'rectangle-ellipsis' },
					{ label: 'Argon2id', detail: '256 Mio, 3 passes', highlight: true, icon: 'hash' },
					{ label: 'Clé de données aléatoire', icon: 'shuffle' },
					{ label: 'XChaCha20-Poly1305', detail: 'coffre chiffré', highlight: true, icon: 'lock' }
				],
				chainCaption: 'Le mot de passe maître protège une clé de données aléatoire, qui chiffre le coffre.',
				points: [
					{
						icon: 'cpu', tint: 'sky',
						title: 'Mémoire',
						text: 'Clé de données et secrets effacés au verrouillage du coffre, core dumps désactivés, processus non traçable (Linux, macOS).'
					},
					{
						icon: 'files', tint: 'lilac',
						title: 'Une seule copie à la fois',
						text: 'Le fichier du coffre est réservé à la copie qui l’a déverrouillé : deux copies ne peuvent pas écraser les modifications l’une de l’autre.'
					},
					{
						icon: 'app-window', tint: 'sand',
						title: 'Interface isolée',
						text: 'Aucun secret ne repart vers l’interface web ; politique de sécurité stricte, aucune ressource distante.'
					},
					{
						icon: 'file-check', tint: 'mint',
						title: 'Paquets signés',
						text: 'Le RPM, le Flatpak et l’installateur Windows sont accompagnés d’empreintes signées avec la clé du projet ; les paquets COPR sont signés par COPR, le service de compilation de Fedora ; l’application macOS est signée et notarisée par Apple.'
					}
				],
				warning:
					'Le mot de passe maître est **irrécupérable**. Sauvegarder le fichier du coffre (il est chiffré) ou faire un export chiffré protège contre la perte du fichier, **pas contre l’oubli du mot de passe** : gardez-le en lieu sûr.',
				resetLink: 'Mot de passe oublié : repartir de zéro',
				resetHref: 'https://github.com/Meme-Pas-Dev/Quayline#utilisation',
				modelLink: 'Lire le modèle de sécurité complet',
				reportLink: 'Signaler une faille'
			},
			install: [
				{
					id: 'fedora',
					label: 'Fedora',
					platform: 'linux',
					icon: 'package',
					blocks: [
						{
							type: 'p',
							text: 'Le plus simple est le dépôt COPR : paquets compilés et signés par COPR, le service de compilation de Fedora, mis à jour avec le reste du système (`sudo dnf upgrade`). Quayline n’apparaît pas encore dans le catalogue de Discover ni de GNOME Logiciels : l’installer depuis un terminal.'
						},
						{ type: 'code', code: coprCommands },
						{
							type: 'p',
							text: 'Ou installer le RPM à la main : télécharger depuis la dernière release le RPM (`Quayline-X.Y.Z-N.x86_64.rpm`), `SHA256SUMS` et `SHA256SUMS.asc`, puis vérifier la signature et l’empreinte avant d’installer :'
						},
						{ type: 'code', code: rpmCommands },
						{
							type: 'p',
							text: 'Pour une installation manuelle, la mise à jour suit la même procédure avec la nouvelle release (`dnf` remplace l’ancienne version et garde le coffre).'
						}
					]
				},
				{
					id: 'flatpak',
					label: 'Flatpak',
					platform: 'linux',
					icon: 'box',
					blocks: [
						{
							type: 'p',
							text: 'Le Flatpak se vérifie de la même façon avec `SHA256SUMS.flatpak` et `SHA256SUMS.flatpak.asc`, puis s’installe ainsi (runtime GNOME de Flathub) :'
						},
						{ type: 'code', code: 'flatpak install --user ./quayline.flatpak' },
						{
							type: 'p',
							text: 'Il ne se met pas à jour tout seul : l’application annonce les nouvelles versions, à installer de la même façon (Flathub est prévu). Son coffre est rangé dans `~/.var/app/dev.memepas.quayline/`.'
						}
					]
				},
				{
					id: 'macos',
					label: 'macOS',
					platform: 'macos',
					icon: 'laptop',
					blocks: [
						{
							type: 'p',
							text: 'Télécharger `Quayline-X.Y.Z-macos-arm64.dmg` (Apple Silicon), puis glisser Quayline dans Applications. L’application est signée (Developer ID) et notarisée par Apple, et installe elle-même ses mises à jour après votre accord.'
						},
						{
							type: 'p',
							text: 'Le coffre est rangé dans `~/Library/Application Support/dev.memepas.quayline/`.'
						}
					]
				},
				{
					id: 'windows',
					label: 'Windows 11',
					platform: 'windows',
					icon: 'monitor',
					blocks: [
						{
							type: 'p',
							text: 'Télécharger `Quayline-X.Y.Z-windows-x64-setup.exe` et le lancer. L’installateur propose d’installer pour l’utilisateur actif seulement (sans compte administrateur) ou pour tous les utilisateurs.'
						},
						{
							type: 'p',
							text: 'Il n’est pas encore signé : Windows SmartScreen affiche « Windows a protégé votre ordinateur » (« Informations complémentaires » → « Exécuter quand même »). Il se vérifie avec `SHA256SUMS.windows`, signé avec la clé du projet (`SHA256SUMS.windows.asc`) :'
						},
						{ type: 'code', code: 'Get-FileHash .\\Quayline-*-windows-x64-setup.exe' },
						{
							type: 'p',
							text: 'Pour vérifier aussi la signature de `SHA256SUMS.windows.asc`, il faut GnuPG, fourni sous Windows par Gpg4win (gpg4win.org), puis la clé publique du projet (`signing-key.asc`) :'
						},
						{ type: 'code', code: 'gpg --import signing-key.asc\ngpg --verify SHA256SUMS.windows.asc SHA256SUMS.windows' },
						{
							type: 'p',
							text: 'Les clés de sécurité (FIDO2) passent par la fenêtre de Windows (choix de la clé, code PIN, toucher). Le terminal local est désactivé par défaut sous Windows : il s’active dans Réglages → Terminal. Le coffre est rangé dans `%APPDATA%\\dev.memepas.quayline\\`.'
						}
					]
				}
			],
			privacy:
				'Quayline n’envoie aucune télémétrie. Il ne se connecte qu’aux serveurs et au fournisseur d’identité que vous configurez et, si vous l’autorisez (question posée une fois), à GitHub pour rechercher une nouvelle version.',
			license:
				'Distribué sous licence GNU GPL version 3 ou ultérieure. Toute version modifiée et redistribuée doit l’être sous la même licence, avec son code source.',
			screenshotAlt: [
				'Liste des hôtes, rangés par groupes',
				'Session SSH dans le terminal à onglets',
				'Explorateur SFTP en double panneau, avec la colonne des permissions',
				'Éditeur intégré, avec coloration syntaxique d’un fichier YAML',
				'Écran de verrouillage : mot de passe maître, clé de sécurité ou Pocket ID',
				'Réglages généraux : apparence et mises à jour',
				'Réglages de sécurité : verrouillage, presse-papiers et délai de reconnexion',
				'Moyens de déverrouillage : clés de sécurité FIDO2 et Pocket ID'
			]
		},
		en: {
			tagline: 'A security-focused SSH and SFTP client for Linux, macOS and Windows 11.',
			summary:
				'Servers, credentials and keys are kept in an encrypted vault, on your machine only. The interface is available in English and French.',
			card: 'A security-focused SSH and SFTP client. Servers, credentials and keys are kept in an encrypted vault, on your machine only.',
			highlights: [
				{ icon: 'lock', tint: 'mint', label: 'Encrypted vault' },
				{ icon: 'eye-off', tint: 'sky', label: 'No telemetry' },
				{ icon: 'scale', tint: 'lilac', label: 'GPL-3.0' }
			],
			platforms: 'Linux · macOS · Windows 11',
			badges: [
				{ label: 'Free software · GPL-3.0', icon: 'scale' },
				{ label: 'No telemetry', icon: 'eye-off' },
				{ label: 'Signed packages', icon: 'badge-check' },
				{ label: 'FIDO2 · OpenID Connect', icon: 'key' }
			],
			files: {
				rpm: { label: 'Fedora (RPM)', note: 'KDE Plasma and GNOME · x86_64 · no automatic updates' },
				flatpak: { label: 'Flatpak', note: 'GNOME runtime from Flathub · no automatic updates' },
				dmg: { label: 'macOS', note: 'Apple Silicon · signed and notarized by Apple' },
				exe: { label: 'Windows 11', note: 'x64 · preview' }
			},
			smartscreen:
				'The installer is not signed yet: SmartScreen will show a warning. Click “More info”, then “Run anyway”.',
			featuresTitle: 'Everything you need to manage your servers, nothing that leaves your machine.',
			features: [
				{
					icon: 'terminal',
					tint: 'lilac',
					title: 'Terminal and SFTP',
					text: 'Tabbed SSH terminal and dual-pane SFTP browser (drag and drop, background transfers, permissions); each one opens from the other. Local terminal in a tab, next to SSH sessions (`Ctrl+Shift+T`, `Cmd+T` on macOS), except in the Flatpak, which stays isolated from the system.'
				},
				{
					icon: 'pencil',
					tint: 'sky',
					title: 'Remote editing',
					text: 'Remote files can be edited in a built-in editor or in the system’s default application, changes being sent back to the server.'
				},
				{
					icon: 'lock',
					tint: 'mint',
					title: 'Encrypted vault',
					text: 'Servers, passwords and SSH keys, with encrypted export and import for backups or moving to another computer.'
				},
				{
					icon: 'key',
					tint: 'sand',
					title: 'Your choice of unlock',
					text: 'Master password, FIDO2 security key (YubiKey, Nitrokey…) or OpenID Connect identity provider (Pocket ID; Authentik, Authelia, Keycloak, Microsoft Entra ID and Google in beta), including from a phone via a QR code.'
				},
				{
					icon: 'clock',
					tint: 'lilac',
					title: 'Automatic lock',
					text: 'After inactivity, when the session or screen is locked, and before sleep.'
				},
				{
					icon: 'shield-check',
					tint: 'mint',
					title: 'Checks and hygiene',
					text: 'Host key verification (blocking alert if it changes), password copy with automatic clipboard clearing, updates announced by the app (one-click install on macOS), light or dark theme.'
				}
			],
			security: {
				title: 'A fully encrypted vault',
				intro: 'Everything is encrypted, including the server list; any tampering with the file is detected.',
				chain: [
					{ label: 'Master password', icon: 'rectangle-ellipsis' },
					{ label: 'Argon2id', detail: '256 MiB, 3 passes', highlight: true, icon: 'hash' },
					{ label: 'Random data key', icon: 'shuffle' },
					{ label: 'XChaCha20-Poly1305', detail: 'encrypted vault', highlight: true, icon: 'lock' }
				],
				chainCaption: 'The master password protects a random data key, which encrypts the vault.',
				points: [
					{
						icon: 'cpu', tint: 'sky',
						title: 'Memory',
						text: 'The data key and secrets are wiped when the vault is locked, core dumps are disabled, the process cannot be traced (Linux, macOS).'
					},
					{
						icon: 'files', tint: 'lilac',
						title: 'One copy at a time',
						text: 'The vault file is reserved for the copy that unlocked it: two copies cannot overwrite each other’s changes.'
					},
					{
						icon: 'app-window', tint: 'sand',
						title: 'Isolated interface',
						text: 'No secret is ever sent back to the web interface; strict content security policy, no remote resources.'
					},
					{
						icon: 'file-check', tint: 'mint',
						title: 'Signed packages',
						text: 'The RPM, the Flatpak and the Windows installer come with checksums signed with the project key; COPR packages are signed by COPR, Fedora’s build service; the macOS app is signed and notarized by Apple.'
					}
				],
				warning:
					'The master password **cannot be recovered**. Backing up the vault file (it is encrypted) or making an encrypted export protects against losing the file, **not against forgetting the password**: keep it somewhere safe.',
				resetLink: 'Forgotten password: start over',
				resetHref: 'https://github.com/Meme-Pas-Dev/Quayline#usage',
				modelLink: 'Read the full security model (in French)',
				reportLink: 'Report a vulnerability'
			},
			install: [
				{
					id: 'fedora',
					label: 'Fedora',
					platform: 'linux',
					icon: 'package',
					blocks: [
						{
							type: 'p',
							text: 'The simplest way is the COPR repository: packages built and signed by COPR, Fedora’s build service, updated with the rest of the system (`sudo dnf upgrade`). Quayline does not appear in the Discover or GNOME Software catalog yet: install it from a terminal.'
						},
						{ type: 'code', code: coprCommands },
						{
							type: 'p',
							text: 'Or install the RPM by hand: from the latest release, download the RPM (`Quayline-X.Y.Z-N.x86_64.rpm`), `SHA256SUMS` and `SHA256SUMS.asc`, then check the signature and checksum before installing:'
						},
						{ type: 'code', code: rpmCommands },
						{
							type: 'p',
							text: 'For a manual install, update with the same steps and the new release (`dnf` replaces the previous version and keeps the vault).'
						}
					]
				},
				{
					id: 'flatpak',
					label: 'Flatpak',
					platform: 'linux',
					icon: 'box',
					blocks: [
						{
							type: 'p',
							text: 'The Flatpak is checked the same way with `SHA256SUMS.flatpak` and `SHA256SUMS.flatpak.asc`, then installed with (GNOME runtime from Flathub):'
						},
						{ type: 'code', code: 'flatpak install --user ./quayline.flatpak' },
						{
							type: 'p',
							text: 'It is not updated automatically: the app announces new versions, to install the same way (Flathub is planned). Its vault is stored in `~/.var/app/dev.memepas.quayline/`.'
						}
					]
				},
				{
					id: 'macos',
					label: 'macOS',
					platform: 'macos',
					icon: 'laptop',
					blocks: [
						{
							type: 'p',
							text: 'Download `Quayline-X.Y.Z-macos-arm64.dmg` (Apple Silicon), then drag Quayline into Applications. The app is signed (Developer ID) and notarized by Apple, and installs its updates itself once you agree.'
						},
						{
							type: 'p',
							text: 'The vault is stored in `~/Library/Application Support/dev.memepas.quayline/`.'
						}
					]
				},
				{
					id: 'windows',
					label: 'Windows 11',
					platform: 'windows',
					icon: 'monitor',
					blocks: [
						{
							type: 'p',
							text: 'Download `Quayline-X.Y.Z-windows-x64-setup.exe` and run it. The installer offers to install for the current user only (no administrator account needed) or for all users.'
						},
						{
							type: 'p',
							text: 'It is not signed yet: Windows SmartScreen shows “Windows protected your PC” (“More info” → “Run anyway”). You can check it against `SHA256SUMS.windows`, signed with the project key (`SHA256SUMS.windows.asc`):'
						},
						{ type: 'code', code: 'Get-FileHash .\\Quayline-*-windows-x64-setup.exe' },
						{
							type: 'p',
							text: 'To also check the signature of `SHA256SUMS.windows.asc`, you need GnuPG, provided on Windows by Gpg4win (gpg4win.org), and the project’s public key (`signing-key.asc`):'
						},
						{ type: 'code', code: 'gpg --import signing-key.asc\ngpg --verify SHA256SUMS.windows.asc SHA256SUMS.windows' },
						{
							type: 'p',
							text: 'Security keys (FIDO2) go through Windows’ own window (key choice, PIN, touch). The local terminal is off by default on Windows: turn it on in Settings → Terminal. The vault is stored in `%APPDATA%\\dev.memepas.quayline\\`.'
						}
					]
				}
			],
			privacy:
				'Quayline sends no telemetry. It only connects to the servers and identity provider you configure and, if you allow it (asked once), to GitHub to check for a new version.',
			license:
				'Distributed under the GNU GPL version 3 or later. Any modified version that is redistributed must be released under the same license, with its source code.',
			screenshotAlt: [
				'Host list, organised in groups',
				'SSH session in the tabbed terminal',
				'Dual-pane SFTP browser, with the permissions column',
				'Built-in editor, with syntax highlighting for a YAML file',
				'Lock screen: master password, security key or Pocket ID',
				'General settings: appearance and updates',
				'Security settings: lock, clipboard and sign-in grace period',
				'Unlock methods: FIDO2 security keys and Pocket ID'
			]
		}
	}
};
