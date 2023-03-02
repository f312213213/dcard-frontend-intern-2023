# Dcard 2023 Frontend Intern Homework
This project is a simplified Jira-style web app designed to apply for Dcard's 2023 web frontend intern position. 

The app mimics Dcard's design and allows users to manage their project tasks with three statuses: open, in progress, and done. 
Users can search tasks based on their status and update or create tasks.

## Requirement

View the project [requirement](https://drive.google.com/file/d/1ZlwuUafAQUKBEA_ZK6ShM5F4xLTkV_4X/view) here.

## How to run this project
### Local
1. Clone the project from GitHub
2. Install the dependencies via `yarn`
3. Register an OAuth app on GitHub, and paste your client id , client secret in and call back URL .env file.
```
NEXT_PUBLIC_GITHUB_CLIENT_ID=
NEXT_PUBLIC_GITHUB_CALLBACK_URL=
NEXT_PUBLIC_GITHUB_API_BASE=
GITHUB_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_API_BASE=
```
4. Run in dev mode by entering `yarn dev`, or run in production mode by entering 
```
yarn build
yarn start
```

### Online
Visit the [website](https://dcard-frontend-intern-2023.chiendavid.com/) and log inwith your GitHub account.

## Project Architecture
### Packages
This project uses three main packages:
- **Next**.js: for building react app
- **Redux**: for managing data and state
- **Styled Component**: for styling the website

### Global Components
#### Sidebar
The sidebar appears on every page.

![sidebar.png](doc/images/sidebar.png)

It is used to select the project you are looking for and choose the filter or the order in which your tasks display.

#### Header
The header also appears on every page.

![header.png](doc/images/header.png)

Clicking the create button in the middle opens a form dialog where you can select the project you want to add the task to and its title, body, and initial status.

![newIssueForm.png](doc/images/newIssueForm.png)

The search section can be used to enter a keyword to search for a specific task.

### Page
#### / - Display search result

On this page, you can see the result of searching for a task by passing a keyword in the navbar.

![search.png](doc/images/search.png)

#### /browse/[ProjectOwner]/[projectName] - Display project issues

After using the select component in the sidebar, you will be navigated to this page.

![selectProject.gif](doc/images/selectProject.gif)

Here, you can see the tasks belonging to the selected project in a table. 
Each row in this table represents a link that leads you to a "single task page" (which is actually a dialog).

#### /browse/[ProjectOwner]/[projectName]/[issueNumber] - Display single issue

If you click the link mentioned above, you will see the task details in a dialog.

![issueLinkRow.gif](doc/images/issueLinkRow.gif)

If you navigate to this page directly (like by typing the address in the address bar), you will see the task details in a full page view.

Both views allow you to edit the task by clicking on the text of the title and body or selecting an updated status using the select component.

![editIssue.gif](doc/images/editIssue.gif)

You can delete the task by clicking the red button, and you can go to the task page on GitHub by clicking the black button

### Issues
#### Recognize issue's status
To recognize what status each issue is, this app use GitHub labels to implement.

So there will be three scenarios and my solutions for them:

1. Suppose there's an issue with no custom "status label". 
    In this case, the issue's default status in the app will be "open". 
    If a user updates the status, the app will add the status label to the issue using the GitHub API.


2. Now suppose there's an issue with more than one custom "status label". 
   In this case, the app will take the first status label it finds using the findIndex function from the Lodash library. 
   If a user updates the status, the app will only keep the updated status label and delete the others.


3. Finally, let's say there's an issue with a custom status label and other labels. 
   In this case, the app will keep the other labels while performing the logic with the status label. 
   For example, if the user updates the status, the app will add the new status label to the issue while keeping the other labels intact.

## Lighthouse

![lighthouse.png](doc/images/lighthouse.png)

This web app has been tested using Lighthouse, and it has received a score of 100/100.
