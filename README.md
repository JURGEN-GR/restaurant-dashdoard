# Dashboard administrativo con ReactJS + Typescript + Sass

## Descripción breve del proyecto

Todas las rutas de esta aplicación web están validas, cuenta con autenticación de usuarios, también ofrece una administración de usuarios, restaurantes y platillos.
La administración de restaurantes cuenta con un mapa que es proveído por MAPBOX un servicio de terceros y con el podemos agregar o cambiar la ubicación de un restaurante,
La administración de usuarios no es más que un CRUD,
La administración de platillos también es un CRUD solo que este también puede subir imágenes y videos.

## Conexión con el backend

Este proyecto funciona con el siguiente backend: <https://github.com/JURGEN-GR/restaurant-rest-server> corra el servidor y coloque la URL en las variables de entorno

## Importante!!

Para que las variables de entorno carguen es necesario que cree los siguientes archivos y las coloque ahí.

- .env.development
- .env.production

Para correr el proyecto solo ejecute:

```
npm install
npm run dev
```
