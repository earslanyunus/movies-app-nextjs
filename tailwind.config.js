/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin.js");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    container:{
        center:true,
        padding:{
            DEFAULT:'1rem',
        }
    },
    fontSize: {
        'text-xs': ['0.75rem', '1.125rem'],
        'text-sm': ['0.875rem', '1.25rem'],
        'text-md': ['1rem', '1.5rem'],
        'text-lg': ['1.125rem', '1.75rem'],
        'text-xl': ['1.25rem', '1.875rem'],
        'display-xs': ['1.5rem', '2rem'],
        'display-sm': ['1.875rem', '2.375rem'],
        'display-md': ['2.25rem', '2.75rem'],
        'display-lg': ['3rem', '3.75rem'],
        'display-xl': ['3.75rem', '4.5rem'],
    },
    extend: {
        backgroundImage:{
          'signup':"url('https://www.themoviedb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg')"
        },
        colors:{
        warning: {
            '25': '#fffcf5',
            '50': '#fffaeb',
            '100': '#fef0c7',
            '200': '#fedf89',
            '300': '#fec84b',
            '400': '#fdb022',
            '500': '#f79009',
            '600': '#dc6803',
            '700': '#b54708',
            '800': '#93370d',
            '900': '#7a2e0e',
        },
        primary: {
            '25': '#cdd1d9',
            '50': '#9ba3b3',
            '100': '#6a768c',
            '200': '#515f79',
            '300': '#384866',
            '400': '#1f3153',
            '500': '#061a40',
            '600': '#05173a',
            '700': '#051533',
            '800': '#04122d',
            '900': '#041026',
        },
        gray: {
            '25': '#fcfcfd',
            '50': '#f9fafb',
            '100': '#f2f4f7',
            '200': '#eaecf0',
            '300': '#d0d5dd',
            '400': '#98a2b3',
            '500': '#667085',
            '600': '#475467',
            '700': '#344054',
            '800': '#1d2939',
            '900': '#101828',
        },
        }

    },
},
plugins: [
    plugin(function({addComponents,theme}){
            console.log(theme)
        addComponents({
            // w-full rounded text-gray-900 py-2.5 px-3.5 rounded-lg border border-gray-300  placeholder:text-gray-500 focus:border-primary-300  focus:shadow-[0px_0px_0px_4px_#F4EBFF]
            '.input-text':{
                width:'100%',
                borderRadius:'0.375rem',
                color:'#101828',
                padding: '0.625rem 0.9375rem',
                border:'1px solid #d0d5dd',
                '&:placeholder':{
                    color:'#667085'
                },
                '&:focus':{
                  border: '1px solid #1f3153',
                  boxShadow: '0px 0px 0px 4px #F4EBFF'
                }
            },
            '.select-input':{
                width:'100%',
                borderRadius: '0.375rem',
                border:'1px solid #D0D5DD',
                padding: '0.625rem 0.9375rem',
            },
            '.btn-primary':{
                //styles:py-2.5 px-[1.125rem] rounded-lg text-text-md font-semibold bg-primary-600  text-white'
                padding: '0.625rem 1.125rem',
                borderRadius: '0.375rem',
                color: '#fff',
                backgroundColor: '#05173A',
                fontWeight: '600',
                fontSize: '1rem',
                lineHeight: '1.25rem',
                '&:hover':{
                    backgroundColor: '#051533',
                }


            }
        })
    }
    )
]
}
