# Dockerized Node.js App

Minimal Node.js HTTP service with Docker, GitHub Actions CI/CD, and Kubernetes deployment manifests.

## Run locally

```bash
npm ci
npm test
npm start
```

The app listens on `http://localhost:3000`.

Available routes:

- `GET /`
- `GET /healthz`

## Docker

```bash
docker build -t node-app:local .
docker run -p 3000:3000 node-app:local
```

## CI/CD

The GitHub Actions workflow at `.github/workflows/ci-cd.yml`:

1. Runs tests on pull requests and pushes.
2. Builds and pushes a Docker image to GitHub Container Registry on pushes to `main`.
3. Deploys the image to Kubernetes using `kubectl apply`.

Required GitHub repository secrets:

- `KUBE_CONFIG_DATA`: base64-encoded kubeconfig for the target cluster.

The workflow publishes images to:

```text
ghcr.io/<owner>/<repo>:<git-sha>
ghcr.io/<owner>/<repo>:latest
```

## Kubernetes

Apply the manifests manually if needed:

```sh
kubectl apply -f k8s/service.yaml
sed "s|IMAGE_PLACEHOLDER|ghcr.io/<owner>/<repo>:<git-sha>|g" k8s/deployment.yaml | kubectl apply -f -
kubectl rollout status deployment/node-app -n node-app
```

## This is me creating my list

1. Joseph
2. Titilope
3. Marvelous
4. Joseph Jr.
5. Success

- 43 years
- 42 years
- 17 years
- 14 years
- 11 years

Pipeline images can be found [here](https://www.google.com/search?q=devops+pipeline+pictures&sca_esv=0f7b0b670255fb6d&udm=2&biw=1528&bih=794&sxsrf=ANbL-n5xJumaKfpuBLTlXcqMlZpMZmoDXw%3A1776476796795&ei=fOLiafGiMJiv5NoPotmRsQk&ved=0ahUKEwjx0LLjo_aTAxWYF1kFHaJsJJYQ4dUDCBI&uact=5&oq=devops+pipeline+pictures&gs_lp=Egtnd3Mtd2l6LWltZyIYZGV2b3BzIHBpcGVsaW5lIHBpY3R1cmVzSMpLUM4EWM1EcAF4AJABAJgBsQ6gAelqqgEHNi03LjIuM7gBA8gBAPgBAZgCC6ACslbCAgYQABgHGB7CAgcQIxgnGMkCwgIFEAAYgATCAgQQABgewgIGEAAYChgewgIGEAAYBRgewgIGEAAYCBgemAMAiAYBkgcJMS41LTEuNS40oAfeJrIHBzUtMS41LjS4B6ZWwgcHMC42LjEuNMgHOYAIAA&sclient=gws-wiz-img#sv=CAMSVhoyKhBlLVVSYUJLTDdHTlo5YVpNMg5VUmFCS0w3R05aOWFaTToOdXF0NmV6bEVjMWlMek0gBCocCgZtb3NhaWMSEGUtVVJhQktMN0dOWjlhWk0YADABGAcgs9jRngFKCBABGAEgASgB)

![](/images/1.jpg)
![](/images/images.jpg)

|name|Age|Sex|
|------|-------|-------|
|`Joseph`|43 years|Male|
|`Titilope`|42 years|Female|
|`<Marvelous>`|17 years|Female|
|`#Joseph Jr`|14 years|Male|
|Success|11 years|Male|

_This is my family_.

__We are happy family__.

__I love my family__. 







### Trigger Configuration

| Trigger | Detail |
|---------|--------|
| **Automatic** | Webhook on push to any branch |
| **Version Tag** | `<build-number>-<git-short-hash>` (e.g., `42-a1b2c3d`) |

### Quality Gates

| Gate | Tool | Criteria |
|------|------|----------|
| Code Quality | SonarQube | Quality gate must pass (no new critical/blocker issues) |
| Security | Snyk | No HIGH or CRITICAL vulnerabilities |
| Test Coverage | Vitest + SonarQube | _Minimum coverage threshold (configure per team)_ |

### Notifications

| Event | Channel | Recipients |
|-------|---------|------------|
| Build Success | Slack `#healthpulse-builds` | Team |
| Build Failure | Slack `#healthpulse-builds` + Email | Team + Lead |

---

## CD Pipeline: HealthPulse_Deploy

### Deployment Pipelines

| Pipeline | Target | Trigger | Gate |
|----------|--------|---------|------|
| `HealthPulse_Dev_Deploy` | DEV | Automatic on `develop` branch | None |
| `HealthPulse_UAT_Deploy` | UAT | Automatic on `release/*` branches | None |
| `HealthPulse_QA_Deploy` | QA | Manual trigger | Approval required |
| `HealthPulse_Prod_Deploy` | PROD | Manual trigger from `main` | Manager approval required |

### Deployment Flow

```
develop branch push
       |
       v
  [DEV Deploy] ---> Ansible Tower ---> ECS/EKS DEV
       |
release/* branch push
       |
       v
  [UAT Deploy] ---> Ansible Tower ---> ECS/EKS UAT
       |
  Manual trigger + approval
       |
       v
  [QA Deploy] ----> Ansible Tower ---> ECS/EKS QA
       |
  Manual trigger + manager approval
       |
       v
  [PROD Deploy] --> Ansible Tower ---> ECS/EKS PROD
```

### Deployment Steps

1. Pull Docker image from Artifactory with specified version tag
2. Trigger Ansible Tower job template for target environment
3. Ansible playbook updates ECS task definition / Kubernetes deployment
4. Wait for service to stabilize (health check passes)
5. Send deployment notification to Slack


### This is Obasjoe practicing

## Flight from SC to CA was fun practicing

1. good job