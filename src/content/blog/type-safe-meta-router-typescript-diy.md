---
title: 'Building a Type-Safe Meta-Router in TypeScript: A DIY Guide'
date: 2024/04/24 22:14:37
keywords: [typescript, meta programming, compiler]
description: "Unlocking the Power of Meta-Programming: A Guide to TypeScript's Compiler API"
---

> Essa é a história de como eu criei o core-concept do meu "framework" backend [Kita.js](https://kitajs.org) e usufrui do TypeScript Compiler API para criar um sistema único de análise estática, type-checking e code generation para criação de rotas em um servidor HTTP.

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

Apenas usando <kbd>Ctrl+C</kbd> ou <kbd>Ctrl+V</kbd> e algumas mudanças que podem ser facilitadas com regexes dentre as _N_ cópias de schema que precisam ser feitas já podem ser o suficiente.

O grande problema disso tudo mora em manter a consistência entre essas cópias durante os longos anos de vida de um projeto e todas as suas mudanças que o tempo trará consigo.

## Esboçando ideias

Antes de decidir o que precisamos e podemos reduzir, vamos tentar criar um código de uma rota aonde o texto diz tudo que é necessário de informação, mas ainda não da maneira correta:

```ts
export function createUser(id: string, name: string) {
  return myService.createUser(id, name);
}
```

Tecnicamente, essa função acima nos diz o seu contrato perfeitamente, porém **ainda** não é o suficiente para um web service.

Se você se acha o rei da arquitetura de software, você provavelmente deve estar pensando:

> _"Whoa! We need a Controller!"_

Sim, e é isso que vamos fazer, só que sem a parte chata de um controller. Por que? Por que eu e você programamos em javascript e isso já é por si só uma boa desculpa.

## Requisitos

Um controller básico deve portar essas informações:

- O método HTTP que a rota deve responder
- O caminho da rota
- De onde o ID do usuário vem
- De onde o nome do usuário vem
- O que será retornado
- _(E outros dados que não convém ao nosso exemplo)_

`type X<Y> = Y` é uma simples abreviação de `Y = Y` que contém visualmente uma informação a mais: `X`.

Com isso, pode-se criar alguns type helpers que visualmente indicariam de onde vem cada informação:

```ts
type Body<T> = T;
type Path<T> = T;
type Header<T> = T;
type Query<T> = T;
```

E ao aplicar esses type helpers ao nosso exemplo, visualmente temos uma melhor ideia de onde vem cada informação mantendo a tipagem original:

```ts
// post('123', 'John Doe'); still works
export function post(id: Path<string>, name: Body<string>) {
  return myService.editUser(id, name);
}
```

Sendo criativo e embelezando um pouco mais o código, um resultado como o seguinte é possível:

```ts
// src/routes/user.ts

/** @operationId editUser */
export function post(id: Path<string>, name: Body<string>): User {
  return myService.editUser(id, name);
}
```

Mesmo que aparenta funcional, o exemplo acima não consegue ser executado sem etapas de compilação adicionais, uma vez que ao transpilar o código typescript, todas essas informações serão perdidas e não conseguiremos mais acessá-las:

```js
// dist/routes/user.js

// what is id and name?
export function post(id, name) {
  return myService.editUser(id, name);
}
```

## Typescript, but not the one you know

O TypeScript transforma o código fonte em uma árvore de sintaxe abstrata (AST, ou Abstract Syntax Tree) para facilitar a análise e manipulação do código pelo compilador.

Ao abrirmos o código acima no [astexplorer.net](https://astexplorer.net/#/gist/9136944ed4a8b216b458f61f741ce24a/ce324a7e4e90a81212c74f76f1f5dc36060f0f7e) você verá a Abstract Syntax Tree (AST) inteira que o TypeScript gera ao transpilar seu código.

```sh
AST = {
  fileName: 'src/routes/user.ts',
  kind: ts.SyntaxKind.SourceFile,
  statements: [
    {
      kind: ts.SyntaxKind.FunctionDeclaration,
      name: {
        escapedText: 'post',
        kind: ts.SyntaxKind.Identifier
      },
      parameters: [
        {
          kind: ts.SyntaxKind.Parameter,
          name: {
            escapedText: 'id',
            kind: ts.SyntaxKind.Identifier
          },
          type: {
            kind: ts.SyntaxKind.TypeReference,
            typeArguments: [
              {
                kind: ts.SyntaxKind.StringKeyword
              }
            ],
            typeName: {
              escapedText: 'Path',
              kind: ts.SyntaxKind.Identifier
            }
          }
        },
        {
          kind: ts.SyntaxKind.Parameter,
          name: {
            escapedText: 'name',
            kind: ts.SyntaxKind.Identifier
          },
          type: {
            kind: ts.SyntaxKind.TypeReference,
            typeArguments: [
              {
                kind: ts.SyntaxKind.StringKeyword
              }
            ],
            typeName: {
              escapedText: 'Body',
              kind: ts.SyntaxKind.Identifier
            }
          }
        }
      ],
      jsDoc: [
        {
          kind: ts.SyntaxKind.JSDocComment,
          tags: [
            {
              comment: 'editUser',
              kind: ts.SyntaxKind.JSDocTag,
              tagName: {
                escapedText: 'operationId',
                kind: ts.SyntaxKind.Identifier
              }
            }
          ]
        }
      ]
    }
  ]
};
```
