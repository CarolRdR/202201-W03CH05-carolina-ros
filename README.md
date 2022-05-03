# Week 3 - Challenge WeekEnd

## Description

Logo Pokémon
Pokémon

Esta aplicación tendrá tres páginas:

    Todos los pokémon
    Mis pokémon
    Detalle de pokémon

El listado de todos los pokémon se alimentará de la PokéAPI, y deberá ir paginado. El listado deberá ir acompañado de dos botones, para avanzar y retroceder de página. También debe mostrar el total de pokèmon mostrados vs. el total de pokèmon que existen (p.e. 10/1000).

El usuario debe poder añadir los pokémon que quiera a su listado local. El listado de Mis pokémon se alimentará de una API local. El usuario debería poder eliminar pokémon de su listado local, y también modificar algún/unos dato/s.

En cualquiera de los listados, el usuario debería poder ir al detalle de un pokémon, donde se le mostrarán más datos. A esta página de detalle se llega pasando una id por la URL (la id del pokémon que queremos ver).

BEM HTML semántico Testing

## Instructions

Proyecto sin framework, hecho en Vanilla Javascript. Se accede desde el fichero index.html que se localiza en la carpeta public, teniendo un servidor apuntando a esa carpeta (ejemplo: Live serve de Visual Studio Code).

Es imprescindible tener levantado el servidor local para acceder a Favoritos. Desde la carpeta server hay que ejecutar json-server o ejecutar directamente:

```shell
npm run server:local
```
