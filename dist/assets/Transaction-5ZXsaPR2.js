import{j as e,b as f,a as h,u as p,r as j}from"./index-VlIQ97ZM.js";import{d as i,c as r,b as g,f as y,e as v,B as b}from"./Formtater-B-GkTaC3.js";import{C as N}from"./CategoryIcon-BfIvA0o-.js";import{g as w}from"./apiConfig-ClF-BgST.js";import{S as D,A as E}from"./Snackbar-4r3kdLhc.js";import"./Grow-BRtuSxgO.js";const C=i(e.jsx("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete"),T=i(e.jsx("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit"),s=({label:n,value:c})=>e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("h1",{children:n}),e.jsx("h1",{className:"font-medium",children:c??"Desconocido"})]}),M=()=>{const n=f(),{token:c}=h(),o=p(),{transaction:a}=n.state||{transaction:null},[d,l]=j.useState(!1);if(!a)return e.jsx("div",{children:"No se encontró la transacción"});const m=async x=>{if(x.preventDefault(),!!window.confirm("¿Estás seguro de que deseas eliminar esta transacción?"))try{const t=await fetch(`${w()}/transactions/${a.id}`,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${c}`}});if(t.ok)l(!0),o("/month",{state:{month:parseFloat(a.accounting_date.slice(5,7)),year:a.accounting_date.slice(0,4)}});else{const u=await t.json();console.error("Error al eliminar:",u)}}catch(t){console.error("Error de conexión:",t)}};return e.jsxs("div",{className:"w-full min-h-screen pt-8 pb-16 px-5 md:px-72 flex flex-col justify-start items-center space-y-8",children:[e.jsx("h1",{className:"text-xl font-bold",children:"WalletSheet"}),e.jsx("h1",{className:"text-sm",children:r(a.accounting_date)}),e.jsx("div",{className:"w-12 h-12 bg-gray-100 rounded-full flex flex-col items-center justify-center",children:e.jsx(N,{category:a.category.name})}),e.jsx("h1",{className:"font-medium",children:a.concept}),e.jsx("h1",{className:"font-medium text-lg",children:g(Number(a.amount))}),e.jsxs("form",{className:"w-full",children:[e.jsxs("div",{className:"w-full flex flex-row justify-center space-x-8 pb-8",children:[e.jsx("div",{onClick:()=>o("/transaction/edit",{state:{transaction:a}}),className:"w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex flex-col items-center justify-center cursor-pointer",children:e.jsx(T,{className:"text-gray-700"})}),e.jsx("div",{onClick:m,className:"w-12 h-12 bg-red-100 hover:bg-red-200 rounded-full flex flex-col items-center justify-center cursor-pointer",children:e.jsx(C,{className:"text-red-700"})})]}),e.jsx(D,{open:d,autoHideDuration:3e3,onClose:()=>l(!1),children:e.jsx(E,{onClose:()=>l(!1),severity:"success",sx:{width:"100%"},children:"¡Transacción eliminada con éxito!"})})]}),e.jsxs("div",{className:"w-full flex flex-col space-y-4 pb-20",children:[e.jsxs("div",{className:"w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4",children:[e.jsx(s,{label:"Fecha de transacción",value:r(a.transaction_date)}),e.jsx(s,{label:"Fecha de aplicación",value:r(a.accounting_date)}),e.jsx(s,{label:"Cuenta de banco",value:a.account.bank_name}),e.jsx(s,{label:"Tipo de cuenta",value:y(a.account.type)}),e.jsx(s,{label:"Tipo de movimiento",value:v(a.type)}),e.jsx(s,{label:"Lugar",value:a.place})]}),e.jsxs("div",{className:"w-full flex flex-col space-y-2",children:[e.jsx("h1",{children:"Notas"}),e.jsx("h1",{className:"font-medium",children:a.note||"Sin notas"})]})]}),e.jsx(b,{})]})};export{M as default};
