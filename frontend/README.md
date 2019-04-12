# Ascenders Frontend Design Development
## A tutorial to get you started

### Get Started
After cloning, use your OS terminal (I use powershell) to type `npm install` on the backend, frontend/admin and frontend/user to get all the dependencies required for the app to run.
Use `yarn run build` on the frontend terminal and `npm start` on the backend terminal to run the app.
For further instruction, you can refer to package.json and look for the runnable-scripts under 'scripts'

### The Directories
Ascenders web app is built based on React.js. There are several important directories that need to be taken note of when editing the webApp.
- src
- package.json

src<br>
| - | components<br>
| - | - | resources<br>
| - | - | globalContext<br>
| - | css<br>
| - | routers<br>
| - | - AppRouter.js<br>
| app.js<br>

package.json
This webApp uses yarn to install new dependencies but nodejs can also be used.
The syntax is as follow: `yarn add [new dependency]`, and must be run on the main directory (Admin or User) to add the dependencies in the respective folder.
To remove a dependency, use: `yarn remove [dependency]`.
New shortcuts can also be added here.

### Current workflow
The framework works as follow:
1. Setting up index.html from public to take in .jsx file from src
2. app.js will render the pages by importing the files from AppRouter.js
3. AppRouter.js creates page routes (from the client side). It also imports the components that will be rendered.
4. reuseable components from the 'components' directory are the one responsible for rendering all the pages.
