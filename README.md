# Dcard 2023 Frontend Intern Homework
This project is used to apply dcard 2023 web frontend Intern position.

[Requirement](https://drive.google.com/file/d/1ZlwuUafAQUKBEA_ZK6ShM5F4xLTkV_4X/view)

It works like a simplified Jira, and looks like Dcard.

In this web app, you can:
1. Manage task with three status: open, in progress, done.
2. Searching tasks based on their status.
3. Update or create tasks.

All above can be done in separate project (like jira).
## How to run this project
### Local
1. Clone the project from GitHub
2. Install the dependencies via `yarn`
3. Register an OAuth app on GitHub, and paste your client id , client secret in .env file.
4. Run in dev mode by entering `yarn dev`, or run in production mode by entering 
```
yarn build
yarn start
```

### Online
Just go to this [link](https://dcard-frontend-intern-2023.chiendavid.com/) and login with your GitHub account.

## Project Architecture
### Package
There are three main package used in this project
- **Next**.js: for building react app
- **Redux**: for managing data and state
- **Styled Component**: for styling the website

### Global Components
#### Sidebar
Sidebar will display in every page.

![sidebar.png](doc/images/sidebar.png)

It can be used to selecting which project you are looking for, 
and choosing the filter or the order your tasks display in.

#### Header
Header will also display in every page.

![header.png](doc/images/header.png)

A form in dialog will show up after clicking the create button in the middle. 
You can select which project you want to add the task to, also it's title, body and initial status.

![newIssueForm.png](doc/images/newIssueForm.png)

The search section can be used to pass in the keyword you want to search for the task.


### Page
#### / - Display search result

At this page, you can see the result of searching issue by passing keyword on the navbar.

![search.png](doc/images/search.png)

#### /browse/[ProjectOwner]/[projectName] - Display project issues

You will be navigated to this page after using the select component in the sidebar.

![selectProject.gif](doc/images/selectProject.gif)

At this page, you can see the tasks belong to this project in a table.

Each row in this table represent a link, which will lead you to a "single task page"(actually, it is a dialog).

#### /browse/[ProjectOwner]/[projectName]/[issueNumber] - Display single issue

If you go in this page by clicking the link mentioned above, you will see the task detail in a dialog.

![issueLinkRow.gif](doc/images/issueLinkRow.gif)

If you go in this page directly(like typing in address bar), you will see a full page of the issue.

Both of them can edit the task by click the text of title and body, or choosing the updated status by using the select component.

![editIssue.gif](doc/images/editIssue.gif)

You can delete the task by clicking the red button, and go to the issue page on GitHub by clicking the black button.


