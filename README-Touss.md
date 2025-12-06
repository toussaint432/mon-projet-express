 Projet Node.js – Docker – Kubernetes – CI/CD

Ce projet présente une application Node.js containerisée avec Docker, déployée sur Kubernetes via Minikube, et automatisée avec un pipeline CI/CD GitHub Actions.

 1. Lancer l’application en local
Installer les dépendances:
npm install

Lancer l’application:
node server.js

L’application démarre sur :
👉 http://localhost:3400


 2. Dockerisation de l’application

2.1. Construire l’image Docker

docker build -t mon-express-app .

2.2. Lancer un conteneur

docker run -p 3400:3400 mon-express-app

2.3. Vérifier que l’image existe:

docker images

 3. Lancer Kubernetes (Minikube):

Démarrer Minikube:

minikube start

Vérifier le nœud:

kubectl get nodes

 4. Charger l’image Docker dans Minikube

Si vous utilisez le driver Docker (macOS), exécuter :

minikube image load mon-express-app

Dans vos manifest YAML, pour éviter les erreurs de pull :
imagePullPolicy: Never

 5. Déploiement Kubernetes

5.1. Appliquer les fichiers YAML:

kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

5.2. Vérifier les pods
kubectl get pods

Logs d’un pod:
kubectl logs <nom-du-pod>

 6. Accéder à l’application via Minikube
Ouvrir automatiquement l’URL:

minikube service mon-express-service

⚠️ Sur macOS (driver Docker)
Minikube affiche :
“Because you are using a Docker driver on darwin, the terminal needs to be open to run it.”
👉 Le tunnel doit rester ouvert !
Fermer la fenêtre = le lien ne fonctionne plus.

Accès manuel:

minikube ip
kubectl get svc

Combiner :
http://<ip-minikube>:<nodeport>/

 7. Metrics Server

Permet de surveiller CPU/MEM dans Kubernetes.
Vérifier si metrics-server fonctionne:

kubectl top nodes
kubectl top pods

Si erreur → installer metrics-server.

 8. Autoscaling (HPA)

Créer un HPA basé sur l’usage CPU :

kubectl autoscale deployment mon-express --cpu-percent=50 --min=2 --max=10

Vérifier :

kubectl get hpa
kubectl get hpa -w

 9. Simuler une montée en charge

Installer hey (si pas installé) :

brew install hey

Simuler 50 utilisateurs pendant 30s :

hey -z 30s -c 50 http://<ip-minikube>:<nodeport>/

Observer le scaling :

kubectl get pods
kubectl get pods -w

Les pods augmentent automatiquement.

 10. Pipeline CI/CD GitHub Actions

Modifier un fichier puis push :

git add .
git commit -m "Test CI/CD"
git push origin main

GitHub → Actions

Le pipeline effectue :

Build du projet Node.js

Tests
Build de l’image Docker
Push vers Docker Hub

Déploiement automatique sur Kubernetes

✔️ Fonctionnalités du projet

Application Node.js simple (Express)
Dockerisation propre (image légère Node Alpine)
Déploiement Kubernetes (Deployment + Service)
Autoscaling Horizontal (HPA)
Tests de charge automatisés
Pipeline CI/CD complet GitHub Actions
Compatible macOS + Minikube Docker driver


📁 Arborescence du projet
.
├── server.js
├── package.json
├── Dockerfile
├── public/
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
└── .github/workflows/
    └── ci-cd.yaml


 Objectif pédagogique

Ce projet démontre la maîtrise de :
Node.js
Docker
Kubernetes (Minikube)
Autoscaling
CI/CD GitHub Actions
Bonne structuration de projet DevOps