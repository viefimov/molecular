import type { Preview } from '@storybook/react';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: {
				wide: {
					type: 'desktop',
					name: 'Wide Desktop',
					styles: { width: '1920', height: '1488' },
				},
				desktop: {
					type: 'desktop',
					name: 'Desktop',
					styles: { width: '1280px', height: '720px' },
				},
				tablet: {
					type: 'desktop',
					name: 'Tablet',
					styles: { width: '768px', height: '1024px' },
				},
				mobile: {
					type: 'desktop',
					name: 'Small Mobile',
					styles: { width: '320px', height: '568px' },
				},
			},
		},
	},
};

export default preview;
