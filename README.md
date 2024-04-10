# TpDsw | Repositorio Front End

Trabajo Practico de Desarrollo de Software UTN FRRO

## Integrantes:

- Fani, Nicolás | Legajo: 49449
- Fina, Gino | Legajo: 49721
- Sanchez, Franco Nahuel | Legajo: 49738
- Mongelos, Manuel | Legajo: 48959
- Zubiri, Joaquin | Legajo: 50206

## Repositorios

- [**FrontEnd (Actual)**](https://github.com/fraancosan/gymScriptFE)
- [**BackEnd**](https://github.com/JoaquinZubiri/ServidorDSW)

## [Descripción de Negocio](https://drive.google.com/file/d/1wwekkTi99xBK9NEA6BUtu4bnYpEpjds7/view?usp=sharing)

## Visualizacion del proyecto

[**Pagina Web**](https://francosanchez.me/gymScriptFE/home)

[**Video Demostracion**](https://youtu.be/u8zHUxM0M9Q)

[**(Viejo) Video Demostracion - Primera Version**](https://youtu.be/uJMpIO53Nyk)

> [!NOTE]
> Es posible que los datos provenientes de la BD tarden en cargarse, esto se debe dado a que luego de un periodo de inactividad el backend entra en estado de hibernacion y cuando se le realiza una consulta debe volver a activarse.

> [!IMPORTANT]
> Dado que estamos usando servidores gratuitos, las imagenes no son persistentes y se borran automaticamente luego de un corto plazo de tiempo

## Comandos Útiles

### Principal

> [!NOTE]
> En la instalacion se instala tambien la versión adecuada de angular

- Instalación: npm run start
- Iniciar proyecto
  - Segun entorno:
    - Dev: ng serve
    - Prod: npm run prod
  - El servidor se creara en: http://localhost:4200/
- Deploy: ng deploy

### Tests

- Unit Testing: npm run test
- E2E Testing:
  - Via Interfaz: npm run cypress:open
  - Via consola: npm run test:e2e
