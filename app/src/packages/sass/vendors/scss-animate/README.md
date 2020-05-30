# SCSS Animate

Mais um port da Animate.css para SASS...

## Como Importar

```scss
// Importando as propriedades necessárias
@import 'path/to/directory/_properties';

// Importando as animações
@import 'path/to/directory/attention-seekers/attention-seekers.scss';
```

## Como Usar

```scss
.sua-classe-css {
    @include bounce();
}
```

Os mixins contém opções configuráveis para customizar suas animações:

`count`, `duration`, `delay`, `function`, `fill` e `visibility`

---

#### Valores Padrão

**$count:** Determina o número de vezes que a animação vai se repetir. Para deixar a animação repetindo infinitamente, informe o valor 'infinite'. `Default: 1`

**$duration:** Quanto tempo, em segundos (s) ou milisegundos (ms), durará um ciclo da animação. `Default: 0`

**$delay:** Define a partir de quanto tempo a animação vai se iniciar. `Default: 0`

**$function:** Forma como a animação progride no tempo. `Default: ease`

**$fill:** Especifica como uma animação CSS deve aplicar estilos ao seu destino antes e depois que ele está sendo executado. `Default: both`

**$visibility:** Determina se deve ser exibido ou não a parte de trás do elemento para o usuário. `Default: hidden`

```scss
// Incluindo o mixin com as opções
.sua-classe-css {
    @include bounce(
        $count: infinite,
        $duration: 1s,
        $delay: .2s,
        $function: ease,
        $fill: both,
        $visibility: hidden
    );
}
```
---

#### Prehistoric Mode

Se você não estiver usando um prefixer, ative o modo pré-histórico mudando a variável `$prehistoric-mode` para `true`

## Licenças

Como nos originais, sob a [Licença MIT](http://opensource.org/licenses/MIT).

## Créditos

Dan Eden's [Animate.css](https://github.com/daneden/animate.css)

Geoff Graham's [Animate.scss](https://github.com/geoffgraham/animate.scss)
