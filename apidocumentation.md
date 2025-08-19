POST
/auth/register
Registrar nuevo usuario
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "cedula": "00100000000",
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "123456",
  "telefono": "8095551234",
  "matricula": "2021-0123"
}
Responses
Code	Description	Links
201	
Usuario registrado exitosamente

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "token": "string",
  "usuario": {
    "id": "string",
    "cedula": "string",
    "nombre": "string",
    "apellido": "string",
    "correo": "string",
    "telefono": "string"
  }
}
No links
400	
Solicitud incorrecta

Media type

application/json
Example Value
Schema
{
  "error": "string"
}
No links
409	
Conflicto

Media type

application/json
Example Value
Schema
{
  "error": "string"
}

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "correo": "juan@example.com",
  "password": "123456"
}
Responses
Code	Description	Links
200	
Login exitoso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "token": "string",
  "usuario": {
    "id": "string",
    "cedula": "string",
    "nombre": "string",
    "apellido": "string",
    "correo": "string",
    "telefono": "string"
  }
}
No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "correo": "juan@example.com"
}
Responses
Code	Description	Links
200	
Código enviado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "mensaje": "string",
  "codigo": "string"
}

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "correo": "user@example.com",
  "codigo": "string",
  "nueva_password": "string"
}
Responses
Code	Description	Links
200	
Contraseña actualizada

No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Lista de servicios

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "nombre": "string",
    "descripcion": "string",
    "icono": "string"
  }
]

Parameters
Try it out
Name	Description
id *
string
(path)
id
Responses
Code	Description	Links
200	
Servicio encontrado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "nombre": "string",
  "descripcion": "string",
  "icono": "string"
}
No links
404	
No encontrado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Lista de noticias ordenadas por fecha

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "titulo": "string",
    "resumen": "string",
    "contenido": "string",
    "imagen": "string",
    "fecha": "2025-08-19T02:59:58.608Z"
  }
]
GET
/videos
Listar videos educativos
Parameters
Cancel
Name	Description
categoria
string
(query)

reciclaje
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://adamix.net/medioambiente/videos?categoria=reciclaje' \
  -H 'accept: application/json'
Request URL
https://adamix.net/medioambiente/videos?categoria=reciclaje
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "000001",
    "titulo": "Cómo reciclar en casa",
    "descripcion": "Aprende las técnicas básicas para separar y reciclar los residuos de tu hogar.",
    "url": "https://www.youtube.com/watch?v=uW9Qk0OAPio",
    "thumbnail": "https://img.youtube.com/vi/uW9Qk0OAPio/hqdefault.jpg",
    "categoria": "reciclaje",
    "duracion": "12:45",
    "fecha_creacion": "2025-01-15 10:00:00"
  },
  {
    "id": "000001",
    "titulo": "Cómo reciclar en casa",
    "descripcion": "Aprende las técnicas básicas para separar y reciclar los residuos de tu hogar.",
    "url": "https://www.youtube.com/watch?v=uW9Qk0OAPio",
    "thumbnail": "https://img.youtube.com/vi/uW9Qk0OAPio/hqdefault.jpg",
    "categoria": "reciclaje",
    "duracion": "12:45",
    "fecha_creacion": "2025-01-15 10:00:00"
  },
  {
    "id": "000001",
    "titulo": "Cómo reciclar en casa",
    "descripcion": "Aprende las técnicas básicas para separar y reciclar los residuos de tu hogar.",
    "url": "https://www.youtube.com/watch?v=uW9Qk0OAPio",
    "thumbnail": "https://img.youtube.com/vi/uW9Qk0OAPio/hqdefault.jpg",
    "categoria": "reciclaje",
    "duracion": "12:45",
    "fecha_creacion": "2025-01-15 10:00:00"
  }
]
Response headers
 access-control-allow-headers: Content-Type,Authorization,Content-Type,Authorization 
 access-control-allow-methods: GET,POST,PUT,DELETE,OPTIONS,GET,POST,PUT,DELETE,OPTIONS 
 access-control-allow-origin: *,* 
 content-length: 1105 
 content-type: application/json; charset=utf-8 
 date: Tue,19 Aug 2025 03:00:13 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: PHP/7.3.13,ASP.NET 
Responses
Code	Description	Links
200	
Lista de videos

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "titulo": "string",
    "descripcion": "string",
    "url": "string",
    "thumbnail": "string",
    "categoria": "string",
    "duracion": "string"
  }
]GET
/areas_protegidas
Listar áreas protegidas
Parameters
Cancel
Name	Description
tipo
string
(query)

reserva_cientifica
busqueda
string
(query)
busqueda
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://adamix.net/medioambiente/areas_protegidas?tipo=reserva_cientifica' \
  -H 'accept: application/json'
