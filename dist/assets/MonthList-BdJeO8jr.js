import{a as x,u as h,r as n,j as s}from"./index-CSabs3Df.js";import{a as u,B as f}from"./Formtater-B2VuYrKm.js";import{b as p}from"./useFetch-SZv0H_iy.js";import{T as j,M as o}from"./TextField-ByBTeS2N.js";import"./apiConfig-ClF-BgST.js";import"./Grow-CVXhscfl.js";const M=()=>{const{token:c}=x(),i=h(),{data:t,refetch:r}=p(c??""),[a,m]=n.useState("all"),d=Array.from(new Set(t==null?void 0:t.map(e=>e.year)))??[],l=a==="all"?t:t==null?void 0:t.filter(e=>e.year===a);return n.useEffect(()=>{a!=="all"&&r()},[a,r]),s.jsxs("div",{className:"w-full min-h-screen pt-8 pb-16 px-8 md:px-72 flex flex-col justify-start items-center space-y-8",children:[s.jsx("h1",{className:"text-xl font-bold",children:"WalletSheet"}),s.jsxs("div",{className:"w-full flex flex-col items-start space-y-4",children:[s.jsx("h1",{className:"text-base",children:"Filtro de búsqueda"}),s.jsxs(j,{required:!0,className:"w-full md:w-1/4",id:"year",select:!0,label:"Año",value:a,helperText:"Filtrar por año",onChange:e=>m(e.target.value),children:[s.jsx(o,{value:"all",children:"Todos"}),d.map(e=>s.jsx(o,{value:e,children:e},e))]})]}),l&&l.length>0?s.jsxs("div",{className:"w-full flex flex-col space-y-4 pb-20 items-start",children:[s.jsx("h1",{className:"text-base",children:`Meses con transacciones ${a==="all"?"":`en ${a}`} (${l.length})`}),s.jsx("div",{className:"w-full grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-4",children:l.map(e=>s.jsxs("button",{onClick:()=>i("/month",{state:{month:e.month_number,year:e.year}}),className:"w-full hover:bg-gray-100 border-2 border-solid border-primary rounded-lg p-4 flex flex-col space-y-4 justify-center items-center",children:[s.jsx("h1",{className:"font-medium",children:u(e.month_number)}),s.jsx("h1",{className:"text-sm",children:e.year})]},`${e.year}-${e.month_number}`))})]}):s.jsx("p",{className:"text-center",children:"No se encontraron meses con transacciones."}),s.jsx(f,{})]})};export{M as default};
