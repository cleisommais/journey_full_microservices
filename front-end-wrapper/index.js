System.import('single-spa').then(function(singleSpa) {
	singleSpa.registerApplication('app-navbar', () => System.import('app-navbar'), location => true);
	singleSpa.registerApplication('app-report', () => System.import('app-report'), location => location.pathname.startsWith('/reports'));
	singleSpa.start();
});
