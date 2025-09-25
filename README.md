# 💻 Proyecto Tecno-Seguridad

Una aplicación web completa y funcional de comercio electrónico (e-commerce) para un negocio de tecnología y seguridad. El proyecto fue desarrollado para demostrar la creación de una aplicación de página única (SPA) con funcionalidades de gestión de productos, autenticación de usuarios y un carrito de compras interactivo.

## ✨ Características Principales

* **Gestión de Productos (CRUD):** Un panel de administración que permite a los usuarios autenticados crear, leer, actualizar y eliminar productos de la base de datos.
* **Autenticación de Usuarios:** Integración con Firebase Authentication para el registro e inicio de sesión seguro, protegiendo las rutas privadas.
* **Carrito de Compras:** Funcionalidad completa para agregar, eliminar y gestionar productos en un carrito de compras, calculando el total en tiempo real.
* **Base de Datos en Tiempo Real:** Todos los datos del proyecto (productos, usuarios) están almacenados en **Firebase Firestore**, lo que permite una actualización en tiempo real.
* **Componentes Reutilizables:** El proyecto está estructurado con componentes modulares de React que facilitan la escalabilidad y el mantenimiento.
* **Diseño Responsivo:** La aplicación se adapta a diferentes tamaños de pantalla, asegurando una experiencia de usuario óptima en dispositivos móviles y de escritorio.

## 🔧 Tecnologías Utilizadas

* **Frontend:** React.js con Vite
* **Estilos:** React-Bootstrap para un diseño rápido y responsive.
* **Estado Global:** React Context API para la gestión del estado de autenticación y del carrito de compras.
* **Enrutamiento:** React Router DOM para la navegación entre páginas.
* **Base de Datos y Autenticación:** Google Firebase (Firestore y Authentication) para la persistencia de datos.

---

## ⚙️ Guía de Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo.

### Prerrequisitos

* [Node.js](https://nodejs.org/) (versión 18 o superior)
* [npm](https://www.npmjs.com/)
* Una cuenta de [Firebase](https://firebase.google.com/) con un proyecto configurado para Firestore y Authentication.

### Pasos

1.  **Clonar el repositorio**
    Abre tu terminal y clona este proyecto desde GitHub.

    ```bash
    git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
    cd tu-repositorio
    ```

2.  **Instalar dependencias**
    Instala todas las librerías necesarias para que la aplicación funcione correctamente.

    ```bash
    npm install
    ```

3.  **Configurar las Variables de Entorno**
    Conecta la aplicación a tu proyecto de Firebase.

    a. Crea un archivo llamado `.env.local` en la raíz de tu proyecto.

    b. Copia y pega el siguiente contenido, reemplazando los valores con las credenciales de **tu** proyecto de Firebase:

    ```env
    REACT_APP_FIREBASE_API_KEY="AIzaSy...rest_of_your_key"
    REACT_APP_FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
    REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
    REACT_APP_FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="1234567890"
    REACT_APP_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"
    ```

    > **Importante:** Reemplaza cada valor con las credenciales reales de tu proyecto que encontrarás en la consola de Firebase.

4.  **Iniciar el servidor de desarrollo**
    Ejecuta el siguiente comando para iniciar la aplicación localmente.

    ```bash
    npm run dev
    ```

    La aplicación se abrirá en tu navegador en `http://localhost:5173/`.

---

## 🚀 Despliegue en Producción

El proyecto está diseñado para ser desplegado fácilmente en plataformas como **Vercel** o Netlify, las cuales ofrecen despliegue continuo desde GitHub.

1.  **Asegúrate de que el proyecto esté en GitHub.**
2.  **Importa el proyecto en Vercel** (o tu plataforma de elección).
3.  **Configura las variables de entorno** en la plataforma de despliegue, asegurándote de que los nombres y valores coincidan con los de tu archivo `.env.local`.

Cada vez que subas cambios a la rama principal (`main`), Vercel detectará la actualización y desplegará una nueva versión de tu sitio automáticamente.