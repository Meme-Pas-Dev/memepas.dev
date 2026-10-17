// Avant l'affichage de la page : signale que JavaScript est actif (data-js) et le système du
// visiteur (data-platform : linux, macos ou windows ; rien pour les téléphones et tablettes).
// La page affiche ainsi d'emblée la bonne variante, sans décalage au chargement. Rien n'est transmis.
(function () {
	var root = document.documentElement;
	root.dataset.js = '';
	try {
		var nav = navigator;
		var hint = nav.userAgentData;
		var ua = nav.userAgent;
		if ((hint && hint.mobile) || /android|iphone|ipad|ipod|mobile/i.test(ua)) return;
		var platform = ((hint && hint.platform) || '').toLowerCase();
		if (platform === 'windows' || /windows nt/i.test(ua)) root.dataset.platform = 'windows';
		else if (platform === 'macos' || /macintosh|mac os x/i.test(ua)) {
			// Un iPad récent se présente comme un Mac : on l'écarte grâce à l'écran tactile.
			if (!(nav.maxTouchPoints > 1)) root.dataset.platform = 'macos';
		} else if (platform === 'linux' || /linux|x11|cros/i.test(ua)) root.dataset.platform = 'linux';
	} catch (e) {}
})();
