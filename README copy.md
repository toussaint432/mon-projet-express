Démo Node.js, Docker, Kubernetes & CI/CD
✅ SLIDE 1 — Introduction
Script :
Bonjour, aujourd’hui je vais vous présenter une application Node.js simple et vous montrer tout son cycle :
Exécution locale
Dockerisation
Déploiement dans Kubernetes via Minikube
Autoscaling
Et enfin un pipeline CI/CD complet avec GitHub Actions.
✅ SLIDE 2 — Lancement de l’application en local
Script :
Je commence par tester mon application Express en local :
npm install
node server.js
L’application écoute sur le port 3400.
Cela me permet de vérifier qu’elle fonctionne avant de passer à Docker.
✅ SLIDE 3 — Dockerisation du projet
1) Construction de l’image
docker build -t mon-express-app .
Script :
Ici je crée une image basée sur Node.js Alpine.
2) Lancer le conteneur
docker run -p 3400:3400 mon-express-app
Script :
J’expose le port 3400 pour accéder l’application via Docker.
3) Vérifier l’image
docker images
✅ SLIDE 4 — Démarrer Minikube
minikube start
kubectl get nodes
Script :
Minikube démarre un cluster Kubernetes local.
Je vérifie que le node est bien actif.
✅ SLIDE 5 — Charger l’image Docker dans Minikube
minikube image load mon-express-app
Script :
Comme mon image est locale, je dois la charger dans Minikube.
Si Kubernetes refuse l’image, je précise :
imagePullPolicy: Never
✅ SLIDE 6 — Déploiement Kubernetes
Créer Deployment + Service
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
Vérification
kubectl get pods
kubectl logs <pod>
Script :
Le Deployment crée les pods, et le Service expose l’app.
✅ SLIDE 7 — Accéder à l’application
Méthode automatique :
minikube service mon-express-service
IMPORTANT sur macOS :
Comme j’utilise Minikube avec Docker driver, un tunnel doit rester ouvert pour exposer l’application.
Tant que je ne ferme pas ce terminal, l’URL reste fonctionnelle.
Méthode manuelle
minikube ip
kubectl get svc
✅ SLIDE 8 — Metrics Server
Vérifier :
kubectl top nodes
kubectl top pods
Script :
Cela permet de récupérer l’utilisation CPU/mémoire.
✅ SLIDE 9 — Autoscaling Horizontal (HPA)
Création du HPA :
kubectl autoscale deployment mon-express --cpu-percent=50 --min=2 --max=10
Vérification :
kubectl get hpa
kubectl get hpa -w
✅ SLIDE 10 — Simulation de charge
hey -z 60s -c 50 http://<minikube-ip>:<nodeport>/
Observer les pods scaler :
kubectl get pods -w
Script :
Quand la charge augmente, Kubernetes crée automatiquement de nouveaux pods.
✅ SLIDE 11 — Pipeline CI/CD GitHub Actions
Faire un changement :
git add .
git commit -m "Test CI/CD"
git push origin main
Script :
GitHub Actions exécute automatiquement les étapes du pipeline :
Build du projet
Tests
Build + push image Docker
Déploiement automatique dans Kubernetes
✅ SLIDE 12 — Conclusion
Script :
Nous avons donc un cycle complet :
Développement
Containerisation
Déploiement Kubernetes
Monitoring
Autoscaling
Intégration et déploiement continus
L’application est capable de monter en charge automatiquement grâce à Kubernetes.