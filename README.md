# Early Pregnancy Risk Project

Got to the [Wiki](https://github.com/ThomasStorli/early-pregnancy-risk/wiki) for information about the project.


### Server and  Client
The server and client folder contain seperate projects. When commiting changes, please do not change code in both projects at the same time. The server and client does not communicate though code, it communicates though a REST API and will be deployed in different environments.


### Workflow
When commiting large changes to the project please set up a pull requests, so that it can be peer-reviewed before it's merged into the codebase.

When creating a branch for a feature / bug-fix it should be named like this: `type/issue-number`, eg: 
* `bug/32`
* `enhancment/4`
* `refactoring/51`

**If an issue doesn't already exist, create it before making the branch.**

