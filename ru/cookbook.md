# Полезные советы и скрипты
## Запрашиваем пуш-подписку перед переходом на оффер с прилендинга
***Сценарий:*** 
Пользователь дошел до конца вашего прилендинга, нажимает на конечную кнопку перехода на оффер и у него появляется окно запроса пуш-подписки. Независимо от того, какую опцию он выбрал, у него происходит редирект на ваш оффер.

***Реализация:*** 
Cоздайте Фид в Pushflow и в разделе «Настройка редиректов» в каждом поле укажите ссылку на ваш оффер, например, если ваш трэкер Binom, то в каждом поле будет ссылка вида: ```http://trackdomain.com/click.php?lp=1```. Сохраняем и интегрируем сгенерируемый скрипт согласно инструкции.

В ```<head></head>``` добавляем следующий скрипт:
```
  <script>
    function toOffer(e) {
      e.preventDefault();
      pushflowSubscription();
    }
  </script>
  ```
  Далее находим кнопку, где находится ваша ссылка на оффер и добавляем ей onclick событие:
  ```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="toOffer(event)">Link</a>
  ```


## Открываем оффер в новой вкладке, а в старой производим запрос пуш-подписки
Интегрируем скрипт Pushflow [по обычной инструкции](/ru/feed_collect). Далее в ```<head></head>``` добавляем следующий скрипт:
```
  <script>
    // Change it to your offer link
    var offerUrl = "https://trackdomain.com/click.php?lp=1";
    var isLeftPage = false;
    
    function toOffer(e) {
      e.preventDefault();
      var win = window.open(offerUrl, '_blank');
      if (win) {
          win.focus();
      } else {
          location.href = offerUrl;
      }
      isLeftPage = true;
    };

    window.onfocus = function() {
      if (isLeftPage) {
        setTimeout(pushflowSubscription(), 500);
      }
    };
  </script>
```
В скрипте меняем ```https://trackdomain.com/click.php?lp=1``` на вашу ссылку на оффер.

Еще может быть такое, что юзер забудет про старую вкладку надолго и тогда скрипт может не сработать. Мы можем установить юзеру cookie на 31 день. Тогда финальный скрипт будет выглядеть так:
```
  <script>
    // Change it to your offer link
    var offerUrl = "https://trackdomain.com/click.php?lp=1";
    var isLeftPage = false;
    
    function toOffer(e) {
      e.preventDefault();
      var win = window.open(offerUrl, '_blank');
      if (win) {
          win.focus();
      } else {
          location.href = offerUrl;
      }
      isLeftPage = true;
      document.cookie = "isLeftPage=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
    };

    window.onfocus = function() {
      if (getCookie('isLeftPage') == 1 || isLeftPage) {
        setTimeout(pushflowSubscription(), 500);
      }
    };

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
  </script>
```

Другой вариант запроса подписки — это скачать готовый HTML-шаблон со страницы Фида(хорошо подойдет шаблон с капчей), разместить его у себя на веб-сервере и делать редирект юзера на эту страницу после того, как он открыл старую вкладку. Для этого нужно заменить часть скрипта выше ```  window.onfocus = function() {}``` на следующую:
```
  window.onfocus = function() {
    if (isLeftPage) {
      location.href = "https://link.com/index.php";
    }
  };
```
Где ```https://link.com/index.php``` нужно заменить ссылкой на страницу, где у вас производится сбор подписок.


## Подписываем неуникальных пользователей
***Сценарий:*** 
Если пользователь уже посещал ваш прилендинг, при повторном заходе у него сразу происходит запрос пуш-подписки.

***Реализация:*** 
Cоздайте Фид в Pushflow. Если хотите, чтобы после действия с окном подписки пользовать остался на текущей странице, оставьте все поля в разделе редиректов пустыми. Интегрируйте скрипт Pushflow [по обычной инструкции](/ru/feed_collect).

Если вы хотите спрашивать подписку у пользователей, которые ушли с вашего лендинга на оффер, а не просто посетили страницу, то добавьте следующий скрипт в ```<head></head>```:
```
<script>
  function setPushflowCookie() {
    document.cookie = "isLeftPage=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
  };

  window.addEventListener(
    "load",
    function() {
      if (getCookie('isLeftPage') == 1) {
        setTimeout(pushflowSubscription(), 1500);
      }
    },
    true
  );

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
</script>
```
Находим кнопку, где находится ваша ссылка на оффер или трэкер и добавляем ей onclick событие:
```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="setPushflowCookie()">Link</a>
```

Если же вы хотите спрашивать подписку у всех пользователей, кто зашел на ваш прилендинг и провел там более 3 секунд, то скрипт будет выглядеть так:
```
<script>
  window.addEventListener(
    "load",
    function() {
      setTimeout(setNonUniqCookeie(), 3000);

      if (getCookie('isNonUniq') == 1) {
        setTimeout(pushflowSubscription(), 1500);
      }
    },
    true
  );

  function setNonUniqCookeie() {
    document.cookie = "isNonUniq=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
  };


  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
</script>
```
В таком случае никаких дополнительных скриптов на кнопку перехода на оффер добавлять не нужно.


## Подписка при наличии URL-параметра
***Сценарий:*** 
Мы хотим, чтобы скрипт подписки срабатывал только тогда, когда в URL страницы есть какой-то ключ, например ```&p=1```. Это может быть полезно во время тестов прилендинга с подпиской и без, просто делаете в трэкере дубль прилендинга и добавляете к нему ключ ```&p=1```. Теперь на этом прилендинге будет появлятся окно подписки, а на прилендинге без ключа нет.

***Реализация:*** 
Интегрируйте скрипт Pushflow [по обычной инструкции](/ru/feed_collect). Далее в интегрируемом скрипте находим строчку ``` function pushflowSubscription() {``` и ниже ее добавляем следующее условие  ```if (window.location.href.indexOf('&p=1') < 0) return;```. Как итог получаем скрипт вида:
```
  ...
  function pushflowSubscription() {
    if (window.location.href.indexOf('&p=1') < 0) return;
  ....
```
Все готово.
<!-- ## Параллельный сбор своей пуш-базы с другими сервисами пуш-подписок -->
