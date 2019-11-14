### A fork of aot-loader
This is a fork of [aot-loader](https://github.com/egoist/aot-loader)

The difference is that you can return whatever you want from `getData`:

```es6
			rules: [
        {
					test: /modules\/module-list.ts/,
					use: [
            {
                loader: 'aot-loader',
                options: {
                    getData: (exported, context) => {
                        const requires = exported.map(mod => `require('${mod}')`).join(',\n');
                        const str = `export default [ ${requires} ];`;
                        return str;
                    }
                }
            },
						{
							loader: 'ts-loader',
							options: {
								happyPackMode: true,
								compilerOptions: {
									transpileOnly: true,
								},
							},
            },
					],
        },   
        ....
      ]
```