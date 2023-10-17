# App

Sevidor Menina de UX.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário;
- [ ] Deve ser possível modificar dados do perfil;
- [ ] Deve ser possivel deletar um usuario;
- [ ] Deve ser possível castrar um curso;
- [ ] Deve ser possivel obter todos os cursos;
- [ ] Deve ser possivel buscar um curso pelo nome;
- [ ] Deve ser possivel alterar um curso;
- [ ] Deve ser possivel deletar um curso;
- [ ] Deve ser possivel cadastrar um tipo de cursos;
- [ ] Deve ser possivel obter todos os tipos de cursos;
- [ ] Deve ser possivel buscar um tipo curso pelo nome;
- [ ] Deve ser possivel alterar um tipo de curso;
- [ ] Deve ser possivel deletar um tipo de curso;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não deve poder criar um curso com mesmo nome;
- [ ] O usuário não deve poder criar um tipo de curso com mesmo nome;
- [ ] Os usuários administradores podem criar, editar e deletar usuarios gestores/voluntarios/cursos/tipos de cursos;
- [ ] Os usuários gestores podem criar, editar e deletar usuarios voluntarios/cursos/tipos de cursos;
- [ ] Os usuários voluntarios so pode editar as informacoe do seu perfil;
- [ ] Os usuários voluntarios podem criar cursos;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

<!--START_SECTION:footer-->

<br />
<br />

<!--END_SECTION:footer-->
