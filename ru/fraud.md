# Скрипт определения качества трафика
## Что это такое
Это Javascript скрипт, который помогает определять ботов(headless браузеры) и подозрительных пользователей(подмена useragent, открытый девтул, режим инкогнито и так далее). Скрипт проверяет браузер по 30 параметрам и возвращает оценку от 0 до 1. 

* 0 — это 100% бот.
* 1 — это 100% пользователь.

## Установка
Скрипт загружается и выполняется синхронно. Поэтому, если вы вы хотите совершать редирект на основании полученных данных, то разместите скрипт внутри тэга ```<head></head>```. Если же вы хотите просто получить значение и продолжить выполнение страницы, то разместите в самом низу страницы, перед закрывающимся тэгом ```</body>```. В таком случае скрипт не будет блокировать прорисовку страницы.

```
<script  src="https://cdn.pushflow.net/fraud/current/PushflowTrafficQuality.js" ></script>
<script>
  PushflowTrafficQuality.init({callback: function(result) {
    <!-- Разместите здесь ваш код -->
  }})
</script>
```

Результатом выполнения скрипта является объект ```result``` вида: 
```
  {
    isBot: Boolean,
    isIncognito: Boolean, 
    quality: Number
  }
```

## Интеграция c Binom
Чтобы передать значение в виде эвента в бином код будет следующим:
```
<script  src="https://cdn.pushflow.net/fraud/current/PushflowTrafficQuality.js" ></script>
<script>
  PushflowTrafficQuality.init({callback: function(result) {
      var o = document.createElement("img");
      o.src='http://tracker.net/click.php?event9=' + result.quality;
  }})
</script>
```
В самом биноме нужно создать нужный вам эвент и считать его среднее значение, на основе полученных данных. ([Документация Binom](https://docs.binom.org/events.php))