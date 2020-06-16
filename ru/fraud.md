# Скрипт определения качества трафика
## Что это такое
Это Javascript скрипт, который помогает определять ботов(headless браузеры) и подозрительных пользователей(подмена useragent, открытый девтул, режим инкогнито и так далее). Скрипт проверяет браузер по 30 параметрам и возвращает оценку от 0 до 1. 

* 0 — это 100% бот.
* 1 — это 100% пользователь.

## Установка
Разместите приведенный ниже код внутри тэга ```<head></head>```. Скрипт будет загружатся асинхроно и без блокировки вашей страницы.
```
  <script type="text/javascript">
    function pushflowCallback(result) {
        <!-- Разместите здесь ваш код и удалите эту надпись -->
    }

    (function (d, t){ var s=d.createElement(t); var op={'callback':pushflowCallback}; s.type='text/javascript'; s.async=true; s.defer=true; s.src="https://cdn.pushflow.net/fraud/current/PushflowTrafficQuality.js"; s.onload=s.onreadystatechange=function (){ var rs=this.readyState; if (rs) if (rs !='complete') if (rs !='loaded') return; try{ PushflowTrafficQuality.init(op)} catch (e){}}; var scr=d.getElementsByTagName(t)[0]; var par=scr.parentNode; par.insertBefore(s, scr);})(document, 'script');
  </script>
```
После завершения загрузки и прохождения проверок, будет вызвана функция ```pushflowCallback```. Разместите внутри нее код, который вы хотите выполнить после завершения проверок. Результатом выполнения скрипта возвращается объект ```result``` вида: 
```
  {
    isBot: Boolean,
    isIncognito: Boolean, 
    quality: Number
  }
```
Например чтобы получить значение качества пользователя внутри коллбэка, нужно вызвать ```result.quality```.

* **isBot** — или значение quality равное 0. Мы на точно уверены, что данный пользователь бот.
* **isIncognito** — мы установили, что данная страница открыта в режиме инкогнито. (Например, если вы льете адалт трафик, где много пользователей используют режим инкогнито, то значение quality будет иметь значение от 0.5 до 1, так как браузер в режиме инкогнито имеет ряд ограничений и возможно имеет смысл, не передавать данные об этих пользователях, в трэкер.)
* **quality** — значение от 0 до 1, говорящее о качестве пользователя или его ботовости. 


Код внутри ```pushflowCallback``` может быть вызван несколько раз. Первый раз он вызывается после инициализации скрипта и прохождения проверок, но некоторые проверки работают только когда бот взаимодействует со страницей(например куда-либо кликает), в таких случаях, функция callback будет вызвана повторно, если будет установленно что новое значение quality, меньше, чем ранее возвращенное.

## Интеграция c Binom
Чтобы передать значение в виде эвента в бином код будет следующим:
```
  <script type="text/javascript">
    function pushflowCallback(result) {
      var o = document.createElement("img");
      o.src='http://tracker.net/click.php?event9=' + result.quality;
      <!-- Замените event9, на созданный вами эвент в биноме -->
    }

    (function (d, t){ var s=d.createElement(t); var op={'callback':pushflowCallback}; s.type='text/javascript'; s.async=true; s.defer=true; s.src="https://cdn.pushflow.net/fraud/current/PushflowTrafficQuality.js"; s.onload=s.onreadystatechange=function (){ var rs=this.readyState; if (rs) if (rs !='complete') if (rs !='loaded') return; try{ PushflowTrafficQuality.init(op)} catch (e){}}; var scr=d.getElementsByTagName(t)[0]; var par=scr.parentNode; par.insertBefore(s, scr);})(document, 'script');
  </script>

```
В самом биноме нужно создать нужный вам эвент и считать его среднее значение, на основе полученных данных. ([Документация Binom](https://docs.binom.org/events.php))