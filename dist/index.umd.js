!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("react-icons/si"),require("react-icons/gi"),require("react-icons/io5"),require("react-hot-toast")):"function"==typeof define&&define.amd?define(["exports","react","react-icons/si","react-icons/gi","react-icons/io5","react-hot-toast"],t):t((e||self).npmChatpilot={},e.react,e.ReactIconsSi,e.ReactIconsGi,e.ReactIconsIo5,e.reactHotToast)}(this,function(e,t,r,n,o,a){function i(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}}),t.default=e,t}var s=/*#__PURE__*/i(t);e.Capitalize=function(e){var t=e.str;return t.charAt(0).toUpperCase()+t.slice(1)},e.ChatPilotBot=function(e){var i=e.apiKey,c=e.apiUrl,l=void 0===c?"https://api.chatpilot.com":c,u=e.xApiKey,d=t.useState(!1),p=d[0],m=d[1],f=t.useState([]),h=f[0],b=f[1],g=t.useState(""),y=g[0],v=g[1],x=t.useState(!1),C=x[0],E=x[1],w=t.useRef(null);t.useEffect(function(){var e;null==(e=w.current)||e.scrollIntoView({behavior:"smooth"})},[h]);var I={container:{position:"fixed",bottom:"2rem",right:"2rem",zIndex:50},chatContainer:{maxWidth:"25rem",maxHeight:"35rem",backgroundColor:"white",borderRadius:"0.75rem",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",overflow:"hidden",zIndex:50},header:{display:"flex",alignItems:"center",justifyContent:"end",padding:"0.75rem"},closeButton:{cursor:"pointer",transition:"transform 0.3s ease-in-out",":hover":{transform:"scale(1.25)"}},messagesContainer:{height:"20rem",overflowY:"auto",padding:"1rem"},messageWrapper:function(e){return{marginBottom:"0.75rem",display:"flex",justifyContent:e?"flex-end":"flex-start"}},message:function(e){return{maxWidth:"75%",borderRadius:"1rem",padding:"0.75rem 1rem",backgroundColor:e?"#3b82f6":"#f3f4f6",color:e?"white":"black"}},noMessages:{textAlign:"center",color:"#9ca3af"},inputContainer:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem",borderTop:"1px solid #e5e7eb"},input:{flexGrow:1,padding:"0.75rem",borderRadius:"0.5rem",border:"1px solid #e5e7eb",outline:"none",":focus":{borderColor:"#3b82f6"}},sendButton:{backgroundColor:"#3b82f6",color:"white",borderRadius:"0.5rem",":hover":{backgroundColor:"#2563eb"}},chatButton:{backgroundColor:"#ef4444",color:"white",padding:"0.5rem",borderRadius:"9999px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",":hover":{backgroundColor:"#dc2626"}},chatbotIcon:{width:"1.5rem",height:"1.5rem"},inputWrapper:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem",borderTop:"1px solid #e5e7eb"}};return s.createElement("div",{style:I.container},s.createElement(a.Toaster,{position:"top-right"}),p?s.createElement("div",{style:I.chatContainer},s.createElement("div",{style:I.header},s.createElement("button",{onClick:function(){return m(!1)},className:"close-button"},s.createElement(n.GiCrossedBones,{style:I.closeButton}))),s.createElement("div",{style:I.messagesContainer},h.map(function(e,t){return s.createElement("div",{key:t,style:I.messageWrapper("user"===e.role)},s.createElement("div",{style:I.message("user"===e.role)},e.content))}),C&&s.createElement("div",{style:I.messageWrapper(!1)},s.createElement("div",{style:I.message(!1)},"Typing...")),s.createElement("div",{ref:w})),s.createElement("form",{onSubmit:function(e){try{return e.preventDefault(),y.trim()?(b([].concat(h,[{role:"user",content:y}])),v(""),E(!0),Promise.resolve(function(e,t){try{var r=function(e,t){try{var r=Promise.resolve(fetch(l+"/prompt",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+u},body:JSON.stringify({queryInput:y,apiKey:i})})).then(function(e){if(!e.ok)throw new Error("Failed to get response");return Promise.resolve(e.json()).then(function(e){b(function(t){return[].concat(t,[{role:"assistant",content:e.response}])})})})}catch(e){return t()}return r&&r.then?r.then(void 0,t):r}(0,function(){a.toast.error("Failed to get response")})}catch(e){return t(!0,e)}return r&&r.then?r.then(t.bind(null,!1),t.bind(null,!0)):t(!1,r)}(0,function(e,t){if(E(!1),e)throw t;return t}))):Promise.resolve()}catch(e){return Promise.reject(e)}},style:I.inputContainer},s.createElement("div",{style:I.inputWrapper},s.createElement("input",{type:"text",value:y,onChange:function(e){return v(e.target.value)},placeholder:"Type your message...",style:I.input}),s.createElement("button",{type:"submit",disabled:C,style:I.sendButton},s.createElement(o.IoSendSharp,{style:I.sendButton}))))):s.createElement("button",{onClick:function(){return m(!0)},className:"chat-button"},s.createElement(r.SiChatbot,{style:I.chatbotIcon})))}});
//# sourceMappingURL=index.umd.js.map
