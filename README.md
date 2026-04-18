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