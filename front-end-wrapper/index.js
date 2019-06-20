System.import('single-spa').then(function(singleSpa) {
	singleSpa.registerApplication('app-navbar', () => System.import('app-navbar'), location => true);
	singleSpa.registerApplication('app-report', () => System.import('app-report'), location => location.pathname.startsWith('/reports'));
	singleSpa.registerApplication(
		'app-consumer',
		() => System.import('app-consumer'),
		location =>
			location.pathname.startsWith('/consumers') ||
			location.pathname.startsWith('/consumer-add') ||
			location.pathname.startsWith('/consumer-details/') ||
			location.pathname.startsWith('/consumer-edit/')
	);
	singleSpa.start();
});
