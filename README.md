<<<<<---------- REACT + VITE + TAILWINDCSS + REACT ROUTER -------------->>>>>

This template contains base files, dependencies, and skeleton to star working on your react project using Vite with with tailwind alreay included.

Step 1
To custom your project data, go to package.json and make the changes that you need.

Step 2
You can add or delete dependencies that you think will use or not.

Step 3 (Installation)
Once you customized your project data and dependencies run 'npm i' (You can also install new dependencies with npm i <dependency-name> when you need it)


<<<<<---------- TAILWIND ---------->>>>>
You can add custom styles to your project with tailwindcss. Go to tailwind.config.js and customize your styles, as colors. fonts, radius, backgrounds, etc.

Another way to add fonts to you project is add its link to your index.html file into header, then you can use your custom fonts in your project using tailwindcss or src/index.css.


<<<<<---------- MEDIA AND ASSETS ---------->>>>>>
You can add your assets into two diferents locations:
- public:
  When you use public you cant add as many folder or files that you need, with the advantage that call this resources always from path 
  '/<path-inside-public>' cause the system knows your calling a resource inside public.

- any other location on your project:
  When you use other location diferente to public you have to use relative path from file where you are calling that resource.


<<<<<---------- REACT ROUTER ---------->>>>>
You can manage your app routes into src/routes/index.tsx file.


<<<<<---------- USEDARKMODE ---------->>>>>
This hook returns a boolean that represents if theme mode is dark. You can manage dark/light theme with tailwindcss in most cases but there is a few that don´t, use this hook for those cases.