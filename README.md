The AJACKUS User Management Dashboard is a React-based application designed to manage user information. It features CRUD (Create, Read, Update, Delete) functionalities with client-side form validation, error handling, and pagination.

Demo Link : https://user-management-dashboard-app-iota.vercel.app/
Project Setup Instructions
1. Clone the repository:
bash
git clone <repository-url>
cd <repository-directory>
2. Install the dependencies:
bash
npm install
3. Start the development server:
bash
npm start
The application will run on http://localhost:3000/.

Directory Structure
plaintext
.
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── UserList.js
│   │   ├── UserForm.js
│   │   ├── EachUser.js
│   │   ├── Pagination.js
│   │   └── ErrorBoundary.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── README.md
└── package.json
Component Descriptions
App Component
Path: src/App.js

Description: The main wrapper component that manages state for users, error messages, loading status, and pagination. It fetches user data from the JSONPlaceholder API and includes logic for adding, editing, and deleting users.

UserList Component
Path: src/components/UserList.js

Description: Displays a list of users in a table format. Allows users to be edited or deleted. Uses the EachUser component to render each user row.

UserForm Component
Path: src/components/UserForm.js

Description: Provides a form for adding or editing user details. Validates form inputs (e.g., email format, required fields) and handles form submission to either add or update users.

EachUser Component
Path: src/components/EachUser.js

Description: Renders individual user data in a table row. Includes "Edit" and "Delete" buttons for user actions.

Pagination Component
Path: src/components/Pagination.js

Description: Handles pagination logic to navigate between pages. Displays pagination controls (Previous, Next, Page Numbers).

ErrorBoundary Component
Path: src/components/ErrorBoundary.js

Description: Catches JavaScript errors anywhere in the child component tree and displays a fallback UI with a retry button.

Usage
Fetching Users
Users are fetched from the JSONPlaceholder API using axios in the App component's fetchUsers method.

The componentDidMount lifecycle method is used to trigger the fetch request when the component mounts.

Adding a New User
Users can be added using the UserForm component.

Fill in the form fields and submit the form to trigger the addUser method in the App component.

The new user is added to the state and displayed in the user list.

Editing a User
Users can be edited using the Edit button in the UserList component.

The UserForm component is populated with the selected user's data.

Submit the form to trigger the updateUser method in the App component.

Deleting a User
Users can be deleted using the Delete button in the UserList component.

The deleteUser method in the App component is triggered to remove the user from the state.

Pagination
The Pagination component handles pagination logic.

Users are divided into pages with a specified number of users per page.

Navigate between pages using the pagination controls.

Error Handling
All API calls are wrapped in try-catch blocks to handle errors.

Errors are displayed using the error state and a toast notification.

The ErrorBoundary component catches unexpected errors and provides a retry option.

Bonus Features
Pagination or Infinite Scrolling
Basic pagination is implemented using state variables for the current page and number of users per page.

Users are fetched in chunks and displayed with pagination controls.

Client-side Validation
Form inputs are validated for required fields and proper email format.

Error messages are displayed using toast notifications.

Responsive UI
The UI is styled with CSS to be mobile-friendly.

Media queries are used to adjust the layout on smaller screens.

Challenges and Potential Improvements
Challenges
Simulating API requests with JSONPlaceholder.

Managing state for pagination.

Ensuring responsive design.

Potential Improvements
Implementing infinite scrolling.

Enhancing UI/UX design.

Integrating a real backend for persistent data storage.

Adding user authentication.

Improving error handling with more descriptive messages.

Technologies Used
React

Axios

JSONPlaceholder API

CSS

License
This project is licensed under the MIT License. See the LICENSE file for details.