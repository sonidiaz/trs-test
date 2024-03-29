# Infografías RTVE

La aplicación web de componentes interactivos es una solución tecnológica diseñada para la creación de narrativas e infografías digitales para contenido y datos, permitiendo a los creados de contenidos utilizar componentes desarrollados con React e integrarlos de manera fácil en el CMS de RTVE.

## Instalación
Para comenzar a utilizar la aplicación es necesario seguir los siguientes pasos:

1. Asegurarse de tener **Node.js** y **NPM** (Node Package Manager) instalados en el sistema. 
2. Clonar el repositorio desde GitHub:
```
git clone https://github.com/IsraEvoluciona/infografiasRTVE.git
```
3. Navegar al directorio del proyecto:
```
cd infografiasRTVE
```
5. Instalar las dependencias del proyecto:
```
npm install
```
## Como funciona
Una vez completada la instalación, es necesario seguir estos pasos para utilizar la aplicación:

1. Creación de Componentes:
    - Los componentes interactivos se encuentran en la carpeta **src/components**.
    - Cada compomente debe estar en su propio directorio y con nombre **componenteContainer.tsx**
      - _Ejemplo:_ Si vamos a crear un componente que sea una galería de fotos:
      - Crear un directorio dentro de **src/components** llamado **Galeria** y dentro crear el archivo principal llamado **GaleriaContainer.tsx**
    - Los componentes deben ser diseñados de manera modular y reutilizable.
    - Utilice React para desarrollar componentes interactivos, como mapas, scrolling, sliders y otros elementos.
  
2. Composición de Páginas/Infografías:
    - Una vez creado el componente dentro de **src/components** es necesario agregarlo a la lista de componentes que que se encuentra en el fichero **src/ComponentLoad.ts**. Este archivo es el encargado de insertarlo en la vista y tiene el siguiente formato:
    - **id** es el nombre del del directorio creado dentro de src/components
    - **props** son las propiedades de configuración inicial que se les puede pasar el componente.
	- En el archivo **index.html** agregamos el elemento html del tipo div que representará el módulo en la página web.

```
export const loadComponent = [
  {
    id: 'Slider',
    props: {}
  },
  {
    id: 'Map',
    props: {}
  },
  {
    id: 'Scrollable',
    props: {}
  }
]
```
3. Estructura de la aplicación
```

├── index.html
├── index.js
├── package.json
├── package-lock.json
├── README.md
├── vite.config.ts
├── generate-script-html.js
├── .env
├── .env.local
└── src
    └── components
        ├── Componente
        	├── componenteContainer.tsx
			└── componente.css
    └── interfaces
    ├── App.tsx
    ├── main.tsx
    ├── ComponentLoad.ts
    └── helpers
       	├── helper.ts
		└── 
```
3. Exportación para el CMS:
    - Para generar los archivos necesarios para la integración con el portal web es necesario ejecutar el siguiente comando npm:
    
```
npm run build
```
Los archivos generados serán todos los elementos necesarios, incluidos los componentes y estilos, para insertar en el CMS.
Estos ficheros se encuentran en **dist/assets/**
En nombre de estos archivos será el mismo que tienen los archivos en **src/components/miComponente** con la siguiente nomenclatura:
```
[miComponente]-[hash].js
[miComponente]-[hash].css
```
Además se generará el archivo **script.html** el cual tiene las importaciones de cada uno de los ficheros generados anteriormente.

## Integración con el CMS
La integración es el paso a producción de la solución que hemos desarrollado. Debemos subir los archivos generamos anteriormente a los servidores de RTVE y enlazarlos con la noticia que hará uso de los módulos, para eso seguimos las siguientes instrucciones:

1. Crear el directorio con el nombre del proyecto en el servidor de RTVE, en la siguiente dirección:
```
/WebPHP/aplicaciones/infografias/rtve_2023/noticias/mi-proyecto
```
2. Subir a la raiz de ese directorio el archivo **scripts.html**
3. Crear la carpeta **assest** dentro de la carpeta **mi-proyecto**
4. Subir todos los archivos que están dentro de **dist/assets/** en nuestro ordenador. *(*De momento el archivo script.html también se genéra dentro de assets)*
5. Generar los códigos para integrar en la noticia:

Los códigos son de 2 tipos, los elementos html de tipo **div** y el código para insertar contenido de tipo **include virtual**. 

Los elementos de tipo div son a los que se hará referencia el módulo que integraremos. Es decir, de este elemento div habrá tantos como módulos a mostrar.
Entre cada uno solo se diferencia por el **nombre del id** en el que comparte el prefijo **inf-**
```
<div id="inf-miComponente"></div>
```
El segundo tipo de código es el responsable de cargar todos los archivos necesarios para que la aplicación funcione y se inserta al final de la noticia.
El valor del include virtual será la url en el servidor donde hemos subido los archivos anteriormente.
```
<!--#include virtual="/aplicaciones/infografias/rtve_2023/noticias/350-diputados/script.html"-->
```

## ¿Por que?
La aplicación web de componentes se desarrolla a partir de la necesidad de dar interactividad a las infografías y dar a su ves flexibilidad para insertar los componentes según la narración de la infografía lo requiera.
  - Flexibilidad y Modernidad: La combinación de [React](https://github.com/facebook/react) y [Vite](https://github.com/vitejs/vite) permite desarrollar componentes interactivos modernos y flexibles que se pueden adaptar a diversas necesidades y estilos de diseño.
  - Facilidad de Composición: La aplicación proporciona una forma intuitiva de componer páginas e infografías mediante la selección y disposición de componentes interactivos.
  - Integración con el CMS: La exportación de archivos optimizados y listos para usar simplifica la integración de contenido interactivo en el CMS, reduciendo los tiempos de implementación.
  - Reutilización de Componentes: Los componentes desarrollados son reutilizables en múltiples páginas e infografías, lo que ahorra tiempo y esfuerzo en el desarrollo.
