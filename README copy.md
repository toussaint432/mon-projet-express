# 🚀 TP DevOps – Node.js, Docker & Kubernetes

## 📌 Description du projet

Ce projet consiste à développer une application web simple avec **Node.js et Express.js**, la conteneuriser avec **Docker**, puis la déployer sur un cluster Kubernetes local via **Minikube**. Il inclut également la mise en place du **scaling automatique (HPA)**, ainsi que des notions d’automatisation via **GitHub Actions (CI/CD)**.
L’objectif global est de comprendre la chaîne complète : **développement → containerisation → orchestration → automatisation**.

---

## 🎯 Objectifs du TP

* Développer une petite API Node.js avec Express.
* Dockeriser l’application en créant une image légère et optimisée.
* Déployer l’application dans Kubernetes via Deployment + Service.
* Tester le Load Balancing et le Scaling (horizontal & vertical).
* Installer et configurer Metrics Server pour permettre l’autoscaling.
* Tester le HPA via des outils de charge (hey).
* Mettre en place un pipeline CI/CD simplifié avec GitHub Actions.
* Gérer le projet via Git et GitHub avec authentification SSH.

---

## 🏗️ Architecture générale

* **Node.js** pour le backend.
* **Docker** pour créer l’image du conteneur.
* **Minikube** pour simuler un cluster Kubernetes local.
* **Kubernetes** pour gérer les pods, services et autoscaling.
* **Metrics Server** pour collecter les métriques CPU.
* **GitHub Actions** pour automatiser build + deploy.

---

## 🛠️ 1. Création de l’application Node.js

### Initialisation du projet

```bash
mkdir mon-projet-express
cd mon-projet-express
npm init -y
npm install express
```

### Code du serveur : `server.js`

Application Express simple servant une API et un dossier `public`.

---

## 🐳 2. Dockerisation du projet

La Dockerisation consiste à créer un conteneur exécutable contenant Node.js + l’application.

### Dockerfile utilisé

* Image de base : `node:20-alpine`
* Copie du code + installation des dépendances
* Exposition du port 3400
* Commande de démarrage : `node server.js`

### Build et test de l'image

```bash
docker build -t mon-express-app:latest .
docker run -p 3400:3400 mon-express-app:latest
```

---

## ☸️ 3. Déploiement Kubernetes

### 3.1 Démarrer Minikube

```bash
minikube start
```

### 3.2 Fichier `deployment.yaml`

Définit :

* nombre de pods (replicas)
* conteneur utilisé
* ressources CPU/mémoire
* politique d’image : `imagePullPolicy: Never`

### 3.3 Fichier `service.yaml`

Expose l’application via un **NodePort** (port 30080).

### 3.4 Application des manifestes

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

---

## 🔍 4. Résolution du problème ImagePullBackOff

Kubernetes essayait de récupérer l’image depuis Docker Hub.

👉 Solution : ajouter `imagePullPolicy: Never`.

Ensuite, redémarrer les pods :

```bash
kubectl delete pod --all
```

---

## 🌐 5. Accès à l'application

Méthodes :

* **Automatique** : `minikube service mon-express-service`
* **Manuelle** : `http://<minikube-ip>:30080`

---

## 📈 6. Autoscaling (HPA)

### Création du HPA

```bash
kubectl autoscale deployment mon-express-deployment --cpu-percent=50 --min=2 --max=10
```

### Problème rencontré : TARGETS <unknown>

Raison : Metrics Server non installé.

### Installation

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Puis modification pour Minikube :

* `--kubelet-insecure-tls`
* `--kubelet-preferred-address-types=InternalIP`

### Test de charge (scaling)

```bash
hey -z 1m -c 50 http://127.0.0.1:3400/
```

---

## 🔄 7. CI/CD avec GitHub Actions

Pipeline permettant :

* Build de l’image Docker
* Lancement automatique de Minikube
* Déploiement automatique Kubernetes

Fichier : `.github/workflows/deploy.yml`

---

## 🗂️ 8. Gestion du projet avec Git & GitHub

Étapes :

* `git init`
* configuration user/email
* génération clé SSH : `ssh-keygen -t ed25519`
* ajout sur GitHub
* vérification : `ssh -T git@github.com`
* push du projet

Fichiers importants :

* `.gitignore`
* `.dockerignore`

---

## ✅ Conclusion

Ce TP a permis de comprendre et manipuler l’ensemble de la chaîne DevOps :

* Développement Node.js
* Containerisation Docker
* Déploiement Kubernetes
* Gestion du scaling automatique
* Mise en place d’un pipeline CI/CD
* Gestion du projet avec Git & SSH

C’est une base solide pour travailler avec des environnements Cloud modernes et des workflows DevOps professionnels.
