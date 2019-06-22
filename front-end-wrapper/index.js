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
	singleSpa.registerApplication(
		'app-product',
		() => System.import('app-product'),
		location =>
			location.pathname.startsWith('/products') ||
			location.pathname.startsWith('/product-add') ||
			location.pathname.startsWith('/product-details/') ||
			location.pathname.startsWith('/product-edit/')
	);
	singleSpa.registerApplication(
		'app-order',
		() => System.import('app-order'),
		location =>
			location.pathname.startsWith('/orders') ||
			location.pathname.startsWith('/order-add') ||
			location.pathname.startsWith('/order-details/') ||
			location.pathname.startsWith('/order-edit/')
	);
	singleSpa.start();
});
