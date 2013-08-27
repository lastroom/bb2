Bugbucket 2.0
=============

> Esta es la segunda versión de bugbucket.

## Preparar para desarrollo

Hay que bajar mongodb: http://mongodb.org

Una vez descargado hay que crear la carpeta /data/db y cambiar el propietario:

```sh
$ sudo mkdir /data/db; sudo chown -R jceb /data
```

Luego que lo haz bajado hay que poner los archivos de la carpeta bin en algún directorio, en el que el SO lo reconozca como global, por ejemplo: /usr/local/bin/.

Luego debes correr mongod que es el servidor de mongo:

```sh
$ mongod
```

El promp te debe devolver algo como esto:

```sh
mongod --help for help and startup options
Tue Aug 27 00:18:26.179 [initandlisten] MongoDB starting : pid=77029 port=27017 dbpath=/data/db/ 64-bit host=MacBook-Air-de-Julian.local
Tue Aug 27 00:18:26.180 [initandlisten] 
Tue Aug 27 00:18:26.180 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
Tue Aug 27 00:18:26.180 [initandlisten] db version v2.4.6
Tue Aug 27 00:18:26.180 [initandlisten] git version: b9925db5eac369d77a3a5f5d98a145eaaacd9673
Tue Aug 27 00:18:26.180 [initandlisten] build info: Darwin bs-osx-106-x86-64-2.10gen.cc 10.8.0 Darwin Kernel Version 10.8.0: Tue Jun  7 16:32:41 PDT 2011; root:xnu-1504.15.3~1/RELEASE_X86_64 x86_64 BOOST_LIB_VERSION=1_49
Tue Aug 27 00:18:26.180 [initandlisten] allocator: system
Tue Aug 27 00:18:26.180 [initandlisten] options: {}
Tue Aug 27 00:18:26.180 [initandlisten] journal dir=/data/db/journal
Tue Aug 27 00:18:26.180 [initandlisten] recover : no journal files present, no recovery needed
Tue Aug 27 00:18:26.240 [websvr] admin web console waiting for connections on port 28017
Tue Aug 27 00:18:26.240 [initandlisten] waiting for connections on port 27017
```

Si quieres ponerlo en el background:

```sh
$ mongod &
```

Por último, vamos a instalar las dependencias de nuestro proyecto, como super usuario:

```sh
$ sudo npm install
```

## ¿Que hay de nuevo?

Bueno, en esta versión nos vamos a divertir mucho, puesto que la construiremos con nodeJS con ayuda de express, mongodb, mongoose y wonkajs.

## Caracteristicas

El primer [bugbucket](http://bugbucket.org) era simplemente un complemento para bugbucket, que permitía listar los proyectos de bitbucket, los milestones definidos en algún proyecto, posteriormente podías ver los issues en una tabla kanban.

Esta nueva versión funcionará como un administrador de proyectos, donde podrás definir milestones, versiones e issues, que te permitiran gestionar tus proyectos de diseño, de contabilidad, etcetera. Pero que también podrás conectar tu cuenta de bitbucket y/o github, con lo cual podrás mandar estos proyectos, milestones, versiones e issues cualquiera de estos dos servicios de administración de código fuente.

## Colaboraciones

Si deseas colaborar, por favor manda un correo a julian at lastroom dot mx, levanta un issue, etc.
