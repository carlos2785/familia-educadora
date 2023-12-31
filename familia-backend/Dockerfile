# este archivo crea una imagen de lo que tengo, si hago cambios debo crear otra imagen
#FROM determina la versión de NODE y la descarga
FROM node:20

#ruta de la app dentro del contenedor, ahí quedan todos los archivos de mi app
WORKDIR /usr/src/app
#lee todas las librerias y paquetes de mi app
COPY package*.json ./
#instala todos los paquetes que tiene mi aplicación
RUN npm install
#copia todo en el contenedor
COPY . .
#puerto que escucha en el contenedor
EXPOSE 4000
#ejecuta el archivo index de mi aplicación para correrla
CMD [ "node", "index.js" ]

# Luego de esto se crea la imagen usando la linea de comando, ubicando en la carpeta del proyecto
# docker build -t inventarios-backend:v1., build=crea imagen, inventario...= nombre imagen :v1=version, puede tener varias versiones con el mismo nombre
# al final lleva un punto para que busque en las carpetas el archivo Dockerfile