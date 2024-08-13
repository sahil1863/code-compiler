# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Project Objective
- Create a playground area where one can create multiple code snippets and run it using an online compiler and execution system(Judge0).
- Create a Code Editor Frontend using ReactJS (monacoEditor package).
- Implemented flexible layout structure using styled components.
- Use Rapid API to setup our Judge0 API.
- Add multi-language support (cpp, python, java, javascript).
- Import and Export the code.
- Input and Output console(can upload text files for input & download output).
- Functionality to save multiple playground in local storage.
- Added Fullscreen Support.

# Technologies Used
- React JS -> for frontend.
- Styled Components -> for styling.
- Judge0 CE API -> to create and get submissions.
- Rapid API -> to Setup Judge0 CE API.
- React Router -> For routing.
- MonacoEditor -> for compiling of code

  # Folder Sturture
  
{


  title: "folder",

  
    id: "uniq_id",

    
    files: [

    
      {

      
        id:'uniq_id',

        
        title: 'index',

        
        language: 'cpp',

        
        code:'cout<<"hello";'

        
      },

      
      {

      
        id:'uniq_id',

        
        title: 'test',

        
      language: 'java',

      
      code:'"wassup'

      
      }

      
    ]
    
      
}


