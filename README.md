# Early Pregnancy Risk Project

Pregnant or planning for a baby? This tool will make you assess your health status for a healthy pregnancy and a complication free birth. By filling in your personal health measurements, this tool will estimate risk for developing common pregnancy complications below.

- Miscarriage
- Gestational Diabetes Mellitus
- Preeclampsia
- Pre-term birth
- Still birth
- Caesarean section
- Postpartum depression

It is important to note that the tool will provide you with the risk of an ‘average‘ woman with your health measures and NOT your personal risk score. It is also important to note that the model does not take into many other psychosocial factors affecting maternal outcome.

#### Go to the [Wiki](https://github.com/ThomasStorli/early-pregnancy-risk/wiki) for information about the project.

### Server and Client

The server and client folder contain seperate projects. When committing changes, please do not change code in both projects at the same time. The server and client does not communicate though code, it communicates though a REST API and will be deployed in different environments.

### Workflow

When commiting large changes to the project please set up a pull request, this is so that it can be peer-reviewed before it's merged into the codebase.

When creating a branch for a feature / bug-fix it should be named like this: `type/issue-number/note`, eg:

- `bug/32/post_request`
- `enhancement/4/header`
- `refactoring/51/request_module`

<span style="color: #de1414; font-weight: bold">NOTE: If an issue doesn't already exist, create it before making the branch.</span>
