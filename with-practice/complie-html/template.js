window.loadComponent = (function() {
    const fetchAndParse = async URL => {
        const htmlStr = await fetch(URL).then(res => {
            return res.text();
        });
        const parser = new DOMParser();
        const document = parser.parseFromString(htmlStr, 'text/html');
        const head = document.head;
        const template = head.querySelector('template');
        const style = head.querySelector('style');
        const script = head.querySelector('script');
        return {
            template,
            style,
            script
        };
    };

    const registerComponent = ({ template, style, name, listeners }) => {
        class UnityComponent extends HTMLElement {
            connectedCallback() {
                this._upcast();
                this._attachListeners();
            }
            _upcast() {
                const shadow = this.attachShadow({ mode: 'open' });

                shadow.appendChild(style.cloneNode(true));
                shadow.appendChild(document.importNode(template.content, true));
            }
            _attachListeners() {
                Object.entries(listeners).forEach(([event, listener]) => {
                    this.addEventListener(event, listener, false);
                });
            }
        }
        return customElements.define(name, UnityComponent);
    };

    const getListeners = settings => {
        console.log(settings);
        return Object.entries(settings).reduce(
            (listeners, [setting, value]) => {
                if (setting.startsWith('on')) {
                    listeners[
                        setting[2].toLowerCase() + setting.substr(3)
                    ] = value;
                }

                return listeners;
            },
            {}
        );
    };

    const getSettings = ({ template, style, script }) => {
        const jsFile = new Blob([script.textContent], {
            type: 'application/javascript'
        });
        const jsURL = URL.createObjectURL(jsFile);
        return import(jsURL).then(module => {
            const listeners = getListeners(module.default);
            return {
                name: module.default.name,
                template,
                listeners,
                style
            };
        });
    };

    async function loadComponent(URL) {
        const urlWIthParse = await fetchAndParse(URL);
        const urlWIthSetting = await getSettings(urlWIthParse);
        const component = await registerComponent(urlWIthSetting);
        return component;
    }
    return loadComponent;
})();
