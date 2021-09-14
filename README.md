
# Raspberry pi fjärrstyrning

programmet körs på raspberry piernas webbläsare.

varje PI 

Här är Raspberry piernas portar och positioner,
|Position|Port|
|---------|---------|
|Hemma|`8080`|
|Vardagsrum|`8081`|

## Lägga upp projekt

för att lägga upp ett projekt så krävs det att man:
1. placerar HTML filen i mappen views
1. placerar alla statiska filer i mappen public.

## config.yaml
|config|förklaring|
|---|---|
|`startport`|porten som räkningen börjar på.|
|`monitors`|antal portar som skall användas.|
|`pages`|alla filer som finns i views mappen|
|`pages.time`|tids intervalet mellan varje "page"|
|`setmonitors`|en lista med alla monitors/pi enheter|
|`setmonitors.PORT.showpages`|vilka "pages" som skall visas på de olika skärmarna|