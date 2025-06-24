# moleculer-ts

Первый раз для распаковки системно зависимых пакетов выполнить в корне команду
```
yarn
```


В разных терминалах git-bash запустить команды
```
yarn api:dev all
yarn ui:watch demo
yarn ui:preview demo
yarn ui:watch public
yarn ui:preview public
```

Открыть http://localhost:3001/ и увидите демо-приложение с подключенным федерированным компонентом.

Команды для тестирования смотрим в package.json

## Как добавить приложение

1. Создать директорию src/app-name где name это ваше имя приложения
2. В файле src/app-name/routes.tsx реализовать корневой файл react-приложения
3. Добавить фичи и подключить их в routes.tsx

## Как добавить сервис

1. В нужном приложении и фиче создать файл с именем myname.service.ts из которого вернуть описание сервиса moleculer

```
export default {
	"name": "myname",
	"actions": {

	}
}
```

2. Запустить весь бэкенд

```
yarn api:dev all
```

или выбранный сервис

```
yarn api:dev gateway,myname
```

