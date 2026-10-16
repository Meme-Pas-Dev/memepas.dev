// Applique le thème choisi par le visiteur avant l'affichage de la page.
// Le choix est conservé dans le navigateur uniquement (localStorage), jamais transmis.
try {
	var theme = localStorage.getItem('theme');
	if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch (e) {}
