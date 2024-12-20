import*as e from"react";import{useState as t,useRef as r,useEffect as o}from"react";import{SiChatbot as n}from"react-icons/si";import{GiCrossedBones as a}from"react-icons/gi";import{IoSendSharp as i}from"react-icons/io5";import{Toaster as s,toast as l}from"react-hot-toast";const c=({str:e})=>e.charAt(0).toUpperCase()+e.slice(1),m=({apiKey:c,apiUrl:m="https://api.chatpilot.com",xApiKey:d})=>{const[p,u]=t(!1),[g,h]=t([]),[b,f]=t(""),[y,x]=t(!1),v=r(null);o(()=>{var e;null==(e=v.current)||e.scrollIntoView({behavior:"smooth"})},[g]);const C={container:{position:"fixed",bottom:"2rem",right:"2rem",zIndex:50},chatContainer:{maxWidth:"25rem",maxHeight:"35rem",backgroundColor:"white",borderRadius:"0.75rem",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",overflow:"hidden",zIndex:50},header:{display:"flex",alignItems:"center",justifyContent:"end",padding:"0.75rem"},closeButton:{cursor:"pointer",transition:"transform 0.3s ease-in-out",":hover":{transform:"scale(1.25)"}},messagesContainer:{height:"20rem",overflowY:"auto",padding:"1rem"},messageWrapper:e=>({marginBottom:"0.75rem",display:"flex",justifyContent:e?"flex-end":"flex-start"}),message:e=>({maxWidth:"75%",borderRadius:"1rem",padding:"0.75rem 1rem",backgroundColor:e?"#3b82f6":"#f3f4f6",color:e?"white":"black"}),noMessages:{textAlign:"center",color:"#9ca3af"},inputContainer:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem",borderTop:"1px solid #e5e7eb"},input:{flexGrow:1,padding:"0.75rem",borderRadius:"0.5rem",border:"1px solid #e5e7eb",outline:"none",":focus":{borderColor:"#3b82f6"}},sendButton:{backgroundColor:"#3b82f6",color:"white",borderRadius:"0.5rem",":hover":{backgroundColor:"#2563eb"}},chatButton:{backgroundColor:"#ef4444",color:"white",padding:"0.5rem",borderRadius:"9999px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",":hover":{backgroundColor:"#dc2626"}},chatbotIcon:{width:"1.5rem",height:"1.5rem"},inputWrapper:{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.5rem",borderTop:"1px solid #e5e7eb"}};return e.createElement("div",{style:C.container},e.createElement(s,{position:"top-right"}),p?e.createElement("div",{style:C.chatContainer},e.createElement("div",{style:C.header},e.createElement("button",{onClick:()=>u(!1),className:"close-button"},e.createElement(a,{style:C.closeButton}))),e.createElement("div",{style:C.messagesContainer},g.map((t,r)=>e.createElement("div",{key:r,style:C.messageWrapper("user"===t.role)},e.createElement("div",{style:C.message("user"===t.role)},t.content))),y&&e.createElement("div",{style:C.messageWrapper(!1)},e.createElement("div",{style:C.message(!1)},"Typing...")),e.createElement("div",{ref:v})),e.createElement("form",{onSubmit:async e=>{if(e.preventDefault(),!b.trim())return;const t={role:"user",content:b};h([...g,t]),f(""),x(!0);try{const e=await fetch(`${m}/prompt`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({queryInput:b,apiKey:c})});if(!e.ok)throw new Error("Failed to get response");const t=await e.json();h(e=>[...e,{role:"assistant",content:t.response}])}catch(e){l.error("Failed to get response")}finally{x(!1)}},style:C.inputContainer},e.createElement("div",{style:C.inputWrapper},e.createElement("input",{type:"text",value:b,onChange:e=>f(e.target.value),placeholder:"Type your message...",style:C.input}),e.createElement("button",{type:"submit",disabled:y,style:C.sendButton},e.createElement(i,{style:C.sendButton}))))):e.createElement("button",{onClick:()=>u(!0),className:"chat-button"},e.createElement(n,{style:C.chatbotIcon})))};export{c as Capitalize,m as ChatPilotBot};
//# sourceMappingURL=index.mjs.map
