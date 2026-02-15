const enc = new TextEncoder();
const dec = new TextDecoder();

async function getKey(password){
const keyMaterial = await crypto.subtle.importKey(
"raw",
enc.encode(password),
{name:"PBKDF2"},
false,
["deriveKey"]
);

return crypto.subtle.deriveKey(
{
name:"PBKDF2",
salt:enc.encode("secure-salt"),
iterations:100000,
hash:"SHA-256"
},
keyMaterial,
{name:"AES-GCM",length:256},
false,
["encrypt","decrypt"]
);
}

async function encrypt(text,password){
const key=await getKey(password);
const iv=crypto.getRandomValues(new Uint8Array(12));

const encrypted=await crypto.subtle.encrypt(
{name:"AES-GCM",iv},
key,
enc.encode(text)
);

const combined=new Uint8Array(iv.length+encrypted.byteLength);
combined.set(iv,0);
combined.set(new Uint8Array(encrypted),iv.length);

return btoa(String.fromCharCode(...combined));
}

async function decrypt(data,password){
const key=await getKey(password);
const bytes=Uint8Array.from(atob(data),c=>c.charCodeAt(0));

const iv=bytes.slice(0,12);
const encrypted=bytes.slice(12);

const decrypted=await crypto.subtle.decrypt(
{name:"AES-GCM",iv},
key,
encrypted
);

return dec.decode(decrypted);
}

document.getElementById("runBtn").addEventListener("click",async ()=>{

const text=document.getElementById("inputText").value.trim();
const key=document.getElementById("key").value.trim();
const mode=document.getElementById("mode").value;

if(!text || !key){
document.getElementById("status").innerText="⚠ Enter message and password";
return;
}

try{
let result="";

if(mode==="encrypt"){
result=await encrypt(text,key);
document.getElementById("status").innerText="✅ Encrypted";
}else{
result=await decrypt(text,key);
document.getElementById("status").innerText="✅ Decrypted";
}

document.getElementById("output").innerText=result;

}catch(e){
document.getElementById("status").innerText="❌ Wrong password or invalid data";
}

});


document.getElementById("copyBtn").addEventListener("click",()=>{
const text=document.getElementById("output").innerText;
if(text){
navigator.clipboard.writeText(text);
document.getElementById("status").innerText="📋 Copied";
}
});