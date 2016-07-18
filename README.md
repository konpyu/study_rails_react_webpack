## Study for Rails app with React + webpack

### demands

- your rails app is on service, so there are already js codes under `app/assets/javascript`. So, when you will add new webpack-build js code, you need to co-exist `sprokets` build pipeline.

### Construct way

make rails app first.

```
$ rails new Hoge
$ cd Hoge
```

make frontend directory just under rails-root

```
$ mkdir frontend
$ cd frontend
```

introduce frontend modules

```
$ npm init -y
$ npm i --save-dev babel \
                   babel-cli \
                   babel-core \
                   babel-loader \
                   babel-preset-es2015 \
                   babel-preset-react \
                   expect \
                   webpack
                   
$ npm i --save immutable \
               react \
               react-dom \
               react-redux \
               redux
```

add webpack config. build js to dist directory and load it from sprockets

```js
// frontend/webpack.config.json
module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'webpack_frontend.js'
  }
}
```

add babel setting

```js
// frontend/.babelrc
{
  "presets": ["es2015","react"]
}
```

add test React compoment

```js
// frontend/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/hello'

window.addEventListener('DOMContentLoaded', run, false);

function run() {
  ReactDOM.render(
    <Hello />,
    document.getElementById('app-react-area')
  )
}
```

```js
// frontend/components/hello.jsx
import React from 'react';

export default React.createClass({
  render: function() {
    return <div className="hello"><p>hoge</p>
    </div>;
  }
});
```

build it

```bash
$ node_modules/webpack/bin/webpack.js --watch
$ cat dist/webpack_frontend.js
... built js codes ...
```

To find js file under the frontend directory, add asset path to rails config.

```ruby
# config/application.rb
module YourAppName
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("frontend") # add it
  end
end
```

Import it from sprockets.

```
// app/assets/javascript/application.js
//= require dist/webpack_frontend
```


