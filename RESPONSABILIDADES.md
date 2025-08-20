# Responsabilidades de las Clases - MedioAmbienteApp

A continuación, explico las responsabilidades de cada clase principal del proyecto y cómo contribuyen al funcionamiento general de la aplicación.

---

## 1. `MainActivity`

**Responsabilidad:**  
Es la clase principal de la aplicación. Se encarga de inicializar la interfaz de usuario, gestionar la navegación entre pantallas y coordinar la interacción del usuario con las funcionalidades principales.

**Explicación:**  
Cuando el usuario abre la app, `MainActivity` es la primera clase que se ejecuta. Aquí se configuran los menús, botones y enlaces a otras actividades. Además, maneja eventos globales como el cierre de sesión y la navegación.

---

## 2. `LoginActivity`

**Responsabilidad:**  
Gestiona el proceso de autenticación de usuarios. Valida las credenciales y permite el acceso a la aplicación.

**Explicación:**  
`LoginActivity` muestra el formulario de inicio de sesión. Cuando el usuario ingresa sus datos, esta clase verifica la información y, si es correcta, redirige al usuario a la pantalla principal. Si hay errores, muestra mensajes adecuados.

---

## 3. `RegisterActivity`

**Responsabilidad:**  
Permite a nuevos usuarios crear una cuenta en la aplicación.

**Explicación:**  
Aquí se recopilan los datos necesarios para el registro, como nombre, correo y contraseña. La clase valida los datos y los envía al backend para crear el usuario. Si el registro es exitoso, redirige al usuario al login.

---

## 4. `EnvironmentalReportActivity`

**Responsabilidad:**  
Gestiona la creación y visualización de reportes ambientales por parte de los usuarios.

**Explicación:**  
Esta clase permite que los usuarios creen reportes sobre problemas ambientales, como contaminación o deforestación. Los reportes se almacenan y pueden ser consultados por otros usuarios. También se encarga de mostrar detalles de cada reporte.

---

## 5. `ReportAdapter`

**Responsabilidad:**  
Adapta la información de los reportes para ser mostrada en listas o grids dentro de la interfaz.

**Explicación:**  
`ReportAdapter` toma los datos de los reportes y los transforma en elementos visuales para que se puedan mostrar en la pantalla de manera ordenada y atractiva. Facilita la interacción con cada elemento de la lista.

---

## 6. `UserProfileActivity`

**Responsabilidad:**  
Permite a los usuarios ver y editar su perfil.

**Explicación:**  
En esta clase, el usuario puede consultar su información personal, modificar datos como nombre o correo, y actualizar su contraseña. También puede ver estadísticas sobre su participación en la app.

---

## 7. `ApiService`

**Responsabilidad:**  
Gestiona la comunicación con el backend o servidor.

**Explicación:**  
`ApiService` contiene los métodos para enviar y recibir datos entre la app y el servidor, como iniciar sesión, registrar usuarios, obtener reportes y enviar nuevos reportes. Centraliza todas las llamadas a la API.

---

## 8. `ReportModel`

**Responsabilidad:**  
Representa la estructura de los datos de un reporte ambiental.

**Explicación:**  
`ReportModel` define los atributos de un reporte, como título, descripción, ubicación y fecha. Se utiliza para crear, almacenar y manipular los datos de los reportes en la app.

---

## 9. `UserModel`

**Responsabilidad:**  
Representa la estructura de los datos de un usuario.

**Explicación:**  
`UserModel` define los atributos de un usuario, como nombre, correo y estadísticas de participación. Se utiliza para gestionar la información del usuario en la app.

---

# Conclusión

Cada clase tiene una responsabilidad clara y específica, lo que facilita el mantenimiento y la escalabilidad del proyecto. La separación de responsabilidades permite que el código sea más organizado y fácil de entender, tanto para el equipo de desarrollo como para futuros colaboradores.

---

# ¿Cómo ejecutar el proyecto?

Para correr el proyecto, abre una terminal en la carpeta raíz y ejecuta el siguiente comando:

```bash
# Para proyectos Android con Gradle:
./gradlew assembleDebug
./gradlew installDebug

# O si usas Android Studio, simplemente presiona el botón "Run" (▶️).

# Para proyectos React Native:
npx react-native run-android
```

Asegúrate de tener configurado el entorno de desarrollo (Android Studio, emulador o dispositivo físico, y dependencias necesarias).

