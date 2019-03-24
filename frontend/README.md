# Ascenders Frontend Design
## A simple tutorial to get you started
by Andre Hadianto Lesmana
---
### Get Started
After downloading the webapp, use your OS terminal to the frontend directory (admin or user) and type 'npm install' to get all the dependencies required for the app to run.
Use 'yarn run build' and 'yarn run login' on a separate terminal to start the developer mode.

### The Directories
Ascenders web app is built based on React.js. There are several important directories that need to be taken note of when editing the webApp.
- public
- src
- package.json

public
| - assets
| - | img   // contains all the backdrops used in the .css file
| - | scripts
| - | - | css    // contains all the .css file used in the webApp
| - | - | - | fonts    // contains all the fonts used in the webApp
| - | - | js
| bundle.js    // automatically generated from babel
| index.html    // all the scripts are set here

src
| - | components
| - | - | resources
| - | routers
| - | AppRouter.js
| app.js

package.json
This webApp uses yarn to install new dependencies but nodejs can also be used.
The syntax is as follow: "yarn add [new stuff]", and must be run on the main directory (admin or user)
New shortcuts can also be added here.


The framework works as follow:
1. Setting up index.html from public to take in .jsx file from src
2. app.js will render the pages by importing the files from AppRouter.js
3. AppRouter.js creates page routes (from the client side). It also imports the components that will be rendered.
4. reuseable components from the 'components' directory are the one responsible for rendering all the pages.