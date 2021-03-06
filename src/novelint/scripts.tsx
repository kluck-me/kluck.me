import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Fix for kuromoji cdn dict
const xmlHttpRequestPrototype = XMLHttpRequest.prototype;
const originalXMLHttpRequestOpen = xmlHttpRequestPrototype.open;
Object.assign(xmlHttpRequestPrototype, {
  open(method: string, url: string, async: boolean) {
    const fixedUrl = url.replace(/^(\w+:)\/+/, '$1//');
    return originalXMLHttpRequestOpen.call(this, method, fixedUrl, async);
  },
});

ReactDOM.render(<App />, document.querySelector('#app'));
