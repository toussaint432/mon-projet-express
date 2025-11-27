# Image officielle légère
FROM node:20-alpine

# Auteur
LABEL maintainer="Master Bambey"

# Dossier de travail dans le container
WORKDIR /opt/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Copier le code serveur et le frontend
COPY server.js ./
COPY public ./public

# Port d'écoute
EXPOSE 3400
ENV PORT=3400

# Commande de démarrage
CMD ["node", "server.js"]
