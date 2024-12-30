Steps to Run this Editor Project Locally:

1. Install Node.js and npm
Ensure that Node.js and npm are installed on your system. If you haven’t installed them yet, follow these steps:

Download and install Node.js from nodejs.org.

Verify the installation by checking the versions:


node -v
npm -v
2. Clone or Download the Project
If you haven't done so already, you can clone your Next.js project from a version control system like GitHub, or download the project as a zip file.

Clone via Git:

git clone <repository-url>
cd <project-folder>
If you downloaded a ZIP:

Extract the zip file and navigate to the project folder in your terminal.
3. Install Project Dependencies
Next, you need to install the dependencies for your Next.js project. Run the following command inside your project directory:

npm install
This will install all the required packages defined in the package.json file.

4. Run the Development Server
Once the dependencies are installed, you can start the Next.js development server by running:

npm run dev
This will start the server, and you should see output similar to this:

Local: http://localhost:3000
5. Access the Application in Your Browser

6. Customizing the Development Environment


LocalStorage Handling: As this project uses localStorage, make sure that it is accessed only on the client side. Your useEffect hook is already handling that by ensuring the content is retrieved from localStorage after the component has mounted, so no issues should arise during SSR.

