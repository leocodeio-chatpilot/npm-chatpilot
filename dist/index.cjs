var t=require("react"),e=require("react-icons/si"),a=require("react-icons/gi"),o=require("react-icons/io5"),r=require("react-hot-toast");function c(t){if(t&&t.__esModule)return t;var e=Object.create(null);return t&&Object.keys(t).forEach(function(a){if("default"!==a){var o=Object.getOwnPropertyDescriptor(t,a);Object.defineProperty(e,a,o.get?o:{enumerable:!0,get:function(){return t[a]}})}}),e.default=t,e}var i=/*#__PURE__*/c(t);exports.Capitalize=function(t){var e=t.str;return e.charAt(0).toUpperCase()+e.slice(1)},exports.ChatPilotBot=function(c){var l=c.apiKey,n=c.apiUrl,s=void 0===n?"https://api.chatpilot.com":n,p=t.useState(!1),h=p[0],u=p[1],m=t.useState([]),f=m[0],d=m[1],b=t.useState(""),v=b[0],g=b[1],E=t.useState(!1),y=E[0],N=E[1],w=t.useRef(null);return t.useEffect(function(){var t;null==(t=w.current)||t.scrollIntoView({behavior:"smooth"})},[f]),i.createElement("div",{className:"chatpilot-fixed chatpilot-bottom-4 chatpilot-right-4"},i.createElement(r.Toaster,{position:"top-right"}),h?i.createElement("div",{className:"chatpilot-container"},i.createElement("div",{className:"chatpilot-header"},i.createElement("div",{className:"chatpilot-flex chatpilot-items-center chatpilot-gap-2"},i.createElement(e.SiChatbot,{className:"chatpilot-w-6 chatpilot-h-6"}),i.createElement("span",{className:"chatpilot-font-semibold"},"ChatPilot")),i.createElement("button",{onClick:function(){return u(!1)},className:"chatpilot-p-2 chatpilot-rounded-full hover:chatpilot-bg-gray-100"},i.createElement(a.GiCrossedBones,{className:"chatpilot-w-5 chatpilot-h-5"}))),i.createElement("div",{className:"chatpilot-h-96 chatpilot-overflow-y-auto chatpilot-p-4"},f.map(function(t,e){return i.createElement("div",{key:e,className:"chatpilot-mb-4 chatpilot-flex "+("user"===t.role?"chatpilot-justify-end":"chatpilot-justify-start")},i.createElement("div",{className:"chatpilot-max-w-[80%] chatpilot-rounded-lg chatpilot-p-3 "+("user"===t.role?"chatpilot-bg-blue-500 chatpilot-text-white":"chatpilot-bg-gray-200")},t.content))}),y&&i.createElement("div",{className:"chatpilot-flex chatpilot-justify-start chatpilot-mb-4"},i.createElement("div",{className:"chatpilot-bg-gray-200 chatpilot-rounded-lg chatpilot-p-3"},"Typing...")),i.createElement("div",{ref:w})),i.createElement("form",{onSubmit:function(t){try{if(t.preventDefault(),!v.trim())return Promise.resolve();var e={role:"user",content:v};return d([].concat(f,[e])),g(""),N(!0),Promise.resolve(function(t,a){try{var o=function(t,a){try{var o=Promise.resolve(fetch(s+"/prompt",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+l},body:JSON.stringify({messages:[].concat(f,[e])})})).then(function(t){if(!t.ok)throw new Error("Failed to get response");return Promise.resolve(t.json()).then(function(t){d(function(e){return[].concat(e,[{role:"assistant",content:t.response}])})})})}catch(t){return a()}return o&&o.then?o.then(void 0,a):o}(0,function(){r.toast.error("Failed to get response")})}catch(t){return a(!0,t)}return o&&o.then?o.then(a.bind(null,!1),a.bind(null,!0)):a(!1,o)}(0,function(t,e){if(N(!1),t)throw e;return e}))}catch(t){return Promise.reject(t)}},className:"chatpilot-p-4 chatpilot-border-t"},i.createElement("div",{className:"chatpilot-flex chatpilot-gap-2"},i.createElement("input",{type:"text",value:v,onChange:function(t){return g(t.target.value)},placeholder:"Type your message...",className:"chatpilot-flex-1 chatpilot-rounded-lg chatpilot-border chatpilot-p-2 chatpilot-focus:outline-none chatpilot-focus:ring-2 chatpilot-focus:ring-blue-500"}),i.createElement("button",{type:"submit",disabled:y,className:"chatpilot-bg-blue-500 chatpilot-text-white chatpilot-p-2 chatpilot-rounded-lg hover:chatpilot-bg-blue-600 chatpilot-transition-colors disabled:chatpilot-opacity-50"},i.createElement(o.IoSendSharp,{className:"chatpilot-w-5 chatpilot-h-5"}))))):i.createElement("button",{onClick:function(){return u(!0)},className:"chatpilot-bg-blue-500 chatpilot-text-white chatpilot-p-4 chatpilot-rounded-full hover:chatpilot-bg-blue-600 chatpilot-transition-colors"},i.createElement(e.SiChatbot,{className:"chatpilot-w-6 chatpilot-h-6"})))};
//# sourceMappingURL=index.cjs.map
