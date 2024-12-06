# SalesFlo - Client & Admin React Dashboard integrated with Xero

## Package: Standard

Frontend is based on Nexus - React Admin template from DaisyUI.

App is located in `/server` and is an Express, GraphQL app using Postgres.

App hosted on AWS Elastic Beanstalk.

Here is the `.elasticbeanstalk/config.yml` if you want to connect to the existing deployment (you'll need AWS credentials and will need to set up EB CLI).

```
branch-defaults:
  default:
    environment: Salesflo-env
    group_suffix: null
global:
  application_name: salesflo
  branch: null
  default_ec2_keyname: aws-eb
  default_platform: Node.js 20 running on 64bit Amazon Linux 2023
  default_region: ap-southeast-2
  include_git_submodules: true
  instance_profile: null
  platform_name: null
  platform_version: null
  profile: salesflo
  repository: null
  sc: null
  workspace_type: Application
```

## Build frontend (builds into `/server` for deployment)

```
npm run build
```

## Build backend

```
cd server
npm run build
```
