<h1>🍊 Orange Evolution - Back End 🍊</h1>
<p>Projeto do Hackathon do Programa de Formação FCamara (Season 4)</p>

<h2>Problemática</h2>
<p>O <b>Orange Evolution</b> é um projeto já existente que contempla três trilhas de estudo pra quem está iniciando na carreira de tecnologia: UX/UI Design, Desenvolvimento Full Stack e QA (Quality Assurance), com conteúdos escolhidos por pessoas experientes da área para garantir a qualidade dos estudos. O problema é que, atualmente, o <b>Orange Evolution</b> está organizado no Notion, que não é a plataforma ideal para a melhor experiência do usuário. Nosso desafio é criar uma solução (MVP) para este problema da melhor forma possível nos 15 dias de Hackathon. Os requisitos são:</p>
<ul>
<li>O usuário precisa se cadastrar e ter a possibilidade de escolher uma ou mais trilhas</li>
<li>Os administradores precisam poder adicionar, atualizar e excluir os conteúdos das trilhas</li>
</ul>

<h2>Solução proposta (back end)</h2>
<p>Pensando nas funcionalidades da aplicação (cadastro e login de usuário, cadastro, atualização e deleção de trilhas e cursos), optamos por desenvolver em Node.js pela familiaridade que o squad já tinha com a linguagem, e utilizar o MongoDB como banco de dados por ser um projeto pequeno e pontual que não carece de uma estrutura de dados tão rígida.</p>

<h2>Como rodar o projeto e testar os métodos</h2>
<p>Baixe o nosso repositório em sua máquina, abra com sua IDE de preferência (utilizamos o VSCode) e, no terminal, dê o comando "npm i" para instalar as dependências necessárias, e em seguida "npm run dev". Além disso, também é possível fazer testes pela coleção no <a href="https://www.postman.com/" target="_blank">Postman</a> com as credenciais abaixo:</p>
<ul>
<li>Email: equipe34.2022@gmail.com</li>
<li>Senha: Grupo34@</li>
</ul>

<h2> .env  EXAMPLE</h2>
<h3>Necessário criar o <span>.env</span> na raiz do projeto</h3>
<ul>
<li>PORT= 5000</li>
<li>MONGO_URI=mongodb+srv://<USER>:<PASSWORD>cluster0.hzybtw0.mongodb.net/?retryWrites=true&w=majority</li>
<li>SECRET= squad34</li>
</ul>
<h2> Qualquer dúvida neste <a href="https://pastebin.com/z9ee5gyn" target="_blank">link</a> tem os dados necessários!</h2>

