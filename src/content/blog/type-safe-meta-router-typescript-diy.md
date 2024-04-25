---
title: 'Building a Type-Safe Meta-Router in TypeScript: A DIY Guide'
date: 2024/04/24 22:14:37
keywords: [typescript, meta programming, compiler]
description: "Unlocking the Power of Meta-Programming: A Guide to TypeScript's Compiler API"
published: 'preview'
---

Essa é a história de como eu criei os core-concepts do meu "framework" backend [Kita.js](https://kita.js.org) e usei o TypeScript Compiler API para criar um sistema único de análise estática, type-checking e code generation para criação de rotas em um servidor HTTP.

## Ecosistema

Se você está familiar com as ferramentas atuais para criação de aplicações restful, você provavelmente sabe que a repetição de tipagem e modelos é muito comum, e não é algo que surpreende muitas pessoas, uma vez que Typescript _(ou JavaScript puro para os mais loucos)_ não é uma linguagem que retém tipos em runtime.

Caso você não esteja familiar, veja alguns exemplos onde o I/O é validado, usando um exemplo um pouco mais complexo que "Hello World" em alguns frameworks populares:

<details>
  <summary>Fastify</summary>

```ts
// You can also use github.com/fastify/fastify-type-provider-typebox but
// that's not out of the box
app.post(
  '/user/:id',
  {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    }
  },
  async (req, res) => {
    return myService.editUser(req.params.id, req.body);
  }
);
```

</details>

<details>
  <summary>Elysia</summary>

```ts
elysia.get(
  '/user/:id',
  async () => {
    return myService.editUser(req.params.id, req.body);
  },
  {
    params: t.Object({
      id: t.Numeric()
    }),
    body: t.Object({
      name: t.String()
    }),
    response: t.Object({
      id: t.String(),
      name: t.String()
    })
  }
);
```

</details>

E por aí vai...

A repetição piora mil vezes mais quando você tem que definir os mesmos modelos no SQL do Banco de Dados, na tipagem da sua ORM, na Documentação da sua API e em vários outros lugares, todos ao mesmo tempo.

Definir o mesmo modelo umas 5 vezes não costuma ser um grande problema em grandes projetos, afinal projetos grandes/empresariais são os que realmente pagam as contas no final do mês.

Apenas usando <kbd>Ctrl+C</kbd>/<kbd>Ctrl+V</kbd> e algumas mudanças que podem ser facilitadas com regexes dentre as _N_ cópias de schema que precisam ser feitas já podem ser o suficiente.

O grande problema disso tudo mora em manter a consistência entre essas cópias durante os longos anos de vida de um projeto e todas as suas mudanças que o tempo trará consigo.

## Esboçando ideias

Antes de decidir o que precisamos e podemos reduzir, vamos tentar esboçar um exemplo mínimo de uma rota sem perder nenhuma informação:

```ts
export function createUser(id: string, name: string) {
  return myService.editUser(id, name);
}
```

Tecnicamente, o código acima nos diz tudo que é necessário, porém **ainda** está faltando algumas informações específicas que são necessárias para um web service.

Se você se acha o rei da arquitetura de software, você provavelmente deve estar pensando:

> _"Whoa! That's what a Controller should do!"_

Sim, de certa forma você não está errado, mas lembre-se que estamos programando em JavaScript e com isso podemos burlar algumas coisas em favor da tão sonhada **Developer Experience**.

Informações como:

- O método HTTP que a rota deve responder
- O caminho da rota
- De onde o ID do usuário vem
- De onde o nome do usuário vem
- O que será retornado
- _(E muitas outras informações que não convém ao nosso exemplo)_

Ainda precisam ser definidas de alguma forma. Poderiamos melhorar um pouco mais o nosso exemplo para conter essas informações:

```ts
// routes/user.ts

type Body<T> = T;
type Path<T> = T;
type User = { id: string; name: string };

/**
 * @operationId createUser
 */
export function post(id: Path<string>, name: Body<string>): User {
  return myService.editUser(id, name);
}
```

E ao colocar o código acima dentro de um arquivo localizado em `/routes/user.ts` e seguir a metodologia de filesystem routing, tecnicamente já temos toda a informação necessária definida de forma explícita e sem repetição.

Mesmo que aparenta perfeito, o exemplo acima não consegue ser executado sem etapas de compilação adicionais, uma vez que ao transpilar o código typescript para javascript antes de executá-lo, todas essas informações serão perdidas e não conseguiremos mais acessá-las:

```js
// routes/user.js

// We lost all the information we had in the typescript file
export function post(id, name) {
  return myService.editUser(id, name);
}
```

## Typescript, but not the one you know

Se você se considera um pouco mais curioso, já deve ter se perguntado como que ao rodar `tsc` e a tipagem ser removida mas o código não.

Como que `export function post(id` continuou no `.js` mas o `: Path<string>` foi removido?