Request URL
https://adamix.net/medioambiente/areas_protegidas?tipo=reserva_cientifica
Server response
Code	Details
200	
Response body
Download
[
  {
    "id": "000002",
    "nombre": "Reserva Científica Ébano Verde",
    "tipo": "reserva_cientifica",
    "descripcion": "Protege bosques nublados y especies endémicas como el ébano verde, árbol emblemático en peligro de extinción.",
    "ubicacion": "Cordillera Central, La Vega",
    "superficie": "23.1 km²",
    "imagen": "https://ejemplo.com/ebano-verde.jpg",
    "latitud": 19.05,
    "longitud": -70.5167,
    "fecha_creacion": "2025-01-15 10:00:00"
  },
  {
    "id": "000005",
    "nombre": "Reserva Científica Valle Nuevo",
    "tipo": "reserva_cientifica",
    "descripcion": "Altiplano más elevado del Caribe, con ecosistemas únicos de páramo andino y bosques de pino criollo.",
    "ubicacion": "Cordillera Central",
    "superficie": "910 km²",
    "imagen": "https://ejemplo.com/valle-nuevo.jpg",
    "latitud": 18.7167,
    "longitud": -70.6667,
    "fecha_creacion": "2025-01-15 10:00:00"
  },
  {
    "id": "000010",
    "nombre": "Reserva Científica Loma Quita Espuela",
    "tipo": "reserva_cientifica",
    "descripcion": "Protege las nacientes de importantes ríos del Cibao y alberga especies endémicas de flora y fauna.",
    "ubicacion": "San Francisco de Macorís, Duarte",
    "superficie": "72.5 km²",
    "imagen": "https://ejemplo.com/quita-espuela.jpg",
    "latitud": 19.35,
    "longitud": -70.15,
    "fecha_creacion": "2025-01-15 10:00:00"
  }
]
Response headers
 access-control-allow-headers: Content-Type,Authorization,Content-Type,Authorization 
 access-control-allow-methods: GET,POST,PUT,DELETE,OPTIONS,GET,POST,PUT,DELETE,OPTIONS 
 access-control-allow-origin: *,* 
 content-length: 1284 
 content-type: application/json; charset=utf-8 
 date: Tue,19 Aug 2025 03:00:35 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: PHP/7.3.13,ASP.NET 
Responses
Code	Description	Links
200	
Lista de áreas protegidas

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "nombre": "string",
    "tipo": "string",
    "descripcion": "string",
    "ubicacion": "string",
    "superficie": "string",
    "imagen": "string",
    "latitud": 0,
    "longitud": 0
  }
]Parameters
Try it out
Name	Description
categoria
string
(query)
categoria
Responses
Code	Description	Links
200	
Lista de medidas

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "titulo": "string",
    "descripcion": "string",
    "categoria": "string",
    "icono": "string"
  }
]Parameters
Try it out
Name	Description
departamento
string
(query)
departamento
Responses
Code	Description	Links
200	
Lista del equipo

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "nombre": "string",
    "cargo": "string",
    "departamento": "string",
    "foto": "string",
    "biografia": "string",
    "orden": 0
  }POST
/voluntarios
Solicitar ser voluntario
Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "cedula": "string",
  "nombre": "string",
  "apellido": "string",
  "correo": "user@example.com",
  "password": "string",
  "telefono": "string"
}
Responses
Code	Description	Links
201	
Solicitud registrada

No links
409	
Conflicto

Media type

application/json
Example Value
Schema
{
  "error": "string"
}GET
/normativas
Listar normativas ambientales

Parameters
Try it out
Name	Description
tipo
string
(query)
tipo
busqueda
string
(query)
busqueda
Responses
Code	Description	Links
200	
Lista de normativas

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "titulo": "string",
    "tipo": "string",
    "numero": "string",
    "fecha_publicacion": "2025-08-19",
    "descripcion": "string",
    "url_documento": "string"
  }
]
No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}GET
/reportes
Listar mis reportes

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Lista de reportes del usuario

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "codigo": "string",
    "titulo": "string",
    "descripcion": "string",
    "foto": "string",
    "latitud": 0,
    "longitud": 0,
    "estado": "pendiente",
    "comentario_ministerio": "string",
    "fecha": "2025-08-19T03:01:19.102Z"
  }
]
No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}POST
/reportes
Crear nuevo reporte

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "titulo": "string",
  "descripcion": "string",
  "foto": "string",
  "latitud": 0,
  "longitud": 0
}
Responses
Code	Description	Links
201	
Reporte creado

No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}
No links

GET
/reportes/{id}
Obtener Code	Description	Links
200	
Reporte encontrado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "codigo": "string",
  "titulo": "string",
  "descripcion": "string",
  "foto": "string",
  "latitud": 0,
  "longitud": 0,
  "estado": "pendiente",
  "comentario_ministerio": "string",
  "fecha": "2025-08-19T03:01:30.403Z"
}
No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}
No links
403	
Prohibido

Media type

application/json
Example Value
Schema
{
  "error": "string"
}
No links
404	
No encontrado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "nombre": "string",
  "apellido": "string",
  "telefono": "string"
}
Responses
Code	Description	Links
200	
Actualización exitosa

No links
401	
No autorizado

Media type

application/json
Example Value
Schema
{
  "error": "string"
}